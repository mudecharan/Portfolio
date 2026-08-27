/* ================= DIGITAL FOOTPRINT ================= */
const FP={};let fpPaused=false;
const fpGrid=document.getElementById('fpGrid');
/* Icon set for every signal type — keeps the grid scannable at a glance */
const FPICONS={
  ua:'🧬',os:'💻',lang:'🌐',cores:'⚙️',memory:'🧠',screen:'🖥️',viewport:'🪟',tz:'🕐',touch:'👆',
  cookies:'🍪',dnt:'🚫',storageQ:'💾',gpu:'🎮',canvasFp:'🎨',netinfo:'📶',devices:'🎙️',
  referrer:'🔗',pageUrl:'🧭',clicks:'🖱️',keystrokes:'⌨️',mouseDist:'🪄',scrollDepth:'📜',
  ipAddress:'🛰️',locGuess:'📍',weatherHere:'⛅',colorScheme:'🎨',reducedMotion:'🎞️',
  webdriver:'🤖',javaEnabled:'🧩',orientation:'🔄',saveData:'✂️',visibility:'👁️',
  timeOnPage:'⏱️',historyLen:'🧵',geoPerm:'🌍',
  /* new no-login signals */
  engine:'🛞',platform:'🖥️',secure:'🔒',storageAvail:'🗄️',fonts:'🔤',pointer:'🖱️',
  display:'🌈',transparency:'🌫️',screenRect:'📏',windowChrome:'🪟',hwApi:'🔌',
  battery:'🔋',navTiming:'⚡',clockFormat:'🗓️',entryState:'🚪'
};
function fpAdd(key,label,value,risk,note){
  FP[key]=value;
  let card=document.getElementById('fp-'+key);
  if(!card){
    card=document.createElement('div');card.className='fp-card';card.id='fp-'+key;
    const rcls=risk==='high'?'risk-high':risk==='med'?'risk-med':'risk-low';
    const icon=FPICONS[key]||'📌';
    card.innerHTML='<div class="k"><span class="fc-title"><span class="fc-icon">'+icon+'</span>'+label+'</span><span class="risk '+rcls+'">'+(risk==='high'?'sensitive':risk==='med'?'moderate':'harmless')+
      '</span></div><div class="v">—</div>'+(note?'<div class="sub" style="font-size:.62rem;color:var(--muted);margin-top:5px">'+note+'</div>':'');
    fpGrid.appendChild(card);
  }
  card.querySelector('.v').textContent=value;
  const n=Object.keys(FP).length;
  document.getElementById('fpCount').textContent=n;
  document.getElementById('fpBar').style.width=Math.min(n/40*100,100)+'%';
}
function fpUpdate(key,value){if(fpPaused)return;FP[key]=value;
  const c=document.getElementById('fp-'+key);
  if(c){c.querySelector('.v').textContent=value;c.classList.add('fp-live');setTimeout(()=>c.classList.remove('fp-live'),600);}
  const n=Object.keys(FP).length;
  document.getElementById('fpCount').textContent=n;
  document.getElementById('fpBar').style.width=Math.min(n/40*100,100)+'%';
}
/* ---- Static: device & browser fingerprint ---- */
fpAdd('ua','User Agent',navigator.userAgent,'med','Browser string that sites log about you');
const osName=/Windows/.test(navigator.userAgent)?'Windows':/Mac/.test(navigator.userAgent)?'macOS':
  /Android/.test(navigator.userAgent)?'Android':/iPhone|iPad/.test(navigator.userAgent)?'iOS':
  /Linux/.test(navigator.userAgent)?'Linux':'Unknown';
