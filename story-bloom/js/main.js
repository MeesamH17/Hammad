
renderHeader('Home');
renderFooter();
document.querySelectorAll('[data-site]').forEach((el) => (el.textContent = site[el.dataset.site]));
document.title = `${site.name} | UK Book Publishing, Ghostwriting & Marketing`;


const shelfSet = books.map((b) => bookCover(b)).join('');
document.getElementById('feature-books').innerHTML = `<div class="shelf-track"><div class="shelf-set">${shelfSet}</div><div class="shelf-set" aria-hidden="true">${shelfSet}</div></div>`;

// Testimonials
const track = document.getElementById('t-track'), dots = document.getElementById('t-dots');
track.innerHTML = testimonials.map((t, i) => `<figure class="t-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${testimonials.length}">
  <blockquote>${t.quote}</blockquote><figcaption><strong>${t.name}</strong><span>${t.role}</span></figcaption></figure>`).join('');
dots.innerHTML = testimonials.map((_, i) => `<button aria-label="Go to testimonial ${i + 1}"></button>`).join('');
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const go = (i) => track.scrollTo({ left: i * track.clientWidth, behavior: reduce.matches ? 'auto' : 'smooth' });
const cur = () => Math.round(track.scrollLeft / track.clientWidth);
const sync = () => [...dots.children].forEach((d, i) => d.setAttribute('aria-current', i === cur()));
track.addEventListener('scroll', sync, { passive: true });
dots.addEventListener('click', (e) => { const i = [...dots.children].indexOf(e.target); if (i > -1) go(i); });
document.getElementById('t-prev').onclick = () => go(Math.max(0, cur() - 1));
document.getElementById('t-next').onclick = () => go(Math.min(testimonials.length - 1, cur() + 1));
sync();

// FAQ accordion
document.querySelectorAll('.faq-q').forEach((q) => q.addEventListener('click', () => {
  const open = q.getAttribute('aria-expanded') === 'true';
  q.setAttribute('aria-expanded', !open);
  q.nextElementSibling.classList.toggle('open', !open);
}));

// Scroll reveal (one gentle fade per section)
const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: 0.12 });
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

/* ===== Motion ===== */
// Split the hero headline into words for a staggered entrance
const h1 = document.querySelector('.hero h1');
h1.innerHTML = h1.textContent.trim().split(' ').map((w, i) => `<span class="w" style="--i:${i}"><span>${w}</span></span>`).join(' ');

// Give siblings an index so they enter one after another
['.services', '.steps', '.why-list', '.book-grid', '.trust-list', '.solutions', '.shelf'].forEach((sel) => {
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

/* ===== Hero: fan of real book covers ===== */
(function () {
  const hero = document.getElementById('hero-visual');
  const order = ['Snippets', 'Growing Better Not Older', 'Ten Quiet Minutes with God', 'Vita Brevis', 'Six Bullets to a Man'];
  hero.innerHTML = order.map((t) => books.find((b) => b.title === t)).filter(Boolean)
    .map((b, i) => `<div class="fan f${i}">${bookCover(b, false)}</div>`).join('');
  if (!reduce.matches && matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', (e) => {
      hero.style.setProperty('--px', (e.clientX / innerWidth - 0.5) * 2);
      hero.style.setProperty('--py', (e.clientY / innerHeight - 0.5) * 2);
    });
  }
})();

/* ===== Services carousel ===== */
(function () {
  const t = document.getElementById('svc-track'), prev = document.getElementById('svc-prev'), next = document.getElementById('svc-next');
  const step = () => t.querySelector('.service').getBoundingClientRect().width;
  const upd = () => { prev.disabled = t.scrollLeft < 4; next.disabled = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4; };
  const go = (dir) => t.scrollBy({ left: dir * step(), behavior: reduce.matches ? 'auto' : 'smooth' });
  prev.onclick = () => go(-1); next.onclick = () => go(1);
  t.addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
})();

/* ===== Marquee: duplicate the set so the loop is seamless ===== */
(function () {
  const track = document.getElementById('marquee-track'), set = track.firstElementChild;
  const copy = set.cloneNode(true); copy.setAttribute('aria-hidden', 'true'); track.appendChild(copy);
})();

