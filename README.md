# Lab Programs Upload & Sharing System

This system allows students to upload lab programs and makes them visible to all visitors and the admin.

## How It Works

- **Frontend:** HTML form in `course.html` collects uploads subject, program name, and files
- **Backend:** Node.js + Express server stores files on disk and provides API endpoints
- **Storage:** Files are saved in an `uploads/` folder, and metadata is stored in `uploads.json`
- **Access:** All visitors can download uploaded files, admin can delete them

## Setup & Installation

### Step 1: Install Node.js
Download and install Node.js from https://nodejs.org/

### Step 2: Install Dependencies
Open terminal/PowerShell in this project folder and run:
```
npm install
```

This will install:
- **express** - Web framework
- **multer** - File upload handler
- **cors** - Enable cross-origin requests

### Step 3: Start the Server
```
npm start
```

You should see:
```
Server running at http://localhost:3000
Uploads will be stored in: D:\COLLEGE\Semester 4\Lab web\New folder\uploads
```

### Step 4: Open in Browser
- Open `http://localhost:3000` in your browser
- Navigate to the "Help us" section
- Upload files!

## Features

✅ **Upload Files** - Submit multiple files with subject and program name  
✅ **View All Uploads** - Every visitor can see all uploaded programs  
✅ **Download Files** - Click download link to get any file  
✅ **Admin Delete** - Only admin can delete uploads  
✅ **File Storage** - Files saved on server, not lost after refresh  

## Admin Access

To access admin features (delete uploads):
1. On the uploaded codes section, you can delete programs if you have admin access
2. Simple admin check: localStorage stores the admin password
3. **For production:** Implement proper authentication (login form with backend verification)

### Current Admin Password: `admin123`

> ⚠️ **Security Note:** The current admin system is basic for learning. For a real website, use:
> - Proper login forms
> - Password hashing (bcryptjs)
> - Session/JWT tokens
> - Database (MongoDB/MySQL)

## Project Structure

```
├── server.js              # Backend Node.js server
├── course.html            # Frontend with upload form
├── package.json           # Dependencies
├── uploads/               # Folder where files are stored (created automatically)
├── uploads.json           # Metadata of uploaded files
└── static/
    ├── course.css         # Styling
    └── index.css
```

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST   | /api/upload | Upload files |
| GET    | /api/uploads | Get all uploads |
| GET    | /api/download/:filename | Download a file |
| DELETE | /api/delete/:id | Delete an upload (admin) |

## Troubleshooting

**"Server may not be running" error?**
- Make sure you ran `npm start`
- Check if port 3000 is already in use
- Try: `npm install` first, then `npm start`

**Files not persisting?**
- Check `uploads/` folder exists
- Make sure server has write permissions

**CORS errors?**
- The backend has CORS enabled, but make sure you're accessing from `http://localhost:3000`

## Future Enhancements

- [ ] Add database (MongoDB) instead of JSON file
- [ ] Create proper authentication system
- [ ] Add file preview before download
- [ ] Add ratings/comments on submissions
- [ ] Add search and filter functionality
- [ ] Deploy to cloud (Heroku, Vercel, etc.)

## Need Help?

Check the browser console (F12 → Console) for error messages to debug issues.
