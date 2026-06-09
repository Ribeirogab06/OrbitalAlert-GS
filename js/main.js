// Atualiza a largura da barra conforme o usuário rola a página
window.addEventListener('scroll', () => {
  // Calcula a porcentagem de scroll (0% a 100%)
  const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  // Aplica a largura calculada
  if (scrollBar) scrollBar.style.width = scrolled + '%';
});

// HEADER — EFEITO DE SCROLL


// Referência ao elemento header
const header = document.querySelector('header');

// Adiciona classe 'scrolled' quando rolar mais de 20px
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// MENU HAMBÚRGUER (MOBILE)


// Referência ao botão hambúrguer
const hamburger = document.querySelector('.hamburger');

// Referência ao menu mobile
const mobileMenu = document.querySelector('.mobile-menu');

// Adiciona comportamento ao hambúrguer
if (hamburger && mobileMenu) {

  // Abre/fecha o menu ao clicar no hambúrguer
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    // Bloqueia o scroll do body quando o menu está aberto
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Fecha o menu ao clicar em qualquer link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// LINK ATIVO NA NAVEGAÇÃO

// Pega o nome da página atual pela URL
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Marca o link correspondente como ativo em todas as navs
document.querySelectorAll('nav a, .mobile-menu a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// DADOS DOS ALERTAS 


// Objeto com todos os dados de cada alerta
const alertData = {
  'cosmos': {
    title: 'DEBRIS COSMOS-2251',
    level: 'CRÍTICO', levelClass: 'critical',
    orbit: '776 km LEO', velocity: '7.8 km/s',
    size: '~3.2m', prob: '0.0043%',
    region: 'Amazônia, AM', time: '03:42 UTC',
    desc: 'Fragmento do satélite russo Cosmos-2251, resultante da colisão com o Iridium-33 em 2009. Passagem sobre a região Norte com altitude mínima calculada de 776km.'
  },
  'sl16': {
    title: 'OBJETO SL-16 R/B',
    level: 'MODERADO', levelClass: 'moderate',
    orbit: '824 km LEO', velocity: '7.6 km/s',
    size: '~8.1m', prob: '0.0012%',
    region: 'Nordeste', time: '08:15 UTC',
    desc: 'Corpo do foguete Zenit soviético. Rastreado desde 1990, com órbita estável e decaimento previsto para 2031. Objeto de grande porte monitorado continuamente.'
  },
  'noaa': {
    title: 'NOAA-16 INATIVO',
    level: 'BAIXO', levelClass: 'low',
    orbit: '849 km LEO', velocity: '7.5 km/s',
    size: '~4.2m', prob: '0.0001%',
    region: 'Sul, PR', time: '11:30 UTC',
    desc: 'Satélite meteorológico americano desativado em 2014. Órbita bem determinada com baixo risco operacional. Monitoramento de rotina mantido pelo NORAD.'
  },
  'fengyun': {
    title: 'FRAGMENTO FENGYUN-1C',
    level: 'CRÍTICO', levelClass: 'critical',
    orbit: '858 km LEO', velocity: '7.4 km/s',
    size: '~0.3m', prob: '0.0089%',
    region: 'Centro-Oeste', time: '14:22 UTC',
    desc: 'Fragmento do FengYun-1C destruído em teste antisatélite chinês em 2007. Um dos maiores eventos de geração de detritos da história orbital.'
  },
  'iridium': {
    title: 'FRAG. IRIDIUM-33',
    level: 'MODERADO', levelClass: 'moderate',
    orbit: '789 km LEO', velocity: '7.7 km/s',
    size: '~0.8m', prob: '0.0021%',
    region: 'Sudeste, SP', time: '16:50 UTC',
    desc: 'Fragmento do Iridium-33 da colisão de 2009. Trajetória prevista sobre o estado de São Paulo. Objeto acompanhado desde o evento de geração.'
  },
  'h2a': {
    title: 'UPPER STAGE H-2A',
    level: 'BAIXO', levelClass: 'low',
    orbit: '691 km LEO', velocity: '7.9 km/s',
    size: '~11.5m', prob: '0.0003%',
    region: 'Norte, PA', time: '19:10 UTC',
    desc: 'Segundo estágio do foguete japonês H-2A de 2013. Objeto grande com órbita bem determinada e baixo risco de colisão operacional.'
  }
};

// MODAL DE DETALHES DO ALERTA


// Referência ao overlay do modal
const modalOverlay = document.getElementById('modal');

// Referência ao botão de fechar
const modalClose = document.querySelector('.modal-close');

// Abre o modal preenchendo os dados do alerta clicado
function openModal(id) {
  const d = alertData[id];
  if (!d || !modalOverlay) return;

  // Preenche todos os campos do modal com os dados do alerta
  document.getElementById('m-title').textContent   = d.title;
  document.getElementById('m-level').textContent   = d.level;
  document.getElementById('m-level').className     = 'level-badge ' + d.levelClass;
  document.getElementById('m-orbit').textContent   = d.orbit;
  document.getElementById('m-vel').textContent     = d.velocity;
  document.getElementById('m-size').textContent    = d.size;
  document.getElementById('m-prob').textContent    = d.prob;
  document.getElementById('m-region').textContent  = d.region;
  document.getElementById('m-time').textContent    = d.time;
  document.getElementById('m-desc').textContent    = d.desc;

  // Exibe o modal e bloqueia o scroll
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Fecha o modal e restaura o scroll
function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Evento de clique nos cards de alerta
document.querySelectorAll('.alert-card[data-id]').forEach(card => {
  card.addEventListener('click', () => openModal(card.getAttribute('data-id')));
  // Abre com Enter ou Space pelo teclado (acessibilidade)
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') openModal(card.getAttribute('data-id'));
  });
});

// Fecha ao clicar no botão X
if (modalClose) modalClose.addEventListener('click', closeModal);

// Fecha ao clicar no overlay (fora da caixa)
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}

