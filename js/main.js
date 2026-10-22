
renderHeader('Home');
renderFooter();
document.querySelectorAll('[data-site]').forEach((el) => (el.textContent = site[el.dataset.site]));
document.title = `${site.name} | UK Book Publishing, Ghostwriting & Marketing`;


const shelfSet = books.map((b) => bookCover(b)).join('');
document.getElementById('feature-books').innerHTML = `<div class="shelf-track"><div class="shelf-set">${shelfSet}</div><div class="shelf-set" aria-hidden="true">${shelfSet}</div></div>`;

// Testimonials
const track = document.getElementById('t-track'), dots = document.getElementById('t-dots');
track.innerHTML = testimonials.map((t, i) => `<figure class="t-slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${testimonials.length}">
  <blockquote>${t.quote}</blockquote><figcaption>${t.name}${t.book ? `, <i>${t.book}</i>` : ''}</figcaption></figure>`).join('');
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

/* ===== Robot: eyes and head follow the cursor ===== */
(function () {
  const svg = document.querySelector('.robot');
  const eyes = [...svg.querySelectorAll('.eye')];
  const pupils = [...svg.querySelectorAll('.eye .pupil')];
  const head = svg.querySelector('.head');
  const look = (x, y) => {
    const box = svg.getBoundingClientRect(), k = box.width / 400;
    eyes.forEach((eye) => {
      const r = eye.getBoundingClientRect();
      const dx = x - (r.left + r.width / 2), dy = y - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1, m = Math.min(d / 150, 1) * 10 * k;
      eye.querySelector('.pupil').style.transform = `translate(${(dx / d) * m}px, ${(dy / d) * m}px)`;
    });
    const hx = (x - (box.left + box.width / 2)) / innerWidth, hy = (y - (box.top + box.height / 2)) / innerHeight;
    head.style.transform = `translate(${hx * 10}px, ${hy * 6}px) rotate(${hx * 6}deg)`;
  };
  let idle;
  const wander = () => look(innerWidth * Math.random(), innerHeight * Math.random());
  const startIdle = () => { clearInterval(idle); if (!reduce.matches) idle = setInterval(wander, 2400); };
  addEventListener('pointermove', (e) => { clearInterval(idle); look(e.clientX, e.clientY); clearTimeout(startIdle.t); startIdle.t = setTimeout(startIdle, 4000); });
  startIdle();
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

/* ===== 3D book ring ===== */
(function () {
  const stage = document.getElementById('ring-stage'), ring = document.getElementById('ring'), dots = document.getElementById('ring-dots');
  const n = books.length, step = 360 / n;
  let pos = 0, lastTouch = 0, visible = false, dragged = false;
  ring.innerHTML = books.map((b, i) => `<a class="ring-item" style="--k:${i}" href="${b.link}" target="_blank" rel="noopener" tabindex="-1" data-i="${i}">${bookCover(b)}</a>`).join('');
  dots.innerHTML = books.map((b, i) => `<button aria-label="Show ${b.title}"></button>`).join('');
  const items = [...ring.children], active = () => ((pos % n) + n) % n;
  function render() {
    const a = active(), b = books[a];
    ring.style.transform = `translateZ(calc(var(--R) * -1)) rotateY(${-pos * step}deg)`;
    items.forEach((el, i) => {
      const d = Math.min(Math.abs(i - a), n - Math.abs(i - a));
      el.style.opacity = d === 0 ? 1 : d === 1 ? 0.7 : d === 2 ? 0.35 : 0;
      el.style.pointerEvents = d > 2 ? 'none' : 'auto';
      el.classList.toggle('active', d === 0);
    });
    [...dots.children].forEach((el, i) => el.setAttribute('aria-current', i === a));
    document.getElementById('ri-title').textContent = b.title;
    document.getElementById('ri-meta').textContent = `${b.author}  ·  ${b.genre}`;
    document.getElementById('ri-link').href = b.link;
  }
  function size() {
    const w = ring.offsetWidth;
    stage.style.setProperty('--R', Math.round((w / 2) / Math.tan(Math.PI / n) * 1.2) + 'px');
    render();
  }
  const go = (d) => { pos += d; render(); };
  const to = (i) => { let d = (i - active()) % n; if (d > n / 2) d -= n; if (d < -n / 2) d += n; pos += d; render(); };
  const touch = () => (lastTouch = Date.now());
  document.getElementById('ring-prev').onclick = () => { touch(); go(-1); };
  document.getElementById('ring-next').onclick = () => { touch(); go(1); };
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
  let hover = false;
  stage.parentElement.addEventListener('mouseenter', () => (hover = true));
  stage.parentElement.addEventListener('mouseleave', () => (hover = false));
  setInterval(() => { if (!reduce.matches && visible && !hover && Date.now() - lastTouch > 6000) go(1); }, 3800);
  addEventListener('resize', size); size();
})();
