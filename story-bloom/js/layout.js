const mark = `<svg class="mark" viewBox="0 0 120 90" aria-hidden="true"><path class="g" d="M60 4C70 22 70 42 60 56 50 42 50 22 60 4Z"/><path class="n" d="M60 56C66 40 74 24 84 12 88 30 80 48 60 56Z"/><path class="n" d="M60 56C54 40 46 24 36 12 32 30 40 48 60 56Z"/><path class="n" d="M60 56C74 54 90 50 106 52 94 62 76 62 60 56Z"/><path class="n" d="M60 56C46 54 30 50 14 52 26 62 44 62 60 56Z"/><path class="o" d="M60 56C74 44 90 32 104 28 102 44 84 54 60 56ZM60 56C46 44 30 32 16 28 18 44 36 54 60 56Z"/><path class="o" d="M10 66Q60 52 110 66M28 74Q60 66 92 74"/></svg>`;
const logoHtml = `<a class="logo" href="index.html" aria-label="${site.name} home">${mark}<span class="logo-text"><b>STORY BLOOM</b><small>PUBLISHERS</small></span></a>`;

function renderHeader(active = 'Home') {
  const links = nav.map(([l, h]) => `<li><a href="${h}" ${l === active ? 'aria-current="page"' : ''}>${l}</a></li>`).join('');
  document.getElementById('site-header').innerHTML = `
  <a class="skip" href="#main">Skip to content</a>
  <header class="header"><div class="wrap header-in">
    ${logoHtml}
    <button class="burger" aria-expanded="false" aria-controls="menu" aria-label="Open menu"><span></span><span></span></button>
    <nav id="menu" class="menu" aria-label="Main"><ul>${links}</ul>
      <a class="btn btn-primary" href="#contact">Get a Free Consultation</a></nav>
  </div></header>`;
  const header = document.querySelector('.header'), btn = header.querySelector('.burger'), menu = header.querySelector('.menu');
  const set = (open) => { menu.classList.toggle('open', open); btn.setAttribute('aria-expanded', open); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); document.body.classList.toggle('lock', open); };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => e.target.closest('a') && set(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); btn.focus(); } });
  addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 10), { passive: true });
}

function renderFooter() {
  const col = (t, items) => `<div><h3>${t}</h3><ul>${items.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>`;
  const soc = ['Facebook', 'Instagram', 'LinkedIn', 'X'].map((n) => `<li><a href="#" aria-label="${n}">${n[0]}</a></li>`).join('');
  document.getElementById('site-footer').innerHTML = `
  <footer class="footer"><div class="wrap">
    <div class="footer-grid">
      <div>${logoHtml}<p>Independent publishing support for authors, from first draft to finished book.</p>
        <ul class="social">${soc}</ul></div>
      ${col('Services', [['Publishing', '#publishing'], ['Ghostwriting', '#ghostwriting'], ['Book Marketing', '#marketing'], ['Distribution', '#distribution']])}
      ${col('Company', [['About Us', '#about'], ['Contact', '#contact'], ['FAQs', '#faq'], ['Authors / Books', '#books']])}
      <div><h3>Contact</h3><ul><li>${site.email}</li><li>${site.phone}</li><li>${site.location}</li></ul></div>
    </div>
    <div class="footer-base"><p>© 2026 ${site.name}. All Rights Reserved.</p>
      <ul><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms &amp; Conditions</a></li><li><a href="#">Cookie Policy</a></li></ul></div>
  </div></footer>
  <button class="to-top" aria-label="Back to top" hidden>↑</button>`;
  const top = document.querySelector('.to-top');
  top.addEventListener('click', () => scrollTo({ top: 0 }));
  addEventListener('scroll', () => (top.hidden = scrollY < 900), { passive: true });
}
