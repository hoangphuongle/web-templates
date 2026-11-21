/* ==========================================================================
   PET.CARE — PET SITTING, GROOMING & VETERINARY CLINIC TEMPLATE (SCRIPT.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Menu
  const burger = document.getElementById('pcBurger');
  const navLinks = document.getElementById('pcNavLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  // 2. Hero Dual-Oval Pet Portrait Switcher ("Next ↗")
  const heroMainImg = document.getElementById('pcHeroMainImg');
  const heroSideImg = document.getElementById('pcHeroSideImg');
  const heroNextBtn = document.getElementById('pcHeroNextBtn');
  const heroPairs = [
    ['img/cat-peach.jpg', 'img/cat-play-pink.jpg'],
    ['img/cat-play-pink.jpg', 'img/dog-teal.jpg'],
    ['img/dog-teal.jpg', 'img/cat-blue.jpg'],
  ];
  let pairIdx = 0;

  if (heroNextBtn) {
    heroNextBtn.addEventListener('click', () => {
      pairIdx = (pairIdx + 1) % heroPairs.length;
      if (heroMainImg) heroMainImg.src = heroPairs[pairIdx][0];
      if (heroSideImg) heroSideImg.src = heroPairs[pairIdx][1];
    });
  }

  // 3. Testimonials Switcher
  const testimonials = [
    {
      quote:
        '“Nơi duy nhất tôi hoàn toàn yên tâm gửi bé cưng mỗi khi đi công tác xa. Điều duy nhất khiến tôi \'đau đầu\' là bé vui đến mức chẳng muốn về nhà! Các bạn nhân viên cực kỳ nhẹ nhàng và luôn gửi hình ảnh, video bé chơi đùa mỗi buổi chiều.”',
      name: 'Christina Klein · Minh Thảo',
      role: 'CEO – Designtech',
      img: 'img/cat-peach.jpg',
    },
    {
      quote:
        '“Bác sĩ thú y tại Pet.care chẩn đoán và điều trị rất tận tình. Bé mèo Anh nhà mình từng biếng ăn lâu ngày nhưng sau liệu trình dinh dưỡng 2 tuần đã khỏe mạnh và lanh lợi trở lại.”',
      name: 'David Nguyễn · Hoàng Bách',
      role: 'Architect – StudioHB',
      img: 'img/cat-blue.jpg',
    },
    {
      quote:
        '“Dịch vụ dạo bộ 1-kèm-1 và tắm spa cắt tỉa lông cho bé Poodle cực kỳ ưng ý, lông thơm mềm suốt cả tuần!”',
      name: 'Hương Giang · Sarah Lee',
      role: 'Product Manager',
      img: 'img/dog-teal.jpg',
    },
  ];

  let testiIdx = 0;
  const testiQuote = document.getElementById('pcTestiQuote');
  const testiName = document.getElementById('pcTestiName');
  const testiRole = document.getElementById('pcTestiRole');
  const testiImg = document.getElementById('pcTestiImg');

  function setTesti(idx) {
    testiIdx = (idx + testimonials.length) % testimonials.length;
    const t = testimonials[testiIdx];
    if (testiQuote) testiQuote.textContent = t.quote;
    if (testiName) testiName.textContent = t.name;
    if (testiRole) testiRole.textContent = t.role;
    if (testiImg) testiImg.src = t.img;
  }

  document.getElementById('pcTestiPrev')?.addEventListener('click', () => setTesti(testiIdx - 1));
  document.getElementById('pcTestiNext')?.addEventListener('click', () => setTesti(testiIdx + 1));

  // 4. Newsletter Form
  const nlForm = document.getElementById('pcNewsletterForm');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('🐾 Cảm ơn bạn đã đăng ký cẩm nang chăm sóc thú cưng Pet.care!');
      nlForm.reset();
    });
  }

  // 5. Appointment Modal
  const modal = document.getElementById('pcModal');
  const modalTitle = document.getElementById('pcModalTitle');
  const modalClose = document.getElementById('pcModalClose');
  const modalForm = document.getElementById('pcModalForm');

  function openModal(title) {
    if (modalTitle && title) modalTitle.textContent = title;
    if (modal) {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  document.querySelectorAll('[data-open-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openModal(btn.getAttribute('data-open-modal'));
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('pcCustName')?.value.trim() || '';
      const phone = document.getElementById('pcCustPhone')?.value.trim() || '';
      const service = document.getElementById('pcServiceType')?.value || '';
      const pet = document.getElementById('pcPetInfo')?.value.trim() || '';
      const note = document.getElementById('pcCustNote')?.value.trim() || '';
      const msg = `Chào Pet.care, mình là ${name} (${phone}). Đặt lịch: ${service} cho bé: ${pet || 'Thú cưng'}. Ghi chú: ${note || 'Tư vấn lịch trống'}`;
      showToast('🐾 Đang kết nối Zalo bác sĩ & chuyên viên Pet.care...');
      window.open(`https://zalo.me/0974100372?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      closeModal();
    });
  }

  // 6. Toast Helper
  const toastEl = document.getElementById('pcToast');
  let toastTimer = null;
  function showToast(text) {
    if (!toastEl) return;
    toastEl.textContent = text;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, 2800);
  }

  // 7. Smooth Scroll-Reveal & Escape Key Handling
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      if (navLinks) navLinks.classList.remove('is-open');
    }
  });

  const revealTargets = document.querySelectorAll(
    '.pc-help-inner, .pc-takecare-card, .pc-services-grid > div, .pc-stat-pill, .pc-safehands-grid > div, .pc-testi-card, .pc-newsletter-box'
  );
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    revealTargets.forEach((el, idx) => {
      el.classList.add('pc-reveal');
      el.style.transitionDelay = `${(idx % 4) * 55}ms`;
      io.observe(el);
    });
  }
});

