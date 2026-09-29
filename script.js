const seed=[
{id:1,title:'Selamat datang di Hollo',text:'Ruang kecil untuk berbagi cerita, musik, karya, dan ide. Tidak harus sempurna—yang penting terus berkarya.',tag:'Hollo',likes:12,comments:[],author:'Hollo',time:'Hari ini'},
{id:2,title:'Satu langkah kecil',text:'Kadang kita tidak perlu tahu seluruh jalan. Cukup tahu langkah berikutnya.',tag:'Cerita',likes:8,comments:[],author:'OmSetQiu',time:'Hari ini'}
];
if(!localStorage.getItem('hollo_posts'))localStorage.setItem('hollo_posts',JSON.stringify(seed));
const postsEl=document.getElementById('posts');
function render(filter=''){
 const posts=JSON.parse(localStorage.getItem('hollo_posts')||'[]');
 const q=filter.toLowerCase();
 const shown=posts.filter(p=>(p.title+' '+p.text+' '+p.tag+' '+p.author).toLowerCase().includes(q));
 postsEl.innerHTML=shown.length?shown.map(p=>`
 <article class="card post">
  <div class="post-head"><div class="avatar">${p.author[0].toUpperCase()}</div><div><b>${p.author}</b><div class="meta">${p.time} · ${p.tag}</div></div></div>
  <h2>${escapeHtml(p.title)}</h2><div class="post-text">${escapeHtml(p.text)}</div>
  <div class="post-actions">
   <button onclick="likePost(${p.id})">♡ ${p.likes}</button>
   <button onclick="commentPost(${p.id})">💬 ${p.comments?.length||0}</button>
  </div>
 </article>`).join(''):'<div class="card"><p class="muted">Tidak menemukan postingan.</p></div>';
}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
window.likePost=id=>{let p=JSON.parse(localStorage.getItem('hollo_posts'));let x=p.find(a=>a.id===id);if(x)x.likes++;localStorage.setItem('hollo_posts',JSON.stringify(p));render(document.getElementById('searchInput')?.value||'')};
window.commentPost=id=>{const c=prompt('Tulis komentar:');if(!c)return;let p=JSON.parse(localStorage.getItem('hollo_posts'));let x=p.find(a=>a.id===id);x.comments=x.comments||[];x.comments.push(c);localStorage.setItem('hollo_posts',JSON.stringify(p));render(document.getElementById('searchInput')?.value||'')};
document.getElementById('searchInput')?.addEventListener('input',e=>render(e.target.value));
document.getElementById('themeBtn')?.addEventListener('click',()=>{document.body.classList.toggle('light');localStorage.setItem('hollo_theme',document.body.classList.contains('light')?'light':'dark')});
if(localStorage.getItem('hollo_theme')==='light')document.body.classList.add('light');
render();