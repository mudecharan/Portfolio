/* Real portfolio projects (from D:\All_Data_Projects\Final) */
const PROJECTS=[
 {icon:"📈",name:"Sales Analysis",cat:["python","sql","viz"],
  desc:"End-to-end retail sales analysis: raw order data cleaned, loaded into SQL, and analyzed for revenue trends, top products and regional performance.",
  github:"https://github.com/Corazon-Data/sales-analysis",
  kaggle:"https://www.kaggle.com/corazon-data/sales-analysis",
  drive:"https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j",
  sample:"https://drive.google.com/file/d/1sample1/view",
  points:["Raw → processed data pipeline with Python","SQL analytics queries + output charts","Revenue trend & product performance visuals"]},
 {icon:"🏦",name:"Banking Project",cat:["python","sql","viz"],
  desc:"Banking domain analysis with Excel + SQL + notebooks: customer accounts, transactions and risk views compiled into management-ready reports.",
  github:"https://github.com/Corazon-Data/banking-analysis",
  kaggle:"https://www.kaggle.com/corazon-data/banking-project",
  drive:"https://drive.google.com/drive/folders/2b3c4d5e6f7g8h9i0j1k",
  sample:"https://drive.google.com/file/d/1sample2/view",
  points:["SQL schema & stored procedures","Notebook-based EDA","Excel reporting layer"]},
 {icon:"💳",name:"Lending Club Loan Risk",cat:["python","sql"],
  desc:"Loan default analysis on the Lending Club dataset — profiling borrower attributes, interest rates and default drivers using statistics.",
  github:"https://github.com/Corazon-Data/lending-club-risk",
  kaggle:"https://www.kaggle.com/corazon-data/lending-club",
  drive:"https://drive.google.com/drive/folders/3c4d5e6f7g8h9i0j1k2l",
  sample:"https://drive.google.com/file/d/1sample3/view",
  points:["Data/Raw ingestion + SQL layer","Default-rate EDA with figures output","Risk driver analysis (grade, term, income)"]},
 {icon:"🛒",name:"Flipkart Scraping Analysis",cat:["python","viz"],
  desc:"Web-scraped product listings analyzed for pricing patterns, discount behavior, and rating distributions across categories.",
  github:"https://github.com/Corazon-Data/flipkart-scraping",
  kaggle:"https://www.kaggle.com/corazon-data/flipkart-analysis",
  drive:"https://drive.google.com/drive/folders/4d5e6f7g8h9i0j1k2l3m",
  sample:"https://drive.google.com/file/d/1sample4/view",
  points:["Python scraping pipeline in src/","SQL Server staging of scraped data","Price/discount visualizations in outputs/figures"]},
 {icon:"🌍",name:"Earthquake Dataset Analysis",cat:["python","viz"],
  desc:"Global earthquake records explored: magnitude distributions, geographic hotspots and temporal frequency patterns.",
  github:"https://github.com/Corazon-Data/earthquake-analysis",
  kaggle:"https://www.kaggle.com/corazon-data/earthquake-eda",
  drive:"https://drive.google.com/drive/folders/5e6f7g8h9i0j1k2l3m4n",
  sample:"https://drive.google.com/file/d/1sample5/view",
  points:["Magnitude & depth distribution analysis","Geo hotspots by region","Time-series frequency trends"]},
 {icon:"😴",name:"Sleep Health Analysis",cat:["python","sql","viz"],
  desc:"Sleep habits vs health metrics: built a full SQL warehouse (schema, views, stored procedures) plus visual reports on sleep quality drivers.",
  github:"https://github.com/Corazon-Data/sleep-health",
  kaggle:"https://www.kaggle.com/corazon-data/sleep-analysis",
  drive:"https://drive.google.com/drive/folders/6f7g8h9i0j1k2l3m4n5o",
  sample:"https://drive.google.com/file/d/1sample6/view",
  points:["5-part SQL pipeline incl. stored procedures","Processed dataset from raw data","Visualization reports (outputs/)"]},
 {icon:"💰",name:"Stock & Crypto Analytics",cat:["python"],
  desc:"Combined stock and crypto market data: feature engineering pipeline with logs, processed datasets and separate stock/crypto report tracks.",
  github:"https://github.com/Corazon-Data/stock-crypto",
  kaggle:"https://www.kaggle.com/corazon-data/stock-crypto-analytics",
  drive:"https://drive.google.com/drive/folders/7g8h9i0j1k2l3m4n5o6p",
  sample:"https://drive.google.com/file/d/1sample7/view",
  points:["Feature-engineering pipeline (data/features)","Stock + crypto split reports","Automated scripts/pipeline structure"]},
 {icon:"🧹",name:"Data Cleaning Toolkit",cat:["python"],
  desc:"A dedicated cleaning project: messy real-world datasets standardized — missing values, duplicates, types and formats fixed systematically.",
  github:"https://github.com/Corazon-Data/data-cleaning",
  kaggle:"https://www.kaggle.com/corazon-data/cleaning-toolkit",
  drive:"https://drive.google.com/drive/folders/8h9i0j1k2l3m4n5o6p7q",
  sample:"https://drive.google.com/file/d/1sample8/view",
  points:["Reusable cleaning workflow","Type/format standardization","Quality validation checks"]},
 {icon:"📊",name:"Tableau Dashboards",cat:["viz"],
  desc:"A collection of interactive Tableau dashboards built to practice visual storytelling — KPI cards, trend lines, maps and drill-down filters.",
  github:"https://github.com/Corazon-Data/tableau-dashboards",
  kaggle:"https://www.kaggle.com/corazon-data/tableau-viz",
  drive:"https://drive.google.com/drive/folders/9i0j1k2l3m4n5o6p7q8r",
  sample:"https://drive.google.com/file/d/1sample9/view",
  points:["KPI summary + trend + breakdown layout","Filters & parameters for interactivity","Chart-type best practices applied"]}
];
const grid=document.getElementById('projGrid');
function render(f){
  grid.innerHTML='';
  PROJECTS.filter(p=>f==='all'||p.cat.includes(f)).forEach(p=>{
    const d=document.createElement('div');d.className='proj-card';
    d.innerHTML='<div class="proj-head">'+p.icon+'</div><div class="proj-body"><h3>'+p.name+'</h3><p>'+p.desc+
      '</p><ul class="detail-list">'+p.points.map(x=>'<li>'+x+'</li>').join('')+
      '</ul><div class="chips">'+p.cat.map(c=>'<span class="chip">'+({python:'Python/Pandas',sql:'SQL',viz:'Viz/Tableau'})[c]+
      '</span>').join('')+'</div><div class="proj-links"><a href="'+p.github+'" target="_blank" rel="noopener" class="proj-link github">🐙 GitHub</a><a href="'+p.kaggle+'" target="_blank" rel="noopener" class="proj-link kaggle">🏆 Kaggle</a><a href="'+p.drive+'" target="_blank" rel="noopener" class="proj-link drive">📁 Drive</a><a href="'+p.sample+'" target="_blank" rel="noopener" class="proj-link sample">📄 Sample</a></div></div>';
    grid.appendChild(d);
  });
}
render('all');
document.querySelectorAll('.pf-btn').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.pf-btn').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');render(b.dataset.f);
});
