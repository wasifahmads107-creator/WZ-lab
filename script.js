/* =========================================================
   WZ-lab — client-side demo app
   Real signup/login persisted via localStorage (per-browser).
   Photo editor uses <canvas> for actual pixel operations.
========================================================= */

let currentUser = null; // {username, name, email}
let baseImage = null;   // the original uploaded Image object
let rotation = 0;       // degrees
let flipped = false;
let textOverlays = [];  // {text,x,y,size,color}
let activeCropRatio = 'free';
let activeFilterKey = 'none';

const TOOLS = [
  {ico:'✨',name:'Quality\nEnhancer'},
  {ico:'🛠️',name:'AI Repair'},
  {ico:'🖼️',name:'Super\nResolution'},
  {ico:'🧩',name:'Collage'},
  {ico:'🙂',name:'Face'},
  {ico:'🧍',name:'Body'},
  {ico:'💄',name:'Makeup'},
  {ico:'🤖',name:'AI Retouch'},
  {ico:'📷',name:'Live Photo'},
  {ico:'✏️',name:'Edit Live'},
  {ico:'🔥',name:'Trending'},
  {ico:'🧰',name:'All Tools'},
];

const FILTERS = [
  {key:'none', name:'Original', css:''},
  {key:'vivid', name:'Vivid', css:'saturate(1.5) contrast(1.1)'},
  {key:'bw', name:'B&W', css:'grayscale(1) contrast(1.05)'},
  {key:'warm', name:'Warm', css:'sepia(.35) saturate(1.3) hue-rotate(-8deg)'},
  {key:'cool', name:'Cool', css:'hue-rotate(15deg) saturate(1.15) brightness(1.03)'},
  {key:'fade', name:'Fade', css:'contrast(.85) saturate(.75) brightness(1.08)'},
  {key:'noir', name:'Noir', css:'grayscale(1) contrast(1.3) brightness(.9)'},
  {key:'dream', name:'Dream', css:'saturate(1.2) brightness(1.08) contrast(.95) blur(.3px)'},
];

const CROPS = [
  {key:'free', name:'Free'},
  {key:'1:1', name:'1:1'},
  {key:'4:5', name:'4:5'},
  {key:'16:9', name:'16:9'},
  {key:'3:4', name:'3:4'},
];

/* ---------------- Utilities ---------------- */
function $(id){ return document.getElementById(id); }

function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  $(id).classList.add('active');
}

function toast(msg){
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast._h);
  toast._h = setTimeout(()=>t.classList.remove('show'), 1800);
}

function togglePw(id, el){
  const inp = $(id);
  if(inp.type === 'password'){ inp.type='text'; el.textContent='HIDE'; }
  else { inp.type='password'; el.textContent='SHOW'; }
}

/* Using localStorage here since this runs as a normal local file/site
   (window.storage is only available inside Claude.ai artifacts). */
async function storageGet(key){
  try{
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }catch(e){ return null; }
}
async function storageSet(key, val){
  try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){ console.error(e); }
}

/* ---------------- Auth logic ---------------- */
async function getUsers(){
  const u = await storageGet('wz_users');
  return u || {};
}

function simpleHash(str){
  // NOT cryptographically secure — demo purposes only
  let h = 0;
  for(let i=0;i<str.length;i++){ h = (h*31 + str.charCodeAt(i)) >>> 0; }
  return h.toString(16);
}

async function handleSignup(){
  const name = $('su-name').value.trim();
  const username = $('su-username').value.trim().toLowerCase();
  const email = $('su-email').value.trim();
  const password = $('su-password').value;
  const errEl = $('su-err');
  errEl.textContent = '';

  if(!name || !username || !email || !password){
    errEl.textContent = 'Please fill in all fields.'; return;
  }
  if(password.length < 4){
    errEl.textContent = 'Password must be at least 4 characters.'; return;
  }
  if(!/^[a-z0-9_\.]{3,20}$/.test(username)){
    errEl.textContent = 'Username: 3-20 chars, letters/numbers/_ only.'; return;
  }

  const users = await getUsers();
  if(users[username]){
    errEl.textContent = 'That username is already taken.'; return;
  }
  users[username] = { name, email, password: simpleHash(password), created: Date.now() };
  await storageSet('wz_users', users);
  toast('Account created! Please log in.');
  $('su-name').value=''; $('su-username').value=''; $('su-email').value=''; $('su-password').value='';
  showScreen('screen-login');
}

async function handleLogin(){
  const username = $('login-username').value.trim().toLowerCase();
  const password = $('login-password').value;
  const errEl = $('login-err');
  errEl.textContent = '';

  if(!username || !password){
    errEl.textContent = 'Enter username and password.'; return;
  }
  const users = await getUsers();
  const u = users[username];
  if(!u || u.password !== simpleHash(password)){
    errEl.textContent = 'Incorrect username or password.'; return;
  }
  currentUser = { username, name: u.name, email: u.email };
  enterApp();
}

function quickDemo(){
  currentUser = { username:'guest', name:'Guest', email:'guest@wz-lab.app' };
  enterApp();
}

