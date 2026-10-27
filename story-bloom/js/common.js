/* Shared behaviour for inner pages (Publishing, and later Ghostwriting, Marketing, etc.).
   Load order: site-data.js, books.js, layout.js, common.js. Set <body data-page="Publishing"> to highlight the nav link. */
renderHeader(document.body.dataset.page || '');
renderFooter();
document.querySelectorAll('[data-site]').forEach((el) => (el.textContent = site[el.dataset.site]));
const reduce = matchMedia('(prefers-reduced-motion: reduce)');

// Hero headline: word by word, same as the homepage
const h1 = document.querySelector('.hero h1');
if (h1) h1.innerHTML = h1.textContent.trim().split(' ').map((w, i) => `<span class="w" style="--i:${i}"><span>${w}</span></span>`).join(' ');

// Hero cover fan: <div id="hero-visual" data-fan="Title one|Title two|...">
const hero = document.getElementById('hero-visual');
if (hero && hero.dataset.fan) {
  hero.innerHTML = hero.dataset.fan.split('|').map((t) => books.find((b) => b.title === t)).filter(Boolean)
    .map((b, i) => `<div class="fan f${i}">${bookCover(b, false)}</div>`).join('');
  if (!reduce.matches && matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', (e) => {
      hero.style.setProperty('--px', (e.clientX / innerWidth - 0.5) * 2);
      hero.style.setProperty('--py', (e.clientY / innerHeight - 0.5) * 2);
    });
  }
}

// Scrolling shelf of covers: <div class="shelf" id="feature-books">
const shelf = document.getElementById('feature-books');
if (shelf) {
  const set = books.map((b) => bookCover(b)).join('');
  shelf.innerHTML = `<div class="shelf-track"><div class="shelf-set">${set}</div><div class="shelf-set" aria-hidden="true">${set}</div></div>`;
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach((q) => q.addEventListener('click', () => {
  const open = q.getAttribute('aria-expanded') === 'true';
  q.setAttribute('aria-expanded', !open);
  q.nextElementSibling.classList.toggle('open', !open);
}));

// Scroll reveal and staggered children
const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: 0.12 });
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
['.steps', '.why-list', '.solutions', '.shelf'].forEach((sel) => {
  const box = document.querySelector(sel);
  if (box) [...box.children].forEach((c, i) => c.style.setProperty('--i', i));
});

// Reading progress bar
const bar = document.createElement('div');
bar.className = 'progress';
bar.setAttribute('aria-hidden', 'true');
document.body.appendChild(bar);
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
}, { passive: true });

/* Enquiry form, contact links, WhatsApp (same behaviour as the homepage) */
(function () {
  document.getElementById('c-email').href = 'mailto:' + site.email;
  document.getElementById('c-phone').href = 'tel:' + site.phone.replace(/[^+\d]/g, '');
  const sel = document.getElementById('f-service');
  document.querySelectorAll('.more[data-service]').forEach((a) => a.addEventListener('click', () => {
    [...sel.options].forEach((o) => { if (o.value === a.dataset.service) sel.value = o.value; });
  }));
  if (site.whatsapp) {
    const w = document.createElement('a');
    w.className = 'wa'; w.target = '_blank'; w.rel = 'noopener'; w.setAttribute('aria-label', 'Chat on WhatsApp');
    w.href = 'https://wa.me/' + site.whatsapp + '?text=' + encodeURIComponent('Hello, I would like to ask about publishing my book.');
    w.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3zm4.6 12.4c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-3-1.2-4.9-4.2-5-4.4-.2-.2-1.2-1.6-1.2-3s.8-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.4z"/></svg>';
    document.body.appendChild(w);
  }
  const f = document.getElementById('enquiry'), note = document.getElementById('form-note');
  const say = (t, cls) => { note.textContent = t; note.className = 'form-note ' + (cls || ''); };
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!f.checkValidity()) { f.reportValidity(); return; }
    if (f.elements['_gotcha'].value) return; // spam trap
    const data = new FormData(f), btn = f.querySelector('button');
    if (site.formEndpoint) {
      btn.disabled = true; say('Sending…');
      try {
        const r = await fetch(site.formEndpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!r.ok) throw new Error();
        f.reset(); say('Thank you. We have received your enquiry and will be in touch soon.', 'ok');
      } catch (_) { say('Sorry, something went wrong. Please email us directly instead.', 'err'); }
      btn.disabled = false;
    } else {
      const body = ['Name: ' + data.get('name'), 'Email: ' + data.get('email'), 'Interested in: ' + data.get('service'), 'Stage: ' + data.get('stage'), '', 'About the book: ' + data.get('message')].join('\n');
      location.href = 'mailto:' + site.email + '?subject=' + encodeURIComponent('Book enquiry from ' + data.get('name')) + '&body=' + encodeURIComponent(body);
      say('Your email app should open with your enquiry ready to send.', 'ok');
    }
  });
})();
