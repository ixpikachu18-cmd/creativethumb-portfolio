(function(){
  const header = document.querySelector('.topbar');
  const toggle = header?.querySelector('.menu-toggle');
  const nav = header?.querySelector('nav');
  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
    };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('click', e => {
      if (window.innerWidth <= 720 && nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 720) closeMenu(); });
  }
  document.querySelectorAll('.site-footer .copyright').forEach(el => {
    el.textContent = `© ${new Date().getFullYear()} CreativeThumb. All rights reserved.`;
  });
})();
