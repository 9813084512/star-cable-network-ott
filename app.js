const content=document.getElementById('content');
const state={page:'home',movies:[]};

const channels=[
 ['DD National','Entertainment'],['DD News','News'],['DD Sports','Sports'],
 ['DD Kisan','Agriculture'],['DD India','News'],['DD Bharati','Entertainment'],
 ['DD Urdu','News'],['DD Kashir','Regional'],['DD Punjabi','Regional']
];

function showPage(page){
 state.page=page;
 document.querySelectorAll('.bottomnav button').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
 render();
}
function render(){
 if(state.page==='home') home();
 if(state.page==='live') live();
 if(state.page==='movies') movies();
 if(state.page==='packs') packs();
 if(state.page==='account') account();
}
function home(){
 content.innerHTML=`<section class="hero"><h1>STAR CABLE NETWORK OTT</h1>
 <p>SUPERFAST Wi‑Fi CONNECTION • Live TV • Movies • OTT</p>
 <button class="btn" onclick="showPage('live')">📺 Watch Live TV</button></section>
 <div class="section"><h2>Featured</h2></div>
 <div class="grid"><div class="card"><div class="poster" style="display:grid;place-items:center;font-size:44px">📺</div><h3>FTA Live TV</h3><div class="muted">Free-to-air channels</div></div>
 <div class="card"><div class="poster" style="display:grid;place-items:center;font-size:44px">🎬</div><h3>Movies</h3><div class="muted">Admin-uploaded content</div></div>
 <div class="card"><div class="poster" style="display:grid;place-items:center;font-size:44px">🔥</div><h3>OTT Packs</h3><div class="muted">Choose your plan</div></div></div>
 <div class="notice" style="margin-top:18px">Streaming rights required: only add channels and movies for which STAR CABLE NETWORK has the necessary distribution/streaming permission.</div>`;
}
function live(){
 content.innerHTML=`<h1>📺 FTA Live TV</h1><p class="muted">Channel directory</p>
 <div class="grid">${channels.map(c=>`<div class="card channel"><img class="chlogo" src="assets/logo.jpg"><div><h3>${c[0]}</h3><span class="tag">${c[1]}</span><br><button class="btn" style="margin-top:7px;padding:7px 11px" onclick="alert('Add your authorised live stream URL in the admin/backend system.')">▶ Live</button></div></div>`).join('')}</div>`;
}
function movies(){
 content.innerHTML=`<h1>🎬 Movies</h1><div id="movieList"></div>
 <div class="adminbox"><h2>🛠️ Admin: Upload Movie</h2><div class="form">
 <input class="input" id="mname" placeholder="Movie name">
 <input class="input" id="mposter" type="file" accept="image/*">
 <input class="input" id="mvideo" type="file" accept="video/*">
 <select class="select" id="mtype"><option>Free</option><option>Premium</option></select>
 <button class="btn" onclick="addMovie()">Upload / Publish</button></div>
 <p class="muted">Prototype stores the selected media only for this browser session. A production app needs secure cloud storage + database + admin authentication.</p></div>`;
 renderMovies();
}
function renderMovies(){
 const box=document.getElementById('movieList'); if(!box)return;
 if(!state.movies.length){box.innerHTML='<div class="empty">No movies uploaded yet. Admin can upload the first movie below.</div>';return}
 box.innerHTML='<div class="grid">'+state.movies.map((m,i)=>`<div class="card"><img class="poster" src="${m.poster}"><h3>${m.name}</h3><span class="tag">${m.type}</span><button class="btn" style="margin-top:10px;width:100%" onclick="playMovie(${i})">▶ Watch</button></div>`).join('')+'</div>';
}
function addMovie(){
 const n=document.getElementById('mname').value.trim(), pf=document.getElementById('mposter').files[0], vf=document.getElementById('mvideo').files[0], type=document.getElementById('mtype').value;
 if(!n||!pf||!vf){alert('Movie name, poster and video are required.');return}
 state.movies.push({name:n,type,poster:URL.createObjectURL(pf),video:URL.createObjectURL(vf)}); renderMovies();
}
function playMovie(i){
 const m=state.movies[i];
 content.innerHTML=`<h1>${m.name}</h1><video controls autoplay style="width:100%;border-radius:14px;background:#000" src="${m.video}"></video><p><span class="tag">${m.type}</span></p><button class="btn" onclick="showPage('movies')">← Back to Movies</button>`;
}
function packs(){
 content.innerHTML=`<h1>🔥 OTT Packs</h1><div class="grid">
 <div class="card"><h2>Monthly</h2><div class="price">₹99</div><p class="muted">Live TV + selected OTT benefits</p><button class="btn" onclick="alert('Connect your payment gateway here.')">Subscribe</button></div>
 <div class="card"><h2>6 Months</h2><div class="price">Custom</div><p class="muted">Set your official STAR CABLE NETWORK price</p><button class="btn" onclick="alert('Connect your payment gateway here.')">Subscribe</button></div></div>`;
}
function account(){
 content.innerHTML=`<h1>👤 My Account</h1><div class="card"><h3>Mobile Login</h3><input class="input" placeholder="Mobile number"><button class="btn" style="margin-top:10px" onclick="alert('OTP service will be connected to your backend.')">Send OTP</button></div>
 <div class="card" style="margin-top:14px"><h3>Customer Support</h3><p class="muted">Add your STAR CABLE NETWORK support number here.</p></div>`;
}
render();