// Fecha ao pressionar Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// =====================================================
// FILTROS DE ALERTAS
// =====================================================

// Estado atual dos filtros
let filterLevel = 'all';
let filterRegion = 'all';

// Aplica os filtros comparando data-level e data-region dos cards
function applyFilters() {
  const cards = document.querySelectorAll('.alert-card[data-id]');
  let visible = 0;

  cards.forEach(card => {
    // Lê os atributos de dados do card
    const level  = card.getAttribute('data-level');
    const region = card.getAttribute('data-region');

    // Verifica se passa pelos dois filtros ativos
    const okLevel  = filterLevel  === 'all' || level  === filterLevel;
    const okRegion = filterRegion === 'all' || region === filterRegion;

    if (okLevel && okRegion) {
      // Exibe o card
      card.style.display = '';
      visible++;
    } else {
      // Oculta o card
      card.style.display = 'none';
    }
  });

  // Atualiza o contador de alertas visíveis
  const counter = document.getElementById('alert-count');
  if (counter) counter.textContent = visible + (visible === 1 ? ' alerta' : ' alertas');

  // Exibe ou oculta a mensagem de "nenhum resultado"
  const noRes = document.getElementById('no-results');
  if (noRes) noRes.style.display = visible === 0 ? 'block' : 'none';
}

// Adiciona evento nos botões de filtro por nível
document.querySelectorAll('.filter-btn[data-level]').forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active de todos os botões do mesmo grupo
    document.querySelectorAll('.filter-btn[data-level]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterLevel = btn.getAttribute('data-level');
    applyFilters();
  });
});

// Adiciona evento nos botões de filtro por região
document.querySelectorAll('.filter-btn[data-region]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-region]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterRegion = btn.getAttribute('data-region');
    applyFilters();
  });
});

// =====================================================
// CONTADORES ANIMADOS
// =====================================================

// Anima um número de 0 até o valor final em 'duration' ms
function countUp(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);

  function tick() {
    start += step;
    if (start >= target) {
      // Formata o número final com pontos de milhar (pt-BR)
      el.textContent = target.toLocaleString('pt-BR');
    } else {
      el.textContent = Math.floor(start).toLocaleString('pt-BR');
      requestAnimationFrame(tick);
    }
  }
  requestAnimationFrame(tick);
}