fpAdd('os','Operating System',osName+' · '+(navigator.maxTouchPoints>1&&/Mobile|Android/i.test(navigator.userAgent)?'📱 Mobile':'💻 Desktop'),'low','Derived from your user agent alone');
fpAdd('lang','Languages',navigator.languages?navigator.languages.join(', '):navigator.language,'low','Reveals region even without GPS');
fpAdd('cores','CPU Threads',navigator.hardwareConcurrency||'n/a','low','hardwareConcurrency API');
fpAdd('memory','RAM Estimate',navigator.deviceMemory?navigator.deviceMemory+' GB':'not exposed by this browser','low','navigator.deviceMemory (Chromium)');
fpAdd('screen','Screen + Color Depth',screen.width+'×'+screen.height+' · '+screen.colorDepth+'-bit @'+devicePixelRatio+'x','low','');
fpAdd('viewport','Your Window Size',innerWidth+'×'+innerHeight,'low','Updates live as you resize');
addEventListener('resize',()=>fpUpdate('viewport',innerWidth+'×'+innerHeight));
(function(){const off=-new Date().getTimezoneOffset()/60;
  fpAdd('tz','Timezone & UTC Offset',Intl.DateTimeFormat().resolvedOptions().timeZone+
    ' (UTC'+(off>=0?'+':'')+off+')','med','Timezone narrows you to a city');})();
fpAdd('touch','Touch Support',(('ontouchstart'in window)?'Yes':'No')+' · '+navigator.maxTouchPoints+' touch points','low','');
fpAdd('cookies','Cookies Enabled',navigator.cookieEnabled?'Yes — trackable across sites':'No','high','Cookie enablement itself is a tracking signal');
fpAdd('dnt','Do Not Track',(navigator.doNotTrack==='1')?'Requested (usually ignored)':'Not set / ignored by trackers','med','Most trackers ignore DNT');
fpAdd('storageQ','Storage Quota','checking…','med','Disk space this site may use');
if(navigator.storage&&navigator.storage.estimate){
  navigator.storage.estimate().then(e=>fpUpdate('storageQ',
    (e.quota/1073741824).toFixed(1)+' GB quota · '+((e.usage||0)/1048576).toFixed(2)+' MB used'));
}
try{
  const gl=document.createElement('canvas').getContext('webgl');
  const dbg=gl.getExtension('WEBGL_debug_renderer_info');
  fpAdd('gpu','GPU Renderer',String(dbg?gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER)),'high','GPU model = strong fingerprint signal');
}catch(e){fpAdd('gpu','GPU Renderer','blocked/unavailable','low');}
try{
  const cv=document.createElement('canvas');cv.width=220;cv.height=40;
  const cx=cv.getContext('2d');
  cx.textBaseline='top';cx.font='14px Arial';cx.fillStyle='#f60';cx.fillRect(0,0,90,20);
  cx.fillStyle='#069';cx.fillText('footprint-fp 📊 <canvas>',2,12);
  const d=cv.toDataURL();let h=0;
  for(let i=0;i<d.length;i++){h=(h*31+d.charCodeAt(i))>>>0;}
  fpAdd('canvasFp','Canvas Fingerprint','#'+h.toString(16).padStart(8,'0'),'high','Same hash on every visit → cookieless tracking');
}catch(e){fpAdd('canvasFp','Canvas Fingerprint','unavailable','low');}
/* Network + media devices */
if(navigator.connection){
  const c=navigator.connection;
  fpAdd('netinfo','Connection Type',(c.effectiveType||'?').toUpperCase()+' · ~'+(c.downlink||'?')+' Mbps · RTT '+(c.rtt??'?')+'ms','med','Your internet speed is visible to JS');
  if(c.addEventListener)c.addEventListener('change',()=>
    fpUpdate('netinfo',(c.effectiveType||'?').toUpperCase()+' · ~'+(c.downlink||'?')+' Mbps'));
}else fpAdd('netinfo','Connection Type','api unavailable','low');
fpAdd('devices','Media Hardware','detecting…','high','Any page can list your cameras/mics (labels need permission)');
if(navigator.mediaDevices&&navigator.mediaDevices.enumerateDevices){
  navigator.mediaDevices.enumerateDevices().then(ds=>{
    fpUpdate('devices',ds.filter(d=>d.kind==='videoinput').length+' camera(s) · '+
      ds.filter(d=>d.kind==='audioinput').length+' mic(s) · '+
      ds.filter(d=>d.kind==='audiooutput').length+' speaker(s)');
  }).catch(()=>fpUpdate('devices','blocked'));
}
/* Referrer & entry point */
fpAdd('referrer','Referrer Page',document.referrer||'Direct visit / hidden','med','Sites know where you came from');
fpAdd('pageUrl','Current URL',location.href,'low','');
/* ---- Behavioral tracking (live) ---- */
let clicks=0,keys=0,mouseDist=0,lastX=null,lastY=null,maxScroll=0,idleSecs=0;
fpAdd('clicks','Mouse Clicks','0 clicks','low','Live counter — every click is an event');
addEventListener('click',()=>{if(!fpPaused){clicks++;fpUpdate('clicks',clicks+' clicks');}});
fpAdd('keystrokes','Keystrokes','0 keys','high','Key logging demo: count + rhythm is identifiable. (Values NOT stored)');
addEventListener('keydown',()=>{if(!fpPaused&&keys<9999){keys++;fpUpdate('keystrokes',keys+' keys typed');}});
fpAdd('mouseDist','Mouse Travel','0 px · moving…','low','Your cursor path can be recorded & replayed');
addEventListener('mousemove',e=>{
  if(fpPaused)return;
  if(lastX!==null)mouseDist+=Math.round(Math.hypot(e.clientX-lastX,e.clientY-lastY));
  lastX=e.clientX;lastY=e.clientY;idleSecs=0;
},{passive:true});
setInterval(()=>{if(!fpPaused&&idleSecs<600){
  idleSecs++;if(idleSecs%5===0)fpUpdate('mouseDist',mouseDist.toLocaleString()+
    ' px · '+(idleSecs>3?'idle '+idleSecs+'s':'active'));}},1000);
