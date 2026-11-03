// ===== Speech (British voice) =====
let ukVoice = null;
function loadVoice() {
  const v = speechSynthesis.getVoices();
  ukVoice = v.find(x => x.lang === 'en-GB' && /female|Kate|Serena|Google UK English Female/i.test(x.name)) || v.find(x => x.lang === 'en-GB') || null;
}
if ('speechSynthesis' in window) { loadVoice(); speechSynthesis.onvoiceschanged = loadVoice; }
function speak(text) {
  if (!('speechSynthesis' in window)) return alert('Trình duyệt không hỗ trợ phát âm.');
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB'; u.rate = 0.9; if (ukVoice) u.voice = ukVoice;
  speechSynthesis.speak(u);
}

// ===== Data =====
const words = [
  { w: 'Brilliant', ipa: '/ˈbrɪl.jənt/', m: 'Tuyệt vời', ex: '"That was brilliant!"' },
  { w: 'Cheers', ipa: '/tʃɪəz/', m: 'Cảm ơn / Cạn ly', ex: '"Cheers, mate!"' },
  { w: 'Knackered', ipa: '/ˈnæk.əd/', m: 'Mệt rã rời', ex: '"I\'m absolutely knackered."' },
  { w: 'Queue', ipa: '/kjuː/', m: 'Xếp hàng', ex: '"Please join the queue."' },
  { w: 'Rubbish', ipa: '/ˈrʌb.ɪʃ/', m: 'Rác / vớ vẩn', ex: '"That film was rubbish."' },
  { w: 'Gutted', ipa: '/ˈɡʌt.ɪd/', m: 'Rất thất vọng', ex: '"I was gutted we lost."' },
  { w: 'Chuffed', ipa: '/tʃʌft/', m: 'Rất vui, hài lòng', ex: '"She\'s chuffed to bits."' },
  { w: 'Bloke', ipa: '/bləʊk/', m: 'Anh chàng', ex: '"He\'s a nice bloke."' },
  { w: 'Fortnight', ipa: '/ˈfɔːt.naɪt/', m: 'Hai tuần', ex: '"See you in a fortnight."' },
  { w: 'Cuppa', ipa: '/ˈkʌp.ə/', m: 'Tách trà', ex: '"Fancy a cuppa?"' },
];
const ukus = [
  ['Flat', 'Apartment', 'Căn hộ'], ['Lift', 'Elevator', 'Thang máy'], ['Biscuit', 'Cookie', 'Bánh quy'],
  ['Lorry', 'Truck', 'Xe tải'], ['Holiday', 'Vacation', 'Kỳ nghỉ'], ['Chips', 'French fries', 'Khoai tây chiên'],
  ['Trousers', 'Pants', 'Quần dài'], ['Underground', 'Subway', 'Tàu điện ngầm'], ['Mobile', 'Cell phone', 'Điện thoại'],
  ['Petrol', 'Gas', 'Xăng'], ['Autumn', 'Fall', 'Mùa thu'], ['Postcode', 'Zip code', 'Mã bưu chính'],
];
const quiz = [
  { q: 'Người Anh gọi "thang máy" là gì?', o: ['Elevator', 'Lift', 'Hoist', 'Riser'], a: 1 },
  { q: '"I\'m knackered" nghĩa là?', o: ['Tôi đói', 'Tôi vui', 'Tôi rất mệt', 'Tôi buồn'], a: 2 },
  { q: 'Từ British cho "apartment"?', o: ['Flat', 'Condo', 'Block', 'Loft'], a: 0 },
  { q: 'Cách viết British đúng?', o: ['Color', 'Colour', 'Colur', 'Coler'], a: 1 },
  { q: '"Fortnight" là bao lâu?', o: ['1 tuần', '2 tuần', '1 tháng', '4 ngày'], a: 1 },
  { q: '"Chips" ở Anh là?', o: ['Khoai tây lát mỏng', 'Khoai tây chiên que', 'Bánh quy', 'Kẹo'], a: 1 },
  { q: 'Người Anh nói "Cheers" khi nào?', o: ['Chỉ khi uống rượu', 'Để cảm ơn / chào', 'Khi tức giận', 'Khi xin lỗi'], a: 1 },
];
const phrases = [
  ['How do you do?', 'Rất hân hạnh được gặp (trang trọng)'], ['Fancy a cuppa?', 'Uống trà không?'],
  ['Are you alright?', 'Bạn khoẻ không? (chào hỏi)'], ['Could I possibly…?', 'Liệu tôi có thể… (lịch sự)'],
  ['Mind the gap.', 'Chú ý khoảng trống (tàu điện)'], ['I\'m sorry, I beg your pardon?', 'Xin lỗi, bạn nói lại được không?'],
  ['Lovely weather, isn\'t it?', 'Thời tiết đẹp nhỉ?'], ['Cheers for that!', 'Cảm ơn nhé!'],
  ['No worries.', 'Không sao đâu.'], ['Shall we grab a bite?', 'Mình đi ăn chút gì nhé?'],
];

