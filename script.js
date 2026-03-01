// LOADER
window.onload=()=>{
setTimeout(()=>{
document.getElementById("loader").style.display="none";
},1200);
};

// THEME
const toggle=document.getElementById("themeToggle");
toggle.onclick=()=>{
document.body.classList.toggle("dark");
toggle.textContent =
document.body.classList.contains("dark") ? "☀️":"🌙";
};

// DASHBOARD (FIXED)
function topperYes(){
document.getElementById("dashboard").classList.add("hidden");
document.getElementById("topperSection").classList.remove("hidden");
}

function topperNo(){
document.getElementById("dashboard").classList.add("hidden");
document.getElementById("mainPortal").classList.remove("hidden");
}

function goBack(){
document.getElementById("topperSection").classList.add("hidden");
document.getElementById("dashboard").classList.remove("hidden");
}

// LAB DATA
const labData={
fdsa:{docs:[],outputs:["outputs/fdsa/output1.png"]},
os:{docs:[{name:"📄 OS Observation",file:"docs/os/OS OBSERVATION.pdf"}],outputs:["outputs/os/output1.png"]},
cn:{docs:[{name:"📄 CN Record",file:"docs/cn/CS3591-COMPUTER NETWORKS LAB RECORD Copy.pdf"}],outputs:["outputs/cn/output1.png"]},
ml:{docs:[{name:"📄 ML Record",file:"docs/ml/AL3461MLRECORD (1).pdf"}],outputs:["outputs/ml/output1.png"]}
};

let currentLab="";

// OPEN LAB (FIXED)
function openLab(lab){
currentLab=lab;
document.getElementById("labContent").classList.remove("hidden");
loadDocuments();
loadOutputs();
}

function loadDocuments(){
let d=document.getElementById("docList");
d.innerHTML="";
labData[currentLab].docs.forEach(doc=>{
d.innerHTML += `
<div class="card">
<h3>${doc.name}</h3>
<a href="${doc.file}" download>Download</a>
</div>`;
});
}

function loadOutputs(){
let o=document.getElementById("outputList");
o.innerHTML="";
labData[currentLab].outputs.forEach(img=>{
o.innerHTML += `
<div class="card"><img src="${img}"></div>`;
});
}

function showSection(id){
document.querySelectorAll(".content").forEach(s=>s.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
}