function enterApp(){
  $('me-name').textContent = currentUser.name;
  $('me-email').textContent = currentUser.email;
  $('me-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
  showScreen('screen-home');
  toast('Welcome, ' + currentUser.name + '!');
}

function handleLogout(){
  currentUser = null;
  baseImage = null;
  showScreen('screen-login');
}

/* ---------------- Home / nav ---------------- */
function buildToolGrid(){
  const grid = $('tool-grid');
  grid.innerHTML = '';
  TOOLS.forEach(t=>{
    const el = document.createElement('div');
    el.className = 'tool';
    el.onclick = ()=> openEditor();
    el.innerHTML = `<div class="tool-ico">${t.ico}</div><div class="tool-name">${t.name.replace('\n','<br>')}</div>`;
    grid.appendChild(el);
  });
  const tgrid = $('template-grid');
  if(tgrid){
    tgrid.innerHTML = '';
    ['Retro Film','Neon Nights','Golden Hour','Studio Glow','Pastel Dream','Mono Chrome'].forEach(name=>{
      const el = document.createElement('div');
      el.className = 'tool';
      el.style.cssText='flex-direction:column;';
      el.onclick = ()=> openEditor();
      el.innerHTML = `<div class="tool-ico" style="width:100%;height:90px;border-radius:14px;font-size:26px;">🎞️</div><div class="tool-name">${name}</div>`;
      tgrid.appendChild(el);
    });
  }
}

function switchNav(which){
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active', n.dataset.nav===which));
  if(which==='home') showScreen('screen-home');
  if(which==='templates') showScreen('screen-templates');
  if(which==='me') showScreen('screen-me');
}
function goMe(){ switchNav('me'); }

/* ---------------- Editor: state & canvas ---------------- */
function openEditor(){
  showScreen('screen-editor');
  resetEditorState();
}

function resetEditorState(){
  rotation = 0; flipped = false; textOverlays = [];
  activeCropRatio = 'free'; activeFilterKey = 'none';
  ['brightness','contrast','saturate','warmth','blur'].forEach(k=>{
    const map = {brightness:100, contrast:100, saturate:100, warmth:0, blur:0};
    const el = $('rng-'+k); if(el) el.value = map[k];
    const v = $('val-'+k); if(v) v.textContent = map[k];
  });
  buildFilterRow();
  buildCropRow();
  switchMainTab('retouch');
}

function exitEditor(){
  baseImage = null;
  $('upload-hint').style.display = 'flex';
  $('editCanvas').style.display = 'none';
  showScreen('screen-home');
}

function handleUpload(evt){
  const file = evt.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = (e)=>{
    const img = new Image();
    img.onload = ()=>{
      baseImage = img;
      rotation = 0; flipped = false; textOverlays = [];
      $('upload-hint').style.display = 'none';
      const cv = $('editCanvas');
      cv.style.display = 'block';
      drawCanvas();
      const cover = $('tl-cover');
      if(cover){ cover.style.backgroundImage = `url(${e.target.result})`; cover.textContent=''; }
      toast('Photo loaded');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function currentFilterCss(){
  const base = FILTERS.find(f=>f.key===activeFilterKey)?.css || '';
  const b = $('rng-brightness') ? $('rng-brightness').value : 100;
  const c = $('rng-contrast') ? $('rng-contrast').value : 100;
  const s = $('rng-saturate') ? $('rng-saturate').value : 100;
  const warm = $('rng-warmth') ? parseInt($('rng-warmth').value) : 0;
  const blur = $('rng-blur') ? $('rng-blur').value : 0;
  let extra = `brightness(${b/100}) contrast(${c/100}) saturate(${s/100}) blur(${blur}px)`;
  if(warm !== 0){ extra += ` hue-rotate(${-warm*0.6}deg) sepia(${Math.max(0,warm)/150})`; }
  return (base + ' ' + extra).trim();
}

function drawCanvas(){
  if(!baseImage) return;
  const cv = $('editCanvas');
  const ctx = cv.getContext('2d');

  const rad = (rotation % 180 !== 0);
  const w = baseImage.width, h = baseImage.height;
  cv.width = rad ? h : w;
  cv.height = rad ? w : h;

  ctx.save();
  ctx.clearRect(0,0,cv.width,cv.height);
  ctx.filter = currentFilterCss();
  ctx.translate(cv.width/2, cv.height/2);
  ctx.rotate(rotation * Math.PI/180);
  ctx.scale(flipped ? -1:1, 1);
  ctx.drawImage(baseImage, -w/2, -h/2, w, h);
  ctx.restore();

  // draw text overlays (not affected by filter)
  ctx.filter = 'none';
  textOverlays.forEach(t=>{
    ctx.font = `${t.size}px 'Segoe UI', sans-serif`;
    ctx.fillStyle = t.color;
    ctx.textBaseline = 'top';
    ctx.shadowColor = 'rgba(0,0,0,.5)';
    ctx.shadowBlur = 4;
    ctx.fillText(t.text, t.x, t.y);
  });

  // fit canvas visually within wrap
  fitCanvasToWrap();
}

function fitCanvasToWrap(){
  const cv = $('editCanvas');
  const wrap = $('canvas-wrap');
  const maxW = wrap.clientWidth - 20;
  const maxH = wrap.clientHeight - 20;
  const ratio = Math.min(maxW / cv.width, maxH / cv.height, 1);
  cv.style.width = (cv.width * ratio) + 'px';
  cv.style.height = (cv.height * ratio) + 'px';
}

/* ---------------- Tool strip / panels ---------------- */
function switchMainTab(tab){
  document.querySelectorAll('.main-tab').forEach(t=>t.classList.toggle('active', t.dataset.maintab===tab));
  const retouchStrip = $('retouch-strip');
  const editStrip = $('tool-strip');
  const panels = document.querySelectorAll('.panel');
  if(tab === 'retouch'){
    retouchStrip.style.display = 'flex';
    editStrip.style.display = 'none';
    panels.forEach(p=>p.classList.remove('active'));
  } else {
    retouchStrip.style.display = 'none';
    editStrip.style.display = 'flex';
    selectTool('filters');
  }
}

function selectTool(tool){
  document.querySelectorAll('.titem').forEach(t=>t.classList.toggle('active', t.dataset.tool===tool));
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  $('panel-'+tool).classList.add('active');
}

function buildFilterRow(){
  const row = $('filter-row');
  row.innerHTML = '';
  FILTERS.forEach(f=>{
    const chip = document.createElement('div');
    chip.className = 'filter-chip' + (f.key===activeFilterKey ? ' active':'');
    chip.onclick = ()=>{ activeFilterKey = f.key; buildFilterRow(); drawCanvas(); };
    chip.innerHTML = `<div class="filter-thumb" style="filter:${f.css || 'none'};background:linear-gradient(135deg,#666,#999);"></div><span>${f.name}</span>`;
    row.appendChild(chip);
  });
}

function applyAdjust(){
  $('val-brightness').textContent = $('rng-brightness').value;
  $('val-contrast').textContent = $('rng-contrast').value;
  $('val-saturate').textContent = $('rng-saturate').value;
  $('val-warmth').textContent = $('rng-warmth').value;
  $('val-blur').textContent = $('rng-blur').value;
  drawCanvas();
}

function rotateImage(deg){
  if(!baseImage){ toast('Upload a photo first'); return; }
  rotation = (rotation + deg + 360) % 360;
  drawCanvas();
}
function flipImage(){
  if(!baseImage){ toast('Upload a photo first'); return; }
  flipped = !flipped;
  drawCanvas();
}

function buildCropRow(){
  const row = $('crop-row');
  row.innerHTML = '';
  CROPS.forEach(c=>{
    const chip = document.createElement('div');
    chip.className = 'crop-chip' + (c.key===activeCropRatio ? ' active':'');
    chip.textContent = c.name;
    chip.onclick = ()=>{ activeCropRatio = c.key; buildCropRow(); };
    row.appendChild(chip);
  });
}

function applyCrop(){
  if(!baseImage){ toast('Upload a photo first'); return; }
  if(activeCropRatio === 'free'){ toast('Free crop keeps original framing'); return; }
  const [rw, rh] = activeCropRatio.split(':').map(Number);
  const targetRatio = rw/rh;

  const w = baseImage.width, h = baseImage.height;
  let cw = w, ch = h;
  if(w/h > targetRatio){ cw = h * targetRatio; } else { ch = w / targetRatio; }
  const sx = (w - cw)/2, sy = (h - ch)/2;

  const off = document.createElement('canvas');
  off.width = cw; off.height = ch;
  off.getContext('2d').drawImage(baseImage, sx, sy, cw, ch, 0, 0, cw, ch);

  const newImg = new Image();
  newImg.onload = ()=>{
    baseImage = newImg;
    rotation = 0; flipped = false;
    drawCanvas();
    toast('Cropped to ' + activeCropRatio);
  };
  newImg.src = off.toDataURL();
}

function addTextOverlay(){
  if(!baseImage){ toast('Upload a photo first'); return; }
  const txt = prompt('Enter text:');
  if(!txt) return;
  const cv = $('editCanvas');
  textOverlays.push({
    text: txt,
    x: cv.width*0.1,
    y: cv.height*0.1 + textOverlays.length*40,
    size: Math.max(24, Math.round(cv.width*0.06)),
    color: '#ffffff'
  });
  drawCanvas();
}
function clearTextOverlays(){
  textOverlays = [];
  drawCanvas();
  toast('Text cleared');
}

function saveImage(){
  if(!baseImage){ toast('Nothing to save yet'); return; }
  const cv = $('editCanvas');
  const link = document.createElement('a');
  link.download = 'WZ-lab-edit.png';
  link.href = cv.toDataURL('image/png');
  link.click();
  toast('Image saved to downloads');
}

window.addEventListener('resize', ()=>{ if(baseImage) fitCanvasToWrap(); });

/* ---------------- Boot ---------------- */
buildToolGrid();
setTimeout(()=>{ showScreen('screen-login'); }, 1400);