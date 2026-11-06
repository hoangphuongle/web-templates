// ==========================================================================
// LOAFLY — ARTISAN BAKERY FULL INTERACTIVE SCRIPT
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
    if (cartTotalPrice) cartTotalPrice.textContent = `$${totalAmount.toFixed(2)}`;

    if (!cartItemsList) return;
    if (cart.length === 0) {
      cartItemsList.innerHTML = '<p class="cart-empty-msg">Your basket is empty. Add a warm sourdough loaf or pastry!</p>';
      return;
    }

    cartItemsList.innerHTML = cart
      .map(
        (item, index) => `
        <div class="cart-item-row">
          <img src="${item.img}" alt="${item.name}">
          <div class="cart-item-info">
            <h5>${item.name}</h5>
            <span>$${(item.price * item.qty).toFixed(2)} ($${item.price.toFixed(2)} each)</span>
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

  function addToCart(name, price, img) {
    const numPrice = parseFloat(price) || 24.9;
    const existing = cart.find((i) => i.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price: numPrice, img: img || 'img/product-sourdough.png', qty: 1 });
    }
    renderCart();
    showToast(`🥐 Added ${name} ($${numPrice.toFixed(2)}) to your basket!`);
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

  // 4. Universal Modal Helper (Product Quick-View, Blog Reader, Bento Lightbox, Baker Video)
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
            <p style="font-size:20px;font-weight:800;margin-bottom:12px">$${price}</p>
            <p style="font-size:14px;color:rgba(255,248,235,0.82);line-height:1.6;margin-bottom:20px">${desc}</p>
            <button type="button" class="btn-amber" id="modalAddCartBtn">Add to Basket — $${price}</button>
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
      const caption = item.dataset.caption || 'Handcrafted daily in our stone-deck oven.';
      openModal(`
        <div style="text-align:center">
          <img src="${img}" alt="${caption}" style="width:100%;max-height:340px;object-fit:cover;border-radius:20px;margin-bottom:18px">
          <span style="display:inline-block;background:rgba(245,158,11,0.2);color:var(--amber);font-size:11px;font-weight:800;padding:4px 12px;border-radius:999px;margin-bottom:8px">FRESH MORNING BATCH</span>
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
          <span style="display:inline-block;background:rgba(245,158,11,0.2);color:var(--amber);font-size:11px;font-weight:800;padding:4px 12px;border-radius:999px;margin-bottom:8px">4:00 AM ARTISAN CRAFT</span>
          <h3 style="font-family:var(--font-display);font-size:26px;color:var(--amber);margin-bottom:10px">Meet Our Master Sourdough Bakers</h3>
          <p style="font-size:14px;color:rgba(255,248,235,0.82);line-height:1.65;margin-bottom:16px">
            While the city sleeps, our head baker Julian Moreau and his team shape every boule by hand. We feed our 18-year-old wild levain starter three times a day using stone-ground organic wheat from local family mills.
          </p>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center;background:rgba(255,248,235,0.06);padding:14px;border-radius:16px">
            <div><strong style="color:var(--amber);display:block;font-size:18px">250°C</strong><small style="font-size:11px;color:var(--text-muted)">Hearth Deck Temp</small></div>
            <div><strong style="color:var(--amber);display:block;font-size:18px">36 Hours</strong><small style="font-size:11px;color:var(--text-muted)">Slow Fermentation</small></div>
            <div><strong style="color:var(--amber);display:block;font-size:18px">0%</strong><small style="font-size:11px;color:var(--text-muted)">Additives or Yeast</small></div>
          </div>
        </div>
      `);
    });
  }

  // Blog Articles Reader Modal
  const blogArticles = [
    {
      title: '5 Expert Tips for Baking the Perfect Sourdough at Home',
      read: '4 Min Read · By Head Baker Julian Moreau',
      img: 'img/blog-1.png',
      body: '1. Use an active, bubbly levain at peak rise (4–5 hours after feeding). 2. Autolyse your stone-ground flour and water for 45 minutes before adding salt. 3. Perform gentle coil folds every 30 minutes to build airy gluten structure. 4. Cold-proof at 4°C for at least 16–36 hours for blistered crust and complex tang. 5. Bake in a preheated Dutch oven with steam at 250°C!'
    },
    {
      title: 'The Story Behind Our Signature Almond Croissant',
      read: '3 Min Read · Patisserie Notes',
      img: 'img/blog-2.png',
      body: 'Our twice-baked Almond Croissant starts with a 27-layer AOP Charentes-Poitou butter croissant soaked in a light Madagascar vanilla & dark rum syrup, filled generously with roasted Marcona almond frangipane, and topped with toasted flaked almonds and snow sugar.'
    },
    {
      title: 'Summer Flavors Are Here: Try Our Berry Tart Collection',
      read: '5 Min Read · Seasonal Menu',
      img: 'img/blog-3.png',
      body: 'Hand-picked organic raspberries, blackberries, and wild strawberries rest on a crisp pâte sucrée shell filled with Tahitian vanilla bean diplomat cream and a brush of apricot-verbena glaze.'
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
      text: "The sourdough here is unbeatable — perfectly crisp on the outside and soft on the inside. It's become a weekend must-have at our home!",
      author: '— Clara Jenkins · Local Food Critic (Verified Buyer)'
    },
    {
      text: 'Walking into Loafly at 8 AM smells like heaven. Their flaky almond croissants and cinnamon rolls rival the best patisseries in Paris!',
      author: '— Marcus Vance · Espresso & Pastry Lover (Verified Buyer)'
    },
    {
      text: 'We ordered their Brioche Crown and Berry Tart collection for our Sunday brunch — every single crumb disappeared in 10 minutes!',
      author: '— Elena Rostova · Weekend Regular (Verified Buyer)'
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
      const name = document.getElementById('bookName')?.value || 'Guest';
      const time = document.getElementById('bookTime')?.value || '09:00 AM';
      showToast(`✨ Table reserved for ${name} (${time})! See you at Loafly.`);
      bookingForm.reset();
    });
  }

  // 7. Newsletter Form Submission
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('🥖 Welcome to the Loafly Oven Club! Fresh recipes are on the way.');
      newsletterForm.reset();
    });
  }
});
