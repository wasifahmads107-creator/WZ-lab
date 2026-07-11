/* ============ DATA ============ */
const IMG = {
  mountain:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=60",
  travel:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=60",
  city:"https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500&q=60",
  mountains2:"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&q=60",
  ocean:"https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&q=60",
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
  {name:"AI Enhance", icon:icoSparkle}, {name:"AI Repair", icon:icoWrench},
  {name:"AI Caption", icon:icoCaption}, {name:"Auto Cut", icon:icoScissors},
  {name:"Remove BG", icon:icoLayers}, {name:"Retouch", icon:icoWand},
  {name:"Auto Reframe", icon:icoFrame}, {name:"Scene Detect", icon:icoScene},
  {name:"Camera", icon:icoCamera}, {name:"AI Effects", icon:icoStar},
  {name:"Text to Video", icon:icoVideo}, {name:"More", icon:icoDots},
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
  {name:"Inspiration", len:"02:35"}, {name:"Cinematic Adventure", len:"03:12"},
  {name:"Upbeat Energy", len:"02:20"}, {name:"Dreamy Piano", len:"02:45"},
  {name:"Ambient Light", len:"03:05"},
];
const sfxList = [
  {name:"Whoosh Transition", len:"00:02"}, {name:"Camera Shutter", len:"00:01"},
  {name:"Pop Click", len:"00:01"}, {name:"Rain Ambience", len:"01:40"},
];
const myMusicList = [
  {name:"My Recording 1", len:"00:48"}, {name:"Studio Take 2", len:"01:12"},
];

/* ============ STATE ============ */
let state = {
  resolution:'8K', frameRate:'30', quality:50,
  filterCat:'Featured', filterActive:'Vivid', filterIntensity:78,
  effectCat:'Trending',
  font:'Poppins', textColor:'#a855f7', textStyle:{bold:false,italic:false,align:'left'},
  musicTab:'Music', nowPlaying:null,
  watermark:true, exportRes:'8K', exportFps:'30', exportQuality:'High',
  adjust:{Brightness:10,Contrast:20,Saturation:15,Vibrance:25,Highlights:-10,Shadows:20,Temperature:5,Tint:0,Sharpen:15,Vignette:-5},
  projView:'projects', playing:false, timelinePlayhead:38,
};

function $(id){return document.getElementById(id);}

function toast(msg){
  let t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div'); t.id='toast';
    t.style.cssText = `position:fixed; bottom:24px; left:50%; transform:translateX(-50%); background:var(--bg-3); border:1px solid var(--purple); color:#fff; padding:10px 18px; border-radius:12px; font-size:13px; font-weight:600; z-index:999; box-shadow:0 10px 30px rgba(0,0,0,.5); transition:opacity .3s;`;
    document.body.appendChild(t);
  }
  t.textContent = msg; t.style.opacity='1';
  clearTimeout(t._h); t._h = setTimeout(()=>{t.style.opacity='0';}, 1600);
}

