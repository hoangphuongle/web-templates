/* ==========================================================================
   TENNISPRO® — TENNIS TRAINING, PERFORMANCE & COURT BOOKING (SCRIPT.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Menu
  const burger = document.getElementById('tpBurger');
  const navLinks = document.getElementById('tpNavLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  // 2. Interactive TRAINING PROGRESS HUD (+72% Gauge & Metric Bars)
  const gaugeCircle = document.getElementById('tpGaugeCircle');
  const gaugeValue = document.getElementById('tpGaugeValue');
  const metricSkill = document.getElementById('tpMetricSkill');
  const metricFit = document.getElementById('tpMetricFit');
  const metricMatch = document.getElementById('tpMetricMatch');

  function updateHUD(level, skill, fit, match) {
    const pct = Math.min(100, Math.max(0, Number(level) || 72));
    const circumference = 251.2;
    const offset = circumference - (pct / 100) * circumference;
    if (gaugeCircle) gaugeCircle.style.strokeDashoffset = offset.toFixed(1);
    if (gaugeValue) gaugeValue.textContent = `+${pct}%`;
    if (metricSkill) metricSkill.textContent = `+${skill}%`;
    if (metricFit) metricFit.textContent = `+${fit}%`;
    if (metricMatch) metricMatch.textContent = `+${match}%`;
  }

  document.querySelectorAll('.tp-bc-tab, .tp-ntrp-pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.classList.contains('tp-bc-tab') ? '.tp-bc-tab' : '.tp-ntrp-pill';
      document.querySelectorAll(group).forEach((el) => el.classList.remove('is-active'));
      btn.classList.add('is-active');

      updateHUD(
        btn.getAttribute('data-level') || '72',
        btn.getAttribute('data-skill') || '68',
        btn.getAttribute('data-fit') || '75',
        btn.getAttribute('data-match') || '70'
      );
    });
  });

  // 3. Interactive Tennis Court Booking System
  const dateInput = document.getElementById('tpBookDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
  }

  const surfTabs = document.querySelectorAll('.tp-surf-tab');
  const courtCards = document.querySelectorAll('.tp-court-card');
  const selectedCourtLabel = document.getElementById('tpSelectedCourtLabel');
  const totalAmountEl = document.getElementById('tpTotalAmount');
  const slotBtns = document.querySelectorAll('.tp-slot-btn');
  const addonBtns = document.querySelectorAll('.tp-addon-btn');

  let selectedCourt = 'Court 01 – Arthur Ashe (Hard)';
  let hourlyRate = 250000;
  let selectedSlotsCount = 1; // 1 slot = 2 hours

  function calcTotal() {
    let addonSum = 0;
    addonBtns.forEach((btn) => {
      if (btn.classList.contains('is-active')) {
        addonSum += parseInt(btn.getAttribute('data-cost') || '0', 10);
      }
    });
    const hours = Math.max(1, selectedSlotsCount) * 2;
    const total = hourlyRate * hours + addonSum;
    if (totalAmountEl) {
      totalAmountEl.textContent = total.toLocaleString('vi-VN') + 'đ';
    }
  }

  surfTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      surfTabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      const surf = tab.getAttribute('data-surface') || 'all';
      courtCards.forEach((card) => {
        const match = surf === 'all' || card.getAttribute('data-surface') === surf;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  courtCards.forEach((card) => {
    card.addEventListener('click', () => {
      courtCards.forEach((c) => c.classList.remove('is-selected'));
      card.classList.add('is-selected');
      selectedCourt = card.getAttribute('data-court') || 'Court 01';
      hourlyRate = parseInt(card.getAttribute('data-rate') || '250000', 10);
      if (selectedCourtLabel) selectedCourtLabel.textContent = selectedCourt;
      calcTotal();
      showToast(`🎾 Đã chọn: ${selectedCourt}`);
    });
  });

  slotBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('is-active');
      const activeSlots = document.querySelectorAll('.tp-slot-btn.is-active');
      if (activeSlots.length === 0) {
        btn.classList.add('is-active');
      }
      selectedSlotsCount = document.querySelectorAll('.tp-slot-btn.is-active').length;
      calcTotal();
    });
  });

  addonBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('is-active');
      calcTotal();
    });
  });

  const bookingForm = document.getElementById('tpBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('tpBookName')?.value.trim() || '';
      const phone = document.getElementById('tpBookPhone')?.value.trim() || '';
      const date = document.getElementById('tpBookDate')?.value || '';
      const slots = Array.from(document.querySelectorAll('.tp-slot-btn.is-active'))
        .map((b) => b.getAttribute('data-slot'))
        .join(', ');
      const total = totalAmountEl ? totalAmountEl.textContent : '500.000đ';
      const msg = `Chào TennisPro, mình là ${name} (${phone}). Mình muốn đặt ${selectedCourt} ngày ${date}, khung giờ: ${slots}. Tổng tạm tính: ${total}.`;
      showToast('✅ Đang kết nối Zalo xác nhận sân...');
      window.open(`https://zalo.me/0974100372?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    });
  }

  // 4. Coaching & Trial Modal
  const modal = document.getElementById('tpModal');
  const modalTitle = document.getElementById('tpModalTitle');
  const modalClose = document.getElementById('tpModalClose');
  const modalForm = document.getElementById('tpModalForm');

  document.querySelectorAll('[data-open-modal]').forEach((el) => {
    el.addEventListener('click', () => {
      const title = el.getAttribute('data-open-modal') || 'Đăng Ký Học Thử & Đặt Sân';
      if (modalTitle) modalTitle.textContent = title;
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeModal() {
    if (modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('tpModalName')?.value.trim() || '';
      const phone = document.getElementById('tpModalPhone')?.value.trim() || '';
      const prog = document.getElementById('tpModalProgram')?.value || '';
      const msg = `Chào TennisPro, mình là ${name} (${phone}). Mình quan tâm: ${prog}. Tư vấn giúp mình nhé!`;
      showToast('🎾 Đang mở Zalo tư vấn khóa học...');
      window.open(`https://zalo.me/0974100372?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      closeModal();
    });
  }

  // 5. Toast Helper
  const toastEl = document.getElementById('tpToast');
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

  calcTotal();

  // 6. Smooth Scroll-Reveal & Escape Key Handling
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      if (navLinks) navLinks.classList.remove('is-open');
    }
  });

  const revealTargets = document.querySelectorAll(
    '.tp-about-top-grid > div, .tp-dev-bento-grid > div, .tp-prog-card, .tp-balls-stage, .tp-equip-bento > div, .tp-court-card, .tp-smarter-bottom-row > div'
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
      el.classList.add('tp-reveal');
      el.style.transitionDelay = `${(idx % 3) * 60}ms`;
      io.observe(el);
    });
  }
});

