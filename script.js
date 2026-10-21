const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const dialog = $("#createDialog");
const toast = $("#toast");
let toastTimer;
let servers = [
  {name:"ubuntu-demo-01", os:"Ubuntu Linux", status:"Running (demo)", created:"Earlier"},
  {name:"windows-demo-01", os:"Windows (mock)", status:"Stopped (demo)", created:"Earlier"}
];
let events = [
  {title:"Workspace created", detail:"Demo workspace initialized", time:"Just now"},
  {title:"Ubuntu instance added", detail:"Sample server added to inventory", time:"Earlier"},
  {title:"RDP profile prepared", detail:"Not connected to a real Windows host", time:"Earlier"}
];
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),3000)}
function go(view){
  $$(".page").forEach(p=>p.classList.toggle("active-page",p.id===view));
  $$(".nav-item").forEach(a=>a.classList.toggle("active",a.dataset.view===view));
  $("#pageTitle").textContent=view.charAt(0).toUpperCase()+view.slice(1);
  $("#sidebar").classList.remove("open");
  if(view==="servers") renderServers();
  if(view==="activity") renderActivity();
  window.location.hash=view;
}
$$(".nav-item").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();go(a.dataset.view)}));
$$("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
$("#menuBtn").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#bellBtn").addEventListener("click",()=>showToast("No new demo notifications."));
$("#closeNotice").addEventListener("click",()=>$(".notice").remove());
function openCreate(){ $("#serverName").value=""; dialog.showModal(); }
$("#createBtn").addEventListener("click",openCreate);
$("#createBtn2").addEventListener("click",openCreate);
$("#createForm").addEventListener("submit",e=>e.preventDefault());
$("#confirmCreate").addEventListener("click",e=>{
  e.preventDefault();
  const name=$("#serverName").value.trim();
  const os=$("#serverOS").value;
  if(!name || !/^[A-Za-z0-9-]+$/.test(name)){showToast("Use letters, numbers and hyphens for the name.");return}
  if(servers.some(s=>s.name.toLowerCase()===name.toLowerCase())){showToast("A server with this name already exists.");return}
  servers.unshift({name,os,status:"Stopped (demo)",created:"Just now"});
  events.unshift({title:"Demo server added",detail:name+" added to sample inventory",time:"Just now"});
  dialog.close();renderServers();renderCounts();showToast("Demo server added. No real VPS was created.");
});
function statusClass(s){return s.startsWith("Running")?"running":"stopped"}
function osClass(os){return os.includes("Ubuntu")?"ubuntu":"windows"}
function renderServers(){
  const rows=servers.map(s=>`<tr><td><div class="server-name"><span class="os-icon ${osClass(s.os)}">${osClass(s.os)==="ubuntu"?"U":"⊞"}</span><div><strong>${escapeHTML(s.name)}</strong><small>${escapeHTML(s.os)}</small></div></div></td><td><span class="pill ${statusClass(s.status)}">● ${escapeHTML(s.status)}</span></td><td>${escapeHTML(s.created)}</td><td><button class="text-btn" data-server-action="${escapeAttr(s.name)}">Details</button></td></tr>`).join("");
  $("#allServerRows").innerHTML=rows;
  $("#serverCount").textContent=servers.length;
  $$("[data-server-action]").forEach(b=>b.addEventListener("click",()=>showToast(b.dataset.serverAction+" is a demo entry; no real server is connected.")));
}
function renderCounts(){$("#serverCount").textContent=servers.length;renderServers()}
function renderActivity(){
  $("#fullActivity").innerHTML=events.map((e,i)=>`<div class="timeline-item"><span class="timeline-dot ${i%3===0?"purple-dot":i%3===1?"green-dot":"orange-dot"}"></span><div><strong>${escapeHTML(e.title)}</strong><p>${escapeHTML(e.detail)}</p><small>${escapeHTML(e.time)}</small></div></div>`).join("");
}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function escapeAttr(s){return escapeHTML(s)}
$("#saveSettings").addEventListener("click",()=>{
  const workspace=$("#workspaceName").value.trim()||"FreeHost Cloud";
  const admin=$("#adminName").value.trim()||"Admin";
  $(".brand").lastElementChild.innerHTML=escapeHTML(workspace).replace(" Cloud",'<span class="muted-brand"> Cloud</span>');
  $(".profile strong").textContent=admin;
  $(".profile .avatar").textContent=admin.charAt(0).toUpperCase();
  $(".welcome-row h1").innerHTML="Good to see you, "+escapeHTML(admin)+' <span class="wave">✦</span>';
  $("#settingsNote").textContent="Saved in this page session only; no account authentication is active.";
  showToast("Demo settings updated.");
});
$$("[data-details]").forEach(b=>b.addEventListener("click",()=>showToast(b.dataset.details+" is a sample server, not a real VPS.")));
const initialHash=location.hash.replace("#","");
if(["overview","servers","activity","settings"].includes(initialHash))go(initialHash);
else renderServers();
