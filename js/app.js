// app.js - interatividade para Guia Web
(function(){
  const html = document.documentElement;
  const nav = document.getElementById('main-nav');
  const navToggle = document.getElementById('nav-toggle');
  const themeToggle = document.getElementById('theme-toggle');
  const toTop = document.getElementById('to-top');

  // --- Theme handling ---
  const THEME_KEY = 'guiaweb:theme';
  function applyTheme(theme){
    if(theme === 'dark') html.setAttribute('data-theme','dark');
    else html.removeAttribute('data-theme');
    if(theme === 'dark') themeToggle.textContent = '☀️';
    else themeToggle.textContent = '🌙';
  }
  function getPreferredTheme(){
    const saved = localStorage.getItem(THEME_KEY);
    if(saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  applyTheme(getPreferredTheme());

  if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
      const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // --- Nav toggle (mobile) ---
  if(navToggle && nav){
    navToggle.addEventListener('click', ()=>{
      nav.classList.toggle('open');
      const open = nav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });

    // Close nav when clicking a link
    nav.addEventListener('click', (e)=>{
      if(e.target.tagName === 'A'){
        nav.classList.remove('open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape') nav.classList.remove('open');
    });
  }

  // --- Smooth scroll for internal links ---
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const href = a.getAttribute('href');
    if(href === '#' || href === '') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });

  // --- Back to top button ---
  function checkScroll(){
    if(window.scrollY > 240) toTop.style.display = 'block';
    else toTop.style.display = 'none';
  }
  window.addEventListener('scroll', checkScroll);
  checkScroll();
  if(toTop){
    toTop.addEventListener('click', ()=>{
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }

  // Small helper to reveal focused elements when keyboard navigation used
  function handleFirstTab(e){
    if(e.key === 'Tab') document.body.classList.add('show-focus-outline');
  }
  window.addEventListener('keydown', handleFirstTab, {once:true});
})();