/* ============ HOME CARD ============ */
function renderHome(){
  $('card-home').innerHTML = `
    <div class="corner-icons">
      <div class="iconbtn" onclick="toast('Cast / Screen link')">${icoExpand()}</div>
      <div class="iconbtn pill-btn on" style="width:auto;padding:5px 9px;display:flex;align-items:center;gap:4px;" onclick="toast('You are on Pro!')">${icoStar()} Pro</div>
    </div>
    <div class="brand-row">
      <div class="brand-logo">W</div>
      <div>
        <div class="brand-name">WZ-lab</div>
        <div class="brand-sub">Create. Edit. Inspire.</div>
      </div>
    </div>

    <div class="hero-card">
      <div>
        <div class="hero-title">AI Power</div>
        <div class="hero-desc">Unleash the power of AI to transform your videos instantly.</div>
        <button class="hero-btn" onclick="scrollToCard('card-aitools')">Try Now</button>
      </div>
      <div class="hero-emoji">🐕</div>
    </div>

    <button class="new-project-btn" onclick="toast('Starting a new project…')">${icoPlus()} New Project</button>

    <div class="tool-grid">
      ${tools.map(t=>`
        <div class="tool-item" onclick="handleTool('${t.name}')">
          <div class="tool-icon">${t.icon()}</div>
          <span>${t.name}</span>
        </div>`).join('')}
    </div>

    <div class="section-label">Recent Projects <span class="see-all" onclick="scrollToCard('card-myprojects')">See All</span></div>
    <div id="home-recent"></div>

    <div class="bottomnav-mini">
      <div class="bnav-item active"><span>${icoHome()}</span>Home</div>
      <div class="bnav-item" onclick="scrollToCard('card-myprojects')"><span>${icoProjects()}</span>Projects</div>
      <div class="bnav-item fab" onclick="toast('Starting a new project…')">${icoPlus()}</div>
      <div class="bnav-item" onclick="toast('Templates library coming right up')"><span>${icoTemplates()}</span>Templates</div>
      <div class="bnav-item" onclick="toast('Profile & settings')"><span>${icoProfile()}</span>Profile</div>
    </div>
  `;
  $('home-recent').innerHTML = projects.slice(0,1).map(p=>`
    <div class="project-card" onclick="scrollToCard('card-projectedit')">
      <div class="project-thumb" style="background-image:url('${p.img}')"></div>
      <div class="project-info"><div class="project-name">${p.name}</div><div class="project-meta">${p.meta}</div></div>
      <div class="project-dots">⋮</div>
    </div>`).join('');
}
function handleTool(name){
  if(['AI Enhance','AI Repair','AI Effects','More'].includes(name)){ scrollToCard('card-aitools'); toast(name+' opened'); return; }
  scrollToCard('card-projectedit');
}
function scrollToCard(id){
  const el = $(id);
  if(el) el.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
  el.style.boxShadow = '0 0 0 2px var(--purple), 0 20px 50px rgba(0,0,0,.45)';
  setTimeout(()=>{ el.style.boxShadow=''; }, 900);
}

/* ============ PROJECT EDIT CARD ============ */
function renderProjectEdit(){
  $('card-projectedit').innerHTML = `
    <div class="card-header">
      <div class="back-x" onclick="scrollToCard('card-home')">${icoBack()}</div>
      <div class="card-title">Project Edit</div>
      <button class="pill-btn" onclick="scrollToCard('card-exportoptions')">1080P</button>
    </div>
    <div class="video-preview" style="background-image:url('${IMG.mountain}')">
      <div class="play-overlay"><div class="play-circle" id="pe-play" onclick="togglePlay('pe-play')">${icoPlay()}</div></div>
      <div class="timecode">00:00 / 00:15</div>
      <div class="expand-icon" onclick="toast('Full screen preview')">${icoExpand()}</div>
    </div>
    <div class="mini-timeline">
      ${[IMG.mountain,IMG.travel,IMG.city,IMG.mountains2,IMG.ocean].map(i=>`<div style="background-image:url('${i}')"></div>`).join('')}
    </div>
    <div class="timeline-ruler"><span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span></div>
    <div class="toolbar-row">
      ${tbItem(icoTrim(),'Trim')}
      ${tbItem(icoSplit(),'Split')}
      ${tbItem(icoSpeed(),'Speed')}
      ${tbItem(icoVolume(),'Volume')}
      ${tbItem(icoFilters(),'Filters','card-filters')}
      ${tbItem(icoDelete(),'Delete')}
    </div>
    <div class="card-scroll">
      ${quickRow(icoExpand(),'Resolution', state.resolution+' • '+state.frameRate+' FPS','card-resolution')}
      ${quickRow(icoSparkle(),'AI Tools','Enhance, repair, reframe & more','card-aitools')}
      ${quickRow(icoEffect(),'Adjust','Brightness, contrast, color','card-adjust')}
      ${quickRow(icoText(),'Text & Sticker','Add captions and stickers','card-textsticker')}
      ${quickRow(icoAudio(),'Audio','Music, sound effects','card-audio')}
      ${quickRow(icoCloud(),'Export', state.resolution+' • '+state.frameRate+' FPS','card-exportoptions')}
    </div>
  `;
}
function tbItem(icon,label,card){
  return `<div class="toolbar-item" onclick="${card?`scrollToCard('${card}')`:`toast('${label} tool selected')`}">${icon}<span>${label}</span></div>`;
}
function quickRow(icon,title,sub,card){
  return `<div class="list-item" onclick="scrollToCard('${card}')">
    <div class="list-icon">${icon}</div>
    <div class="list-text"><div class="list-title">${title}</div><div class="list-sub">${sub}</div></div>
    <div class="list-arrow">›</div>
  </div>`;
}
function togglePlay(id){
  const el = $(id);
  state.playing = !state.playing;
  el.innerHTML = state.playing ? icoPause() : icoPlay();
}