fpAdd('scrollDepth','Scroll Depth','0%','low','How far down a page you go = engagement metric');
addEventListener('scroll',()=>{
  if(fpPaused)return;
  const h=document.documentElement,p=Math.round(h.scrollTop/(h.scrollHeight-h.clientHeight)*100);
  if(p>maxScroll){maxScroll=p;fpUpdate('scrollDepth',p+'% of this page viewed');}
},{passive:true});
/* Live location/weather/IP mirrored into footprint */
const mirror=setInterval(()=>{
  if(fpPaused)return;
  const ip=document.getElementById('ipAddr').textContent;
  if(ip&&ip!=='loading…')fpUpdate('ipAddress',ip);
  const w=document.getElementById('weather').textContent;
  if(w&&w!=='—')fpUpdate('weatherHere',w+' at your detected location');
  const loc=document.getElementById('locName').textContent;
  if(loc&&loc!=='detecting…'&&loc!=='—')fpUpdate('locGuess',loc);
},2000);
fpAdd('ipAddress','IP Address','detecting…','high','Identifies your network & approx city');
fpAdd('locGuess','Location Guess','detecting…','high','From GPS permission or timezone');
fpAdd('weatherHere','Local Weather','waiting…','med','Weather + IP + time = precise profiling');

/* Pause / export controls */
document.getElementById('fpPauseBtn').onclick=function(){
  fpPaused=!fpPaused;
  this.textContent=fpPaused?'▶️ Resume collecting':'⏸️ Stop collecting';
  toast(fpPaused?'🛑 Collection paused — real sites rarely offer this':'📡 Collection resumed');
};
document.getElementById('fpExportBtn').onclick=()=>{
  const blob=new Blob([JSON.stringify(FP,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download='my-digital-footprint.json';a.click();URL.revokeObjectURL(a.href);
  toast('⬇️ Your data exported — imagine a tracker emailing it instead');
};

/* ---- Extended collection (more signals) ---- */
fpAdd('colorScheme','Preferred Color Scheme',matchMedia('(prefers-color-scheme: dark)').matches?'Dark':'Light','low','Your OS theme leaks to every website');
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',e=>fpUpdate('colorScheme',e.matches?'Dark':'Light'));
fpAdd('reducedMotion','Reduced Motion Preference',matchMedia('(prefers-reduced-motion: reduce)').matches?'Reduced':'Full motion','low','Accessibility setting exposure');
fpAdd('webdriver','Automation Bot Flag',navigator.webdriver?'YES — flagged as automated browser':'No','med','Sites use this to block scrapers/bots');
fpAdd('javaEnabled','Java / PDF / Plugins',[(navigator.javaEnabled&&navigator.javaEnabled())?'Java:on':'Java:off',(navigator.pdfViewerEnabled!==undefined)?(navigator.pdfViewerEnabled?'PDF:on':'PDF:off'):'' ].filter(Boolean).join(' · '),'low',"Browser feature combo adds to uniqueness");
fpAdd('orientation','Screen Orientation',(screen.orientation&&screen.orientation.type)?screen.orientation.type+' ('+screen.orientation.angle+'°)':'unknown','low','Phone tilt & rotation is detectable');
if(screen.orientation&&screen.orientation.addEventListener)screen.orientation.addEventListener('change',()=>fpUpdate('orientation',(screen.orientation.type)+' ('+screen.orientation.angle+'°)'));
fpAdd('saveData','Data Saver Mode',(navigator.connection&&navigator.connection.saveData)?'ON — user conserving data':'OFF','low','Save-Data header preference');
fpAdd('visibility','Tab Focus Events','0 switches','low','Sites track when you leave & return');
let visCount=0;
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){visCount++;fpUpdate('visibility',visCount+' tab switches away');}
});
fpAdd('timeOnPage','Time On Page','0s','med','Dwell time = engagement scoring metric');
setInterval(()=>{if(!fpPaused){const s=Math.floor((Date.now()-sess)/1000);
  fpUpdate('timeOnPage',s<60?s+'s':Math.floor(s/60)+'m '+(s%60)+'s');}},1000);
