/* External one-stop cheatsheet links (cheatsheets.zip + quickref.me) */
const EXT=[
 {n:"Python",u:"https://cheatsheets.zip/python",d:"Full language reference — data structures, comprehensions, files"},
 {n:"Pandas",u:"https://cheatsheets.zip/pandas",d:"DataFrames, groupby, merge, pivot, resample"},
 {n:"NumPy",u:"https://quickref.me/numpy.html",d:"Array creation, indexing, math & stats functions"},
 {n:"Matplotlib",u:"https://cheatsheets.zip/matplotlib",d:"Plot anatomy, subplots, styling, savefig"},
 {n:"Regex",u:"https://quickref.me/regex.html",d:"Complete regular-expression syntax tables"},
 {n:"MySQL",u:"https://quickref.me/mysql.html",d:"DDL/DML, joins, functions for MySQL"},
 {n:"PostgreSQL",u:"https://quickref.me/postgres.html",d:"PSQL commands, types, window functions"},
 {n:"Excel (shortcuts)",u:"https://cheatsheets.zip/",d:"Browse the full library incl. office tools"},
 {n:"Git",u:"https://quickref.me/git.html",d:"Branching, undoing, remotes — ready for when you learn it"},
 {n:"Bash / Command line",u:"https://cheatsheets.zip/bash",d:"Shell navigation & scripting basics"},
 {n:"Markdown",u:"https://cheatsheets.zip/markdown",d:"README & documentation formatting"},
 {n:"Docker",u:"https://quickref.me/docker.html",d:"Containers — future-ready DevOps ref"}
];
const lib=document.getElementById('extLib');
if(lib)EXT.forEach(e=>{
  const d=document.createElement('div');d.className='cheat-item';
  d.innerHTML='<h4><span>'+e.n+' ↗</span></h4><p style="font-size:.8rem;color:var(--muted);line-height:1.55">'+e.d+
    '</p><a href="'+e.u+'" target="_blank" rel="noopener" style="display:inline-block;margin-top:10px;font-family:var(--mono);font-size:.72rem">open cheatsheet →</a>';
  lib.appendChild(d);
});
