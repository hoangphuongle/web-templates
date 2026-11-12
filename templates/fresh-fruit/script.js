/* ==========================================================================
   FRESH. — ORGANIC & IMPORTED FRUIT STORE INTERACTIVE SCRIPT
   ========================================================================== */

(function () {
  'use strict';

  const toastEl = document.getElementById('toast');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartListEl = document.getElementById('cartList');
  const cartCountEl = document.getElementById('cartCount');
  const cartTotalEl = document.getElementById('cartTotal');

  const quickModal = document.getElementById('quickModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalSub = document.getElementById('modalSub');
  const quickOrderForm = document.getElementById('quickOrderForm');
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');

  let cart = [
    { name: 'Nho Mẫu Đơn Muscat (1kg)', price: 210000, img: 'img/fruit-grapes.png', qty: 1 }
  ];

  function formatVND(num) {
    return Number(num || 0).toLocaleString('vi-VN') + 'đ';
  }

  window.showToast = function (msg) {
    if (!toastEl) return;
    if (msg) toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(window.__freshToastTimer);
    window.__freshToastTimer = setTimeout(function () {
      toastEl.classList.remove('show');
    }, 3000);
  };

  // 1. SLIDE-OUT CART DRAWER
  function renderCart() {
    const totalCount = cart.reduce(function (s, item) { return s + item.qty; }, 0);
    const totalAmount = cart.reduce(function (s, item) { return s + item.qty * item.price; }, 0);

    if (cartCountEl) cartCountEl.textContent = totalCount;
    if (cartTotalEl) cartTotalEl.textContent = formatVND(totalAmount);
    if (!cartListEl) return;

    if (cart.length === 0) {
      cartListEl.innerHTML = '<p style="font-size:13px;color:#7a867d;text-align:center;padding:24px 0">Giỏ trái cây đang trống. Hãy chọn thêm trái cây tươi nhé!</p>';
      return;
    }

    cartListEl.innerHTML = cart.map(function (item, idx) {
      return (
        '<div class="cart-row">' +
          '<img src="' + item.img + '" alt="' + item.name + '">' +
          '<div class="cart-row-info">' +
            '<h5>' + item.name + '</h5>' +
            '<span>' + formatVND(item.price * item.qty) + '</span>' +
          '</div>' +
          '<div class="cart-qty">' +
            '<button type="button" data-act="dec" data-idx="' + idx + '">−</button>' +
            '<span>' + item.qty + '</span>' +
            '<button type="button" data-act="inc" data-idx="' + idx + '">+</button>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    cartListEl.querySelectorAll('button[data-act]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const i = parseInt(btn.getAttribute('data-idx'), 10);
        if (btn.getAttribute('data-act') === 'inc') {
          cart[i].qty += 1;
        } else {
          cart[i].qty -= 1;
          if (cart[i].qty <= 0) cart.splice(i, 1);
        }
        renderCart();
      });
    });
  }

  window.addToCart = function (name, price, img) {
    const existing = cart.find(function (item) { return item.name === name; });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name: name, price: Number(price) || 85000, img: img || 'img/fruit-mango.png', qty: 1 });
    }
    renderCart();
    window.showToast('🍊 Đã thêm ' + name + ' vào giỏ trái cây!');
  };

  if (cartToggleBtn && cartBackdrop) {
    cartToggleBtn.addEventListener('click', function () {
      renderCart();
      cartBackdrop.classList.add('open');
    });
  }

  if (closeCartBtn && cartBackdrop) {
    closeCartBtn.addEventListener('click', function () {
      cartBackdrop.classList.remove('open');
    });
    cartBackdrop.addEventListener('click', function (e) {
      if (e.target === cartBackdrop) cartBackdrop.classList.remove('open');
    });
  }

  renderCart();

  // 2. QUICK ORDER MODAL
  window.openQuickModal = function (title, sub) {
    if (modalTitle && title) modalTitle.textContent = title;
    if (modalSub && sub) modalSub.textContent = sub;
    if (quickModal) quickModal.classList.add('open');
    if (mobileDrawer) mobileDrawer.classList.remove('open');
  };

  function closeQuickModal() {
    if (quickModal) quickModal.classList.remove('open');
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeQuickModal);
  }
  if (quickModal) {
    quickModal.addEventListener('click', function (e) {
      if (e.target === quickModal) closeQuickModal();
    });
  }

  if (quickOrderForm) {
    quickOrderForm.addEventListener('submit', function (e) {
      e.preventDefault();
      closeQuickModal();
      window.showToast('🚚 Đã nhận đơn đặt trái cây! Cửa hàng sẽ liên hệ giao ngay trong 2H.');
      quickOrderForm.reset();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeQuickModal();
      if (cartBackdrop) cartBackdrop.classList.remove('open');
    }
  });

  // 3. MOBILE MENU DRAWER
  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener('click', function () {
      mobileDrawer.classList.toggle('open');
    });
    mobileDrawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 4. SHOWCASE PRODUCT FILTER TABS
  const filterTabs = document.querySelectorAll('.sf-tab');
  const fruitCards = document.querySelectorAll('.fruit-card');
  filterTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const f = tab.getAttribute('data-filter');
      filterTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      fruitCards.forEach(function (card) {
        const cat = card.getAttribute('data-cat');
        card.style.display = (f === 'all' || cat === f) ? '' : 'none';
      });
    });
  });

  // 5. TESTIMONIAL 4-TAB SWITCHER & ARROWS
  const testiData = [
    {
      quote: '“ Từ ngày đặt lịch giao trái cây định kỳ tại FRESH., tủ lạnh gia đình mình lúc nào cũng đầy ắp cam vàng, nho mẫu đơn và táo đỏ tươi giòn cho hai bé mang đi học mỗi ngày. ”',
      name: 'Chị Lan Anh – Khách hàng thân thiết',
      sub: '“ Cả khu phố mình đều gọi FRESH. là tiệm trái cây quốc dân vì quả nào giao tới cũng tươi rói như vừa hái. ”'
    },
    {
      quote: '“ Mình chuyển sang dùng combo trái cây Detox giàu Vitamin C của FRESH. mỗi sáng. Cơ thể nhẹ nhàng, da sáng khỏe hơn hẳn và hoàn toàn yên tâm vì có chứng nhận Organic rõ ràng. ”',
      name: 'Chị Minh Thư – Huấn luyện viên Yoga',
      sub: '“ Đóng gói sạch sẽ trong hộp giấy thân thiện môi trường, trái cây mọng nước tự nhiên không hề có chất bảo quản. ”'
    },
    {
      quote: '“ Đặt giỏ trái cây biếu đối tác ở FRESH. vừa sang trọng vừa hợp lý. Nhập trực tiếp từ nông trại nên giá nho mẫu đơn và táo Envy tốt hơn siêu thị đến 20% mà chất lượng vượt trội. ”',
      name: 'Anh Hoàng Nam – Giám đốc Doanh nghiệp',
      sub: '“ Dịch vụ xuất hóa đơn VAT nhanh gọn, giao đúng giờ hẹn và có kèm thiệp viết tay rất tinh tế. ”'
    },
    {
      quote: '“ Mình ấn tượng nhất là chính sách bảo hành 1 đổi 1 nếu có bất kỳ quả nào không đạt độ ngọt. Suốt 1 năm đặt hàng tuần tại FRESH., chưa lần nào mình phải thất vọng! ”',
      name: 'Anh Quốc Bảo – Đầu bếp Nhà hàng Âu',
      sub: '“ Độ chín của xoài Harum Manis, bơ sáp và kiwi xanh luôn đồng đều hoàn hảo cho các món tráng miệng. ”'
    }
  ];

  let currentTesti = 0;
  const testiQuote = document.getElementById('testiQuote');
  const testiName = document.getElementById('testiName');
  const testiSub = document.getElementById('testiSub');
  const topicTabs = document.querySelectorAll('.t-tab');
  const prevTestiBtn = document.getElementById('prevTestiBtn');
  const nextTestiBtn = document.getElementById('nextTestiBtn');

  function updateTesti(index) {
    currentTesti = (index + testiData.length) % testiData.length;
    const d = testiData[currentTesti];
    if (testiQuote) testiQuote.textContent = d.quote;
    if (testiName) testiName.textContent = d.name;
    if (testiSub) testiSub.textContent = d.sub;
    topicTabs.forEach(function (tab, i) {
      tab.classList.toggle('active', i === currentTesti);
    });
  }

  topicTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const idx = parseInt(tab.getAttribute('data-topic') || '0', 10);
      updateTesti(idx);
    });
  });

  if (prevTestiBtn) {
    prevTestiBtn.addEventListener('click', function () {
      updateTesti(currentTesti - 1);
    });
  }
  if (nextTestiBtn) {
    nextTestiBtn.addEventListener('click', function () {
      updateTesti(currentTesti + 1);
    });
  }

  // 6. NEWSLETTER FORM
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      window.showToast('💌 Đăng ký thành công! Bạn nhận được mã giảm 15% cho đơn trái cây đầu tiên.');
      newsletterForm.reset();
    });
  }
})();