/* ============ RESOLUTION CARD ============ */
function renderResolution(){
  const res = ['1080P','2K','4K','8K'];
  const resLabel = {'1080P':'Full HD','2K':'Quad HD','4K':'Ultra HD','8K':'Ultra HD+'};
  const fps = ['24','30','50','60'];
  $('card-resolution').innerHTML = `
    <div class="card-header">
      <div class="back-x" onclick="scrollToCard('card-projectedit')">${icoClose()}</div>
      <div class="card-title">Resolution</div>
      <span class="text-btn" onclick="toast('Resolution settings saved')">Save</span>
    </div>
    <div class="card-scroll">
      <div class="section-label" style="margin-top:0;">Resolution</div>
      <div class="chip-row">
        ${res.map(r=>`<div class="chip ${state.resolution===r?'active':''}" onclick="setRes('${r}')">${r}<small>${resLabel[r]}</small></div>`).join('')}
      </div>
      <div class="section-label">Frame Rate</div>
      <div class="chip-row">
        ${fps.map(f=>`<div class="chip ${state.frameRate===f?'active':''}" onclick="setFps('${f}')">${f}<small>FPS</small></div>`).join('')}
      </div>
      <div class="pill-btn" style="width:100%; text-align:center; margin-bottom:14px;" onclick="toast('Custom frame rate')">Custom</div>
      <div class="slider-block">
        <div class="slider-label-row"><span>Quality (Bitrate)</span><span class="val" id="res-q-val">${state.quality} Mbps</span></div>
        <input type="range" min="5" max="100" value="${state.quality}" oninput="state.quality=+this.value; $('res-q-val').textContent=this.value+' Mbps'; $('res-size-val').textContent=(this.value*2.05).toFixed(1)+' MB';">
        <div class="slider-ends"><span>Low</span><span>Recommended</span><span>High</span></div>
      </div>
      <div class="est-size">Estimated File Size: <b id="res-size-val">${(state.quality*2.05).toFixed(1)} MB</b></div>
      <button class="new-project-btn" onclick="scrollToCard('card-exportoptions')">Export</button>
    </div>
  `;
}
function setRes(r){ state.resolution=r; state.exportRes=r; renderResolution(); renderProjectEdit(); renderExportOptions(); }
function setFps(f){ state.frameRate=f; state.exportFps=f; renderResolution(); renderProjectEdit(); renderExportOptions(); }

/* ============ AI TOOLS CARD ============ */
function renderAiTools(){
  $('card-aitools').innerHTML = `
    <div class="card-header">
      <div class="back-x" onclick="scrollToCard('card-projectedit')">${icoBack()}</div>
      <div class="card-title">AI Tools</div>
      <span class="pro-tag">Pro</span>
    </div>
    <div class="card-scroll">
      ${aiTools.map(t=>`
        <div class="list-item" onclick="toast('${t.name} running…')">
          <div class="list-icon">${t.icon()}</div>
          <div class="list-text"><div class="list-title">${t.name}</div><div class="list-sub">${t.sub}</div></div>
          <div class="list-arrow">›</div>
        </div>`).join('')}
    </div>
  `;
}