const sess=Date.now();
fpAdd('historyLen','Browser History Depth (session)',history.length+' entries in this tab stack','low','Shows how deeply you browsed before landing here');
try{if(navigator.permissions){navigator.permissions.query({name:'geolocation'}).then(r=>
  fpUpdate('geoPerm','Geolocation permission: '+r.state));}}catch(e){}
fpAdd('geoPerm','Geolocation Permission','checking…','high','Sites can query if you granted location before');
/* ====== More no-login signals (all client-side, zero accounts required) ====== */
/* Browser engine (fingerprints change between engines) */
fpAdd('engine','Browser Engine',/WebKit/.test(navigator.userAgent)?(/Chrome|Edg|OPR/.test(navigator.userAgent)?'Chromium (Blink)':'WebKit (Safari)'):/Gecko/.test(navigator.userAgent)?'Gecko (Firefox)':/Trident/.test(navigator.userAgent)?'Trident (Internet Explorer)':'Other','low','Engine rearranges every other fingerprint even if your UA is faked');

/* platform + vendor leak */
fpAdd('platform','Platform + Vendor',(navigator.platform||'hidden')+' · vendor '+(navigator.vendor||'unknown'),'low','Even with a faked user agent, platform & vendor still talk');

/* Secure context (HTTPS vs HTTP) */
fpAdd('secure','Secure Context (HTTPS)',window.isSecureContext?'Yes — encrypted':'No — plain HTTP','med','isSecureContext decides which powerful APIs are unlocked');

/* localStorage availability */
try{const k='__fp_is_storage_avail__';localStorage.setItem(k,'1');localStorage.removeItem(k);
  fpAdd('storageAvail','Storage Available','localStorage works — tracking ID can persist','med','Storage is a cookieless way for sites to keep tracking you');
}catch(e){fpAdd('storageAvail','Storage Available','blocked (private tab)','med','Private mode is still fingerprintable via canvas');}

/* Installed fonts (canvas measurement — pure client side) */
(function(){
  try{
    const el=document.createElement('span');
    el.textContent='mowaOoAa123+/—';
    el.style.cssText='position:absolute;left:-9999px;visibility:hidden;font-size:64px;line-height:1;white-space:nowrap;font-family:monospace';
    document.body.appendChild(el);
    const w=f=>{el.style.fontFamily="'"+f+"', monospace";return el.offsetWidth;};
    const probe=['Arial','Helvetica','Times New Roman','Georgia','Courier New','Verdana','Tahoma','Trebuchet MS','Comic Sans MS','Impact','Palatino Linotype','Consolas','Cambria','Segoe UI','Calibri','Century Gothic','Franklin Gothic Medium','Lucida Console','Monaco','Open Sans','Roboto','Raleway','Lato','Montserrat'];
    const found=probe.filter(f=>w(f)!==w('monospace'));
    fpAdd('fonts','Installed Fonts','Probed '+probe.length+' — found '+(found.length?found.length+' (e.g. '+found.slice(0,4).join(', ')+'…)':'none'),'med','Font list is a long-lived, stealthy identifier');
    el.remove();
  }catch(e){fpAdd('fonts','Installed Fonts','unavailable','low','');}
})();
/* Media Query features — device capability flags */
fpAdd('pointer','Pointer + Hover',(matchMedia('(pointer: coarse)').matches?'Touch':'Mouse')+
  (matchMedia('(pointer: fine)').matches?' (fine)':'')+' · '+
  (matchMedia('(hover: hover)').matches?'hover':'hover-less'),'low','matchMedia exposes the exact input hardware');