// ===== Phrase of the day =====
const today = phrases[new Date().getDate() % phrases.length];
document.getElementById('potd').textContent = `"${today[0]}"`;
document.getElementById('potdMean').textContent = today[1];
document.getElementById('potdSpeak').onclick = () => speak(today[0]);

// ===== Flashcards =====
let fi = 0;
const fc = document.getElementById('flashcard');
function renderFC() {
  const c = words[fi];
  fc.classList.remove('flipped');
  fcWord.textContent = c.w; fcIpa.textContent = c.ipa; fcMean.textContent = c.m; fcEx.textContent = c.ex;
  fcCount.textContent = `${fi + 1}/${words.length}`;
}
fc.onclick = () => fc.classList.toggle('flipped');
fcNext.onclick = () => { fi = (fi + 1) % words.length; renderFC(); };
fcPrev.onclick = () => { fi = (fi - 1 + words.length) % words.length; renderFC(); };
fcSpeak.onclick = () => speak(words[fi].w);
renderFC();

// ===== UK vs US =====
ukusGrid.innerHTML = ukus.map(([uk, us, vi]) => `
  <div class="ukus"><div><b>${uk}</b><small>Mỹ: ${us} · ${vi}</small></div>
  <button class="mini" data-say="${uk}" aria-label="Nghe ${uk}"><svg class="ico"><use href="#i-sound"/></svg></button></div>`).join('');

// ===== Phrases =====
phraseList.innerHTML = phrases.map(([en, vi]) => `
  <div class="phrase-item"><div><b>${en}</b><small>${vi}</small></div>
  <button class="mini" data-say="${en.replace(/"/g, '')}"><svg class="ico"><use href="#i-sound"/></svg></button></div>`).join('');

document.addEventListener('click', e => { const b = e.target.closest('[data-say]'); if (b) speak(b.dataset.say); });

// ===== Quiz =====
let qi = 0, score = 0;
function renderQ() {
  if (qi >= quiz.length) {
    qText.textContent = `Hoàn thành! Bạn đúng ${score}/${quiz.length} câu.`;
    qOpts.innerHTML = `<button class="btn" id="qRestart">Làm lại</button>`;
    qRestart.onclick = () => { qi = 0; score = 0; qScore.textContent = 'Điểm: 0'; renderQ(); };
    qNext.disabled = true; qBar.style.width = '100%'; return;
  }
  const q = quiz[qi];
  qBar.style.width = `${(qi / quiz.length) * 100}%`;
  qText.textContent = `Câu ${qi + 1}: ${q.q}`;
  qOpts.innerHTML = q.o.map((o, i) => `<button class="opt" data-i="${i}">${o}</button>`).join('');
  qNext.disabled = true;
  qOpts.querySelectorAll('.opt').forEach(b => b.onclick = () => {
    const i = +b.dataset.i;
    qOpts.querySelectorAll('.opt').forEach((x, k) => { x.disabled = true; if (k === q.a) x.classList.add('right'); });
    if (i === q.a) score++; else b.classList.add('wrong');
    qScore.textContent = `Điểm: ${score}`; qNext.disabled = false;
  });
}
qNext.onclick = () => { qi++; renderQ(); };
renderQ();