// =====================================================
// INTERSECTION OBSERVER — FADE-IN + CONTADORES
// =====================================================

// Observer para os elementos com classe fade-in
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Ativa a animação de fade-in
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });

// Observa todos os elementos com fade-in
document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Observer para os contadores — dispara a animação ao entrar na tela
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Lê o valor alvo do atributo data-target
      const target = parseInt(entry.target.getAttribute('data-target'));
      countUp(entry.target, target, 1400);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Observa todos os elementos com data-target
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// =====================================================
// VALIDAÇÃO DO FORMULÁRIO DE CONTATO
// =====================================================

// Referência ao formulário
const form = document.getElementById('contact-form');

if (form) {
  // Referência à mensagem de sucesso
  const successMsg = document.getElementById('form-success');

  // Exibe mensagem de erro abaixo de um campo
  function showErr(fieldId, msg) {
    const field = document.getElementById(fieldId);
    const err   = document.getElementById(fieldId + '-err');
    if (field) field.classList.add('error');
    if (err)   { err.textContent = msg; err.classList.add('show'); }
  }

  // Remove a mensagem de erro de um campo
  function clearErr(fieldId) {
    const field = document.getElementById(fieldId);
    const err   = document.getElementById(fieldId + '-err');
    if (field) field.classList.remove('error');
    if (err)   err.classList.remove('show');
  }

  // Valida o campo de nome (mínimo nome + sobrenome)
  function checkName() {
    const v = document.getElementById('name').value.trim();
    if (!v)                         { showErr('name', 'Nome obrigatório'); return false; }
    if (v.split(' ').length < 2)    { showErr('name', 'Informe nome e sobrenome'); return false; }
    clearErr('name'); return true;
  }

  // Valida o campo de e-mail com regex
  function checkEmail() {
    const v = document.getElementById('email').value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!v)       { showErr('email', 'E-mail obrigatório'); return false; }
    if (!re.test(v)) { showErr('email', 'Formato inválido'); return false; }
    clearErr('email'); return true;
  }

  // Valida o campo de organização
  function checkOrg() {
    const v = document.getElementById('org').value.trim();
    if (!v) { showErr('org', 'Organização obrigatória'); return false; }
    clearErr('org'); return true;
  }

  // Valida o select de interesse
  function checkInterest() {
    const v = document.getElementById('interest').value;
    if (!v) { showErr('interest', 'Selecione uma área'); return false; }
    clearErr('interest'); return true;
  }

  // Valida a mensagem (mínimo 20 caracteres)
  function checkMessage() {
    const v = document.getElementById('message').value.trim();
    if (!v)         { showErr('message', 'Mensagem obrigatória'); return false; }
    if (v.length < 20) { showErr('message', 'Mínimo 20 caracteres'); return false; }
    clearErr('message'); return true;
  }

  // Validação em tempo real ao sair de cada campo (blur)
  document.getElementById('name')?.addEventListener('blur', checkName);
  document.getElementById('email')?.addEventListener('blur', checkEmail);
  document.getElementById('org')?.addEventListener('blur', checkOrg);
  document.getElementById('interest')?.addEventListener('change', checkInterest);
  document.getElementById('message')?.addEventListener('blur', checkMessage);

  // Limpa o erro enquanto o usuário digita
  ['name','email','org','message'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => clearErr(id));
  });

  // Submissão do formulário
  form.addEventListener('submit', (e) => {
    // Cancela o comportamento padrão de recarregar a página
    e.preventDefault();

    // Executa todas as validações de uma vez
    const valid = [checkName(), checkEmail(), checkOrg(), checkInterest(), checkMessage()].every(Boolean);

    if (valid) {
      // Desativa o botão e muda o texto
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Enviando...'; }

      // Simula o envio com um delay de 1.2 segundos
      setTimeout(() => {
        form.style.display = 'none';
        if (successMsg) successMsg.classList.add('show');
      }, 1200);
    }
  });
}
