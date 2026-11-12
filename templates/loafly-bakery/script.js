// ==========================================================================
// LOAFLY — ARTISAN BAKERY FULL INTERACTIVE SCRIPT (VIETNAMESE EDITION)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const toastEl = document.getElementById('toast');
  const cartCountEl = document.getElementById('cartCount');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartTotalPrice = document.getElementById('cartTotalPrice');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartBtn = document.getElementById('cartBtn');

  const infoModalBackdrop = document.getElementById('infoModalBackdrop');
  const infoModalContent = document.getElementById('infoModalContent');
  const closeInfoModal = document.getElementById('closeInfoModal');

  let cart = [];
  let toastTimer = null;

  function formatVND(amount) {
    return Number(amount || 0).toLocaleString('vi-VN') + 'đ';
  }

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  // 1. Mobile Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // 2. Category Tabs & Arrow Navigation
  const catTabs = Array.from(document.querySelectorAll('.cat-tab'));
  const productCards = Array.from(document.querySelectorAll('.loaf-card'));
  const catPrev = document.getElementById('catPrev');
  const catNext = document.getElementById('catNext');
  let activeCatIndex = 0;

  function activateCategory(index) {
    if (!catTabs.length) return;
    activeCatIndex = (index + catTabs.length) % catTabs.length;
    const selectedCat = catTabs[activeCatIndex].dataset.cat;

    catTabs.forEach((tab, idx) => {
      tab.classList.toggle('active', idx === activeCatIndex);
    });

    productCards.forEach((card) => {
      const match = card.dataset.cat === selectedCat;
      card.classList.toggle('is-hidden', !match);
    });
  }

  catTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => activateCategory(idx));
  });

  if (catPrev) {
    catPrev.addEventListener('click', () => activateCategory(activeCatIndex - 1));
  }
  if (catNext) {
    catNext.addEventListener('click', () => activateCategory(activeCatIndex + 1));
  }

  // 3. Slide-Out Bakery Cart Drawer Logic
  function renderCart() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalAmount = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

    if (cartCountEl) cartCountEl.textContent = totalCount;
    if (cartTotalPrice) cartTotalPrice.textContent = formatVND(totalAmount);

    if (!cartItemsList) return;
    if (cart.length === 0) {
      cartItemsList.innerHTML = '<p class="cart-empty-msg">Giỏ bánh đang trống. Hãy chọn thêm một ổ Sourdough hoặc Croissant nóng hổi nhé!</p>';
      return;
    }

    cartItemsList.innerHTML = cart
      .map(
        (item, index) => `
        <div class="cart-item-row">
          <img src="${item.img}" alt="${item.name}">
          <div class="cart-item-info">
            <h5>${item.name}</h5>
            <span>${formatVND(item.price * item.qty)} (${formatVND(item.price)} / phần)</span>
          </div>
          <div class="cart-qty-ctrl">
            <button type="button" data-action="dec" data-idx="${index}">−</button>
            <span>${item.qty}</span>
            <button type="button" data-action="inc" data-idx="${index}">+</button>
          </div>
        </div>
      `
      )
      .join('');

    cartItemsList.querySelectorAll('button[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        if (btn.dataset.action === 'inc') {
          cart[idx].qty += 1;
        } else {
          cart[idx].qty -= 1;
          if (cart[idx].qty <= 0) cart.splice(idx, 1);
        }
        renderCart();
      });
    });
  }

  function addToCart(name, priceStr, img) {
    const rawNum = parseInt(String(priceStr).replace(/[^\d]/g, ''), 10) || 125000;
    const existing = cart.find((i) => i.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price: rawNum, img: img || 'img/product-sourdough.png', qty: 1 });
    }
    renderCart();
    showToast(`🥐 Đã thêm ${name} (${formatVND(rawNum)}) vào giỏ bánh!`);
  }

  document.querySelectorAll('.btn-add-cart').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(btn.dataset.item, btn.dataset.price, btn.dataset.img);
    });
  });

  if (cartBtn && cartBackdrop) {
    cartBtn.addEventListener('click', () => {
      cartBackdrop.classList.add('open');
    });
  }
  if (closeCartBtn && cartBackdrop) {
    closeCartBtn.addEventListener('click', () => cartBackdrop.classList.remove('open'));
    cartBackdrop.addEventListener('click', (e) => {
      if (e.target === cartBackdrop) cartBackdrop.classList.remove('open');
    });
  }

  // 4. Universal Modal Helper
  function openModal(html) {
    if (!infoModalBackdrop || !infoModalContent) return;
    infoModalContent.innerHTML = html;
    infoModalBackdrop.classList.add('open');
  }

  if (closeInfoModal && infoModalBackdrop) {
    closeInfoModal.addEventListener('click', () => infoModalBackdrop.classList.remove('open'));
    infoModalBackdrop.addEventListener('click', (e) => {
      if (e.target === infoModalBackdrop) infoModalBackdrop.classList.remove('open');
    });
  }

  // Product Card Quick-View
  productCards.forEach((card) => {
    card.addEventListener('click', () => {
      const name = card.dataset.name;
      const price = card.dataset.price;
      const weight = card.dataset.weight;
      const ferment = card.dataset.ferment;
      const desc = card.dataset.desc;
      const img = card.dataset.img;

      openModal(`
        <div class="modal-prod-layout">
          <img src="${img}" alt="${name}">
          <div>
            <div class="modal-badge-row">
              <span>${ferment}</span>
              <span>${weight}</span>
            </div>
            <h3 style="font-family:var(--font-display);font-size:28px;color:var(--amber);margin-bottom:6px">${name}</h3>
            <p style="font-size:20px;font-weight:800;margin-bottom:12px">${price}</p>
            <p style="font-size:14px;color:rgba(255,248,235,0.82);line-height:1.6;margin-bottom:20px">${desc}</p>
            <button type="button" class="btn-amber" id="modalAddCartBtn">Thêm Vào Giỏ — ${price}</button>
          </div>
        </div>
      `);

      const modalAddBtn = document.getElementById('modalAddCartBtn');
      if (modalAddBtn) {
        modalAddBtn.addEventListener('click', () => {
          addToCart(name, price, img);
          infoModalBackdrop.classList.remove('open');
        });
      }
    });
  });

  // Bento Gallery Lightbox
  document.querySelectorAll('.bento-item').forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img')?.getAttribute('src') || 'img/gallery-1.png';
      const caption = item.dataset.caption || 'Bánh nướng thủ công mỗi sáng từ lò đá Loafly.';
      openModal(`
        <div style="text-align:center">
          <img src="${img}" alt="${caption}" style="width:100%;max-height:340px;object-fit:cover;border-radius:20px;margin-bottom:18px">
          <span style="display:inline-block;background:rgba(245,158,11,0.2);color:var(--amber);font-size:11px;font-weight:800;padding:4px 12px;border-radius:999px;margin-bottom:8px">MẺ BÁNH NƯỚNG SÁNG SỚM</span>
          <h3 style="font-family:var(--font-display);font-size:22px;color:var(--cream)">${caption}</h3>
        </div>
      `);
    });
  });

  // Baker Kitchen Story Modal
  const bakerVideoCard = document.getElementById('bakerVideoCard');
  if (bakerVideoCard) {
    bakerVideoCard.addEventListener('click', () => {
      openModal(`
        <div>
          <img src="img/baker-video.png" alt="Master Bakers" style="width:100%;height:230px;object-fit:cover;border-radius:18px;margin-bottom:18px">
          <span style="display:inline-block;background:rgba(245,158,11,0.2);color:var(--amber);font-size:11px;font-weight:800;padding:4px 12px;border-radius:999px;margin-bottom:8px">NGHỆ THUẬT LÀM BÁNH TỪ 4:00 SÁNG</span>
          <h3 style="font-family:var(--font-display);font-size:26px;color:var(--amber);margin-bottom:10px">Câu Chuyện Gian Bếp Lò Đá Loafly</h3>
          <p style="font-size:14px;color:rgba(255,248,235,0.82);line-height:1.65;margin-bottom:16px">
            Khi thành phố còn say giấc, bếp trưởng Julian Moreau cùng đội ngũ thợ bánh đã bắt đầu nhào nặn từng khối bột bằng tay. Chúng tôi nuôi dưỡng giống men tự nhiên Sourdough 18 năm tuổi bằng bột mì hữu cơ xay đá, hoàn toàn không phụ gia hay chất bảo quản.
          </p>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center;background:rgba(255,248,235,0.06);padding:14px;border-radius:16px">
            <div><strong style="color:var(--amber);display:block;font-size:18px">250°C</strong><small style="font-size:11px;color:var(--text-muted)">Nhiệt Độ Lò Đá</small></div>
            <div><strong style="color:var(--amber);display:block;font-size:18px">36 Tiếng</strong><small style="font-size:11px;color:var(--text-muted)">Ủ Lạnh Chậm</small></div>
            <div><strong style="color:var(--amber);display:block;font-size:18px">0%</strong><small style="font-size:11px;color:var(--text-muted)">Phụ Gia &amp; Men Khô</small></div>
          </div>
        </div>
      `);
    });
  }

  // Blog Articles Reader Modal
  const blogArticles = [
    {
      title: '5 Bí Quyết Nướng Bánh Mì Sourdough Vỏ Giòn Ruột Mềm Tại Nhà',
      read: 'Đọc 4 Phút · Bếp Trưởng Julian Moreau',
      img: 'img/blog-1.png',
      body: '1. Sử dụng men cái Levain đang ở đỉnh nở (4–5 giờ sau khi cho ăn). 2. Ủ bột cùng nước (Autolyse) 45 phút trước khi thêm muối biển. 3. Gập bột nhẹ nhàng (Coil Fold) mỗi 30 phút để tạo mạng lưới gluten giữ khí. 4. Ủ lạnh ở 4°C từ 16–36 tiếng để vỏ bánh nổi bóng nước giòn rụm. 5. Nướng trong nồi gang tạo hơi nước ở 250°C!'
    },
    {
      title: 'Câu Chuyện Đằng Sau Chiếc Bánh Croissant Hạnh Nhân Trứ Danh',
      read: 'Đọc 3 Phút · Nhật Ký Patisserie',
      img: 'img/blog-2.png',
      body: 'Chiếc bánh Croissant Hạnh Nhân nướng 2 lần của Loafly bắt đầu từ cốt bánh sừng bò 27 lớp bơ Pháp AOP Charentes-Poitou, thấm đẫm si-rô vani Madagascar, phủ kem hạnh nhân Marcona nghiền mịn và hạnh nhân lát nướng vàng giòn.'
    },
    {
      title: 'Hương Vị Mùa Hè: Bộ Sưu Tập Bánh Tart Trái Cây Tươi Mới Ra Mắt',
      read: 'Đọc 5 Phút · Thực Đơn Theo Mùa',
      img: 'img/blog-3.png',
      body: 'Sự kết hợp giữa phúc bồn tử, dâu rừng Đà Lạt và việt quất tươi mọng trên đế bánh tart bơ giòn tan, quyện cùng lớp kem trứng hạt vani Tahiti thanh mát.'
    }
  ];

  document.querySelectorAll('.blog-card').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.blog || '0', 10);
      const art = blogArticles[idx] || blogArticles[0];
      openModal(`
        <div>
          <img src="${art.img}" alt="${art.title}" style="width:100%;height:210px;object-fit:cover;border-radius:18px;margin-bottom:16px">
          <span style="display:inline-block;background:rgba(245,158,11,0.2);color:var(--amber);font-size:11px;font-weight:800;padding:4px 12px;border-radius:999px;margin-bottom:8px">${art.read}</span>
          <h3 style="font-family:var(--font-display);font-size:24px;color:var(--amber);margin-bottom:12px">${art.title}</h3>
          <p style="font-size:14.5px;color:rgba(255,248,235,0.85);line-height:1.7">${art.body}</p>
        </div>
      `);
    });
  });

  // 5. Testimonial Slider
  const reviews = [
    {
      text: 'Bánh mì Sourdough ở Loafly thực sự xuất sắc — vỏ ngoài giòn rụm thơm lừng mà bên trong lại mềm ẩm. Cuối tuần nào gia đình mình cũng phải ghé mua!',
      author: '— Chị Minh Anh · Khách Hàng Thân Thiết'
    },
    {
      text: 'Bước vào tiệm lúc 8 giờ sáng thơm nức mùi bơ Pháp nướng. Bánh Croissant hạnh nhân và Cinnamon Roll ở đây ngon không kém gì các tiệm bánh tại Paris!',
      author: '— Anh Hoàng Bách · Tín Đồ Cà Phê & Bánh Ngọt'
    },
    {
      text: 'Mình đặt bánh Brioche Vương Miện và hộp Su Kem Choux Trio cho buổi tiệc trà chiều ở công ty, ai ăn cũng tấm tắc khen vì vị ngọt thanh không hề ngấy.',
      author: '— Chị Thanh Trúc · Khách Hàng Đặt Tiệc'
    }
  ];

  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  const quoteDots = Array.from(document.querySelectorAll('.q-dot'));
  let currentQuote = 0;

  function setQuote(idx) {
    currentQuote = idx % reviews.length;
    if (quoteText) quoteText.textContent = reviews[currentQuote].text;
    if (quoteAuthor) quoteAuthor.textContent = reviews[currentQuote].author;
    quoteDots.forEach((dot, i) => dot.classList.toggle('active', i === currentQuote));
  }

  quoteDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => setQuote(idx));
  });

  setInterval(() => {
    setQuote(currentQuote + 1);
  }, 6000);

  // 6. Booking Form Submission
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('bookName')?.value || 'Quý khách';
      const time = document.getElementById('bookTime')?.value || '09:00 Sáng';
      showToast(`✨ Đã xác nhận giữ bàn cho ${name} (${time})! Hẹn gặp bạn tại Loafly.`);
      bookingForm.reset();
    });
  }

  // 7. Newsletter Form Submission
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('💌 Cảm ơn bạn đã đăng ký! Loafly sẽ gửi ưu đãi bánh mới mỗi tuần.');
      newsletterForm.reset();
    });
  }
});
