/* ==========================================================================
   JIGEN SUSHI (次元寿司) — JAPANESE SUSHI & OMAKASE TEMPLATE (SCRIPT.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Menu
  const burger = document.getElementById('jgBurger');
  const navLinks = document.getElementById('jgNavLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  // 2. Interactive Phone App Mockup Stepper & Order Button
  const qtyMinus = document.getElementById('jgQtyMinus');
  const qtyPlus = document.getElementById('jgQtyPlus');
  const qtyVal = document.getElementById('jgQtyVal');
  const phonePrice = document.getElementById('jgPhonePrice');
  const phoneOrderBtn = document.getElementById('jgPhoneOrderBtn');

  let qty = 1;
  const unitPriceK = 299;

  function updatePhoneQty() {
    if (qtyVal) qtyVal.textContent = String(qty);
    if (phonePrice) phonePrice.textContent = `${qty * unitPriceK}K`;
  }

  if (qtyMinus) {
    qtyMinus.addEventListener('click', () => {
      qty = Math.max(1, qty - 1);
      updatePhoneQty();
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener('click', () => {
      qty = Math.min(20, qty + 1);
      updatePhoneQty();
    });
  }

  if (phoneOrderBtn) {
    phoneOrderBtn.addEventListener('click', () => {
      openReservationModal(`Đặt Món Nhanh: ${qty}x Sesame Salmon Stock Maki (${qty * unitPriceK}.000đ)`);
    });
  }

  // 3. Cool Unique Premium Items Category Filter & Prev/Next
  const catBtns = document.querySelectorAll('.jg-cat-btn');
  const itemCards = Array.from(document.querySelectorAll('.jg-item-card'));
  const prevBtn = document.getElementById('jgMenuPrev');
  const nextBtn = document.getElementById('jgMenuNext');

  catBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      catBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const cat = btn.getAttribute('data-cat') || 'all';

      itemCards.forEach((card) => {
        const match = cat === 'all' || card.getAttribute('data-category') === cat;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  let activeCatIdx = 1;
  function cycleCategory(dir) {
    if (!catBtns.length) return;
    activeCatIdx = (activeCatIdx + dir + catBtns.length) % catBtns.length;
    catBtns[activeCatIdx].click();
  }

  if (prevBtn) prevBtn.addEventListener('click', () => cycleCategory(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => cycleCategory(1));

  // 4. Table Reservation & Quick Order Modal
  const modal = document.getElementById('jgModal');
  const modalTitle = document.getElementById('jgModalTitle');
  const modalClose = document.getElementById('jgModalClose');
  const modalForm = document.getElementById('jgModalForm');
  const modalDate = document.getElementById('jgModalDate');

  if (modalDate) {
    const today = new Date().toISOString().split('T')[0];
    modalDate.value = today;
    modalDate.min = today;
  }

  function openReservationModal(title) {
    if (modalTitle && title) modalTitle.textContent = title;
    if (modal) {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeReservationModal() {
    if (modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  document.querySelectorAll('[data-open-modal]').forEach((el) => {
    el.addEventListener('click', () => {
      openReservationModal(el.getAttribute('data-open-modal'));
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeReservationModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeReservationModal();
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('jgModalName')?.value.trim() || '';
      const phone = document.getElementById('jgModalPhone')?.value.trim() || '';
      const date = document.getElementById('jgModalDate')?.value || '';
      const guests = document.getElementById('jgModalGuests')?.value || '';
      const note = document.getElementById('jgModalNote')?.value.trim() || '';
      const titleText = modalTitle ? modalTitle.textContent : 'Đặt bàn Jigen Sushi';
      const msg = `Chào Jigen Sushi, mình là ${name} (${phone}). Yêu cầu: ${titleText} - Ngày: ${date} - ${guests}. Ghi chú: ${note || 'Không có'}`;
      showToast('🍣 Đang kết nối Zalo xác nhận đặt bàn...');
      window.open(`https://zalo.me/0974100372?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      closeReservationModal();
    });
  }

  // 5. Toast Helper
  const toastEl = document.getElementById('jgToast');
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

  // 6. Smooth Scroll-Reveal & Escape Key Handling
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeReservationModal();
      if (navLinks) navLinks.classList.remove('is-open');
    }
  });

  const revealTargets = document.querySelectorAll(
    '.jg-why-card, .jg-app-grid > div, .jg-about-grid > div, .jg-item-card, .jg-exp-grid > div, .jg-reserve-grid > div'
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
      el.classList.add('jg-reveal');
      el.style.transitionDelay = `${(idx % 3) * 60}ms`;
      io.observe(el);
    });
  }
});

