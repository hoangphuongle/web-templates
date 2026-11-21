/* ==========================================================================
   FRESHMART® — GROCERIES MADE SIMPLE (SCRIPT.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Menu
  const burger = document.getElementById('fmBurger');
  const navLinks = document.getElementById('fmNavLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  // 2. Interactive Pocket App Tabs
  const pocketTabs = document.querySelectorAll('.fm-ptab');
  const capTitle = document.getElementById('fmPocketCapTitle');
  const capDesc = document.getElementById('fmPocketCapDesc');

  pocketTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      pocketTabs.forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      if (capTitle) capTitle.textContent = tab.getAttribute('data-title') || '';
      if (capDesc) capDesc.textContent = tab.getAttribute('data-desc') || '';
    });
  });

  // 3. Quick Order Modal
  const modal = document.getElementById('fmModal');
  const modalTitle = document.getElementById('fmModalTitle');
  const modalClose = document.getElementById('fmModalClose');
  const modalForm = document.getElementById('fmModalForm');

  document.querySelectorAll('[data-open-modal]').forEach((el) => {
    el.addEventListener('click', () => {
      const title = el.getAttribute('data-open-modal') || 'Đặt Giỏ Đi Chợ Tươi Sạch';
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
      const name = document.getElementById('fmModalName')?.value.trim() || '';
      const phone = document.getElementById('fmModalPhone')?.value.trim() || '';
      const addr = document.getElementById('fmModalAddr')?.value.trim() || '';
      const pkg = document.getElementById('fmModalPackage')?.value || '';
      const msg = `Chào FreshMart, mình là ${name} (${phone}), địa chỉ: ${addr}. Mình muốn đặt: ${pkg}.`;
      showToast('🌿 Đang kết nối Zalo đặt giỏ đi chợ...');
      window.open(`https://zalo.me/0974100372?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      closeModal();
    });
  }

  const newsletterForm = document.getElementById('fmNewsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('🌿 Cảm ơn bạn đã đăng ký nhận ưu đãi nông sản sạch FreshMart®!');
      newsletterForm.reset();
    });
  }

  // 4. Toast Helper
  const toastEl = document.getElementById('fmToast');
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

  // 5. Smooth Scroll-Reveal & Escape Key Handling
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      if (navLinks) navLinks.classList.remove('is-open');
    }
  });

  const revealTargets = document.querySelectorAll(
    '.fm-stat-card, .fm-center-tall-card, .fm-pocket-grid > div, .fm-plan-card, .fm-impact-banner, .fm-story-card'
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
      el.classList.add('fm-reveal');
      el.style.transitionDelay = `${(idx % 3) * 60}ms`;
      io.observe(el);
    });
  }
});