/* Color gamut / dynamic range / reduced-transparency */
fpAdd('display','Display Capabilities',(matchMedia('(color-gamut: p3)').matches?'P3':'sRGB')+
  ' gamut · '+(matchMedia('(dynamic-range: high)').matches?'HDR':'SDR')+' · '+
  (matchMedia('(prefers-contrast: more)').matches?'high-contrast':'standard-contrast'),'low','Screen capability hints at device class');
fpAdd('transparency','Reduced Transparency',matchMedia('(prefers-reduced-transparency: reduce)').matches?'Reduced':'Full','low','Accessibility styling leak');

/* Window vs available screen + aspect ratio */
fpAdd('screenRect','Screen Use + Ratio',screen.availWidth+'×'+screen.availHeight+' usable · ratio '+(screen.width/screen.height).toFixed(3),'low','Taskbar size + aspect narrow down your monitor');
fpAdd('windowChrome','Window vs Screen',innerWidth+'×'+innerHeight+' · outer '+(window.outerWidth||'?')+'×'+(window.outerHeight||'?'),'low','Outer vs inner reveals browser + OS styling');

/* Hardware APIs exposed (nothing needs permission to be seen) */
(function(){
  const have=[];
  if(navigator.bluetooth&&['requestDevice','getAvailability'].some(k=>typeof navigator.bluetooth[k]==='function'))have.push('Bluetooth');
  if(navigator.usb)have.push('USB');
  if(navigator.serial)have.push('Serial');
  if(navigator.hid)have.push('HID');
  if(navigator.xr)have.push('XR/VR');
  if(navigator.wakeLock)have.push('WakeLock');
  if(navigator.clipboard)have.push('Clipboard');
  if(navigator.mediaDevices)have.push('MediaDevices');
  if(navigator.getGamepads&&typeof navigator.getGamepads==='function'){
    try{const g=navigator.getGamepads().filter(Boolean);if(g.length)have.push(g.length+' gamepad(s)');}catch(e){}
  }
  fpAdd('hwApi','Hardware APIs Exposed',have.length?have.join(' · '):'none surfaced','med','Every exposed API = a bigger permission surface');
})();

/* Battery — charge level is fingerprintable without permission */
if(navigator.getBattery){
  navigator.getBattery().then(b=>{
    fpAdd('battery','Battery Level',Math.round(b.level*100)+'%'+(b.charging?' ⚡ charging':''),'low','Battery + time lets sites guess your habits');
    const upd=()=>fpUpdate('battery',Math.round(b.level*100)+'%'+(b.charging?' ⚡ charging':''));
    b.addEventListener('levelchange',upd);b.addEventListener('chargingchange',upd);
  }).catch(()=>{});
}else fpAdd('battery','Battery','n/a (browser hides it)','low','');

/* Navigation & performance timing */
try{
  const n=performance.getEntriesByType('navigation')[0];
  if(n){const t=Math.round((n.loadTime||0)-(n.fetchStart||0));
    fpAdd('navTiming','Page Performance',(n.type||'navigate')+' · loaded in '+(t>0?t+'ms':'n/a'),'low','Timing adds to uniqueness');
  }
}catch(e){}

/* Locale, clock formatting habits */
(function(){const n=new Date();
  fpAdd('clockFormat','Clock & Calendar',n.toLocaleString([],{dateStyle:'full',timeStyle:'short'}),'low','Locale formatting fingerprints you');
})();

/* Initial visibility + online state (live) */
addEventListener('online',()=>fpUpdate('entryState','Reopened while online'));
addEventListener('offline',()=>fpUpdate('entryState','Dropped offline'));
fpAdd('entryState','Entry Visibility',document.visibilityState+' · '+(navigator.onLine?'online':'offline'),'low','Entry state tracked from the very start');
