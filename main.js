// main.js - behavior for simple MVP
const TRAILS = [
  { id:1, park:'Parque Nacional da Serra dos Órgãos', name:'Trilha do Dedo de Deus', difficulty:'difícil', distance_km:8.4, duration_h:6, status:'aberta' },
  { id:2, park:'Parque Estadual dos Três Picos', name:'Trilha dos Três Picos (trecho básico)', difficulty:'médio', distance_km:5.2, duration_h:3, status:'fechada para manutenção' },
  { id:3, park:'Parque Natural Municipal Montanhas de Teresópolis', name:'Caminho das Cachoeiras', difficulty:'fácil', distance_km:3.1, duration_h:1.5, status:'aberta' }
];

const EVENTS = [
  { id:'e1', title:'Oficina de Educação Ambiental', date:'2025-12-05', park:'Parque Natural Municipal Montanhas de Teresópolis' },
  { id:'e2', title:'Mutirão de Trilhas - Conservação', date:'2025-11-22', park:'Parque Nacional da Serra dos Órgãos' }
];

// populate trails
function renderTrails(list){
  const container = document.getElementById('trailsList');
  container.innerHTML = '';
  if(list.length===0){ container.innerHTML = '<p class="muted">Nenhuma trilha encontrada.</p>'; return; }
  list.forEach(t=>{
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h4>${t.name}</h4>
      <p class="muted">${t.park} • ${t.difficulty} • ${t.distance_km} km</p>
      <p>Status: <strong>${t.status}</strong></p>
      <div style="margin-top:10px"><button class="btn" onclick="alert('Rota (demo): ${t.name}')">Ver rota</button></div>`;
    container.appendChild(div);
  });
}

// populate events
function renderEvents(){
  const el = document.getElementById('eventsList');
  el.innerHTML = '';
  EVENTS.forEach(e=>{
    const li = document.createElement('li');
    li.innerHTML = `<strong>${e.title}</strong><br><span class="muted">${e.date} • ${e.park}</span>`;
    el.appendChild(li);
  });
}

// search & filter
document.getElementById('searchInput').addEventListener('input', e=>{
  const q = e.target.value.toLowerCase();
  const diff = document.getElementById('difficultyFilter').value;
  const filtered = TRAILS.filter(t=>{
    const matchesQ = t.name.toLowerCase().includes(q) || t.park.toLowerCase().includes(q);
    const matchesDiff = diff === 'all' || t.difficulty === diff;
    return matchesQ && matchesDiff;
  });
  renderTrails(filtered);
});

document.getElementById('difficultyFilter').addEventListener('change', ()=>{
  const q = document.getElementById('searchInput').value.toLowerCase();
  const diff = document.getElementById('difficultyFilter').value;
  const filtered = TRAILS.filter(t=>{
    const matchesQ = t.name.toLowerCase().includes(q) || t.park.toLowerCase().includes(q);
    const matchesDiff = diff === 'all' || t.difficulty === diff;
    return matchesQ && matchesDiff;
  });
  renderTrails(filtered);
});

// admin modal
const adminBtn = document.getElementById('adminBtn');
const modal = document.getElementById('adminModal');
const closeModal = document.getElementById('closeModal');
const cancelLogin = document.getElementById('cancelLogin');
const loginForm = document.getElementById('loginForm');
const loginMsg = document.getElementById('loginMsg');

adminBtn.addEventListener('click', ()=> {
  modal.setAttribute('aria-hidden','false');
});
closeModal.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
cancelLogin.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));

loginForm.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const email = document.getElementById('email').value.trim();
  const pass = document.getElementById('password').value.trim();
  // demo login
  if(email==='admin@tere.com' && pass==='senha123'){
    loginMsg.textContent = 'Autenticado (demo). Painel administrativo disponível em ambiente real.';
    loginMsg.style.color = 'green';
    setTimeout(()=> modal.setAttribute('aria-hidden','true'), 800);
  } else {
    loginMsg.textContent = 'Credenciais inválidas.';
    loginMsg.style.color = 'crimson';
  }
});

// initial render
renderTrails(TRAILS);
renderEvents();
document.getElementById('year').textContent = new Date().getFullYear();
