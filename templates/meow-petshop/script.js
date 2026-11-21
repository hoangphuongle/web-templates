/* ==========================================================================
   MEOW MIX® PET SHOP & CAT FOOD TEMPLATE — SCRIPT.JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const burger = document.getElementById('mmBurger');
  const navLinks = document.getElementById('mmNavLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  // 2. Interactive Orbital Product Nodes in Hero
  const orbitNodes = document.querySelectorAll('.mm-orbit-node');
  const activeFlavorName = document.getElementById('mmActiveFlavorName');
  const activeFlavorPrice = document.getElementById('mmActiveFlavorPrice');
  const heroSubtext = document.getElementById('mmHeroSubtext');
  const heroQuickAdd = document.getElementById('mmHeroQuickAdd');

  let currentHeroProduct = {
    name: 'Original Choice (Gà, Cá Hồi & Cá Biển)',
    price: 195000,
    img: 'img/prod-original.jpg',
  };

  orbitNodes.forEach((node) => {
    node.addEventListener('click', () => {
      orbitNodes.forEach((n) => n.classList.remove('is-active'));
      node.classList.add('is-active');

      const flavor = node.getAttribute('data-flavor') || 'Original Choice';
      const desc = node.getAttribute('data-desc') || '';
      const priceStr = node.getAttribute('data-price') || '195.000đ';
      const img = node.getAttribute('data-img') || 'img/prod-original.jpg';

      if (activeFlavorName) activeFlavorName.textContent = flavor;
      if (activeFlavorPrice) activeFlavorPrice.textContent = priceStr;
      if (heroSubtext && desc) heroSubtext.textContent = desc;

      currentHeroProduct = {
        name: flavor,
        price: parseInt(priceStr.replace(/\D/g, ''), 10) || 195000,
        img,
      };
      showToast(`🐾 Đã chọn hương vị: ${flavor}`);
    });
  });

  // 3. Product Category Filter Tabs
  const filterPills = document.querySelectorAll('.mm-filter-pill');
  const productCards = document.querySelectorAll('.mm-prod-card');

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      const cat = pill.getAttribute('data-cat') || 'all';

      productCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        const show = cat === 'all' || cardCat === cat;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  // 4. Shopping Cart State & Modal
  const cartModal = document.getElementById('mmCartModal');
  const cartTrigger = document.getElementById('mmCartTrigger');
  const openQuickOrder = document.getElementById('mmOpenQuickOrder');
  const modalClose = document.getElementById('mmModalClose');
  const cartItemsList = document.getElementById('mmCartItemsList');
  const cartTotalPrice = document.getElementById('mmCartTotalPrice');
  const cartCountBadge = document.getElementById('mmCartCount');

  let cart = [
    { name: 'Original Choice (Túi 1.42kg)', price: 195000, img: 'img/prod-original.jpg' },
    { name: 'Seafood Medley (Túi 1.42kg)', price: 200000, img: 'img/prod-seafood.jpg' },
  ];

  function formatVND(num) {
    return num.toLocaleString('vi-VN') + 'đ';
  }

  function renderCart() {
    if (cartCountBadge) cartCountBadge.textContent = String(cart.length);
    if (!cartItemsList || !cartTotalPrice) return;

    if (cart.length === 0) {
      cartItemsList.innerHTML = '<p style="text-align:center;color:#8E84A3;padding:18px 0;font-size:13px;">Giỏ hàng đang trống. Hãy chọn món cho Boss nhé!</p>';
      cartTotalPrice.textContent = '0đ';
      return;
    }

    let total = 0;
    cartItemsList.innerHTML = cart
      .map((item, idx) => {
        total += item.price;
        return `
          <div class="mm-cart-row">
            <div class="mm-cart-row-left">
              <img src="${item.img}" alt="${item.name}">
              <div>
                <h4>${item.name}</h4>
                <small>${formatVND(item.price)}</small>
              </div>
            </div>
            <button type="button" class="mm-cart-remove" data-rm="${idx}">Xóa</button>
          </div>
        `;
      })
      .join('');

    cartTotalPrice.textContent = formatVND(total);

    cartItemsList.querySelectorAll('[data-rm]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const rmIdx = parseInt(btn.getAttribute('data-rm'), 10);
        cart.splice(rmIdx, 1);
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
  if (openQuickOrder) openQuickOrder.addEventListener('click', openCart);
  if (modalClose) modalClose.addEventListener('click', closeCart);
  if (cartModal) {
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) closeCart();
    });
  }

  if (heroQuickAdd) {
    heroQuickAdd.addEventListener('click', () => {
      cart.push({ ...currentHeroProduct });
      renderCart();
      showToast(`🛒 Đã thêm ${currentHeroProduct.name} vào giỏ!`);
    });
  }

  document.querySelectorAll('[data-add-item]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = el.getAttribute('data-add-item') || 'Meow Mix Cat Food';
      const price = parseInt(el.getAttribute('data-add-price') || '200000', 10);
      const img = el.getAttribute('data-add-img') || 'img/prod-original.jpg';
      cart.push({ name, price, img });
      renderCart();
      showToast(`🛒 Đã thêm "${name}" vào giỏ hàng!`);
    });
  });

  // 5. Submit Quick Order Modal & Contact Form via Zalo
  const quickOrderForm = document.getElementById('mmQuickOrderForm');
  if (quickOrderForm) {
    quickOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('mmOrderName')?.value.trim() || '';
      const phone = document.getElementById('mmOrderPhone')?.value.trim() || '';
      const addr = document.getElementById('mmOrderAddress')?.value.trim() || '';
      const itemsText = cart.map((c) => c.name).join(', ') || 'Combo Meow Mix 50% OFF';
      const msg = `Chào shop Meow Mix, mình là ${name} (${phone}), địa chỉ: ${addr}. Mình muốn đặt: ${itemsText}`;
      showToast('✅ Đang kết nối Zalo đặt hàng...');
      window.open(`https://zalo.me/0974100372?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      closeCart();
    });
  }

  const contactForm = document.getElementById('mmContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstName = document.getElementById('mmFirstName')?.value.trim() || '';
      const phone = document.getElementById('mmPhone')?.value.trim() || '';
      const message = document.getElementById('mmMessage')?.value.trim() || 'Tư vấn thức ăn mèo Meow Mix 50% OFF';
      const msg = `Chào Hoang Phuong, mình là ${firstName} (${phone}). Nội dung: ${message}`;
      showToast('🐾 Đã gửi thông tin! Đang mở Zalo...');
      window.open(`https://zalo.me/0974100372?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      contactForm.reset();
    });
  }

  // 6. Toast Helper
  const toastEl = document.getElementById('mmToast');
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

  renderCart();

  // 7. Smooth Scroll-Reveal & Escape Key Handling
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      if (navLinks) navLinks.classList.remove('is-open');
    }
  });

  const revealTargets = document.querySelectorAll(
    '.mm-bs-strip, .mm-promo-card, .mm-prod-card, .mm-arch-dome, .mm-contact-stage'
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
      el.classList.add('mm-reveal');
      el.style.transitionDelay = `${(idx % 4) * 55}ms`;
      io.observe(el);
    });
  }
});

