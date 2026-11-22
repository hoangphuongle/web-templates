/* ==========================================================================
   SWEETDONUTS — ARTISAN DONUT BAKERY & ONLINE ORDERING TEMPLATE (SCRIPT.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Menu
  const burger = document.getElementById('sdBurger');
  const navLinks = document.getElementById('sdNavLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a, button').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  // 2. Shopping Cart State & Modal
  const cartModal = document.getElementById('sdCartModal');
  const cartTrigger = document.getElementById('sdCartTrigger');
  const heroOpenCart = document.getElementById('sdHeroOpenCart');
  const modalClose = document.getElementById('sdModalClose');
  const cartListEl = document.getElementById('sdCartList');
  const cartTotalEl = document.getElementById('sdCartTotal');
  const cartCountEl = document.getElementById('sdCartCount');

  let cart = [
    { name: 'Donut Xoắn Pháp Cruller', price: 45000, img: 'img/prod-cruller.jpg' },
    { name: 'Donut Thanh Dài Sô-cô-la', price: 55000, img: 'img/prod-longjohn.jpg' },
  ];

  function formatVND(n) {
    return n.toLocaleString('vi-VN') + 'đ';
  }

  function renderCart() {
    if (cartCountEl) cartCountEl.textContent = String(cart.length);
    if (!cartListEl || !cartTotalEl) return;

    if (cart.length === 0) {
      cartListEl.innerHTML =
        '<p style="text-align:center;color:#8E857E;padding:16px 0;font-size:13px;">Giỏ bánh của bạn đang trống. Hãy chọn vị Donut yêu thích nhé!</p>';
      cartTotalEl.textContent = '0đ';
      return;
    }

    let total = 0;
    cartListEl.innerHTML = cart
      .map((item, idx) => {
        total += item.price;
        return `
          <div class="sd-cart-row">
            <div class="sd-cart-row-left">
              <img src="${item.img}" alt="${item.name}">
              <div>
                <h4>${item.name}</h4>
                <small>${formatVND(item.price)}</small>
              </div>
            </div>
            <button type="button" class="sd-cart-rm" data-rm="${idx}">Xóa</button>
          </div>
        `;
      })
      .join('');

    cartTotalEl.textContent = formatVND(total);

    cartListEl.querySelectorAll('[data-rm]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-rm') || '0', 10);
        cart.splice(idx, 1);
        renderCart();
      });
    });
  }

  function openCart() {
    renderCart();
    if (cartModal) {
      cartModal.classList.add('is-open');
      cartModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeCart() {
    if (cartModal) {
      cartModal.classList.remove('is-open');
      cartModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (cartTrigger) cartTrigger.addEventListener('click', openCart);
  if (heroOpenCart) heroOpenCart.addEventListener('click', openCart);
  if (modalClose) modalClose.addEventListener('click', closeCart);
  if (cartModal) {
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) closeCart();
    });
  }

  document.querySelectorAll('[data-add-donut]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-add-donut') || 'SweetDonut';
      const price = parseInt(btn.getAttribute('data-add-price') || '45000', 10);
      const img = btn.getAttribute('data-add-img') || 'img/prod-cruller.jpg';
      cart.push({ name, price, img });
      renderCart();
      showToast(`🍩 Đã thêm "${name}" vào giỏ bánh!`);
    });
  });

  // 3. Submit Cart Order via Zalo
  const orderForm = document.getElementById('sdOrderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sdOrderName')?.value.trim() || '';
      const phone = document.getElementById('sdOrderPhone')?.value.trim() || '';
      const addr = document.getElementById('sdOrderAddr')?.value.trim() || '';
      const itemsStr = cart.map((c) => c.name).join(', ') || 'Combo SweetDonuts';
      const totalStr = cartTotalEl ? cartTotalEl.textContent : '100.000đ';
      const msg = `Chào SweetDonuts, mình là ${name} (${phone}), địa chỉ: ${addr}. Mình muốn đặt: ${itemsStr}. Tổng cộng: ${totalStr} (Giảm 10%).`;
      showToast('🍩 Đang kết nối Zalo đặt bánh SweetDonuts...');
      window.open(`https://zalo.me/0974100372?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      closeCart();
    });
  }

  // 4. Feedback Form
  const feedbackForm = document.getElementById('sdFeedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sdFbName')?.value.trim() || '';
      const email = document.getElementById('sdFbEmail')?.value.trim() || '';
      const message = document.getElementById('sdFbMsg')?.value.trim() || '';
      const msg = `Chào SweetDonuts, mình là ${name} (${email}). Lời nhắn: ${message}`;
      showToast('💌 Cảm ơn phản hồi của bạn! Đang mở Zalo...');
      window.open(`https://zalo.me/0974100372?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      feedbackForm.reset();
    });
  }

  // 5. Toast Helper
  const toastEl = document.getElementById('sdToast');
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
      closeCart();
      if (navLinks) navLinks.classList.remove('is-open');
    }
  });

  const revealTargets = document.querySelectorAll(
    '.sd-about-card, .sd-prod-item, .sd-craving-grid > div, .sd-journey-grid > div, .sd-gal-item, .sd-contact-grid > div'
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
      el.classList.add('sd-reveal');
      el.style.transitionDelay = `${(idx % 4) * 55}ms`;
      io.observe(el);
    });
  }

  renderCart();
});

