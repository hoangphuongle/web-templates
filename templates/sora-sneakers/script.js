/* ==========================================================================
   SORA SNEAKERS — CONTEMPORARY STREETWEAR & PERFORMANCE FOOTWEAR (SCRIPT.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Menu
  const burger = document.getElementById('srBurger');
  const navLinks = document.getElementById('srNavLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  // 2. Interactive SORA ONE Product Gallery, Colourways & Sizes
  const pdpMainImg = document.getElementById('srPdpMainImg');
  const pdpPrice = document.getElementById('srPdpPrice');
  const colorName = document.getElementById('srColorName');
  const sizeLabel = document.getElementById('srSizeLabel');
  const thumbBtns = document.querySelectorAll('.sr-thumb-btn');
  const swatchBtns = document.querySelectorAll('.sr-swatch-btn');
  const sizeBtns = document.querySelectorAll('.sr-size-btn');

  let currentColor = 'Trắng / Xanh Royal';
  let currentSize = 'Cỡ 41';
  let currentPrice = 2890000;
  let currentImg = 'img/sneaker-blue.jpg';

  function formatVND(n) {
    return n.toLocaleString('vi-VN') + 'đ';
  }

  thumbBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const src = btn.getAttribute('data-pdp-img');
      if (pdpMainImg && src) pdpMainImg.src = src;
    });
  });

  swatchBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      swatchBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentColor = btn.getAttribute('data-color') || currentColor;
      currentPrice = parseInt(btn.getAttribute('data-price') || '2890000', 10);
      currentImg = btn.getAttribute('data-img') || currentImg;

      if (colorName) colorName.textContent = currentColor;
      if (pdpMainImg) pdpMainImg.src = currentImg;
      if (pdpPrice) pdpPrice.innerHTML = `${formatVND(currentPrice)}`;
    });
  });

  // Category cards click -> scroll to Sora One and select matching colourway
  document.querySelectorAll('[data-select-color]').forEach((card) => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-select-color') || '0', 10);
      if (swatchBtns[idx]) swatchBtns[idx].click();
      document.getElementById('sora-one')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  sizeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentSize = btn.getAttribute('data-size') || '41 (US 9)';
      if (sizeLabel) sizeLabel.textContent = currentSize;
    });
  });

  const wishBtn = document.getElementById('srWishBtn');
  if (wishBtn) {
    wishBtn.addEventListener('click', () => {
      const liked = wishBtn.classList.toggle('is-liked');
      wishBtn.textContent = liked ? '♥' : '♡';
      showToast(liked ? '💙 Đã lưu SORA ONE vào danh sách yêu thích!' : 'Đã bỏ lưu sản phẩm.');
    });
  }

  // 3. Product Spec Accordions
  const accItems = document.querySelectorAll('.sr-acc-item');
  accItems.forEach((item) => {
    const q = item.querySelector('.sr-acc-q');
    const icon = item.querySelector('.sr-acc-icon');
    if (q) {
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        accItems.forEach((other) => {
          other.classList.remove('is-open');
          const otherIco = other.querySelector('.sr-acc-icon');
          if (otherIco) otherIco.textContent = '+';
        });
        if (!isOpen) {
          item.classList.add('is-open');
          if (icon) icon.textContent = '−';
        }
      });
    }
  });

  // 4. Shopping Bag State & Checkout Modal
  const bagModal = document.getElementById('srBagModal');
  const bagTrigger = document.getElementById('srBagTrigger');
  const modalClose = document.getElementById('srModalClose');
  const bagItemsEl = document.getElementById('srBagItems');
  const bagTotalEl = document.getElementById('srBagTotal');
  const bagCountEl = document.getElementById('srBagCount');
  const addToBagBtn = document.getElementById('srAddToBagBtn');

  let bag = [
    {
      name: 'SORA ONE · Trắng / Xanh Royal',
      size: 'Size 41 (US 9)',
      price: 2890000,
      img: 'img/sneaker-blue.jpg',
    },
  ];

  function renderBag() {
    if (bagCountEl) bagCountEl.textContent = String(bag.length);
    if (!bagItemsEl || !bagTotalEl) return;

    if (bag.length === 0) {
      bagItemsEl.innerHTML =
        '<p style="text-align:center;color:#8A909E;padding:16px 0;font-size:13px;">Giỏ hàng của bạn đang trống.</p>';
      bagTotalEl.textContent = '0đ';
      return;
    }

    let total = 0;
    bagItemsEl.innerHTML = bag
      .map((item, idx) => {
        total += item.price;
        return `
          <div class="sr-bag-row">
            <div class="sr-bag-row-left">
              <img src="${item.img}" alt="${item.name}">
              <div>
                <h4>${item.name}</h4>
                <small>${item.size} · ${formatVND(item.price)}</small>
              </div>
            </div>
            <button type="button" class="sr-bag-rm" data-rm="${idx}">Xóa</button>
          </div>
        `;
      })
      .join('');

    bagTotalEl.textContent = formatVND(total);

    bagItemsEl.querySelectorAll('[data-rm]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const rmIdx = parseInt(btn.getAttribute('data-rm') || '0', 10);
        bag.splice(rmIdx, 1);
        renderBag();
      });
    });
  }

  function openBag() {
    renderBag();
    if (bagModal) {
      bagModal.classList.add('is-open');
      bagModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeBag() {
    if (bagModal) {
      bagModal.classList.remove('is-open');
      bagModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (bagTrigger) bagTrigger.addEventListener('click', openBag);
  if (modalClose) modalClose.addEventListener('click', closeBag);
  if (bagModal) {
    bagModal.addEventListener('click', (e) => {
      if (e.target === bagModal) closeBag();
    });
  }

  if (addToBagBtn) {
    addToBagBtn.addEventListener('click', () => {
      bag.push({
        name: `SORA ONE · ${currentColor.split('(')[0].trim()}`,
        size: `Size ${currentSize}`,
        price: currentPrice,
        img: currentImg,
      });
      renderBag();
      showToast(`🛍️ Đã thêm SORA ONE (Size ${currentSize}) vào giỏ hàng!`);
      openBag();
    });
  }

  document.querySelectorAll('[data-quick-buy]').forEach((card) => {
    card.addEventListener('click', () => {
      const name = card.getAttribute('data-quick-buy') || 'Sora Sneaker';
      const price = parseInt(card.getAttribute('data-quick-price') || '2890000', 10);
      const img = card.getAttribute('data-quick-img') || 'img/sneaker-blue.jpg';
      bag.push({
        name,
        size: `Size ${currentSize}`,
        price,
        img,
      });
      renderBag();
      showToast(`🛍️ Đã thêm ${name} vào giỏ hàng!`);
      openBag();
    });
  });

  const checkoutForm = document.getElementById('srCheckoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('srCustName')?.value.trim() || '';
      const phone = document.getElementById('srCustPhone')?.value.trim() || '';
      const addr = document.getElementById('srCustAddr')?.value.trim() || '';
      const itemsStr = bag.map((b) => `${b.name} (${b.size})`).join(', ') || 'SORA ONE';
      const totalStr = bagTotalEl ? bagTotalEl.textContent : '2.890.000đ';
      const msg = `Chào SORA Sneakers, mình là ${name} (${phone}), địa chỉ: ${addr}. Mình đặt mua: ${itemsStr}. Tổng cộng: ${totalStr}.`;
      showToast('⚡ Đang mở Zalo xác nhận đơn hàng SORA...');
      window.open(`https://zalo.me/0974100372?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      closeBag();
    });
  }

  // 5. Toast Helper
  const toastEl = document.getElementById('srToast');
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
      closeBag();
      if (navLinks) navLinks.classList.remove('is-open');
    }
  });

  const revealTargets = document.querySelectorAll(
    '.sr-cat-card, .sr-urban-grid > div, .sr-feat-col, .sr-pdp-grid > div, .sr-craft-grid > div, .sr-soraone-banner, .sr-rel-card'
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
      el.classList.add('sr-reveal');
      el.style.transitionDelay = `${(idx % 4) * 55}ms`;
      io.observe(el);
    });
  }

  renderBag();
});

