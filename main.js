// main.js - interactions (login, trails, events, admin editor demo)
const TRAILS = [
  { id:1, park:'Parque Nacional da Serra dos Órgãos', name:'Trilha do Dedo de Deus', difficulty:'difícil', distance_km:8.4, duration_h:6, status:'aberta' },
  { id:2, park:'Parque Estadual dos Três Picos', name:'Trilha dos Três Picos (trecho básico)', difficulty:'médio', distance_km:5.2, duration_h:3, status:'fechada para manutenção' },
  { id:3, park:'Parque Natural Municipal Montanhas de Teresópolis', name:'Caminho das Cachoeiras', difficulty:'fácil', distance_km:3.1, duration_h:1.5, status:'aberta' }
];

const EVENTS = [
  { id:'e1', title:'Oficina de Educação Ambiental', date:'2025-12-05', park:'Parque Natural Municipal Montanhas de Teresópolis' },
  { id:'e2', title:'Mutirão de Trilhas - Conservação', date:'2025-11-22', park:'Parque Nacional da Serra dos Órgãos' }
];

// show/hide modal helpers
function openModalLogin(){ const m = document.getElementById('loginModal'); if(m) m.setAttribute('aria-hidden','false'); }
function closeModalLogin(){ const m = document.getElementById('loginModal'); if(m) m.setAttribute('aria-hidden','true'); }
function openEditor(){ const m = document.getElementById('editorModal'); if(m) m.setAttribute('aria-hidden','false'); }
function closeEditor(){ const m = document.getElementById('editorModal'); if(m) m.setAttribute('aria-hidden','true'); }

// init login buttons on pages
document.addEventListener('click', function(e){
  if(e.target && e.target.id === 'openLogin') openModalLogin();
  if(e.target && e.target.id === 'closeLogin') closeModalLogin();
  if(e.target && e.target.id === 'cancelLogin') closeModalLogin();
});

// login logic
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

// populate trails page list
function renderTrails(list){
  const container = document.getElementById('trailsList');
  if(!container) return;
  container.innerHTML = '';
  list.forEach(t=>{
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<h4>${t.name}</h4><small>${t.park} • ${t.difficulty} • ${t.distance_km} km</small><p>Status: <strong>${t.status}</strong></p><div style="margin-top:8px"><button class="btn ghost" onclick="alert('Rota demo: ${t.name}')">Ver rota</button></div>`;
    container.appendChild(el);
  });
}

// search & filter
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

// initial render
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

  // admin page setup
  const trilhasTable = document.querySelector('#trilhasTable tbody');
  const eventsTable = document.querySelector('#eventsTable tbody');
  if(trilhasTable){
    TRAILS.forEach(t=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${t.name}</td><td>${t.difficulty}</td><td>${t.distance_km}</td><td><button class="btn ghost" onclick="editTrail('${t.id}')">Editar</button> <button class="btn ghost" onclick="deleteTrail('${t.id}')">Excluir</button></td>`;
      trilhasTable.appendChild(tr);
    });
  }
  if(eventsTable){
    EVENTS.forEach(ev=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${ev.title}</td><td>${ev.date}</td><td>${ev.park}</td><td><button class="btn ghost" onclick="editEvent('${ev.id}')">Editar</button> <button class="btn ghost" onclick="deleteEvent('${ev.id}')">Excluir</button></td>`;
      eventsTable.appendChild(tr);
    });
  }

  // editor modal handlers
  document.getElementById('addTrailBtn')?.addEventListener('click', ()=> openEditorWith('trail-new'));
  document.getElementById('addEventBtn')?.addEventListener('click', ()=> openEditorWith('event-new'));
  document.getElementById('closeEditor')?.addEventListener('click', closeEditor);
  document.getElementById('cancelEditor')?.addEventListener('click', closeEditor);
  document.getElementById('saveEditor')?.addEventListener('click', ()=> {
    alert('Ação de salvar (demo). Em produção, enviar ao back-end.');
    closeEditor();
  });
});

// editor helpers
function openEditorWith(mode){
  openEditor();
  const title = document.getElementById('editorTitle');
  const body = document.getElementById('editorBody');
  title.textContent = mode === 'trail-new' ? 'Adicionar Trilha' : 'Adicionar Evento';
  if(mode === 'trail-new'){
    body.innerHTML = `<input id="edt_name" placeholder="Nome da trilha" style="width:100%;padding:8px;margin:6px 0"/><input id="edt_diff" placeholder="Dificuldade" style="width:100%;padding:8px;margin:6px 0"/><input id="edt_dist" placeholder="Distância (km)" style="width:100%;padding:8px;margin:6px 0"/>`;
  } else {
    body.innerHTML = `<input id="edt_title" placeholder="Título do evento" style="width:100%;padding:8px;margin:6px 0"/><input id="edt_date" placeholder="Data" style="width:100%;padding:8px;margin:6px 0"/><input id="edt_loc" placeholder="Local" style="width:100%;padding:8px;margin:6px 0"/>`;
  }
}

function editTrail(id){ alert('Editar (demo) trilha id=' + id); }
function deleteTrail(id){ alert('Excluir (demo) trilha id=' + id); }
function editEvent(id){ alert('Editar (demo) evento id=' + id); }
function deleteEvent(id){ alert('Excluir (demo) evento id=' + id); }
