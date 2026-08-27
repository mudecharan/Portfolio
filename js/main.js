function toast(msg){
  const t=document.createElement('div');t.className='toast';t.textContent=msg;
  document.getElementById('toastBox').appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transition='.4s';setTimeout(()=>t.remove(),400)},2600);
}
function copyText(txt){navigator.clipboard.writeText(txt).then(()=>toast('📋 Copied!')).catch(()=>toast('❌ Copy failed'));}

const themeBtn=document.getElementById('themeBtn');
function applyTheme(mode){
  document.body.classList.toggle('light',mode==='light');
  themeBtn.textContent=mode==='light'?'☀️':'🌙';
  localStorage.setItem('theme',mode);
}
applyTheme(localStorage.getItem('theme')||'dark');
themeBtn.onclick=()=>{const m=document.body.classList.contains('light')?'dark':'light';applyTheme(m);toast(m==='light'?'☀️ Light mode':'🌙 Dark mode');};

const QUOTES=[
  ["Data is a precious thing. This will last longer than the systems themselves.","Tim Berners-Lee"],
  ["Without data, you're just another person with an opinion.","W. Edwards Deming"],
  ["The goal is to turn data into information, and information into insight.","Carly Fiorina"],
  ["Torture the data, and it will confess to anything.","Ronald Coase"],
  ["In God we trust; all others must bring data.","W. Edwards Deming"],
  ["Data will talk if you're willing to listen to it.","Jim Bergeson"],
  ["Numbers have an important story to tell. They rely on you to give them a clear voice.","Stephen Few"],
  ["Information is the oil of the 21st century, and analytics is the combustion engine.","Peter Sondergaard"],
  ["You can have data without information, but you cannot have information without data.","Daniel Keys Moran"],
  ["Errors using inadequate data are much less than those using no data at all.","Charles Babbage"],
  ["A picture can be worth a thousand words — a good chart is worth a thousand meetings.","Unknown"],
  ["Clean data is a myth, but cleaning data is a career.","Unknown"],
  ["The world is one big data problem.","Andrew McAfee"],
  ["Data is not information, is not knowledge, is not understanding, is not wisdom.","Clifford Stoll"],
  ["If you can't measure it, you can't improve it.","Peter Drucker"],
  ["Not everything that can be counted counts, and not everything that counts can be counted.","Albert Einstein"],
  ["The best way to predict the future is to create it with data.","Peter Drucker"],
  ["Data really powers everything that we do.","Jeff Weiner"],
  ["We are surrounded by data, but starved for insights.","Jay Baer"],
  ["The temptation to form premature theories upon insufficient data is the bane of our profession.","Arthur Conan Doyle"],
  ["Facts are stubborn things, but statistics are pliable.","Mark Twain"],
  ["An investment in knowledge pays the best interest.","Benjamin Franklin"],
  ["The goal is not to be right, but to be less wrong over time.","Unknown"],
  ["Every dataset has a story. The analyst is the storyteller.","Unknown"],
  ["Correlation does not imply causation.","Unknown"],
  ["The most valuable commodity I know of is information.","Gordon Gekko"],
  ["It is a capital mistake to theorize before one has data.","Arthur Conan Doyle"],
  ["The numbers don't lie, but they don't tell the whole truth either.","Unknown"],
  ["Big data is at the foundation of all the megatrends that are happening.","Chris Lynch"],
  ["Data is the new science. Big data holds the answers.","Pat Gelsinger"],
  ["There is no such thing as too much data, only too little understanding.","Unknown"],
  ["The art of data science is asking the right questions, not just finding the right answers.","Unknown"],
  ["A good analyst knows what the data says. A great analyst knows what the data doesn't say.","Unknown"],
  ["Data without context is just noise.","Unknown"],
  ["The best insights come from the questions you didn't know to ask.","Unknown"],
  ["Statistics is the grammar of science.","Karl Pearson"],
  ["The best time to plant a tree was 20 years ago. The second best time is now.","Chinese Proverb"],
  ["The only way to do great work is to love what you do.","Steve Jobs"],
  ["Intelligence is the ability to adapt to change.","Stephen Hawking"],
  ["The measure of intelligence is the ability to change.","Albert Einstein"],
  ["Success is not final, failure is not fatal. It is the courage to continue that counts.","Winston Churchill"],
  ["The future belongs to those who believe in the beauty of their dreams.","Eleanor Roosevelt"],
  ["Innovation distinguishes between a leader and a follower.","Steve Jobs"],
  ["The only impossible journey is the one you never begin.","Tony Robbins"],
  ["What gets measured gets managed.","Peter Drucker"],
  ["The best revenge is massive success.","Frank Sinatra"],
  ["In the middle of difficulty lies opportunity.","Albert Einstein"],
  ["The only limit to our realization of tomorrow is our doubts of today.","Franklin D. Roosevelt"],
  ["Do what you can, with what you have, where you are.","Theodore Roosevelt"],
  ["Believe you can and you're halfway there.","Theodore Roosevelt"],
  ["The only person you are destined to become is the person you decide to be.","Ralph Waldo Emerson"],
  ["Everything you've ever wanted is on the other side of fear.","George Addair"],
  ["The secret of getting ahead is getting started.","Mark Twain"],
  ["It always seems impossible until it's done.","Nelson Mandela"],
  ["Success is not how high you have climbed, but how you make a positive difference to the world.","Roy T. Bennett"],
  ["The way to get started is to quit talking and begin doing.","Walt Disney"],
  ["Don't be afraid to give up the good to go for the great.","John D. Rockefeller"],
  ["I find that the harder I work, the more luck I seem to have.","Thomas Jefferson"],
  ["The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.","Winston Churchill"],
  ["The only way to do great work is to love what you do. If you haven't found it yet, keep looking.","Steve Jobs"],
  ["Life is what happens when you're busy making other plans.","John Lennon"],
  ["The purpose of our lives is to be happy.","Dalai Lama"],
  ["Get busy living or get busy dying.","Stephen King"],
  ["You only live once, but if you do it right, once is enough.","Mae West"],
  ["Many of life's failures are people who did not realize how close they were to success when they gave up.","Thomas Edison"],
  ["The mind is everything. What you think you become.","Buddha"],
  ["An unexamined life is not worth living.","Socrates"],
  ["Strive not to be a success, but rather to be of value.","Albert Einstein"],
  ["The best time to plant a tree was 20 years ago. The second best time is now.","Chinese Proverb"],
  ["Your time is limited, don't waste it living someone else's life.","Steve Jobs"],
  ["Whether you think you can or you think you can't, you're right.","Henry Ford"],
  ["The only person you are destined to become is the person you decide to be.","Ralph Waldo Emerson"],
  ["I have not failed. I've just found 10,000 ways that won't work.","Thomas Edison"],
  ["A person who never made a mistake never tried anything new.","Albert Einstein"],
  ["The future belongs to those who believe in the beauty of their dreams.","Eleanor Roosevelt"],
  ["Do not go where the path may lead, go instead where there is no path and leave a trail.","Ralph Waldo Emerson"],
  ["If you look at what you have in life, you'll always have more.","Oprah Winfrey"],
  ["The only limit to our realization of tomorrow will be our doubts of today.","Franklin D. Roosevelt"],
  ["It is during our darkest moments that we must focus to see the light.","Aristotle"],
  ["Life is really simple, but we insist on making it complicated.","Confucius"],
  ["May you live all the days of your life.","Jonathan Swift"],
  ["Life itself is the most wonderful fairy tale.","Hans Christian Andersen"],
  ["Do not let yesterday take up too much of today.","Will Rogers"],
  ["You learn more from failure than from success. Don't let it stop you.","Unknown"],
  ["It's not whether you get knocked down, it's whether you get up.","Vince Lombardi"],
  ["People who are crazy enough to think they can change the world, are the ones who do.","Rob Siltanen"],
  ["We may encounter many defeats but we must not be defeated.","Maya Angelou"],
  ["Knowing is not enough; we must apply. Wishing is not enough; we must do.","Johann Wolfgang Von Goethe"],
  ["We generate fears while we sit. We overcome them by action.","Dr. Henry Link"],
  ["The only way to do great work is to love what you do.","Steve Jobs"],
  ["In order to write about life first you must live it.","Ernest Hemingway"],
  ["The whole secret of a successful life is to find out what is one's destiny to do, and then do it.","Henry Ford"],
  ["If you want to make your dreams come true, the first thing you have to do is wake up.","J.M. Power"],
  ["The secret of success is to do the common thing uncommonly well.","John D. Rockefeller"],
  ["I attribute my success to this: I never gave or took any excuse.","Florence Nightingale"],
  ["The most common way people give up their power is by thinking they don't have any.","Alice Walker"],
  ["The best way to predict your future is to create it.","Abraham Lincoln"],
  ["The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.","Steve Jobs"],
  ["If you want to lift yourself up, lift up someone else.","Booker T. Washington"],
  ["I can't change the direction of the wind, but I can adjust my sails to always reach my destination.","Jimmy Dean"],
  ["Whatever the mind of man can conceive and believe, it can achieve.","Napoleon Hill"],
  ["First, have a definite, clear practical ideal; a goal, an objective.","Aristotle"],
  ["Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.","Mark Twain"],
  ["The meaning of life is to find your gift. The purpose of life is to give it away.","Pablo Picasso"],
  ["The distance between insanity and genius is measured only by success.","Bruce Feirstein"],
  ["If you cannot do great things, do small things in a great way.","Napoleon Hill"],
  ["There is only one way to avoid criticism: do nothing, say nothing, and be nothing.","Aristotle"],
  ["Ask and it will be given to you; search, and you will find; knock and the door will be opened for you.","Jesus"],
  ["Remember that not getting what you want is sometimes a wonderful stroke of luck.","Dalai Lama"],
  ["You can't use up creativity. The more you use, the more you have.","Maya Angelou"],
  ["The question isn't who is going to let me; it's who is going to stop me.","Ayn Rand"],
  ["Experience is not what happens to you; it's what you do with what happens to you.","Aldous Huxley"],
  ["The only limit to our realization of tomorrow will be our doubts of today.","Franklin D. Roosevelt"],
  ["Data is not just numbers. It's the story of people, decisions, and outcomes.","Unknown"],
  ["The best analysts are curious, skeptical, and humble.","Unknown"],
  ["Every chart is a hypothesis. Every dashboard is an argument.","Unknown"],
  ["The most dangerous phrase in business is 'We've always done it this way.'","Grace Hopper"],
  ["The computer was born to solve problems that did not exist before.","Bill Gates"],
  ["Technology is best when it brings people together.","Matt Mullenweg"],
  ["The advance of technology is based on making it fit in so that you don't really even notice it.","Bill Gates"],
  ["The web as I envisaged it, we have not seen it yet.","Tim Berners-Lee"],
  ["The best way to predict the future is to invent it.","Alan Kay"],
  ["The most profound technologies are those that disappear.","Mark Weiser"],
  ["Any sufficiently advanced technology is indistinguishable from magic.","Arthur C. Clarke"],
  ["The computer is the most remarkable tool that we've ever come up with.","Steve Jobs"],
  ["The machine does not isolate man from the great problems of nature but plunges him more deeply into them.","Antoine de Saint-Exupéry"],
  ["The real danger is not that computers will begin to think like men, but that men will begin to think like computers.","Sydney J. Harris"],
  ["The good thing about computers is that they do what you tell them to do. The bad thing is that they do what you tell them to do.","Ted Nelson"],
  ["The computer is incredibly fast, accurate, and stupid. Man is unbelievably slow, inaccurate, and brilliant. The marriage of the two is a force beyond calculation.","Leo Cherne"],
  ["Data is the new oil.","Clive Humby"],
  ["Every company has big data in its future. Soon every interaction and every piece of data will be captured somewhere.","Frank J. Ohlhorst"],
  ["Big data isn't about the data. It's about the insights.","Unknown"],
  ["The world of the future will be an ever more demanding struggle against the limitations of our intelligence.","Norbert Wiener"],
  ["The greatest achievement of the human spirit is to live up to one's opportunities.","Vauvenargues"],
  ["The only way to discover the limits of the possible is to go beyond them into the impossible.","Arthur C. Clarke"],
  ["The best way to predict the future is to create it.","Peter Drucker"],
  ["The future belongs to those who prepare for it today.","Malcolm X"],
  ["The best preparation for tomorrow is doing your best today.","H. Jackson Brown Jr."],
  ["The only limit to our realization of tomorrow is our doubts of today.","Franklin D. Roosevelt"],
  ["The journey of a thousand miles begins with one step.","Lao Tzu"],
  ["What lies behind us and what lies before us are tiny matters compared to what lies within us.","Ralph Waldo Emerson"],
  ["The power of imagination makes us infinite.","John Muir"],
  ["The best dreams happen when you're awake.","Cherie Gilderbloom"],
  ["The only way to do great work is to love what you do.","Steve Jobs"],
  ["The difference between ordinary and extraordinary is that little extra.","Jimmy Johnson"],
  ["The best way to cheer yourself is to try to cheer someone else up.","Mark Twain"],
  ["The secret of getting ahead is getting started.","Mark Twain"],
  ["The only impossible journey is the one you never begin.","Tony Robbins"],
  ["The best time to plant a tree was 20 years ago. The second best time is now.","Chinese Proverb"],
  ["Your time is limited, don't waste it living someone else's life.","Steve Jobs"],
  ["The only person you are destined to become is the person you decide to be.","Ralph Waldo Emerson"],
  ["I have not failed. I've just found 10,000 ways that won't work.","Thomas Edison"],
  ["A person who never made a mistake never tried anything new.","Albert Einstein"],
  ["The future belongs to those who believe in the beauty of their dreams.","Eleanor Roosevelt"],
  ["Do not go where the path may lead, go instead where there is no path and leave a trail.","Ralph Waldo Emerson"],
  ["If you look at what you have in life, you'll always have more.","Oprah Winfrey"],
  ["It is during our darkest moments that we must focus to see the light.","Aristotle"],
  ["Life is really simple, but we insist on making it complicated.","Confucius"],
  ["May you live all the days of your life.","Jonathan Swift"],
  ["Life itself is the most wonderful fairy tale.","Hans Christian Andersen"],
  ["Do not let yesterday take up too much of today.","Will Rogers"],
  ["You learn more from failure than from success. Don't let it stop you.","Unknown"],
  ["It's not whether you get knocked down, it's whether you get up.","Vince Lombardi"],
  ["People who are crazy enough to think they can change the world, are the ones who do.","Rob Siltanen"],
  ["We may encounter many defeats but we must not be defeated.","Maya Angelou"],
  ["Knowing is not enough; we must apply. Wishing is not enough; we must do.","Johann Wolfgang Von Goethe"],
  ["We generate fears while we sit. We overcome them by action.","Dr. Henry Link"],
  ["The only way to do great work is to love what you do.","Steve Jobs"],
  ["In order to write about life first you must live it.","Ernest Hemingway"],
  ["The whole secret of a successful life is to find out what is one's destiny to do, and then do it.","Henry Ford"],
  ["If you want to make your dreams come true, the first thing you have to do is wake up.","J.M. Power"],
  ["The secret of success is to do the common thing uncommonly well.","John D. Rockefeller"],
  ["I attribute my success to this: I never gave or took any excuse.","Florence Nightingale"],
  ["The most common way people give up their power is by thinking they don't have any.","Alice Walker"],
  ["The best way to predict your future is to create it.","Abraham Lincoln"],
  ["If you want to lift yourself up, lift up someone else.","Booker T. Washington"],
  ["I can't change the direction of the wind, but I can adjust my sails to always reach my destination.","Jimmy Dean"],
  ["Whatever the mind of man can conceive and believe, it can achieve.","Napoleon Hill"],
  ["First, have a definite, clear practical ideal; a goal, an objective.","Aristotle"],
  ["Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do.","Mark Twain"],
  ["The meaning of life is to find your gift. The purpose of life is to give it away.","Pablo Picasso"],
  ["The distance between insanity and genius is measured only by success.","Bruce Feirstein"],
  ["If you cannot do great things, do small things in a great way.","Napoleon Hill"],
  ["There is only one way to avoid criticism: do nothing, say nothing, and be nothing.","Aristotle"],
  ["Ask and it will be given to you; search, and you will find; knock and the door will be opened for you.","Jesus"],
  ["Remember that not getting what you want is sometimes a wonderful stroke of luck.","Dalai Lama"],
  ["You can't use up creativity. The more you use, the more you have.","Maya Angelou"],
  ["The question isn't who is going to let me; it's who is going to stop me.","Ayn Rand"],
  ["Experience is not what happens to you; it's what you do with what happens to you.","Aldous Huxley"],
  ["Data is not just numbers. It's the story of people, decisions, and outcomes.","Unknown"],
  ["The best analysts are curious, skeptical, and humble.","Unknown"],
  ["Every chart is a hypothesis. Every dashboard is an argument.","Unknown"],
  ["The most dangerous phrase in business is 'We've always done it this way.'","Grace Hopper"],
  ["The computer was born to solve problems that did not exist before.","Bill Gates"],
  ["Technology is best when it brings people together.","Matt Mullenweg"],
  ["The advance of technology is based on making it fit in so that you don't really even notice it.","Bill Gates"],
  ["The web as I envisaged it, we have not seen it yet.","Tim Berners-Lee"],
  ["The best way to predict the future is to invent it.","Alan Kay"],
  ["The most profound technologies are those that disappear.","Mark Weiser"],
  ["Any sufficiently advanced technology is indistinguishable from magic.","Arthur C. Clarke"],
  ["The computer is the most remarkable tool that we've ever come up with.","Steve Jobs"],
  ["The machine does not isolate man from the great problems of nature but plunges him more deeply into them.","Antoine de Saint-Exupéry"],
  ["The real danger is not that computers will begin to think like men, but that men will begin to think like computers.","Sydney J. Harris"],
  ["The good thing about computers is that they do what you tell them to do. The bad thing is that they do what you tell them to do.","Ted Nelson"],
  ["The computer is incredibly fast, accurate, and stupid. Man is unbelievably slow, inaccurate, and brilliant. The marriage of the two is a force beyond calculation.","Leo Cherne"],
  ["Data is the new oil.","Clive Humby"],
  ["Every company has big data in its future. Soon every interaction and every piece of data will be captured somewhere.","Frank J. Ohlhorst"],
  ["Big data isn't about the data. It's about the insights.","Unknown"],
  ["The world of the future will be an ever more demanding struggle against the limitations of our intelligence.","Norbert Wiener"],
  ["The greatest achievement of the human spirit is to live up to one's opportunities.","Vauvenargues"],
  ["The only way to discover the limits of the possible is to go beyond them into the impossible.","Arthur C. Clarke"],
  ["The best way to predict the future is to create it.","Peter Drucker"],
  ["The future belongs to those who prepare for it today.","Malcolm X"],
  ["The best preparation for tomorrow is doing your best today.","H. Jackson Brown Jr."],
  ["The only limit to our realization of tomorrow is our doubts of today.","Franklin D. Roosevelt"],
  ["The journey of a thousand miles begins with one step.","Lao Tzu"],
  ["What lies behind us and what lies before us are tiny matters compared to what lies within us.","Ralph Waldo Emerson"],
  ["The power of imagination makes us infinite.","John Muir"],
  ["The best dreams happen when you're awake.","Cherie Gilderbloom"]
];
function newQuote(){
  const q=QUOTES[Math.floor(Math.random()*QUOTES.length)];
  document.getElementById('quoteText').textContent='"'+q[0]+'"';
  document.getElementById('quoteAuthor').textContent='— '+q[1];
}
document.getElementById('quoteRefresh').onclick=newQuote;
newQuote();