/* ============ FILTERS CARD ============ */
function renderFilters(){
  const cats = ['Featured','Cinematic','Nature','Portrait','Moody'];
  const filters = [
    {n:'Original', s:''}, {n:'Vivid', s:'saturate(1.6) contrast(1.1)'},
    {n:'Warm', s:'sepia(.3) saturate(1.3)'}, {n:'Cool', s:'hue-rotate(20deg) saturate(1.2)'},
    {n:'Cinematic', s:'contrast(1.2) saturate(.9) brightness(.95)'},
    {n:'Dramatic', s:'contrast(1.4) brightness(.9)'}, {n:'B&W', s:'grayscale(1)'},
    {n:'Moody', s:'contrast(1.2) brightness(.8) saturate(.7)'}, {n:'Portrait', s:'contrast(1.05) saturate(1.1) brightness(1.05)'},
  ];
  $('card-filters').innerHTML = `
    <div class="card-header">
      <div class="back-x" onclick="scrollToCard('card-projectedit')">${icoBack()}</div>
      <div class="card-title">Filters</div>
      <span class="text-btn" onclick="toast('Filter applied: '+state.filterActive)">Apply</span>
    </div>
    <div class="card-scroll">
      <div class="video-preview" id="filt-preview" style="background-image:url('${IMG.mountain}'); filter:${filters.find(f=>f.n===state.filterActive)?.s||''}; margin-bottom:12px;"></div>
      <div class="filter-tabs">
        ${cats.map(c=>`<span class="${state.filterCat===c?'active':''}" onclick="state.filterCat='${c}'; renderFilters();">${c}</span>`).join('')}
      </div>
      <div class="filter-grid">
        ${filters.map(f=>`
          <div class="filter-thumb ${state.filterActive===f.n?'active':''}" style="background-image:url('${IMG.mountain}'); filter:${f.s}" onclick="setFilter('${f.n}')">
            <span>${f.n}</span>
          </div>`).join('')}
      </div>
      <div class="slider-block">
        <div class="slider-label-row"><span>Intensity</span><span class="val" id="filt-int-val">${state.filterIntensity}</span></div>
        <input type="range" min="0" max="100" value="${state.filterIntensity}" oninput="state.filterIntensity=this.value; $('filt-int-val').textContent=this.value;">
      </div>
    </div>
  `;
}
function setFilter(name){ state.filterActive=name; renderFilters(); }

/* ============ ADJUST CARD ============ */
function renderAdjust(){
  const icons = {Brightness:icoSun,Contrast:icoContrast,Saturation:icoDrop,Vibrance:icoDrop,
    Highlights:icoSun,Shadows:icoMoon,Temperature:icoThermo,Tint:icoDrop,Sharpen:icoTriangle,Vignette:icoVignette};
  const keys = Object.keys(state.adjust);
  $('card-adjust').innerHTML = `
    <div class="card-header">
      <div class="back-x" onclick="scrollToCard('card-projectedit')">${icoBack()}</div>
      <div class="card-title">Adjust</div>
      <span class="text-btn" onclick="resetAdjust()">Reset</span>
    </div>
    <div class="adjust-list">
      ${keys.map(k=>`
        <div class="slider-block">
          <div class="slider-label-row">
            <span class="lbl">${icons[k]()}${k}</span>
            <span class="val" id="adj-${k}-val">${state.adjust[k]}</span>
          </div>
          <input type="range" min="-50" max="50" value="${state.adjust[k]}" oninput="state.adjust['${k}']=+this.value; $('adj-${k}-val').textContent=this.value;">
        </div>`).join('')}
    </div>
    <button class="new-project-btn" onclick="toast('Adjustments applied')" style="margin-top:8px;">Apply</button>
  `;
}
function resetAdjust(){ for(const k in state.adjust) state.adjust[k]=0; renderAdjust(); }

/* ============ EFFECTS CARD ============ */
function renderEffects(){
  const cats = ['Trending','Basic','Glitch','Light','Blur','Distortion'];
  const fx = ['Shake','Glitch','Light Leak','VHS','Zoom Blur','Chromatic','RGB Split','Edge Glow'];
  $('card-effects').innerHTML = `
    <div class="card-header">
      <div class="back-x" onclick="scrollToCard('card-projectedit')">${icoBack()}</div>
      <div class="card-title">Effects</div>
      <span class="text-btn" onclick="toast('Effects applied')">Apply</span>
    </div>
    <div class="card-scroll">
      <div class="search-bar">${icoSearch()}<input placeholder="Search effects"/></div>
      <div class="effect-cat-row">
        ${cats.map(c=>`<span class="${state.effectCat===c?'active':''}" onclick="state.effectCat='${c}'; renderEffects();">${c}</span>`).join('')}
      </div>
      <div class="effect-grid">
        ${fx.map((f,i)=>`
          <div class="effect-thumb" style="background-image:url('${[IMG.mountain,IMG.travel,IMG.city,IMG.ocean][i%4]}')" onclick="toast('${f} effect selected')">
            <span>${f}</span>
          </div>`).join('')}
      </div>
    </div>
    ${editToolbar('effects')}
  `;
}

