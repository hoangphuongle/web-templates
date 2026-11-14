/* ==========================================================================
   AEROKITE — Interactive Booking Modal, Kite Kits Mega-Menu & Configurator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('akBurger');
  const navLinks = document.getElementById('akNavLinks');
  const navKitsWrap = document.getElementById('akNavKitsWrap');
  const navKitsBtn = document.getElementById('akNavKitsBtn');
  const modal = document.getElementById('akModal');
  const modalClose = document.getElementById('akModalClose');
  const serviceInput = document.getElementById('akServiceInput');
  const bookingForm = document.getElementById('akBookingForm');
  const clubForm = document.getElementById('akClubForm');
  const clubInput = document.getElementById('akClubInput');
  const clubFeedback = document.getElementById('akClubFeedback');

  // Mobile Menu Toggle
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a:not(#akNavKitsBtn)').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        if (navKitsWrap) navKitsWrap.classList.remove('is-open');
      });
    });
  }

  // Mobile / Touch toggle for Kite Kits Mega-Dropdown
  if (navKitsBtn && navKitsWrap) {
    navKitsBtn.addEventListener('click', (e) => {
      if (window.innerWidth <= 1060) {
        e.preventDefault();
        navKitsWrap.classList.toggle('is-open');
      }
    });
  }

  // Clicking an item in the Mega-Menu filters & scrolls to #kits
  document.querySelectorAll('[data-kit-jump]').forEach((item) => {
    item.addEventListener('click', () => {
      const targetCat = item.getAttribute('data-kit-jump');
      const filterBtn = document.querySelector(`[data-kit-filter="${targetCat}"]`);
      if (filterBtn) filterBtn.click();
      if (navKitsWrap) navKitsWrap.classList.remove('is-open');
      if (navLinks) navLinks.classList.remove('is-open');
    });
  });

  // Kite Kits: Rental vs Buy Full Kit Price Switcher
  const modeBtns = document.querySelectorAll('[data-price-mode]');
  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-price-mode');
      modeBtns.forEach((b) => b.classList.toggle('is-active', b === btn));

      document.querySelectorAll('.ak-kit-card').forEach((card) => {
        const caption = card.querySelector('[data-price-caption]');
        const priceEl = card.querySelector('.ak-price-val');
        if (caption) {
          caption.textContent = mode === 'buy' ? 'Giá mua trọn bộ (Mới 100%)' : 'Giá thuê trọn bộ';
        }
        if (priceEl) {
          priceEl.textContent = mode === 'buy'
            ? priceEl.getAttribute('data-buy')
            : priceEl.getAttribute('data-rent');
        }
      });
    });
  });

  // Kite Kits: Category Filter Pills
  const filterBtns = document.querySelectorAll('[data-kit-filter]');
  const kitCards = document.querySelectorAll('.ak-kit-card');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-kit-filter');
      filterBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
      kitCards.forEach((card) => {
        const cardCat = card.getAttribute('data-kit-cat');
        const show = cat === 'all' || cardCat === cat;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  // Kite Kits: Interactive Kite Size Selector (9m² / 12m² / 14m²)
  document.querySelectorAll('.ak-kit-card').forEach((card) => {
    const sizePills = card.querySelectorAll('.ak-size-pill');
    const windBadge = card.querySelector('[data-wind-display]');
    const weightHint = card.querySelector('[data-weight-display]');

    sizePills.forEach((pill) => {
      pill.addEventListener('click', () => {
        sizePills.forEach((p) => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        const wind = pill.getAttribute('data-wind');
        const weight = pill.getAttribute('data-weight');
        if (windBadge && wind) windBadge.textContent = `💨 Gió: ${wind}`;
        if (weightHint && weight) weightHint.textContent = `Cân nặng gợi ý: ${weight}`;
      });
    });
  });

  // Open Booking Modal with pre-filled course/kit/event title
  const openModal = (serviceTitle) => {
    if (!modal) return;
    if (serviceInput && serviceTitle) {
      serviceInput.value = serviceTitle;
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      let title = trigger.getAttribute('data-open-modal');
      // If triggered from a Kit card, append selected kite size and rental/buy price
      const parentKit = trigger.closest('.ak-kit-card');
      if (parentKit) {
        const activeSize = parentKit.querySelector('.ak-size-pill.is-active')?.textContent || '12m²';
        const currentPrice = parentKit.querySelector('.ak-price-val')?.textContent || '';
        title = `${title} (Size diều: ${activeSize} · ${currentPrice})`;
      }
      openModal(title);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Booking Form -> Redirect to Zalo 0974 100 372 with structured message
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const service = document.getElementById('akServiceInput')?.value || 'Khóa học Kiteboarding IKO';
      const name = document.getElementById('akNameInput')?.value || '';
      const phone = document.getElementById('akPhoneInput')?.value || '';
      const spot = document.getElementById('akSpotSelect')?.value || 'Mũi Né';
      const level = document.getElementById('akLevelSelect')?.value || '';

      const msg = encodeURIComponent(
        `[AEROKITE] Xin chào, tôi muốn đặt lịch / báo giá:\n- Dịch vụ / Bộ Kit: ${service}\n- Họ tên: ${name}\n- SĐT: ${phone}\n- Bãi lướt: ${spot}\n- Trình độ: ${level}`
      );
      window.open(`https://zalo.me/0974100372?text=${msg}`, '_blank', 'noopener');
      closeModal();
    });
  }

  // Wind Insider Club Newsletter Form
  if (clubForm && clubInput && clubFeedback) {
    clubForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = clubInput.value.trim();
      if (!val) return;
      clubFeedback.hidden = false;
      clubFeedback.textContent = `✓ Đã đăng ký "${val}" vào Wind Insider Club! Bản tin dự báo gió sẽ gửi tới bạn hàng tuần.`;
      clubInput.value = '';
    });
  }
});
