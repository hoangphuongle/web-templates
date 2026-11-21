/* ==========================================================================
   LAY'S CRISPS — POTATO CHIPS & SNACK BRAND SHOWCASE (SCRIPT.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Menu
  const burger = document.getElementById('lyBurger');
  const navLinks = document.getElementById('lyNavLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  // 2. Live Search Filter on Catalog
  const searchInput = document.getElementById('lySearchInput');
  const prodCards = document.querySelectorAll('.ly-prod-card');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      prodCards.forEach((card) => {
        const name = (card.getAttribute('data-name') || '').toLowerCase();
        card.classList.toggle('is-hidden', q.length > 0 && !name.includes(q));
      });
    });
  }

  // 3. Customer Testimonials Switcher
  const reviews = [
    {
      quote:
        '“Lát khoai tây Lay\'s mỏng giòn tan tự nhiên, vị muối giấm Salt & Vinegar và vị sườn nướng BBQ đậm đà cực kỳ cuốn. Mỗi lần tụ tập xem phim cuối tuần cùng bạn bè đều phải đặt nguyên thùng 12 gói mới đủ!”',
      name: 'Annara Veirmont · Minh Khôi',
      age: '23 years of Age · Food Reviewer',
      img: 'img/yellow-classic-bag.jpg',
    },
    {
      quote:
        '“Phiên bản giới hạn Lay\'s BLT Flavored và Wavy Original gợn sóng chấm sốt phô mai ngon xuất sắc. Đặt combo trên web giao nhanh chỉ 25 phút vẫn giữ nguyên độ giòn.”',
      name: 'Hải Yến · Jessica Chen',
      age: '25 years of Age · Content Creator',
      img: 'img/blt-purple-bag.jpg',
    },
    {
      quote:
        '“Vị Yogurt & Herb thanh mát dễ ăn cực kỳ, cả văn phòng mình ai cũng mê dùng cho bữa xế chiều.”',
      name: 'Hoàng Nam · Alex Rivera',
      age: '27 years of Age · Product Designer',
      img: 'img/green-herb-bag.jpg',
    },
  ];

  let activeRev = 0;
  const quoteEl = document.getElementById('lyTestiQuote');
  const nameEl = document.getElementById('lyTestiName');
  const ageEl = document.getElementById('lyTestiAge');
  const imgEl = document.getElementById('lyTestiImg');

  function setReview(idx) {
    activeRev = (idx + reviews.length) % reviews.length;
    const r = reviews[activeRev];
    if (quoteEl) quoteEl.textContent = r.quote;
    if (nameEl) nameEl.textContent = r.name;
    if (ageEl) ageEl.textContent = r.age;
    if (imgEl) imgEl.src = r.img;
  }

  document.getElementById('lyTestiPrev')?.addEventListener('click', () => setReview(activeRev - 1));
  document.getElementById('lyTestiNext')?.addEventListener('click', () => setReview(activeRev + 1));

  // 4. Shopping Cart State & Modal
  const cartModal = document.getElementById('lyCartModal');
  const cartBtn = document.getElementById('lyCartBtn');
  const openCartBtn = document.getElementById('lyOpenCartBtn');
  const findStoreBtn = document.getElementById('lyFindStoreBtn');
  const modalClose = document.getElementById('lyModalClose');
  const cartListEl = document.getElementById('lyCartList');
  const cartTotalEl = document.getElementById('lyCartTotal');
  const cartCountEl = document.getElementById('lyCartCount');

  let cart = [
    { name: "LAY'S Salt & Vinegar", price: 22000, img: 'img/hero-blue-bag.jpg' },
    { name: "LAY'S BLT Flavored (Limited)", price: 25000, img: 'img/blt-purple-bag.jpg' },
  ];

  function formatVND(n) {
    return n.toLocaleString('vi-VN') + 'đ';
  }

  function renderCart() {
    if (cartCountEl) cartCountEl.textContent = String(cart.length);
    if (!cartListEl || !cartTotalEl) return;

    if (cart.length === 0) {
      cartListEl.innerHTML =
        '<p style="text-align:center;color:#8E97A2;padding:16px 0;font-size:13px;">Giỏ snack đang trống. Hãy bấm dấu + để chọn vị Lay\'s yêu thích nhé!</p>';
      cartTotalEl.textContent = '0đ';
      return;
    }

    let total = 0;
    cartListEl.innerHTML = cart
      .map((item, idx) => {
        total += item.price;
        return `
          <div class="ly-cart-row">
            <div class="ly-cart-row-left">
              <img src="${item.img}" alt="${item.name}">
              <div>
                <h4>${item.name}</h4>
                <small>${formatVND(item.price)}</small>
              </div>
            </div>
            <button type="button" class="ly-cart-rm" data-rm="${idx}">Xóa</button>
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

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (findStoreBtn) findStoreBtn.addEventListener('click', openCart);
  if (modalClose) modalClose.addEventListener('click', closeCart);
  if (cartModal) {
    cartModal.addEventListener('click', (e) => {
      if (e.target === cartModal) closeCart();
    });
  }

  document.querySelectorAll('[data-add-snack]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-add-snack') || "LAY'S Classic";
      const price = parseInt(btn.getAttribute('data-add-price') || '22000', 10);
      const img = btn.getAttribute('data-add-img') || 'img/hero-blue-bag.jpg';
      cart.push({ name, price, img });
      renderCart();
      showToast(`🥔 Đã thêm "${name}" vào giỏ hàng!`);
    });
  });

  const orderForm = document.getElementById('lyOrderForm');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('lyCustName')?.value.trim() || '';
      const phone = document.getElementById('lyCustPhone')?.value.trim() || '';
      const addr = document.getElementById('lyCustAddr')?.value.trim() || '';
      const itemsStr = cart.map((c) => c.name).join(', ') || "Combo Lay's Crisps";
      const totalStr = cartTotalEl ? cartTotalEl.textContent : '47.000đ';
      const msg = `Chào Lay's Store, mình là ${name} (${phone}), địa chỉ: ${addr}. Mình đặt mua: ${itemsStr}. Tổng cộng: ${totalStr}.`;
      showToast('🥔 Đang mở Zalo xác nhận đơn hàng...');
      window.open(`https://zalo.me/0974100372?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      closeCart();
    });
  }

  // 5. Toast Helper
  const toastEl = document.getElementById('lyToast');
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
    '.ly-spotlight-grid > div, .ly-prod-card, .ly-pop-col, .ly-testi-grid > div, .ly-store-inner'
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
      el.classList.add('ly-reveal');
      el.style.transitionDelay = `${(idx % 3) * 60}ms`;
      io.observe(el);
    });
  }

  renderCart();
});