/* ============ TEXT & STICKER CARD ============ */
function renderTextSticker(){
  const fonts = ['Poppins','Montserrat','Bellas Nue','Raleway'];
  const colors = ['#ff3b3b','#ff8a00','#ffd400','#22c55e','#3b82f6','#8b5cf6','#ec4899','#ffffff'];
  $('card-textsticker').innerHTML = `
    <div class="card-header">
      <div class="back-x" onclick="scrollToCard('card-projectedit')">${icoBack()}</div>
      <div class="card-title">Text & Sticker</div>
      <span class="text-btn" onclick="toast('Text & sticker saved')">Save</span>
    </div>
    <div class="card-scroll">
      <div class="video-preview" style="background-image:url('${IMG.mountain}'); display:flex; align-items:center; justify-content:center; flex-direction:column; text-align:center;">
        <div style="font-family:${state.font},sans-serif; font-weight:${state.textStyle.bold?900:800}; font-style:${state.textStyle.italic?'italic':'normal'}; font-size:17px; color:#fff; text-shadow:0 3px 10px rgba(0,0,0,.5);">Explore</div>
        <div style="font-family:${state.font},sans-serif; font-size:21px; font-style:italic; font-weight:700; color:${state.textColor}; text-shadow:0 3px 10px rgba(0,0,0,.5);">The Nature</div>
      </div>
      <div class="font-row">
        ${fonts.map(f=>`<div class="font-chip ${state.font===f?'active':''}" onclick="state.font='${f}'; renderTextSticker();">${f}</div>`).join('')}
      </div>
      <div class="style-icon-row">
        <button class="${state.textStyle.bold?'active':''}" onclick="state.textStyle.bold=!state.textStyle.bold; renderTextSticker();"><b>B</b></button>
        <button class="${state.textStyle.italic?'active':''}" onclick="state.textStyle.italic=!state.textStyle.italic; renderTextSticker();"><i>I</i></button>
        <button onclick="state.textStyle.align='left'; toast('Align left')">≡</button>
        <button onclick="state.textStyle.align='center'; toast('Align center')">≣</button>
        <button onclick="toast('Text animation')">▤</button>
      </div>
      <div class="color-row">
        ${colors.map(c=>`<div class="color-dot ${state.textColor===c?'active':''}" style="background:${c}" onclick="state.textColor='${c}'; renderTextSticker();"></div>`).join('')}
      </div>
      <div class="section-label">Stickers</div>
      <div class="effect-grid">
        ${[IMG.portrait,IMG.mountain,IMG.travel,IMG.city].map(i=>`<div class="effect-thumb" style="background-image:url('${i}')" onclick="toast('Sticker added')"></div>`).join('')}
      </div>
    </div>
    ${editToolbar('textsticker')}
  `;
}

/* ============ AUDIO CARD ============ */
function renderAudio(){
  const tabs = ['Music','Sound Effects','My Music'];
  const list = state.musicTab==='Music'?musicList : state.musicTab==='Sound Effects'?sfxList : myMusicList;
  $('card-audio').innerHTML = `
    <div class="card-header">
      <div class="back-x" onclick="scrollToCard('card-projectedit')">${icoBack()}</div>
      <div class="card-title">Audio</div>
      <span class="text-btn" onclick="toast('Audio added to timeline')">Add</span>
    </div>
    <div class="card-scroll">
      <div class="tab-row">
        ${tabs.map(t=>`<span class="${state.musicTab===t?'active':''}" onclick="state.musicTab='${t}'; renderAudio();">${t}</span>`).join('')}
      </div>
      <div class="search-bar">${icoSearch()}<input placeholder="Search music"/></div>
      <div class="section-label" style="margin-top:0;">Trending</div>
      ${list.map(m=>`
        <div class="music-item ${state.nowPlaying===m.name?'playing':''}" onclick="playTrack('${m.name}')">
          <div class="music-cover">${icoNote()}</div>
          <div class="music-info"><div class="music-name">${m.name}</div><div class="music-len">${m.len}</div></div>
          <div class="wave">${state.nowPlaying===m.name?icoPause():icoPlay()}</div>
        </div>`).join('')}
    </div>
    ${editToolbar('audio')}
  `;
}
function playTrack(name){
  state.nowPlaying = state.nowPlaying===name ? null : name;
  renderAudio();
  if(state.nowPlaying) toast('Playing: '+name);
}

