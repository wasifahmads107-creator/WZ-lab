/* ============ DATA ============ */
const IMG = {
  mountain:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=60",
  travel:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=60",
  city:"https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=60",
  mountains2:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=60",
  ocean:"https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&q=60",
  portrait:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=60",
};

const projects = [
  {name:"Nature Shorts", meta:"00:15 • 1080p", img:IMG.mountain, updated:"2 mins ago"},
  {name:"Travel Vlog", meta:"01:25 • 4K", img:IMG.travel, updated:"1 hour ago"},
  {name:"City Lights", meta:"00:45 • 2K", img:IMG.city, updated:"yesterday"},
  {name:"Mountains", meta:"02:10 • 1080p", img:IMG.mountains2, updated:"2 days ago"},
  {name:"Ocean Waves", meta:"00:30 • 4K", img:IMG.ocean, updated:"3 days ago"},
];

const tools = [
  {name:"AI Enhance", icon:icoSparkle},
  {name:"AI Repair", icon:icoWrench},
  {name:"AI Caption", icon:icoCaption},
  {name:"Auto Cut", icon:icoScissors},
  {name:"Remove BG", icon:icoLayers},
  {name:"Retouch", icon:icoWand},
  {name:"Auto Reframe", icon:icoFrame},
  {name:"Scene Detect", icon:icoScene},
  {name:"Camera", icon:icoCamera},
  {name:"AI Effects", icon:icoStar},
  {name:"Text to Video", icon:icoVideo},
  {name:"More", icon:icoDots},
];

const aiTools = [
  {name:"AI Enhance", sub:"Improve video quality automatically", icon:icoSparkle},
  {name:"AI Repair", sub:"Fix blurry or damaged footage", icon:icoWrench},
  {name:"AI Remove Background", sub:"Remove background from video", icon:icoLayers},
  {name:"AI Reframe", sub:"Auto reframe for different ratios", icon:icoFrame},
  {name:"Scene Detection", sub:"Detect and cut scenes automatically", icon:icoScene},
  {name:"AI Colorize", sub:"Add color to black & white footage", icon:icoPalette},
  {name:"AI Motion", sub:"Smooth slow motion generation", icon:icoMotion},
];

const musicList = [
  {name:"Inspiration", len:"02:35"},
  {name:"Cinematic Adventure", len:"03:12"},
  {name:"Upbeat Energy", len:"02:20"},
  {name:"Dreamy Piano", len:"02:45"},
  {name:"Ambient Light", len:"03:05"},
];

