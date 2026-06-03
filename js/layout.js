/* ============================================================
   RODRIGO ESTRELLA — layout.js
   Shared layout: theme/lang pre-paint boot · analytics ·
   navbar + footer injection · toggles (theme, lang, menu)
   Loaded synchronously in <head> so the boot runs before paint.
   ============================================================ */

/* ─── 1. Pre-paint boot: theme + language on <html> ───────── */
(function bootPrePaint() {
  var root = document.documentElement;

  // Theme — migrate legacy Quarto key ('alternate' = dark)
  var theme = localStorage.getItem('portfolio-theme');
  if (!theme) {
    var legacy = localStorage.getItem('quarto-color-scheme');
    theme = (legacy === 'default') ? 'light' : 'dark';
    localStorage.setItem('portfolio-theme', theme);
  }
  if (theme === 'light') root.classList.add('light');

  // Language
  var lang = localStorage.getItem('portfolio-lang') || 'es';
  root.classList.add('lang-' + lang);
  root.setAttribute('lang', lang);
})();

/* ─── 2. Analytics: Google Analytics + Microsoft Clarity ───── */
(function analytics() {
  if (location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;

  // Google Analytics
  var ga = document.createElement('script');
  ga.async = true;
  ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-VMG6412QZY';
  document.head.appendChild(ga);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', 'G-VMG6412QZY', { anonymize_ip: true });

  // Microsoft Clarity
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, 'clarity', 'script', 'vq2tmoce5l');
})();

/* ─── 3. Shared markup ─────────────────────────────────────── */
var SITE_NAV_HTML = [
  '<nav class="site-navbar" id="site-navbar" aria-label="Principal">',
  '  <a class="navbar-brand" href="index.html">Rodrigo <span>Estrella</span></a>',
  '  <button class="nav-burger" id="nav-burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-panel">',
  '    <span></span><span></span><span></span>',
  '  </button>',
  '  <div class="nav-panel" id="nav-panel">',
  '    <ul class="nav-links">',
  '      <li><a class="nav-link" data-page="index" href="index.html"><span data-lang-es>Inicio</span><span data-lang-en>Home</span></a></li>',
  '      <li><a class="nav-link" data-page="proyectos" href="index.html#proyectos"><span data-lang-es>Proyectos</span><span data-lang-en>Projects</span></a></li>',
  '      <li><a class="nav-link" data-page="servicios" href="index.html#servicios"><span data-lang-es>Servicios</span><span data-lang-en>Services</span></a></li>',
  '      <li><a class="nav-link" data-page="about" href="about.html">CV</a></li>',
  '      <li class="nav-dropdown">',
  '        <button class="nav-link nav-dropdown-toggle" aria-expanded="false"><span data-lang-es>Arte</span><span data-lang-en>Art</span>',
  '          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="11" height="11"><path d="M6 9l6 6 6-6"/></svg>',
  '        </button>',
  '        <ul class="nav-dropdown-menu">',
  '          <li><a data-page="generativeArt" href="generativeArt.html"><span data-lang-es>Arte Algorítmico</span><span data-lang-en>Algorithmic Art</span></a></li>',
  '          <li><a href="https://rodriguinstudio.com.ar/" target="_blank" rel="noopener">Rodriguin Studio&nbsp;↗</a></li>',
  '        </ul>',
  '      </li>',
  '    </ul>',
  '    <div class="nav-tools">',
  '      <a class="nav-icon" href="https://www.linkedin.com/in/rodrigo-agustin-estrella/" target="_blank" rel="noopener" aria-label="LinkedIn">',
  '        <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>',
  '      </a>',
  '      <a class="nav-icon" href="https://github.com/rodrigoestrellac" target="_blank" rel="noopener" aria-label="GitHub">',
  '        <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a11 11 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>',
  '      </a>',
  '      <div id="lang-toggle" aria-label="Cambiar idioma / Switch language">',
  '        <button id="btn-es" aria-pressed="true">ES</button>',
  '        <button id="btn-en" aria-pressed="false">EN</button>',
  '      </div>',
  '      <button class="theme-toggle" id="theme-toggle" aria-label="Alternar modo claro/oscuro">',
  '        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
  '        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  '      </button>',
  '    </div>',
  '  </div>',
  '</nav>'
].join('\n');

