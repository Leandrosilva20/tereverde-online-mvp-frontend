// Dados mock
const TRAILS = [
  { id:1, park:'Parque Nacional da Serra dos Órgãos', name:'Trilha do Dedo de Deus', difficulty:'difícil', distance_km:8.4, duration_h:6, status:'aberta' },
  { id:2, park:'Parque Estadual dos Três Picos', name:'Trilha dos Três Picos', difficulty:'médio', distance_km:5.2, duration_h:3, status:'fechada para manutenção' },
  { id:3, park:'Parque Natural Municipal Montanhas de Teresópolis', name:'Caminho das Cachoeiras', difficulty:'fácil', distance_km:3.1, duration_h:1.5, status:'aberta' }
];

const EVENTS = [
  { id:'e1', title:'Oficina de Educação Ambiental', date:'2025-12-05', park:'Parque Natural Municipal Montanhas de Teresópolis' },
  { id:'e2', title:'Mutirão de Trilhas - Conservação', date:'2025-11-22', park:'Parque Nacional da Serra dos Órgãos' }
];

// Abrir/fechar modal de login (evento delegação)
function openModalLogin(){ const m = document.getElementById('loginModal'); if(m) m.setAttribute('aria-hidden','false'); }
function closeModalLogin(){ const m = document.getElementById('loginModal'); if(m) m.setAttribute('aria-hidden','true'); }

document.addEventListener('click', function(e){
  if(e.target && e.target.id === 'openLogin') openModalLogin();
  if(e.target && e.target.id === 'closeLogin') closeModalLogin();
  if(e.target && e.target.id === 'cancelLogin') closeModalLogin();
});

// login demo
document.addEventListener('click', function(e){
  if(e.target && e.target.id === 'loginBtn'){
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('senha').value.trim();
    const msg = document.getElementById('loginMsg');
    if(email === 'admin@tere.com' && pass === 'senha123'){
      if(msg){ msg.textContent = 'Autenticado (demo) — redirecionando...'; msg.style.color = 'green'; }
      setTimeout(()=> window.location.href = './admin.html', 700);
    } else {
      if(msg){ msg.textContent = 'Credenciais inválidas.'; msg.style.color = 'crimson'; }
    }
  }
});

// render trilhas
function renderTrails(list){
  const container = document.getElementById('trailsList'); if(!container) return;
  container.innerHTML = '';
  list.forEach(t=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<h4>${t.name}</h4><small>${t.park} • ${t.difficulty} • ${t.distance_km} km</small><p>Status: <strong>${t.status}</strong></p><div style="margin-top:8px"><button class="btn ghost" onclick="alert('Rota demo: ${t.name}')">Ver rota</button></div>`;
    container.appendChild(el);
  });
}

// filtro e busca
document.addEventListener('input', function(e){
  if(e.target && (e.target.id === 'searchInput' || e.target.id === 'difficultyFilter')){
    const q = document.getElementById('searchInput').value.toLowerCase();
    const diff = document.getElementById('difficultyFilter').value;
    const filtered = TRAILS.filter(t=>{
      const matchesQ = t.name.toLowerCase().includes(q) || t.park.toLowerCase().includes(q);
      const matchesDiff = diff === 'all' || t.difficulty === diff;
      return matchesQ && matchesDiff;
    });
    renderTrails(filtered);
  }
});

// inicializações ao carregar a página
document.addEventListener('DOMContentLoaded', function(){
  renderTrails(TRAILS);
  const eventsList = document.getElementById('eventsList');
  if(eventsList){
    EVENTS.forEach(e=>{
      const li = document.createElement('li');
      li.innerHTML = `<strong>${e.title}</strong><br><span class="muted">${e.date} • ${e.park}</span>`;
      eventsList.appendChild(li);
    });
  }

  // admin tables
  const trilhasTable = document.querySelector('#trilhasTable tbody');
  const eventsTable = document.querySelector('#eventsTable tbody');
  if(trilhasTable){
    TRAILS.forEach(t=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${t.name}</td><td>${t.difficulty}</td><td>${t.distance_km}</td><td><button class="btn ghost" onclick="alert('Editar demo')">Editar</button> <button class="btn ghost" onclick="alert('Excluir demo')">Excluir</button></td>`;
      trilhasTable.appendChild(tr);
    });
  }
  if(eventsTable){
    EVENTS.forEach(ev=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${ev.title}</td><td>${ev.date}</td><td>${ev.park}</td><td><button class="btn ghost" onclick="alert('Editar demo')">Editar</button> <button class="btn ghost" onclick="alert('Excluir demo')">Excluir</button></td>`;
      eventsTable.appendChild(tr);
    });
  }
});