/* ============ ICON LIBRARY (inline svg strings) ============ */
function icoSparkle(){return `<svg viewBox="0 0 24 24"><path d="M12 2L14 9L21 11L14 13L12 20L10 13L3 11L10 9L12 2Z" fill="currentColor"/></svg>`}
function icoWrench(){return `<svg viewBox="0 0 24 24"><path d="M21 7a4 4 0 0 1-5.3 3.8L8 18.5A2 2 0 1 1 5.5 16l7.7-7.7A4 4 0 0 1 17 3l-2.5 2.5 1 1L18 4a4 4 0 0 1 3 3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`}
function icoCaption(){return `<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 10h4M7 14h7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`}
function icoScissors(){return `<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="6" cy="18" r="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 7.5L20 18M8 16.5L20 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`}
function icoLayers(){return `<svg viewBox="0 0 24 24"><path d="M12 3L21 8L12 13L3 8L12 3Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M3 13L12 18L21 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`}
function icoWand(){return `<svg viewBox="0 0 24 24"><path d="M4 20L15 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M15 4v3M20 9h-3M18.5 5.5l-2 2M19 15l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" fill="currentColor" stroke="currentColor" stroke-width="1"/></svg>`}
function icoFrame(){return `<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 9h16M9 4v16" stroke="currentColor" stroke-width="1.2" opacity="0.5"/></svg>`}
function icoScene(){return `<svg viewBox="0 0 24 24"><rect x="3" y="5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="13" y="11" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`}
function icoCamera(){return `<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="13.5" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 7l1.5-2.5h5L16 7" stroke="currentColor" stroke-width="1.6" fill="none"/></svg>`}
function icoStar(){return `<svg viewBox="0 0 24 24"><path d="M12 3l2.6 6.2L21 10l-5 4.4L17.5 21 12 17.5 6.5 21 8 14.4 3 10l6.4-0.8L12 3Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`}
function icoVideo(){return `<svg viewBox="0 0 24 24"><rect x="3" y="6" width="13" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M16 10l5-3v10l-5-3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linejoin="round"/></svg>`}
function icoDots(){return `<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="19" cy="12" r="1.8" fill="currentColor"/></svg>`}
function icoPalette(){return `<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 1.4-3.4 2 2 0 0 1 1.4-3.4H18a3 3 0 0 0 3-3 9 9 0 0 0-9-8Z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="7.5" cy="10.5" r="1.2" fill="currentColor"/><circle cx="11" cy="7" r="1.2" fill="currentColor"/><circle cx="15.5" cy="8" r="1.2" fill="currentColor"/></svg>`}
function icoMotion(){return `<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 1 8 8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M4 12l3-3M4 12l3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/></svg>`}
function icoBack(){return `<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
function icoClose(){return `<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`}
function icoTrim(){return `<svg viewBox="0 0 24 24"><path d="M4 12h4M16 12h4M8 6v12M16 6v12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`}
function icoSplit(){return `<svg viewBox="0 0 24 24"><path d="M12 3v6M12 15v6M4 12h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`}
function icoSpeed(){return `<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 13l3-3M12 5V3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`}
function icoVolume(){return `<svg viewBox="0 0 24 24"><path d="M4 10v4h4l5 4V6l-5 4H4Z" fill="currentColor"/><path d="M16.5 9a4 4 0 0 1 0 6" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`}
function icoFilters(){return `<svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`}
function icoDelete(){return `<svg viewBox="0 0 24 24"><path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0l1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" fill="none"/></svg>`}
function icoAudio(){return `<svg viewBox="0 0 24 24"><path d="M9 18V5l11-2v13" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="16" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`}
function icoText(){return `<svg viewBox="0 0 24 24"><path d="M5 5h14M12 5v14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`}
function icoSticker(){return `<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 1 8 8H8l-4-4Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="9" cy="11" r="1" fill="currentColor"/><circle cx="14" cy="11" r="1" fill="currentColor"/></svg>`}
function icoOverlay(){return `<svg viewBox="0 0 24 24"><rect x="4" y="4" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="9" y="9" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6" opacity=".6"/></svg>`}
function icoEffect(){return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" fill="currentColor"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`}
function icoNote(){return `<svg viewBox="0 0 24 24"><circle cx="7" cy="17" r="2.4" fill="currentColor"/><path d="M9.4 17V6l9-1.5v9" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
function icoCloud(){return `<svg viewBox="0 0 24 24"><path d="M7 18a4 4 0 0 1-1-7.9A5 5 0 0 1 15.5 8 4.5 4.5 0 0 1 17 18H7Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`}
function icoSearch(){return `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M20 20l-4.5-4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`}
function icoExpand(){return `<svg viewBox="0 0 24 24"><path d="M9 3H3v6M15 3h6v6M21 15v6h-6M3 15v6h6" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
function icoPlay(){return `<svg viewBox="0 0 24 24"><path d="M6 4l14 8-14 8V4Z" fill="currentColor"/></svg>`}

/* ============ STATE ============ */
let state = {
  panel:'home',
  resolution:'8K',
  frameRate:'30',
  quality:50,
  filterCat:'Featured',
  filterActive:'Vivid',
  filterIntensity:78,
  effectCat:'Trending',
  font:'Poppins',
  textColor:'#a855f7',
  musicTab:'Music',
  watermark:true,
  adjust:{Brightness:10,Contrast:20,Saturation:15,Vibrance:25,Highlights:-10,Shadows:20,Temperature:5,Tint:0,Sharpen:15,Vignette:-5},
};

const topbar = document.getElementById('topbar');
const screen = document.getElementById('screen');

function go(panel){ state.panel = panel; render(); screen.scrollTop = 0; }

/* ============ TOPBAR RENDER ============ */
function renderTopbar(){
  const simpleBack = (title, right='')=>`
    <div class="panel-sheet-header">
      <div class="back-x" onclick="go('projectedit')">${icoBack()}</div>
      <div class="panel-title">${title}</div>
      <div>${right}</div>
    </div>`;

  switch(state.panel){
    case 'home':
      topbar.innerHTML = ``; break;
    case 'projects':
      topbar.innerHTML = `<div class="header-row"><div class="header-title">My Projects</div><div class="iconbtn" onclick="go('home')">${icoExpand()}</div></div>`;
      break;
    case 'projectedit':
      topbar.innerHTML = `
        <div class="header-row">
          <div class="back-x" onclick="go('home')">${icoBack()}</div>
          <div class="panel-title">Project Edit</div>
          <button class="pill-btn" onclick="go('exportoptions')">1080P</button>
        </div>`;
      break;
    case 'resolution':
      topbar.innerHTML = simpleBack('Resolution', `<span class="text-btn" onclick="go('projectedit')">Save</span>`);
      break;
    case 'aitools':
      topbar.innerHTML = `
        <div class="panel-sheet-header">
          <div class="back-x" onclick="go('projectedit')">${icoBack()}</div>
          <div class="panel-title">AI Tools</div>
          <span class="pro-tag">Pro</span>
        </div>`;
      break;
    case 'filters':
      topbar.innerHTML = simpleBack('Filters', `<span class="text-btn" onclick="go('projectedit')">Apply</span>`);
      break;
    case 'adjust':
      topbar.innerHTML = `
        <div class="panel-sheet-header">
          <div class="back-x" onclick="go('projectedit')">${icoBack()}</div>
          <div class="panel-title">Adjust</div>
          <span class="text-btn" onclick="resetAdjust()">Reset</span>
        </div>`;
      break;
    case 'effects':
      topbar.innerHTML = simpleBack('Effects', `<span class="text-btn" onclick="go('projectedit')">Apply</span>`);
      break;
    case 'textsticker':
      topbar.innerHTML = simpleBack('Text & Sticker', `<span class="text-btn" onclick="go('projectedit')">Save</span>`);
      break;
    case 'audio':
      topbar.innerHTML = simpleBack('Audio', `<span class="text-btn">Add</span>`);
      break;
    case 'exportoptions':
      topbar.innerHTML = `
        <div class="panel-sheet-header">
          <div class="back-x" onclick="go('projectedit')">${icoClose()}</div>
          <div class="panel-title">Export Options</div>
          <button class="pill-btn">${state.resolution.replace('K','K').replace('Ultra HD+','8K')==state.resolution?state.resolution:state.resolution}</button>
        </div>`;
      break;
    case 'templates':
      topbar.innerHTML = `<div class="header-row"><div class="header-title">Templates</div></div>`;
      break;
    case 'profile':
      topbar.innerHTML = `<div class="header-row"><div class="header-title">Profile</div></div>`;
      break;
    case 'newproject':
      topbar.innerHTML = `<div class="header-row"><div class="header-title">New Project</div></div>`;
      break;
    default: topbar.innerHTML='';
  }
}

/* ============ PANEL RENDERERS ============ */
function renderHome(){
  screen.innerHTML = `
    <div class="brand-row">
      <div class="brand-logo">W</div>
      <div>
        <div class="brand-name">WZ-lab <span class="pro-tag">Pro</span></div>
        <div class="brand-sub">Create. Edit. Inspire.</div>
      </div>
    </div>

    <div class="hero-card">
      <div>
        <div class="hero-title">AI Power</div>
        <div class="hero-desc">Unleash the power of AI to transform your videos instantly.</div>
        <button class="hero-btn" onclick="go('aitools')">Try Now</button>
      </div>
      <div class="hero-emoji">🐕</div>
    </div>

    <button class="new-project-btn" onclick="go('newproject')">
      <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>
      New Project
    </button>

    <div class="tool-grid">
      ${tools.map(t=>`
        <div class="tool-item" onclick="handleTool('${t.name}')">
          <div class="tool-icon">${t.icon()}</div>
          <span>${t.name}</span>
        </div>`).join('')}
    </div>

    <div class="section-label">Recent Projects <span class="see-all" onclick="go('projects')">See All</span></div>
    ${projects.slice(0,1).map(p=>projectCard(p)).join('')}
  `;
}

function projectCard(p){
  return `
    <div class="project-card" onclick="go('projectedit')">
      <div class="project-thumb" style="background-image:url('${p.img}')"></div>
      <div class="project-info">
        <div class="project-name">${p.name}</div>
        <div class="project-meta">${p.meta}</div>
      </div>
      <div class="project-dots">⋮</div>
    </div>`;
}

function handleTool(name){
  if(name==='More' || ['AI Enhance','AI Repair','AI Effects'].includes(name)){ go('aitools'); return; }
  go('projectedit');
}

function renderProjects(){
  screen.innerHTML = `
    <div class="chip-row" style="margin-bottom:14px;">
      <div class="chip active" style="flex:none; padding:8px 18px;">Projects</div>
      <div class="chip" style="flex:none; padding:8px 18px;">Cloud</div>
    </div>
    ${projects.map(p=>`
      <div class="project-card" onclick="go('projectedit')">
        <div class="project-thumb" style="background-image:url('${p.img}')"></div>
        <div class="project-info">
          <div class="project-name">${p.name}</div>
          <div class="project-meta">${p.meta} • Updated ${p.updated}</div>
        </div>
        <div class="project-dots">⋮</div>
      </div>`).join('')}
  `;
}

function renderProjectEdit(){
  screen.innerHTML = `
    <div class="video-preview" style="background-image:url('${IMG.mountain}')">
      <div class="play-overlay"><div class="play-circle" onclick="togglePlay(this)">${icoPlay()}</div></div>
      <div class="timecode">00:00 / 00:15</div>
      <div class="expand-icon">${icoExpand()}</div>
    </div>

    <div class="mini-timeline">
      ${[IMG.mountain,IMG.travel,IMG.city,IMG.mountains2,IMG.ocean].map(i=>`<div style="background-image:url('${i}')"></div>`).join('')}
    </div>
    <div class="timeline-ruler"><span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span></div>

    <div class="toolbar-row">
      ${toolbarItem(icoTrim(),'Trim')}
      ${toolbarItem(icoSplit(),'Split')}
      ${toolbarItem(icoSpeed(),'Speed')}
      ${toolbarItem(icoVolume(),'Volume')}
      ${toolbarItem(icoFilters(),'Filters','filters')}
      ${toolbarItem(icoDelete(),'Delete')}
    </div>

    <div class="section-label" style="margin-top:4px;">Quick Actions</div>
    <div class="list-item" onclick="go('resolution')">
      <div class="list-icon">${icoExpand()}</div>
      <div class="list-text"><div class="list-title">Resolution</div><div class="list-sub">${state.resolution} • ${state.frameRate} FPS</div></div>
      <div class="list-arrow">›</div>
    </div>
    <div class="list-item" onclick="go('aitools')">
      <div class="list-icon">${icoSparkle()}</div>
      <div class="list-text"><div class="list-title">AI Tools</div><div class="list-sub">Enhance, repair, reframe & more</div></div>
      <div class="list-arrow">›</div>
    </div>
    <div class="list-item" onclick="go('adjust')">
      <div class="list-icon">${icoEffect()}</div>
      <div class="list-text"><div class="list-title">Adjust</div><div class="list-sub">Brightness, contrast, color</div></div>
      <div class="list-arrow">›</div>
    </div>
    <div class="list-item" onclick="go('textsticker')">
      <div class="list-icon">${icoText()}</div>
      <div class="list-text"><div class="list-title">Text & Sticker</div><div class="list-sub">Add captions and stickers</div></div>
      <div class="list-arrow">›</div>
    </div>
    <div class="list-item" onclick="go('audio')">
      <div class="list-icon">${icoAudio()}</div>
      <div class="list-text"><div class="list-title">Audio</div><div class="list-sub">Music, sound effects</div></div>
      <div class="list-arrow">›</div>
    </div>
    <div class="list-item" onclick="go('exportoptions')">
      <div class="list-icon">${icoCloud()}</div>
      <div class="list-text"><div class="list-title">Export</div><div class="list-sub">${state.resolution} • ${state.frameRate} FPS</div></div>
      <div class="list-arrow">›</div>
    </div>
  `;
}
function toolbarItem(icon,label,panel){
  return `<div class="toolbar-item" onclick="${panel? `go('${panel}')` : `flash('${label}')`}">${icon}<span>${label}</span></div>`;
}
function togglePlay(el){
  el.innerHTML = el.innerHTML.includes('M6 4l14')? `<svg viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor"/><rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor"/></svg>` : icoPlay();
}
function flash(label){ /* placeholder micro-interaction */ }

function renderResolution(){
  const res = ['1080P','2K','4K','8K'];
  const resLabel = {'1080P':'Full HD','2K':'Quad HD','4K':'Ultra HD','8K':'Ultra HD+'};
  const fps = ['24','30','50','60'];
  screen.innerHTML = `
    <div class="section-label" style="margin-top:0;">Resolution</div>
    <div class="chip-row">
      ${res.map(r=>`<div class="chip ${state.resolution===r?'active':''}" onclick="setRes('${r}')">${r}<small>${resLabel[r]}</small></div>`).join('')}
    </div>

    <div class="section-label">Frame Rate</div>
    <div class="chip-row">
      ${fps.map(f=>`<div class="chip ${state.frameRate===f?'active':''}" onclick="setFps('${f}')">${f}<small>FPS</small></div>`).join('')}
    </div>
    <div class="pill-btn" style="width:100%; text-align:center; margin-bottom:18px;" onclick="alert('Custom frame rate')">Custom</div>

    <div class="slider-block">
      <div class="slider-label-row"><span>Quality (Bitrate)</span><span class="val">${state.quality} Mbps</span></div>
      <input type="range" min="5" max="100" value="${state.quality}" oninput="state.quality=this.value; renderResolution();">
      <div class="slider-ends"><span>Low</span><span>Recommended</span><span>High</span></div>
    </div>

    <div class="est-size">Estimated File Size: <b>${(state.quality*2.05).toFixed(1)} MB</b></div>

    <button class="new-project-btn" onclick="go('projectedit')">Export</button>
  `;
}
function setRes(r){ state.resolution=r; renderResolution(); }
function setFps(f){ state.frameRate=f; renderResolution(); }

function renderAiTools(){
  screen.innerHTML = aiTools.map(t=>`
    <div class="list-item" onclick="runAiTool('${t.name}')">
      <div class="list-icon">${t.icon()}</div>
      <div class="list-text"><div class="list-title">${t.name}</div><div class="list-sub">${t.sub}</div></div>
      <div class="list-arrow">›</div>
    </div>`).join('');
}
function runAiTool(name){ go('projectedit'); }

function renderFilters(){
  const cats = ['Featured','Cinematic','Nature','Portrait','Moody'];
  const filters = [
    {n:'Original', s:''},
    {n:'Vivid', s:'saturate(1.6) contrast(1.1)'},
    {n:'Warm', s:'sepia(.3) saturate(1.3)'},
    {n:'Cool', s:'hue-rotate(20deg) saturate(1.2)'},
    {n:'Dramatic', s:'contrast(1.4) brightness(.9)'},
    {n:'B&W', s:'grayscale(1)'},
  ];
  screen.innerHTML = `
    <div class="video-preview" style="background-image:url('${IMG.mountain}'); filter:${filters.find(f=>f.n===state.filterActive)?.s||''}; margin-bottom:14px;"></div>
    <div class="filter-tabs">
      ${cats.map(c=>`<span class="${state.filterCat===c?'active':''}" onclick="state.filterCat='${c}'; renderFilters();">${c}</span>`).join('')}
    </div>
    <div class="filter-grid">
      ${filters.map(f=>`
        <div class="filter-thumb ${state.filterActive===f.n?'active':''}" style="background-image:url('${IMG.mountain}'); filter:${f.s}" onclick="state.filterActive='${f.n}'; renderFilters();">
          <span>${f.n}</span>
        </div>`).join('')}
    </div>
    <div class="slider-block">
      <div class="slider-label-row"><span>Intensity</span><span class="val">${state.filterIntensity}</span></div>
      <input type="range" min="0" max="100" value="${state.filterIntensity}" oninput="state.filterIntensity=this.value; document.querySelector('.slider-label-row .val').textContent=this.value;">
    </div>
  `;
}

function renderAdjust(){
  const keys = Object.keys(state.adjust);
  const icons = {Brightness:icoSun(),Contrast:icoContrast(),Saturation:icoDrop(),Vibrance:icoDrop(),Highlights:icoSun(),Shadows:icoMoon(),Temperature:icoThermo(),Tint:icoDrop(),Sharpen:icoTriangle(),Vignette:icoVignette()};
  screen.innerHTML = `
    ${keys.map(k=>`
      <div class="slider-block">
        <div class="slider-label-row">
          <span style="display:flex; align-items:center; gap:8px;"><span style="width:16px; height:16px; color:var(--purple); display:inline-flex;">${icons[k]||''}</span>${k}</span>
          <span class="val">${state.adjust[k]}</span>
        </div>
        <input type="range" min="-50" max="50" value="${state.adjust[k]}" oninput="state.adjust['${k}']=this.value; this.closest('.slider-block').querySelector('.val').textContent=this.value;">
      </div>`).join('')}
    <button class="new-project-btn" onclick="go('projectedit')">Apply</button>
  `;
}
function resetAdjust(){ for(const k in state.adjust) state.adjust[k]=0; renderAdjust(); }
function icoSun(){return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`}
function icoContrast(){return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor"/></svg>`}
function icoDrop(){return `<svg viewBox="0 0 24 24"><path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`}
function icoMoon(){return `<svg viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" fill="currentColor"/></svg>`}
function icoThermo(){return `<svg viewBox="0 0 24 24"><path d="M12 3a2 2 0 0 1 2 2v9.5a4 4 0 1 1-4 0V5a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`}
function icoTriangle(){return `<svg viewBox="0 0 24 24"><path d="M12 4L21 20H3L12 4Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`}
function icoVignette(){return `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" fill="currentColor" opacity=".5"/></svg>`}

function renderEffects(){
  const cats = ['Trending','Basic','Glitch','Light','Blur','Distortion'];
  const fx = ['Shake','Glitch','Light Leak','VHS','Zoom Blur','Chromatic','RGB Split','Edge Glow','Noise','Film Grain','Ripple','Mirror'];
  screen.innerHTML = `
    <div class="effect-cat-row">
      ${cats.map(c=>`<span class="${state.effectCat===c?'active':''}" onclick="state.effectCat='${c}'; renderEffects();">${c}</span>`).join('')}
    </div>
    <div class="effect-grid">
      ${fx.map((f,i)=>`
        <div class="effect-thumb" style="background-image:url('${[IMG.mountain,IMG.travel,IMG.city,IMG.ocean][i%4]}')" onclick="go('projectedit')">
          <span>${f}</span>
        </div>`).join('')}
    </div>
  `;
}

function renderTextSticker(){
  const fonts = ['Poppins','Montserrat','Bellas Nue','Raleway'];
  const colors = ['#ff3b3b','#ff8a00','#ffd400','#22c55e','#3b82f6','#8b5cf6','#ec4899','#ffffff'];
  screen.innerHTML = `
    <div class="video-preview" style="background-image:url('${IMG.mountain}'); align-items:center; justify-content:center; display:flex; flex-direction:column; text-align:center;">
      <div style="font-size:22px; font-weight:800; color:#fff; text-shadow:0 3px 10px rgba(0,0,0,.5);">Explore</div>
      <div style="font-size:26px; font-style:italic; font-weight:700; color:${state.textColor}; text-shadow:0 3px 10px rgba(0,0,0,.5);">The Nature</div>
    </div>

    <div class="font-row">
      ${fonts.map(f=>`<div class="font-chip ${state.font===f?'active':''}" onclick="state.font='${f}'; renderTextSticker();">${f}</div>`).join('')}
    </div>

    <div class="style-icon-row">
      <button><b>B</b></button><button><i>I</i></button><button>≡</button><button>≣</button><button>▤</button>
    </div>

    <div class="color-row">
      ${colors.map(c=>`<div class="color-dot ${state.textColor===c?'active':''}" style="background:${c}" onclick="state.textColor='${c}'; renderTextSticker();"></div>`).join('')}
    </div>

    <div class="section-label">Stickers</div>
    <div class="effect-grid">
      ${[IMG.portrait,IMG.mountain,IMG.travel,IMG.city].map(i=>`<div class="effect-thumb" style="background-image:url('${i}')"></div>`).join('')}
    </div>
  `;
}

function renderAudio(){
  const tabs = ['Music','Sound Effects','My Music'];
  screen.innerHTML = `
    <div class="tab-row">
      ${tabs.map(t=>`<span class="${state.musicTab===t?'active':''}" onclick="state.musicTab='${t}'; renderAudio();">${t}</span>`).join('')}
    </div>
    <div class="search-bar">${icoSearch()}<input placeholder="Search music" /></div>
    <div class="section-label" style="margin-top:0;">Trending</div>
    ${musicList.map(m=>`
      <div class="music-item" onclick="go('projectedit')">
        <div class="music-cover">${icoNote()}</div>
        <div class="music-info"><div class="music-name">${m.name}</div><div class="music-len">${m.len}</div></div>
        <div class="wave">≋</div>
      </div>`).join('')}
  `;
}

function renderExportOptions(){
  const res = ['1080P','2K','4K','8K'];
  screen.innerHTML = `
    <div class="export-preview" style="background-image:url('${IMG.mountain}')"></div>
    <div class="section-label" style="margin-top:0;">Resolution</div>
    <div class="chip-row">
      ${res.map(r=>`<div class="chip ${state.resolution===r?'active':''}" onclick="setRes('${r}'); renderExportOptions();">${r}</div>`).join('')}
    </div>
    <div class="section-label">Frame Rate</div>
    <div class="pill-btn" style="width:100%; text-align:center; margin-bottom:16px;">${state.frameRate} FPS</div>
    <div class="section-label">Quality</div>
    <div class="pill-btn" style="width:100%; text-align:center; margin-bottom:16px;">High</div>

    <div class="toggle-row">
      <span>Watermark</span>
      <div class="toggle ${state.watermark?'on':''}" onclick="state.watermark=!state.watermark; renderExportOptions();"></div>
    </div>

    <button class="new-project-btn" onclick="exportVideo()">Export</button>
  `;
}
function exportVideo(){
  alert('Exporting at '+state.resolution+' • '+state.frameRate+' FPS...');
}

function renderTemplates(){
  screen.innerHTML = `
    <div class="effect-grid" style="grid-template-columns:repeat(2,1fr);">
      ${[IMG.mountain,IMG.travel,IMG.city,IMG.ocean,IMG.mountains2,IMG.portrait].map(i=>`
        <div class="effect-thumb" style="aspect-ratio:9/14; background-image:url('${i}')" onclick="go('projectedit')"></div>`).join('')}
    </div>
  `;
}

function renderProfile(){
  screen.innerHTML = `
    <div style="display:flex; flex-direction:column; align-items:center; padding:24px 0;">
      <div class="brand-logo" style="width:76px;height:76px;border-radius:50%;font-size:28px;margin-bottom:12px;">W</div>
      <div style="font-size:17px; font-weight:800;">Guest User</div>
      <div style="font-size:12px; color:var(--text-2); margin-bottom:14px;">guest@wzlab.app</div>
      <button class="grad-btn">Upgrade to Pro</button>
    </div>
    <div class="list-item"><div class="list-icon">${icoCloud()}</div><div class="list-text"><div class="list-title">Cloud Sync</div><div class="list-sub">Backup & Restore</div></div><div class="list-arrow">›</div></div>
    <div class="list-item"><div class="list-icon">${icoSparkle()}</div><div class="list-text"><div class="list-title">AI Powered Tools</div><div class="list-sub">Smart Editing Tools</div></div><div class="list-arrow">›</div></div>
    <div class="list-item"><div class="list-icon">${icoFrame()}</div><div class="list-text"><div class="list-title">Multi Resolution</div><div class="list-sub">Up to 8K Export</div></div><div class="list-arrow">›</div></div>
  `;
}

function renderNewProject(){
  screen.innerHTML = `
    <div class="empty-hint" style="padding-top:10px;">Choose a ratio to start your project</div>
    <div class="chip-row" style="margin-top:14px;">
      <div class="chip active">9:16<small>Reels</small></div>
      <div class="chip">16:9<small>Landscape</small></div>
      <div class="chip">1:1<small>Square</small></div>
    </div>
    <div class="section-label">From Gallery</div>
    <div class="effect-grid" style="grid-template-columns:repeat(3,1fr);">
      ${[IMG.mountain,IMG.travel,IMG.city,IMG.ocean,IMG.mountains2,IMG.portrait].map(i=>`
        <div class="effect-thumb" style="background-image:url('${i}')" onclick="go('projectedit')"></div>`).join('')}
    </div>
  `;
}

/* ============ MAIN RENDER ============ */
function render(){
  renderTopbar();
  switch(state.panel){
    case 'home': renderHome(); break;
    case 'projects': renderProjects(); break;
    case 'projectedit': renderProjectEdit(); break;
    case 'resolution': renderResolution(); break;
    case 'aitools': renderAiTools(); break;
    case 'filters': renderFilters(); break;
    case 'adjust': renderAdjust(); break;
    case 'effects': renderEffects(); break;
    case 'textsticker': renderTextSticker(); break;
    case 'audio': renderAudio(); break;
    case 'exportoptions': renderExportOptions(); break;
    case 'templates': renderTemplates(); break;
    case 'profile': renderProfile(); break;
    case 'newproject': renderNewProject(); break;
    default: renderHome();
  }
  syncBottomNav();
}

function syncBottomNav(){
  const map = {home:'home', projects:'projects', projectedit:'projects', resolution:'projects', aitools:'projects',
    filters:'projects', adjust:'projects', effects:'projects', textsticker:'projects', audio:'projects',
    exportoptions:'projects', templates:'templates', profile:'profile', newproject:'newproject'};
  const active = map[state.panel] || 'home';
  document.querySelectorAll('.navbtn').forEach(b=>{
    b.classList.toggle('active', b.dataset.panel===active);
  });
}

document.querySelectorAll('.navbtn').forEach(btn=>{
  btn.addEventListener('click', ()=> go(btn.dataset.panel));
});

/* init */
render();
