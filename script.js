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
  {ico:'sparkle', name:'Quality\nEnhancer'},
  {ico:'wrench', name:'AI Repair'},
  {ico:'image', name:'Super\nResolution'},
  {ico:'grid', name:'Collage'},
  {ico:'smile', name:'Face'},
  {ico:'body', name:'Body'},
  {ico:'brush', name:'Makeup'},
  {ico:'bot', name:'AI Retouch'},
  {ico:'camera', name:'Live Photo'},
  {ico:'pencil', name:'Edit Live'},
  {ico:'flame', name:'Trending'},
  {ico:'dots', name:'All Tools'},
];

/* ---------------- Icon set (inline SVG, stroke-based) ---------------- */
const ICONS = {
  search: '<circle cx="10" cy="10" r="6"/><line x1="20" y1="20" x2="14.5" y2="14.5"/>',
  user: '<circle cx="12" cy="8" r="3.2"/><path d="M5 20c0-4 3-6 7-6s7 2 7 6"/>',
  home: '<path d="M4 11L12 4l8 7"/><path d="M6 10v9h12v-9"/>',
  folder: '<path d="M3 7h6l2 2h10v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7z"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
  wrench: '<path d="M14 3a4 4 0 00-5 5L3 14l3 3 6-6a4 4 0 005-5l-3 3-2-2z"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  smile: '<circle cx="12" cy="12" r="9"/><path d="M8 14c1.2 1.6 2.6 2.4 4 2.4s2.8-.8 4-2.4"/><circle cx="9" cy="10" r=".7" fill="currentColor" stroke="none"/><circle cx="15" cy="10" r=".7" fill="currentColor" stroke="none"/>',
  body: '<circle cx="12" cy="5" r="2.5"/><path d="M7 21l1-8-3-2 1-4h12l1 4-3 2 1 8"/>',
  brush: '<path d="M15 3l6 6-9 9-6-6z"/><path d="M6 15L3 21l6-3"/>',
  bot: '<rect x="5" y="8" width="14" height="10" rx="2"/><path d="M12 4v4"/><circle cx="9" cy="13" r="1" fill="currentColor" stroke="none"/><circle cx="15" cy="13" r="1" fill="currentColor" stroke="none"/>',
  camera: '<path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.2"/>',
  pencil: '<path d="M4 20l1-4 12-12 3 3-12 12z"/>',
  flame: '<path d="M12 3s-5 5-5 10a5 5 0 0010 0c0-2-1-3-2-4 .3 1.3-.5 2-1.5 2 .8-2 .5-5-1.5-8z"/>',
  dots: '<circle cx="6" cy="6" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="6" r="1.3" fill="currentColor" stroke="none"/><circle cx="18" cy="6" r="1.3" fill="currentColor" stroke="none"/><circle cx="6" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="6" cy="18" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="18" r="1.3" fill="currentColor" stroke="none"/><circle cx="18" cy="18" r="1.3" fill="currentColor" stroke="none"/>',
  diamond: '<path d="M3 9l4-6h10l4 6-9 12z"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 .5c0 1.7-2.5 1.7-2.5 3.5"/><circle cx="12" cy="17" r=".7" fill="currentColor" stroke="none"/>',
  logout: '<path d="M9 4H5v16h4"/><path d="M15 8l4 4-4 4"/><path d="M19 12H9"/>',
  'chevron-left': '<path d="M15 4l-8 8 8 8"/>',
  undo: '<path d="M7 8H4V5"/><path d="M4 8c2-3 5-4 8-4a8 8 0 110 16H8"/>',
  redo: '<path d="M17 8h3V5"/><path d="M20 8c-2-3-5-4-8-4a8 8 0 100 16h4"/>',
  play: '<path d="M6 4l14 8-14 8z"/>',
  plus: '<path d="M12 4v16M4 12h16"/>',
  close: '<path d="M5 5l14 14M19 5L5 19"/>',
  palette: '<path d="M12 3a9 9 0 000 18c1.5 0 2-1 1-2s0-2 1-2h2a4 4 0 004-4c0-5-4-10-8-10z"/><circle cx="8" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="8" cy="15" r="1" fill="currentColor" stroke="none"/><circle cx="13" cy="17" r="1" fill="currentColor" stroke="none"/>',
  sliders: '<path d="M4 6h9M17 6h3M4 12h3M9 12h11M4 18h13M19 18h1"/><circle cx="12" cy="6" r="1.6" fill="currentColor" stroke="none"/><circle cx="7" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="17" cy="18" r="1.6" fill="currentColor" stroke="none"/>',
  crop: '<path d="M6 2v14a2 2 0 002 2h14"/><path d="M18 22V8a2 2 0 00-2-2H2"/>',
  rotate: '<path d="M4 10a8 8 0 0113-6"/><path d="M20 14a8 8 0 01-13 6"/><path d="M17 2v5h-5"/><path d="M7 22v-5h5"/>',
  text: '<path d="M4 6h16"/><path d="M12 6v14"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none"/><path d="M21 15l-5-5-4 4-3-3-5 5"/>',
  film: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M7 5v14M17 5v14"/><path d="M3 9h4M3 15h4M17 9h4M17 15h4"/>',
  tag: '<path d="M11 2h6l5 5v6l-9 9-9-9V9z"/><circle cx="15" cy="7" r="1.3" fill="currentColor" stroke="none"/>',
  headphones: '<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="2" y="14" width="5" height="6" rx="1.5"/><rect x="17" y="14" width="5" height="6" rx="1.5"/>',
  droplet: '<path d="M12 2s7 8 7 13a7 7 0 01-14 0c0-5 7-13 7-13z"/>',
  eye: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="2.5"/>',
  mountain: '<path d="M3 19l6-10 4 6 3-4 5 8z"/>',
  wand: '<path d="M4 20L18 6"/><path d="M15 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/><path d="M19 13l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4L17 15l1.4-.6z"/>',
  teeth: '<path d="M4 10c2-4 14-4 16 0-1 6-2 10-4 10-1 0-1-3-2-3s-1 3-2 3-1-3-2-3-1 3-2 3c-2 0-3-4-4-10z"/>'
};

function icon(name, extraClass){
  const inner = ICONS[name] || ICONS['dots'];
  return `<svg class="svg-ico${extraClass ? ' '+extraClass : ''}" viewBox="0 0 24 24">${inner}</svg>`;
}

function paintIcons(){
  document.querySelectorAll('[data-icon]').forEach(el=>{
    el.innerHTML = icon(el.dataset.icon);
  });
}

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
    el.innerHTML = `<div class="tool-ico">${icon(t.ico)}</div><div class="tool-name">${t.name.replace('\n','<br>')}</div>`;
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
      el.innerHTML = `<div class="tool-ico" style="width:100%;height:90px;border-radius:14px;">${icon('film')}</div><div class="tool-name">${name}</div>`;
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
paintIcons();
buildToolGrid();
setTimeout(()=>{ showScreen('screen-login'); }, 1400);