function tickClock(){
  const n=new Date();
  const t=n.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
  document.getElementById('clock').textContent=t;
  document.getElementById('clockBig').textContent=t;
  let h=n.getHours();const ap=h>=12?'PM':'AM';h=h%12||12;
  document.getElementById('ampmSub').textContent=h+':'+String(n.getMinutes()).padStart(2,'0')+' '+ap;
  document.getElementById('dateNow').textContent=n.toLocaleDateString([],{weekday:'short',month:'short',day:'numeric'});
}
setInterval(tickClock,1000);tickClock();
try{document.getElementById('tzName').textContent=Intl.DateTimeFormat().resolvedOptions().timeZone;}catch(e){}
document.getElementById('yearNow').textContent=new Date().getFullYear();
(function(){const h=new Date().getHours();
  const g=h<5?'Late night shift? 🌙':h<12?'Good morning ☀️':h<17?'Good afternoon 👋':'Good evening 🌆';
  document.getElementById('greeting').textContent=g+' · welcome!';})();
const sessStart=Date.now();
setInterval(()=>{
  const s=Math.floor((Date.now()-sessStart)/1000);
  document.getElementById('sessionTime').textContent=
    String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
},1000);

let visits=(parseInt(localStorage.getItem('visits')||'0',10)||0)+1;
localStorage.setItem('visits',visits);
document.getElementById('visitCount').textContent=visits;