// ===== Tabs =====
document.querySelectorAll('.tab').forEach(t => t.onclick = () => {
  document.querySelectorAll('.tab, .panel').forEach(x => x.classList.remove('active'));
  t.classList.add('active'); document.getElementById(t.dataset.tab).classList.add('active');
});

// ===== Nav, reveal, counters, form =====
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 40));
burger.onclick = () => navLinks.classList.toggle('open');
navLinks.querySelectorAll('a').forEach(a => a.onclick = () => navLinks.classList.remove('open'));

const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('show');
  if (e.target.classList.contains('stagger'))
    setTimeout(() => [...e.target.children].forEach(c => c.style.transitionDelay = ''), 1600);
  e.target.querySelectorAll('[data-count]').forEach(el => {
    const end = +el.dataset.count; let n = 0; const step = Math.ceil(end / 60);
    const t = setInterval(() => { n = Math.min(end, n + step); el.textContent = n.toLocaleString(); if (n === end) clearInterval(t); }, 25);
  });
  io.unobserve(e.target);
}), { threshold: .15, rootMargin: '0px 0px -8% 0px' });

// ===== Motion setup =====
// Ảnh phần giới thiệu: hiệu ứng mở màn
document.querySelector('.about-visual .flag-card')?.classList.add('reveal-img');
// Các nhóm phần tử xuất hiện lần lượt (stagger)
document.querySelectorAll('.cards, .checks, .ukus-grid, .phrase-list, .info').forEach(g => {
  g.querySelectorAll('.reveal').forEach(c => c.classList.remove('reveal'));
  g.classList.add('stagger');
  [...g.children].forEach((c, i) => c.style.transitionDelay = `${i * 0.1}s`);
  io.observe(g);
});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// Số liệu ở hero
document.querySelectorAll('.stats').forEach(el => setTimeout(() => io.observe(el), 1000));

// Intro khi tải trang
requestAnimationFrame(() => document.documentElement.classList.add('loaded'));

// Cuộn mượt (Lenis) + parallax + thanh tiến độ
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const parallax = [...document.querySelectorAll('[data-speed]')];
const sections = [...document.querySelectorAll('main section[id]')];
const navMap = Object.fromEntries([...navLinks.querySelectorAll('a[href^="#"]')].filter(a => a.hash.length > 1).map(a => [a.hash.slice(1), a]));

function onScroll() {
  const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
  nav.classList.toggle('scrolled', y > 40);
  if (!reduce && innerWidth > 720) parallax.forEach(el => el.style.translate = `0 ${y * +el.dataset.speed}px`);
  let cur = null;
  sections.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = s.id; });
  Object.entries(navMap).forEach(([id, a]) => a.classList.toggle('active', id === cur));
}

let lenis = null;
window.addEventListener('load', () => {
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on('scroll', onScroll);
    const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
});
addEventListener('scroll', () => { if (!lenis) onScroll(); }, { passive: true });
onScroll();

// Link trong trang: cuộn mượt có bù chiều cao menu
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const id = a.getAttribute('href');
  if (id.length < 2) return;
  const t = document.querySelector(id); if (!t) return;
  e.preventDefault();
  navLinks.classList.remove('open');
  lenis ? lenis.scrollTo(t, { offset: -70 }) : window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' });
}));

// ===== Facebook =====
const FB_URL = 'https://www.facebook.com/hth98';
document.querySelectorAll('[data-messenger]').forEach(a => a.href = FB_URL);

form.onsubmit = e => {
  e.preventDefault();
  window.open(FB_URL, '_blank');
  formOk.hidden = false; form.reset();
};
