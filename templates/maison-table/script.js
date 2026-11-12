/**
 * MAISON TABLE – Interactive Script (Mẫu 23)
 */
(function () {
  // 1. Sticky Header shadow on scroll
  const header = document.getElementById('mtHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('mtMenuToggle');
  const menu = document.getElementById('mtMenu');
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => menu.classList.remove('open'));
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
        menu.classList.remove('open');
      }
    });
  }

  // 3. Default today's date in Reservation Modal
  const dateInput = document.getElementById('mtDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
  }

  // 4. Reservation Modal & Full Menu Modal
  const reserveModal = document.getElementById('mtReserveModal');
  const closeReserve = document.getElementById('mtCloseReserve');
  const menuModal = document.getElementById('mtMenuModal');
  const closeMenu = document.getElementById('mtCloseMenu');
  const openMenuBtn = document.getElementById('btnOpenMenuModal');
  const artMenuBtn = document.getElementById('btnArtMenu');
  const bookFromMenu = document.getElementById('btnBookFromMenu');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('[data-open-reserve]').forEach((btn) => {
    btn.addEventListener('click', () => openModal(reserveModal));
  });

  if (closeReserve) {
    closeReserve.addEventListener('click', () => closeModal(reserveModal));
  }
  if (openMenuBtn) {
    openMenuBtn.addEventListener('click', () => openModal(menuModal));
  }
  if (artMenuBtn) {
    artMenuBtn.addEventListener('click', () => openModal(menuModal));
  }
  if (closeMenu) {
    closeMenu.addEventListener('click', () => closeModal(menuModal));
  }
  if (bookFromMenu) {
    bookFromMenu.addEventListener('click', () => {
      closeModal(menuModal);
      openModal(reserveModal);
    });
  }

  [reserveModal, menuModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(reserveModal);
      closeModal(menuModal);
    }
  });

  // 5. Reservation Form Submit -> Zalo
  const reserveForm = document.getElementById('mtReserveForm');
  if (reserveForm) {
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('mtName')?.value.trim() || '';
      const phone = document.getElementById('mtPhone')?.value.trim() || '';
      const date = document.getElementById('mtDate')?.value || '';
      const time = document.getElementById('mtTime')?.value || '';
      const guests = document.getElementById('mtGuests')?.value || '';
      const area = document.getElementById('mtArea')?.value || '';
      const note = document.getElementById('mtNote')?.value.trim() || 'Không có';

      const msg = [
        '🍽️ ĐẶT BÀN MAISON TABLE',
        `• Họ tên: ${name}`,
        `• SĐT: ${phone}`,
        `• Ngày: ${date} (${time})`,
        `• Số khách: ${guests}`,
        `• Khu vực: ${area}`,
        `• Ghi chú: ${note}`
      ].join('\n');

      closeModal(reserveForm.closest('.mt-modal-backdrop'));
      window.open(`https://zalo.me/0974100372?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    });
  }

  // 6. Scroll Reveal Observer
  const reveals = document.querySelectorAll('.mt-reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('visible'));
  }
})();