function netUpd(on){
  document.getElementById('netStatus').textContent=on?'Online':'Offline';
  document.getElementById('netDot').style.background=on?'var(--green)':'var(--red)';
}
addEventListener('online',()=>{netUpd(true);toast('🌐 Back online');});
addEventListener('offline',()=>netUpd(false));
netUpd(navigator.onLine);

async function initBattery(){
  try{
    if(typeof navigator.getBattery==='function'){
      const b=await navigator.getBattery();
      updBat(b);b.addEventListener('levelchange',()=>updBat(b));
    }else document.getElementById('battery').textContent='n/a';
  }catch(e){document.getElementById('battery').textContent='n/a';}
}
function updBat(b){document.getElementById('battery').textContent=Math.round(b.level*100)+'%'+(b.charging?' ⚡':'');}
initBattery();

document.getElementById('resTile').textContent=screen.width+'×'+screen.height+' @ '+devicePixelRatio+'x';
document.getElementById('browserInfo').textContent=/Firefox/.test(navigator.userAgent)?'Firefox':
  (/Edg/.test(navigator.userAgent)?'Edge':/Chrome/.test(navigator.userAgent)?'Chrome':/Safari/.test(navigator.userAgent)?'Safari':'Browser');
/* Optimized browser + OS detection (additive — keeps prior info, adds version/OS/platform) */
const detectBrowser=()=>{
  const ua=navigator.userAgent;
  if(/OPR\/|Opera/.test(ua))return ['Opera',(ua.match(/OPR\/([\d.]+)/)||[])[1]||(ua.match(/Version\/([\d.]+)/)||[])[1]||''];
  if(/Edg\//.test(ua))return ['Edge',(ua.match(/Edg\/([\d.]+)/)||[])[1]||''];
  if(/FxiOS|Firefox/.test(ua))return ['Firefox',(ua.match(/(?:FxiOS|Firefox)\/([\d.]+)/)||[])[1]||''];
  if(/SamsungBrowser/.test(ua))return ['Samsung Internet',(ua.match(/SamsungBrowser\/([\d.]+)/)||[])[1]||''];
  if(/Chrome/.test(ua)&&!/Edg|OPR|SamsungBrowser/.test(ua))return ['Chrome',(ua.match(/Chrome\/([\d.]+)/)||[])[1]||''];
  if(/CriOS/.test(ua))return ['Chrome (iOS)',(ua.match(/CriOS\/([\d.]+)/)||[])[1]||''];
  if(/Safari/.test(ua))return ['Safari',(ua.match(/Version\/([\d.]+)/)||[])[1]||''];
  return ['Browser',''];
};
const detectOS=()=>{
  const ua=navigator.userAgent,p=navigator.platform||'';
  if(/Windows NT 11/.test(ua))return 'Windows 11';
  if(/Windows NT 10/.test(ua))return 'Windows 10';
  if(/Mac OS X|Macintosh/.test(ua))return 'macOS';
  if(/Android/.test(ua))return 'Android';
  if(/iPhone|iPad|iPod/.test(ua))return 'iOS';
  if(/Linux/.test(ua))return 'Linux';
  return p||'Unknown OS';
};
(function(){
  const br=detectBrowser(),os=detectOS();
  const info=['<b>'+br[0]+(br[1]?' '+br[1]:'')+'</b>',os,navigator.language||'',
    (navigator.hardwareConcurrency||'?')+' cores',
    navigator.deviceMemory?navigator.deviceMemory+'GB RAM':''].filter(Boolean).join(' · ');
  document.getElementById('browserInfo').innerHTML=info;
})();

fetch('https://api.ipify.org?format=json')
  .then(r=>r.json()).then(d=>{document.getElementById('ipAddr').textContent=d.ip;})
  .catch(()=>{document.getElementById('ipAddr').textContent='unavailable';});
/* ================= LOCATION + WEATHER (Open-Meteo, key-free) ================= */
const WCODE={0:'Clear ☀️',1:'Mostly clear 🌤️',2:'Partly cloudy ⛅',3:'Overcast ☁️',45:'Fog 🌫️',
 51:'Drizzle 🌦️',53:'Drizzle 🌦️',55:'Heavy drizzle 🌧️',61:'Light rain 🌦️',63:'Rain 🌧️',65:'Heavy rain ⛈️',
 71:'Light snow 🌨️',73:'Snow ❄️',75:'Heavy snow ❄️',80:'Showers 🌦️',81:'Showers 🌧️',
 95:'Thunderstorm ⛈️',96:'Storm + hail ⛈️'};
function loadWeather(lat,lon){
  fetch('https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+'&current_weather=true&timezone=auto')
   .then(r=>r.json()).then(d=>{
      const w=d.current_weather,desc=WCODE[w.weathercode]||'—';
      document.getElementById('weather').textContent=Math.round(w.temperature)+'°C';
      document.getElementById('tempTile').textContent=Math.round(w.temperature)+'°C';
      document.getElementById('condTile').textContent=desc+' · 💨 '+Math.round(w.windspeed)+' km/h';
   }).catch(()=>{document.getElementById('weather').textContent='n/a';});
}
function setPlace(name,lat,lon){
  document.getElementById('locName').textContent=name;
  document.getElementById('cityTile').textContent=name;
  document.getElementById('coords').textContent=lat.toFixed(3)+', '+lon.toFixed(3);
  loadWeather(lat,lon);
}
function geoFallback(){
  const city=(Intl.DateTimeFormat().resolvedOptions().timeZone||'Local').split('/').pop().replace(/_/g,' ');
  document.getElementById('locName').textContent=city+' (~)';
  document.getElementById('cityTile').textContent='Location blocked';
  document.getElementById('coords').textContent='allow location for exact weather';
}
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(
    p=>setPlace('Your area',p.coords.latitude,p.coords.longitude),
    geoFallback,{timeout:8000});
}else geoFallback();
/* Typing animation */
const ROLES=["I turn messy data into clear stories 📊","SQL wrangler · Pandas wizard 🐍",
 "Dashboard craftsman 📈","Statistics enthusiast 🎲","Automation nerd ⚙️","Ask me about window functions!"];
(function typeLoop(){
  const el=document.getElementById('typed');let r=0,i=0,del=false;
  (function step(){
    const cur=ROLES[r];
    el.innerHTML=cur.slice(0,i)+'<span class="cursorBlink">▊</span>';
    if(!del&&i<cur.length)i++;
    else if(!del&&i===cur.length){del=true;setTimeout(step,1800);return;}
    else if(del&&i>0)i--;
    else{del=false;r=(r+1)%ROLES.length;}
    setTimeout(step,del?30:60);
  })();
})();

/* Scroll progress + nav highlight + back-to-top */
addEventListener('scroll',()=>{
  const h=document.documentElement;
  document.getElementById('progressBar').style.width=
    (h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
  document.getElementById('toTop').classList.toggle('show',h.scrollTop>500);
  let act='home';
  document.querySelectorAll('section[id],header[id]').forEach(s=>{
    if(h.scrollTop>=s.offsetTop-140)act=s.id;});
  document.querySelectorAll('.nav-links a').forEach(a=>
    a.classList.toggle('active',a.getAttribute('href')==='#'+act));
},{passive:true});
document.getElementById('toTop').onclick=()=>scrollTo({top:0,behavior:'smooth'});

/* Mobile menu */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
if (mobileMenuBtn) {
  mobileMenuBtn.onclick=()=>
    document.getElementById('navLinks').classList.toggle('open');
  document.querySelectorAll('.nav-links a').forEach(a=>
    a.addEventListener('click',()=>document.getElementById('navLinks').classList.remove('open')));
}

/* Cursor glow */
addEventListener('mousemove',e=>{
  const g=document.getElementById('cursorGlow');
  g.style.left=e.clientX+'px';g.style.top=e.clientY+'px';g.style.opacity='1';
});

/* Skill bars + animated counters on scroll into view */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  e.target.querySelectorAll('.skill-fill').forEach(f=>f.style.width=f.dataset.w+'%');
  io.unobserve(e.target);
}),{threshold:.3});
document.querySelectorAll('.skill-card').forEach(c=>io.observe(c));

