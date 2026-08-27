/* Shared: theme + toast + keyboard shortcuts for subpages */
function applyTheme(mode){
  document.body.classList.toggle('light',mode==='light');
  const b=document.getElementById('themeBtn');
  if(b)b.textContent=mode==='light'?'☀️':'🌙';
  localStorage.setItem('theme',mode);
}
applyTheme(localStorage.getItem('theme')||'dark');
const themeBtn=document.getElementById('themeBtn');
if(themeBtn)themeBtn.onclick=function(){
  const m=document.body.classList.contains('light')?'dark':'light';
  applyTheme(m);toast(m==='light'?'☀️ Light mode':'🌙 Dark mode');
};
function toast(msg){
  const t=document.createElement('div');t.className='toast';t.textContent=msg;
  document.getElementById('toastBox').appendChild(t);
  setTimeout(()=>{t.style.opacity='0';t.style.transition='.4s';setTimeout(()=>t.remove(),400)},2600);
}
function copyText(txt){navigator.clipboard.writeText(txt).then(()=>toast('📋 Copied!'));}
addEventListener('keydown',e=>{
  if(e.target.tagName==='INPUT')return;
  if(e.key.toLowerCase()==='t'&&themeBtn)themeBtn.click();
});
addEventListener('scroll',()=>{
  const h=document.documentElement,p=document.getElementById('progressBar');
  if(p)p.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
},{passive:true});
const yn=document.getElementById('yearNow');if(yn)yn.textContent=new Date().getFullYear();