/* ============ EXPORT OPTIONS CARD ============ */
function renderExportOptions(){
  const res = ['1080P','2K','4K','8K'];
  const fpsList = ['24','30','50','60'];
  const qList = ['Low','Medium','High'];
  $('card-exportoptions').innerHTML = `
    <div class="card-header">
      <div class="back-x" onclick="scrollToCard('card-projectedit')">${icoClose()}</div>
      <div class="card-title">Export Options</div>
      <button class="pill-btn on">${state.exportRes}</button>
    </div>
    <div class="card-scroll">
      <div class="export-preview" style="background-image:url('${IMG.mountain}')"></div>
      <div class="section-label" style="margin-top:0;">Resolution</div>
      <div class="chip-row">
        ${res.map(r=>`<div class="chip ${state.exportRes===r?'active':''}" onclick="state.exportRes='${r}'; state.resolution=state.exportRes; renderExportOptions(); renderResolution(); renderProjectEdit();">${r}</div>`).join('')}
      </div>
      <div class="section-label">Frame Rate</div>
      <div class="chip-row">
        ${fpsList.map(f=>`<div class="chip ${state.exportFps===f?'active':''}" onclick="state.exportFps='${f}'; state.frameRate=state.exportFps; renderExportOptions(); renderResolution(); renderProjectEdit();">${f}</div>`).join('')}
      </div>
      <div class="section-label">Quality</div>
      <div class="chip-row">
        ${qList.map(q=>`<div class="chip ${state.exportQuality===q?'active':''}" onclick="state.exportQuality='${q}'; renderExportOptions();">${q}</div>`).join('')}
      </div>
      <div class="toggle-row">
        <span>Watermark</span>
        <div class="toggle ${state.watermark?'on':''}" onclick="state.watermark=!state.watermark; renderExportOptions();"></div>
      </div>
      <button class="new-project-btn" onclick="exportVideo()">Export</button>
    </div>
  `;
}
function exportVideo(){
  toast('Exporting '+state.exportRes+' • '+state.exportFps+'FPS • '+state.exportQuality+'…');
}

/* ============ MY PROJECTS CARD ============ */
function renderMyProjects(){
  $('card-myprojects').innerHTML = `
    <div class="card-header">
      <div class="card-title">My Projects</div>
      <div class="iconbtn" onclick="toast('Grid view')">${icoExpand()}</div>
    </div>
    <div class="subtab-row">
      <div class="subtab ${state.projView==='projects'?'active':''}" onclick="state.projView='projects'; renderMyProjects();">Projects</div>
      <div class="subtab ${state.projView==='cloud'?'active':''}" onclick="state.projView='cloud'; renderMyProjects();">Cloud</div>
    </div>
    <div class="myproj-list">
      ${state.projView==='projects' ? projects.map(p=>`
        <div class="myproj-item" onclick="scrollToCard('card-projectedit')">
          <div class="myproj-thumb" style="background-image:url('${p.img}')"></div>
          <div class="myproj-info"><div class="myproj-name">${p.name}</div><div class="myproj-meta">${p.meta} • Updated ${p.updated}</div></div>
        </div>`).join('') : `<div class="empty-hint">${icoCloud()}<br>No cloud backups yet.<br>Turn on Cloud Sync in Profile.</div>`}
    </div>
    <div class="bottomnav-mini">
      <div class="bnav-item" onclick="scrollToCard('card-home')"><span>${icoHome()}</span>Home</div>
      <div class="bnav-item active"><span>${icoProjects()}</span>Projects</div>
      <div class="bnav-item fab" onclick="toast('Starting a new project…')">${icoPlus()}</div>
      <div class="bnav-item" onclick="toast('Templates library coming right up')"><span>${icoTemplates()}</span>Templates</div>
      <div class="bnav-item" onclick="toast('Profile & settings')"><span>${icoProfile()}</span>Profile</div>
    </div>
  `;
}