/* ===== 3D book rings (general + children's) ===== */
function makeRing(sfx, list) {
  const $ = (id) => document.getElementById(id + sfx);
  const stage = $('ring-stage'), ring = $('ring'), dots = $('ring-dots');
  const m = list.length, reps = m < 8 ? 2 : 1, n = m * reps, step = 360 / n; // few books: repeat them so the ring looks full
  let pos = 0, lastTouch = 0, visible = false, dragged = false, hover = false;
  stage.style.setProperty('--step', step + 'deg');
  ring.innerHTML = Array.from({ length: n }, (_, i) => list[i % m]).map((b, i) => `<a class="ring-item" style="--k:${i}" href="${b.link}" target="_blank" rel="noopener" tabindex="-1" data-i="${i}"${i >= m ? ' aria-hidden="true"' : ''}>${bookCover(b)}</a>`).join('');
  dots.innerHTML = list.map((b) => `<button aria-label="Show ${b.title}"></button>`).join('');
  const items = [...ring.children], active = () => ((pos % n) + n) % n;
  function render() {
    const a = active(), b = list[a % m];
    ring.style.transform = `translateZ(calc(var(--R) * -1)) rotateY(${-pos * step}deg)`;
    items.forEach((el, i) => {
      const d = Math.min(Math.abs(i - a), n - Math.abs(i - a));
      el.style.opacity = d === 0 ? 1 : d === 1 ? 0.7 : d === 2 ? 0.35 : 0;
      el.style.pointerEvents = d > 2 ? 'none' : 'auto';
      el.classList.toggle('active', d === 0);
    });
    [...dots.children].forEach((el, i) => el.setAttribute('aria-current', i === a % m));
    $('ri-title').textContent = b.title;
    $('ri-meta').textContent = `${b.author}  ·  ${b.genre}`;
    $('ri-link').href = b.link;
  }
  function size() {
    const w = ring.offsetWidth, f = n >= 8 ? 1.2 : 1.3;
    stage.style.setProperty('--R', Math.round((w / 2) / Math.tan(Math.PI / n) * f) + 'px');
    render();
  }
  const go = (d) => { pos += d; render(); };
  const to = (i) => { let best = null; for (let k = 0; k < reps; k++) { let d = ((i % m) + k * m - active()) % n; if (d > n / 2) d -= n; if (d < -n / 2) d += n; if (best === null || Math.abs(d) < Math.abs(best)) best = d; } pos += best; render(); };
  const touch = () => (lastTouch = Date.now());
  $('ring-prev').onclick = () => { touch(); go(-1); };
  $('ring-next').onclick = () => { touch(); go(1); };
  dots.addEventListener('click', (e) => { const i = [...dots.children].indexOf(e.target); if (i > -1) { touch(); to(i); } });
  ring.addEventListener('click', (e) => {
    const el = e.target.closest('.ring-item');
    if (dragged) { e.preventDefault(); dragged = false; return; }
    if (el && !el.classList.contains('active')) { e.preventDefault(); touch(); to(+el.dataset.i); }
  });
  let x0 = null;
  stage.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
  addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) { dragged = true; touch(); go(dx < 0 ? 1 : -1); setTimeout(() => (dragged = false), 50); }
  });
  stage.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { touch(); go(1); } if (e.key === 'ArrowLeft') { touch(); go(-1); } });
  let wheelT = 0;
  stage.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
      e.preventDefault();
      if (Date.now() - wheelT > 450) { wheelT = Date.now(); touch(); go(e.deltaX > 0 ? 1 : -1); }
    }
  }, { passive: false });
  new IntersectionObserver((es) => (visible = es[0].isIntersecting)).observe(stage);
  stage.parentElement.addEventListener('mouseenter', () => (hover = true));
  stage.parentElement.addEventListener('mouseleave', () => (hover = false));
  setInterval(() => { if (!reduce.matches && visible && !hover && Date.now() - lastTouch > 6000) go(1); }, 3800);
  addEventListener('resize', size); size();
}
makeRing('', books);
makeRing('-kids', childrenBooks);

/* ===== Enquiry form, contact links, WhatsApp, hidden placeholders ===== */
(function () {
  if (!testimonialsReady) document.getElementById('testimonials').hidden = true;
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
