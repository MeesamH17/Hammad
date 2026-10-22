
renderHeader('Home');
renderFooter();
document.querySelectorAll('[data-site]').forEach((el) => (el.textContent = site[el.dataset.site]));
document.title = `${site.name} | UK Book Publishing, Ghostwriting & Marketing`;


document.getElementById('feature-books').innerHTML = books.slice(0, 4).map((b) => bookCover(b)).join('');
document.getElementById('book-grid').innerHTML = books.map((b) =>
  `<a class="book-item" href="${b.link}">${bookCover(b)}<h3>${b.title}</h3><p>${b.author}</p><small>${b.genre}</small></a>`).join('');

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