var SITE_FOOTER_HTML = [
  '<div class="footer-inner">',
  '  <div class="footer-brand">',
  '    <span class="footer-name">Rodrigo Estrella</span>',
  '    <span class="footer-tag"><span data-lang-es>Data Scientist · Desarrollador · Artista Algorítmico</span><span data-lang-en>Data Scientist · Developer · Algorithmic Artist</span></span>',
  '  </div>',
  '  <nav class="footer-links" aria-label="Footer">',
  '    <a href="index.html#proyectos"><span data-lang-es>Proyectos</span><span data-lang-en>Projects</span></a>',
  '    <a href="index.html#servicios"><span data-lang-es>Servicios</span><span data-lang-en>Services</span></a>',
  '    <a href="about.html">CV</a>',
  '    <a href="generativeArt.html"><span data-lang-es>Arte</span><span data-lang-en>Art</span></a>',
  '    <a href="https://web.fulbito.futbol" target="_blank" rel="noopener">Fulbito&nbsp;↗</a>',
  '    <a href="https://rodriguinstudio.com.ar/" target="_blank" rel="noopener">Rodriguin&nbsp;Studio&nbsp;↗</a>',
  '  </nav>',
  '  <div class="footer-meta">',
  '    <span>Mendoza, Argentina</span>',
  '    <span>© 2026 Rodrigo Estrella</span>',
  '  </div>',
  '</div>'
].join('\n');

/* ─── 4. Inject + wire up on DOM ready ─────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  var navMount = document.getElementById('site-nav');
  if (navMount) navMount.outerHTML = '<header class="site-header" id="site-header">' + SITE_NAV_HTML + '</header>';

  var footMount = document.getElementById('site-footer');
  if (footMount) footMount.outerHTML = '<footer class="site-footer">' + SITE_FOOTER_HTML + '</footer>';

  /* Active nav link */
  var page = location.pathname.split('/').pop() || 'index.html';
  page = page.replace('.html', '') || 'index';
  document.querySelectorAll('.nav-link[data-page], .nav-dropdown-menu a[data-page]').forEach(function (a) {
    if (a.getAttribute('data-page') === page) a.classList.add('active');
  });

  /* Hamburger */
  var burger = document.getElementById('nav-burger');
  var panel = document.getElementById('nav-panel');
  if (burger && panel) {
    burger.addEventListener('click', function () {
      var open = panel.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        panel.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* Dropdown (click for touch; CSS :hover covers desktop) */
  document.querySelectorAll('.nav-dropdown-toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var dd = btn.closest('.nav-dropdown');
      var open = dd.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.nav-dropdown.is-open').forEach(function (dd) {
      dd.classList.remove('is-open');
      var t = dd.querySelector('.nav-dropdown-toggle');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  });

  /* Theme toggle */
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var light = document.documentElement.classList.toggle('light');
      localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
    });
  }

  /* Language toggle */
  var btnEs = document.getElementById('btn-es');
  var btnEn = document.getElementById('btn-en');
  function applyLang(lang) {
    var root = document.documentElement;
    root.classList.remove('lang-es', 'lang-en');
    root.classList.add('lang-' + lang);
    root.setAttribute('lang', lang);
    if (btnEs && btnEn) {
      btnEs.classList.toggle('active', lang === 'es');
      btnEn.classList.toggle('active', lang === 'en');
      btnEs.setAttribute('aria-pressed', lang === 'es' ? 'true' : 'false');
      btnEn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
    }
    localStorage.setItem('portfolio-lang', lang);
  }
  applyLang(localStorage.getItem('portfolio-lang') || 'es');
  if (btnEs) btnEs.addEventListener('click', function () { applyLang('es'); });
  if (btnEn) btnEn.addEventListener('click', function () { applyLang('en'); });
});
