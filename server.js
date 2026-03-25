const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.originalname}`;
        cb(null, filename);
    }
});

const upload = multer({ storage });

// Upload endpoint - receives files from the form
app.post('/api/upload', upload.array('files', 10), (req, res) => {
    const { subject, programName } = req.body;
    
    if (!subject || !programName || !req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'Missing required fields or files' });
    }

    const uploadRecord = {
        id: Date.now(),
        subject,
        programName,
        uploadedAt: new Date().toLocaleString(),
        files: req.files.map(file => ({
            filename: file.filename,
            originalName: file.originalname,
            size: file.size,
            mimetype: file.mimetype
        }))
    };

    // Read existing uploads.json or create new
    const uploadsFile = path.join(__dirname, 'uploads.json');
    let uploads = [];
    
    if (fs.existsSync(uploadsFile)) {
        try {
            uploads = JSON.parse(fs.readFileSync(uploadsFile, 'utf-8'));
        } catch (e) {
            uploads = [];
        }
    }
    
    uploads.push(uploadRecord);
    fs.writeFileSync(uploadsFile, JSON.stringify(uploads, null, 2));
    
    res.json({ success: true, message: 'Files uploaded successfully!' });
});

// Get all uploads - visible to all visitors
app.get('/api/uploads', (req, res) => {
    const uploadsFile = path.join(__dirname, 'uploads.json');
    
    if (fs.existsSync(uploadsFile)) {
        try {
            const uploads = JSON.parse(fs.readFileSync(uploadsFile, 'utf-8'));
            res.json(uploads);
        } catch (e) {
            res.json([]);
        }
    } else {
        res.json([]);
    }
});

// Download file endpoint
app.get('/api/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(uploadsDir, filename);
    
    // Security: prevent directory traversal
    if (!filepath.startsWith(uploadsDir)) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    
    if (fs.existsSync(filepath)) {
        res.download(filepath);
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

// Delete upload (admin functionality)
app.delete('/api/delete/:id', (req, res) => {
    // In a real app, add authentication/authorization here
    const uploadId = parseInt(req.params.id);
    const uploadsFile = path.join(__dirname, 'uploads.json');
    
    if (fs.existsSync(uploadsFile)) {
        let uploads = JSON.parse(fs.readFileSync(uploadsFile, 'utf-8'));
        const recordToDelete = uploads.find(u => u.id === uploadId);
        
        if (recordToDelete) {
            // Delete actual files
            recordToDelete.files.forEach(file => {
                const filepath = path.join(uploadsDir, file.filename);
                if (fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                }
            });
            
            // Remove from uploads.json
            uploads = uploads.filter(u => u.id !== uploadId);
            fs.writeFileSync(uploadsFile, JSON.stringify(uploads, null, 2));
            
            res.json({ success: true, message: 'Upload deleted' });
        } else {
            res.status(404).json({ error: 'Upload not found' });
        }
    } else {
        res.status(404).json({ error: 'No uploads found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Uploads will be stored in: ' + uploadsDir);
});
