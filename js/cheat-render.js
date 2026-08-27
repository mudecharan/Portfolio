/* Render cheatsheet tabs & panels */
const tabsEl=document.getElementById('tabs'),panelsEl=document.getElementById('panels');
Object.keys(SHEETS).forEach((name,i)=>{
  const b=document.createElement('button');b.className='tab-btn'+(i===0?' active':'');b.textContent=name;
  b.onclick=()=>{document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.cheat-panel').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');document.getElementById('panel-'+i).classList.add('active');};
  tabsEl.appendChild(b);
  const p=document.createElement('div');p.className='cheat-panel'+(i===0?' active':'');p.id='panel-'+i;
  const g=document.createElement('div');g.className='cheat-grid';g.dataset.tab=name;p.appendChild(g);
  SHEETS[name].forEach(item=>{
    const d=document.createElement('div');d.className='cheat-item';
    const safe=item.c.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    d.innerHTML='<span class="tag">'+item.tag+'</span><h4><span>'+item.t+
      '</span></h4><pre>'+safe+'</pre>';
    const btn=document.createElement('button');btn.className='copyBtn';btn.textContent='copy ⧉';
    btn.onclick=()=>copyText(item.c);
    d.querySelector('h4').appendChild(btn);g.appendChild(d);
  });
  panelsEl.appendChild(p);
});
/* Search across all tabs */
const searchInput=document.getElementById('cheatSearch');
searchInput.addEventListener('input',()=>{
  const q=searchInput.value.toLowerCase().trim();
  let firstHit=null;
  document.querySelectorAll('.cheat-item').forEach(it=>{
    const match=!q||it.textContent.toLowerCase().includes(q);
    it.style.display=match?'':'none';
    if(match&&q&&!firstHit)firstHit=it.closest('.cheat-panel');
  });
  if(q){
    document.querySelectorAll('.cheat-panel').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    const target=firstHit||document.querySelector('.cheat-panel');
    target.classList.add('active');
    const idx=target.id.split('-')[1];
    tabsEl.children[idx].classList.add('active');
  }
});

/* '/' focuses search, Esc clears */
const _search=document.getElementById('cheatSearch');
addEventListener('keydown',e=>{
  if(e.target.tagName==='INPUT')return;
  if(e.key==='/'){e.preventDefault();_search.focus();}
  if(e.key==='Escape'){_search.value='';_search.dispatchEvent(new Event('input'));_search.blur();}
});
/* topic + card count summary */
(function(){
  const topics=Object.keys(SHEETS).length;
  const cards=Object.values(SHEETS).reduce((n,a)=>n+a.length,0);
  const s=document.getElementById('cheatStats');
  if(s)s.textContent=topics+' topics · '+cards+' reference cards · click copy to grab any snippet';
})();