/* ============ TIMELINE CARD ============ */
function renderTimeline(){
  const clips = [IMG.mountain,IMG.travel,IMG.city,IMG.mountains2,IMG.ocean];
  $('card-timeline').innerHTML = `
    <div class="card-header">
      <div class="back-x" onclick="scrollToCard('card-home')">${icoBack()}</div>
      <div class="card-title">Timeline</div>
      <button class="pill-btn" onclick="scrollToCard('card-exportoptions')">1080P</button>
    </div>
    <div class="timeline-video" style="background-image:url('${IMG.mountain}')">
      <div class="play-overlay"><div class="play-circle" id="tl-play" onclick="togglePlay('tl-play')">${icoPlay()}</div></div>
      <div class="timecode">00:00 / 00:15</div>
    </div>
    <div class="timeline-clips" id="tl-clips">
      ${clips.map(i=>`<div style="background-image:url('${i}')" onclick="toast('Clip selected')"></div>`).join('')}
      <div class="playhead" style="left:${state.timelinePlayhead}%"></div>
    </div>
    <div class="tl-time"><span>00:00</span><span>00:05</span><span>00:10</span><span>00:15</span></div>
    <div class="tl-row2">
      <div class="tl-cover">
        <div class="tl-cover-thumb" style="background-image:url('${IMG.mountain}')"></div>
        <span>Cover</span>
      </div>
      <div class="tl-add-audio" onclick="scrollToCard('card-audio')">${icoPlus()} Add Audio</div>
    </div>
    <div class="toolbar-row">
      ${tbItem(icoPlus(),'Add')}
      ${tbItem(icoSplit(),'Split')}
      ${tbItem(icoLayers(),'Duplicate')}
      ${tbItem(icoDelete(),'Delete')}
      ${tbItem(icoSpeed(),'Speed')}
    </div>
    ${editToolbar('timeline')}
  `;
  // draggable playhead
  const clipsEl = $('tl-clips');
  clipsEl.onclick = (e)=>{
    if(e.target.closest('.playhead')) return;
    const rect = clipsEl.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX-rect.left)/rect.width)*100));
    state.timelinePlayhead = pct;
    clipsEl.querySelector('.playhead').style.left = pct+'%';
  };
}

/* ============ SHARED BOTTOM EDIT TOOLBAR (Edit/Audio/Text/Sticker/Overlay/Effect) ============ */
function editToolbar(context){
  const items = [
    ['Edit',icoTrim,'projectedit'], ['Audio',icoAudio,'audio'], ['Text',icoText,'textsticker'],
    ['Sticker',icoSticker,'textsticker'], ['Overlay',icoOverlay,'effects'], ['Effect',icoEffect,'effects'],
  ];
  return `<div class="toolbar-row" style="margin-top:8px;">
    ${items.map(([label,icon,card])=>`
      <div class="toolbar-item ${context===card?'active':''}" style="${context===card?'color:var(--purple)':''}" onclick="scrollToCard('card-${card}')">
        ${icon()}<span>${label}</span>
      </div>`).join('')}
  </div>`;
}

/* ============ FOOTER BAR ============ */
function renderFooter(){
  $('footer-bar').innerHTML = `
    <div class="fb-brand"><div class="fb-logo">W</div><span>WZ-lab</span></div>
    <div class="fb-item">${icoBolt()}<div><b>AI Powered</b><small>Smart Editing Tools</small></div></div>
    <div class="fb-item">${icoFrame()}<div><b>Multi Resolution</b><small>Up to 8K Export</small></div></div>
    <div class="fb-item">${icoStar()}<div><b>Pro Templates</b><small>Trendy & Modern</small></div></div>
    <div class="fb-item">${icoCloud()}<div><b>Cloud Sync</b><small>Backup & Restore</small></div></div>
    <div class="fb-item">${icoNoWm()}<div><b>No Watermark</b><small>Pure Experience</small></div></div>
    <div class="fb-item">${icoBolt()}<div><b>High Performance</b><small>Fast Rendering</small></div></div>
    <div class="fb-avail">
      <span>Available on</span>
      <div class="fb-stores">
        <span onclick="toast('Opening App Store…')" style="cursor:pointer;">${icoApple()}</span>
        <span onclick="toast('Opening Google Play…')" style="cursor:pointer;">${icoAndroid()}</span>
      </div>
    </div>
  `;
}

/* ============ INIT ============ */
function renderAll(){
  renderHome();
  renderProjectEdit();
  renderResolution();
  renderAiTools();
  renderFilters();
  renderAdjust();
  renderEffects();
  renderTextSticker();
  renderAudio();
  renderExportOptions();
  renderMyProjects();
  renderTimeline();
  renderFooter();
}
renderAll();