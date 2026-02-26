/* ============================================================
   RODRIGO ESTRELLA — Portfolio JS
   Canvas constellation · Navbar scroll · Custom cursor · Lang toggle
   ============================================================ */

/* ─── 1. Custom Cursor ──────────────────────────────────── */
(function initCursor() {
  const dot  = document.createElement('div'); dot.id  = 'cursor-dot';
  const ring = document.createElement('div'); ring.id = 'cursor-ring';
  document.body.append(dot, ring);

  let mx = -100, my = -100, rx = -100, ry = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
})();

/* ─── 2. Navbar scroll behaviour ───────────────────────── */
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ─── 3. Animated constellation canvas ─────────────────── */
(function initCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'portfolio-canvas';
  document.body.prepend(canvas);

  const overlay = document.createElement('div');
  overlay.className = 'bg-gradient-overlay';
  document.body.prepend(overlay);

  const ctx = canvas.getContext('2d');
  let W, H, nodes;

  // Theme-aware colors — Quarto adds .quarto-light or .quarto-dark to <body>
  function getThemeColors() {
    const isLight = document.body.classList.contains('quarto-light');
    return isLight
      ? { c1: '30,58,138', c2: '67,56,202' }     // dark navy/indigo on light bg
      : { c1: '124,158,245', c2: '180,140,245' }; // blue/purple on dark bg
  }

  const NODE_COUNT = () => Math.floor((W * H) / 18000);
  const MAX_DIST   = 160;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    nodes = Array.from({ length: NODE_COUNT() }, () => createNode());
  }

  function createNode() {
    const { c1, c2 } = getThemeColors();
    const isAccent = Math.random() < 0.15;
    return {
      x:   Math.random() * W,
      y:   Math.random() * H,
      vx:  (Math.random() - 0.5) * 0.35,
      vy:  (Math.random() - 0.5) * 0.35,
      r:   Math.random() * 1.5 + 0.5,
      color: isAccent ? c1 : c2,
      alpha: Math.random() * 0.55 + 0.3,
    };
  }

  // Re-color nodes when theme toggles — Quarto changes body class
  const themeObserver = new MutationObserver(() => {
    if (nodes) nodes.forEach(n => {
      const { c1, c2 } = getThemeColors();
      n.color = Math.random() < 0.15 ? c1 : c2;
    });
  });
  themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  let mouse = { x: -999, y: -999 };
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  function draw() {
    ctx.clearRect(0, 0, W, H);

    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;

      const dx = mouse.x - n.x, dy = mouse.y - n.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 160) {
        n.vx += dx / dist * 0.002;
        n.vy += dy / dist * 0.002;
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 0.8) { n.vx /= speed * 1.2; n.vy /= speed * 1.2; }
      }

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.color},${n.alpha})`;
      ctx.fill();
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const isLight = document.body.classList.contains('quarto-light');
          const alpha = (1 - d / MAX_DIST) * (isLight ? 0.28 : 0.22);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${nodes[i].color},${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();

/* ─── 4. Scroll reveal ──────────────────────────────────── */
(function initReveal() {
  const targets = document.querySelectorAll('.project-card, .art-banner, .section-header, .art-process-card');
  if (!targets.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.animation = 'fadeUp 0.7s ease both';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(t => {
    t.style.opacity = '0';
    io.observe(t);
  });
})();

/* ─── 5. Language toggle ───────────────────────────────── */
(function initLangToggle() {
  // Inject toggle widget into navbar right side
  const navRight = document.querySelector('.navbar-nav.ms-auto, .navbar-nav.navbar-right, #quarto-navbar-right, .navbar .navbar-nav:last-child');

  const wrap = document.createElement('li');
  wrap.className = 'nav-item d-flex align-items-center';
  wrap.innerHTML = `
    <div id="lang-toggle" aria-label="Cambiar idioma / Switch language">
      <button id="btn-es" class="active" aria-pressed="true">ES</button>
      <button id="btn-en" aria-pressed="false">EN</button>
    </div>`;

  if (navRight) {
    navRight.appendChild(wrap);
  } else {
    // fallback: append to navbar-collapse
    const collapse = document.querySelector('.navbar-collapse .navbar-nav');
    if (collapse) collapse.appendChild(wrap);
  }

  const btnEs = document.getElementById('btn-es');
  const btnEn = document.getElementById('btn-en');

  // Restore saved lang
  const saved = localStorage.getItem('portfolio-lang') || 'es';
    function detectLang() {
      let lang = 'es';
      const langToggle = document.querySelector('.lang-toggle');
      if (langToggle) {
        lang = langToggle.classList.contains('active-es') ? 'es' : 'en';
      }
      return lang;
    }
    function applyOnRender() {
      applyLang(detectLang());
    }
    applyOnRender();
    document.addEventListener('quarto:pageRendered', applyOnRender);
    applyLang(saved);

  btnEs.addEventListener('click', () => applyLang('es'));
  btnEn.addEventListener('click', () => applyLang('en'));

  function applyLang(lang) {
    const esEls = document.querySelectorAll('[data-lang-es]');
    const enEls = document.querySelectorAll('[data-lang-en]');

    if (lang === 'en') {
      esEls.forEach(el => el.classList.add('lang-hidden'));
      enEls.forEach(el => el.classList.remove('lang-hidden'));
      btnEs.classList.remove('active'); btnEs.setAttribute('aria-pressed','false');
      btnEn.classList.add('active');    btnEn.setAttribute('aria-pressed','true');
      document.documentElement.setAttribute('lang', 'en');
    } else {
      enEls.forEach(el => el.classList.add('lang-hidden'));
      esEls.forEach(el => el.classList.remove('lang-hidden'));
      btnEn.classList.remove('active'); btnEn.setAttribute('aria-pressed','false');
      btnEs.classList.add('active');    btnEs.setAttribute('aria-pressed','true');
      document.documentElement.setAttribute('lang', 'es');
    }
    localStorage.setItem('portfolio-lang', lang);
  }
})();