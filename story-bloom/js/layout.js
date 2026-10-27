const logoHtml = `<a class="logo" href="index.html" aria-label="${site.name} home"><img class="logo-mark" src="assets/images/logo-emblem.png" width="241" height="192" alt=""><span class="logo-words"><b>STORY BLOOM</b><i></i><small>PUBLISHERS</small></span></a>`;
const footLogo = `<a class="logo logo-tile" href="index.html" aria-label="${site.name} home"><img src="assets/images/logo.jpg" width="530" height="435" alt="${site.name}"></a>`;

function renderHeader(active = 'Home') {
  const links = nav.map(([l, h]) => `<li><a href="${h}" ${l === active ? 'aria-current="page"' : ''}>${l}</a></li>`).join('');
  document.getElementById('site-header').innerHTML = `
  <a class="skip" href="#main">Skip to content</a>
  <header class="header"><div class="wrap header-in">
    ${logoHtml}
    <button class="burger" aria-expanded="false" aria-controls="menu" aria-label="Open menu"><span></span><span></span></button>
    <nav id="menu" class="menu" aria-label="Main"><ul>${links}</ul>
      <a class="btn btn-primary" href="${document.getElementById('contact') ? '#contact' : 'index.html#contact'}">Get a Free Consultation</a></nav>
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
  const ICONS = {'Facebook': '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-4 1.7-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5z"/></svg>', 'Instagram': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17" cy="7" r=".8" fill="currentColor"/></svg>', 'LinkedIn': '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="4" y="9" width="3.5" height="11"/><circle cx="5.75" cy="5.5" r="2"/><path d="M10 9h3.4v1.6C14 9.5 15.2 8.8 16.8 8.8 20 8.8 20.5 11 20.5 13.5V20H17v-5.6c0-1.3 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V20H10z"/></svg>', 'X': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>'};
  const soc = Object.keys(site.socials).map((n) => `<li><a href="${site.socials[n]}" aria-label="${n}" target="_blank" rel="noopener">${ICONS[n]}</a></li>`).join('');
  document.getElementById('site-footer').innerHTML = `
  <footer class="footer"><div class="wrap">
    <div class="footer-grid">
      <div>${footLogo}<p>Independent publishing support for authors, from first draft to finished book.</p>
        <ul class="social">${soc}</ul></div>
      ${col('Services', [['Publishing', 'publishing.html'], ['Ghostwriting', 'ghostwriting.html'], ['Book Marketing', 'book-marketing.html'], ['Distribution', 'distribution.html']])}
      ${col('Company', [['About Us', 'about.html'], ['Contact', 'index.html#contact'], ['FAQs', 'index.html#faq'], ['Authors / Books', 'index.html#books']])}
      <div><h3>Contact</h3><ul><li>${site.email}</li><li>${site.phone}</li><li>${site.location}</li></ul></div>
    </div>
    <div class="footer-base"><p>© 2026 ${site.name}. All Rights Reserved.</p>
      <ul><li><a href="privacy.html">Privacy Policy</a></li><li><a href="terms.html">Terms &amp; Conditions</a></li><li><a href="cookies.html">Cookie Policy</a></li></ul></div>
  </div></footer>
  <button class="to-top" aria-label="Back to top" hidden>↑</button>`;
  const top = document.querySelector('.to-top');
  top.addEventListener('click', () => scrollTo({ top: 0 }));
  addEventListener('scroll', () => (top.hidden = scrollY < 900), { passive: true });
}