const cio=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;
  const el=e.target,target=+el.dataset.count,t0=performance.now();
  (function anim(t){const p=Math.min((t-t0)/1500,1);
    el.textContent=Math.round(target*(1-Math.pow(1-p,3)));
    if(p<1)requestAnimationFrame(anim);})(t0);
  cio.unobserve(el);
}),{threshold:.5});
document.querySelectorAll('[data-count]').forEach(el=>cio.observe(el));

/* Keyboard shortcuts */
addEventListener('keydown',e=>{
  if(e.key==='Escape'){}
  if(e.target.tagName==='INPUT')return;
  if(e.key==='/'){e.preventDefault();window.open('pages/cheatsheets.html','_self');}
  if(e.key.toLowerCase()==='t')themeBtn.click();
  if(e.key.toLowerCase()==='q'){newQuote();toast('💬 New quote!');}
});

/* Konami-lite easter egg: type "sql" */
let buf='';
addEventListener('keypress',e=>{
  if(e.target.tagName==='INPUT')return;
  buf=(buf+e.key.toLowerCase()).slice(-3);
  if(buf==='sql'){toast('🧙 SELECT * FROM developers WHERE skill=100%;');
    document.body.animate([{filter:'hue-rotate(0deg)'},{filter:'hue-rotate(360deg)'}],{duration:1200});}
});
/* Interview section: filter chips + accordion counters */
(function(){
  const filter=document.getElementById('intFilter');
  if(!filter)return;
  const chips=filter.querySelectorAll('.int-chip');
  const cards=document.querySelectorAll('.int-card');
  chips.forEach(chip=>chip.addEventListener('click',()=>{
    chips.forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    const f=chip.dataset.f;
    document.querySelectorAll('.int-card[open]').forEach(c=>c.removeAttribute('open'));
    cards.forEach(card=>{
      card.style.display=(f==='all'||card.dataset.f===f)?'':'none';
    });
  }));
})();

