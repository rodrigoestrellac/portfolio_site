/* ============================================================
   RODRIGO ESTRELLA — Portfolio JS
   Canvas constellation · Navbar scroll · Custom cursor · Reveals
   (theme/lang toggles live in layout.js)
   ============================================================ */

const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER  = window.matchMedia('(pointer: fine)').matches;

/* ─── 1. Custom Cursor (pointer devices only) ───────────── */
(function initCursor() {
  if (!FINE_POINTER || REDUCE_MOTION) return;

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
  // header is injected by layout.js on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('site-header');
    if (!header) return;
    const onScroll = () => {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  });
})();

/* ─── 3. Animated constellation canvas ─────────────────── */
(function initCanvas() {
  if (REDUCE_MOTION) {
    const overlay = document.createElement('div');
    overlay.className = 'bg-gradient-overlay';
    document.body.prepend(overlay);
    return;
  }
  const canvas = document.createElement('canvas');
  canvas.id = 'portfolio-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const overlay = document.createElement('div');
  overlay.className = 'bg-gradient-overlay';
  document.body.prepend(overlay);

  const ctx = canvas.getContext('2d');
  let W, H, nodes;

  const isLight = () => document.documentElement.classList.contains('light');

  function getThemeColors() {
    return isLight()
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

  // Re-color nodes when theme toggles (class flips on <html>)
  const themeObserver = new MutationObserver(() => {
    if (nodes) nodes.forEach(n => {
      const { c1, c2 } = getThemeColors();
      n.color = Math.random() < 0.15 ? c1 : c2;
    });
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

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
          const alpha = (1 - d / MAX_DIST) * (isLight() ? 0.28 : 0.22);
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
  if (REDUCE_MOTION) return;
  const targets = document.querySelectorAll('.project-card, .project-feature, .service-card, .contact-band, .art-banner, .section-header, .art-process-card, .stats-band, .tech-marquee');
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

/* ─── 5. Barra de progreso de scroll ───────────────────── */
(function initProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.prepend(bar);

  let ticking = false;
  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();

/* ─── 6. Stats: contadores animados ────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-value[data-count]');
  if (!counters.length) return;

  function animate(el) {
    const target = parseFloat(el.getAttribute('data-count'));
    const numEl = el.querySelector('.stat-num');
    if (!numEl) return;
    if (REDUCE_MOTION) { numEl.textContent = target; return; }
    const dur = 1400;
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      numEl.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => io.observe(c));
})();

/* ─── 7. Hero typewriter rotator ───────────────────────── */
(function initRotator() {
  const el = document.getElementById('rotator');
  if (!el) return;

  const PHRASES = {
    es: ['sistemas de datos que no se rompen', 'productos potenciados con IA', 'apps como Fulbito', 'dashboards que responden preguntas', 'arte con algoritmos propios'],
    en: ['data systems that don’t break', 'AI-powered products', 'apps like Fulbito', 'dashboards that answer questions', 'art from my own algorithms']
  };
  let lang = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'es';
  let phraseIdx = 0, charIdx = 0, deleting = false, timer = null;

  if (REDUCE_MOTION) {
    el.textContent = PHRASES[lang][0];
    window.addEventListener('portfolio:lang', e => { el.textContent = PHRASES[e.detail][0]; });
    return;
  }

  function step() {
    const phrase = PHRASES[lang][phraseIdx % PHRASES[lang].length];
    if (!deleting) {
      charIdx++;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === phrase.length) { deleting = true; timer = setTimeout(step, 2200); return; }
      timer = setTimeout(step, 38 + Math.random() * 45);
    } else {
      charIdx--;
      el.textContent = phrase.slice(0, charIdx);
      if (charIdx === 0) { deleting = false; phraseIdx++; timer = setTimeout(step, 350); return; }
      timer = setTimeout(step, 18);
    }
  }
  timer = setTimeout(step, 1600);

  window.addEventListener('portfolio:lang', e => {
    lang = e.detail;
    clearTimeout(timer);
    charIdx = 0; deleting = false;
    el.textContent = '';
    timer = setTimeout(step, 300);
  });
})();

/* ─── 8. Botones magnéticos ────────────────────────────── */
(function initMagnetic() {
  if (!FINE_POINTER || REDUCE_MOTION) return;
  document.querySelectorAll('.btn-primary-custom, .btn-ghost-custom, .btn-whatsapp').forEach(btn => {
    const STRENGTH = 0.22, LIMIT = 7;
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) * STRENGTH;
      const dy = (e.clientY - r.top - r.height / 2) * STRENGTH;
      btn.style.transform = 'translate(' +
        Math.max(-LIMIT, Math.min(LIMIT, dx)) + 'px,' +
        (Math.max(-LIMIT, Math.min(LIMIT, dy)) - 2) + 'px)';
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });
})();

/* ─── 9. Tilt 3D en cards de proyecto ──────────────────── */
(function initTilt() {
  if (!FINE_POINTER || REDUCE_MOTION) return;
  const MAX = 3.5; // grados
  document.querySelectorAll('.project-card, .project-feature').forEach(card => {
    card.addEventListener('pointerenter', () => {
      card.style.transition = 'transform 0.12s ease-out, border-color 0.35s, background 0.35s, box-shadow 0.35s';
    });
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        'translateY(-6px) rotateX(' + (-py * MAX) + 'deg) rotateY(' + (px * MAX) + 'deg)';
    });
    card.addEventListener('pointerleave', () => {
      card.style.transition = '';
      card.style.transform = '';
    });
  });
})();

/* ─── 10. Para quienes miran bajo el capó ──────────────── */
(function consoleSignature() {
  try {
    console.log(
      '%c✦ Rodrigo Estrella %c¿Curioseando la consola? Me gusta tu estilo.\n' +
      'Este sitio es HTML/CSS/JS artesanal: sin frameworks, sin build step.\n' +
      '¿Hablamos? → rodrigoestrellac@gmail.com',
      'font-size:16px; font-weight:bold; color:#7c9ef5;',
      'font-size:12px; color:#8898b8; line-height:1.6;'
    );
  } catch (e) { /* noop */ }
})();
