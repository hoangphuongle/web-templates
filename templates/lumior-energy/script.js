/* ==========================================================================
   LUMIOR — CLEAN ENERGY, SOLAR, WIND & SMART BATTERY PLATFORM (SCRIPT.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Menu
  const burger = document.getElementById('lmBurger');
  const navLinks = document.getElementById('lmNavLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  // 2. Interactive How It Works Steps (01 - 04) -> Updates 3D Energy Island Telemetry
  const stepRows = document.querySelectorAll('.lm-step-row');
  const telSolar = document.getElementById('lmTelSolar');
  const telWind = document.getElementById('lmTelWind');
  const telBattery = document.getElementById('lmTelBattery');

  stepRows.forEach((row) => {
    row.addEventListener('click', () => {
      stepRows.forEach((r) => r.classList.remove('is-active'));
      row.classList.add('is-active');
      if (telSolar) telSolar.textContent = row.getAttribute('data-solar') || '3.1 MW';
      if (telWind) telWind.textContent = row.getAttribute('data-wind') || '4.2 MW';
      if (telBattery) telBattery.textContent = row.getAttribute('data-battery') || '84%';
    });
  });

  // 3. Interactive Solar & Battery Savings Calculator
  const billRange = document.getElementById('lmBillRange');
  const billVal = document.getElementById('lmBillVal');
  const calcKwp = document.getElementById('lmCalcKwp');
  const calcSave = document.getElementById('lmCalcSave');
  const calcCo2 = document.getElementById('lmCalcCo2');
  const calcOpenModal = document.getElementById('lmCalcOpenModal');

  function updateCalculator() {
    const bill = parseInt(billRange?.value || '3500000', 10);
    if (billVal) billVal.textContent = bill.toLocaleString('vi-VN') + 'đ / tháng';

    const kwp = Math.max(4, Math.round((bill / 450000) * 10) / 10);
    const batteryKwh = kwp <= 6 ? 5 : kwp <= 12 ? 10 : 15;
    const saved = Math.round(bill * 0.84);
    const co2 = (kwp * 0.8).toFixed(1);

    if (calcKwp) calcKwp.textContent = `${kwp} kWp + Pin ${batteryKwh}kWh`;
    if (calcSave) calcSave.textContent = `~${saved.toLocaleString('vi-VN')}đ (-84%)`;
    if (calcCo2) calcCo2.textContent = `${co2} tấn / năm`;
  }

  if (billRange) {
    billRange.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  if (calcOpenModal) {
    calcOpenModal.addEventListener('click', () => {
      const kwpText = calcKwp?.textContent || '8 kWp + Pin 10kWh';
      const saveText = calcSave?.textContent || '~2.950.000đ';
      openModal(`Nhận Phương Án Lắp Đặt: Hệ ${kwpText} (Tiết kiệm ${saveText}/tháng)`);
    });
  }

  // 4. Interactive Testimonials Switcher
  const testimonials = [
    {
      index: '01',
      width: '33%',
      savedPill: 'Tiết kiệm 45% trong tháng 7',
      billBadge: '-45% hóa đơn điện',
      quote:
        '“Từ ngày kết nối hệ thống điện áp mái của khu phố vào Lumior, cả 18 hộ gia đình đều nhìn thấy lượng điện sạch dư thừa chia sẻ cho nhau theo từng phút.”',
      author: 'Gia Đình Anh Hoàng & Lukas',
      role: 'Khu đô thị Coastal Ridge · Thành viên từ 2023',
      photo: 'img/bento-river.jpg',
    },
    {
      index: '02',
      width: '66%',
      savedPill: 'Tiết kiệm 41% trong tháng 8',
      billBadge: '-38% hóa đơn điện',
      quote:
        '“Pin lưu trữ của gia đình tự động nạp đầy lúc nắng đỉnh điểm với chi phí gần như bằng 0 và nuôi toàn bộ điều hòa, thiết bị điện suốt giờ cao điểm buổi tối. Tôi mở ứng dụng Lumior xem sản lượng điện còn nhiều hơn lướt Instagram.”',
      author: 'Marta Kowalczyk · Chị Minh Anh',
      role: 'Chủ biệt thự EcoVilla · Thành viên từ 2024',
      photo: 'img/villa-solar.jpg',
    },
    {
      index: '03',
      width: '100%',
      savedPill: 'Hoàn vốn nhanh hơn 14 tháng',
      billBadge: '-52% chi phí vận hành',
      quote:
        '“Không cần lắp thêm tủ điện mới hay gọi thợ điện đến đục tường — chỉ quét mã QR trên Inverter Huawei sẵn có là toàn bộ dữ liệu lên sóng ngay lập tức.”',
      author: 'KS. Trần Khôi · Elena Silva',
      role: 'Hợp tác xã Sol Energia · Thành viên từ 2024',
      photo: 'img/hero-coastal.jpg',
    },
  ];

  let activeTesti = 1;
  const testiPhoto = document.getElementById('lmTestiPhoto');
  const testiSavedPill = document.getElementById('lmTestiSavedPill');
  const testiBillBadge = document.getElementById('lmTestiBillBadge');
  const testiQuote = document.getElementById('lmTestiQuote');
  const testiAuthor = document.getElementById('lmTestiAuthor');
  const testiRole = document.getElementById('lmTestiRole');
  const testiAvatar = document.getElementById('lmTestiAvatar');
  const testiIndex = document.getElementById('lmTestiIndex');
  const testiBarFill = document.getElementById('lmTestiBarFill');

  function renderTestimonial(idx) {
    activeTesti = (idx + testimonials.length) % testimonials.length;
    const item = testimonials[activeTesti];
    if (testiPhoto) testiPhoto.src = item.photo;
    if (testiSavedPill) testiSavedPill.textContent = item.savedPill;
    if (testiBillBadge) testiBillBadge.textContent = item.billBadge;
    if (testiQuote) testiQuote.textContent = item.quote;
    if (testiAuthor) testiAuthor.textContent = item.author;
    if (testiRole) testiRole.textContent = item.role;
    if (testiAvatar) testiAvatar.src = item.photo;
    if (testiIndex) testiIndex.textContent = item.index;
    if (testiBarFill) testiBarFill.style.width = item.width;
  }

  document.getElementById('lmTestiPrev')?.addEventListener('click', () => renderTestimonial(activeTesti - 1));
  document.getElementById('lmTestiNext')?.addEventListener('click', () => renderTestimonial(activeTesti + 1));

  // 5. Newsletter Form
  const newsletterForm = document.getElementById('lmNewsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('☀️ Cảm ơn bạn đã đăng ký bản tin Năng lượng sạch Lumior!');
      newsletterForm.reset();
    });
  }

  // 6. Modal Handling
  const modal = document.getElementById('lmModal');
  const modalTitle = document.getElementById('lmModalTitle');
  const modalClose = document.getElementById('lmModalClose');
  const modalForm = document.getElementById('lmModalForm');

  function openModal(title) {
    if (modalTitle && title) modalTitle.textContent = title;
    if (modal) {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  document.querySelectorAll('[data-open-modal]').forEach((el) => {
    el.addEventListener('click', () => {
      openModal(el.getAttribute('data-open-modal'));
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('lmModalName')?.value.trim() || '';
      const phone = document.getElementById('lmModalPhone')?.value.trim() || '';
      const sys = document.getElementById('lmModalSystem')?.value || '';
      const bill = document.getElementById('lmModalBill')?.value.trim() || '';
      const note = document.getElementById('lmModalNote')?.value.trim() || '';
      const msg = `Chào Lumior, mình là ${name} (${phone}). Quan tâm: ${sys} - Tiền điện hiện tại: ${bill || 'Chưa rõ'}. Ghi chú: ${note || 'Tư vấn khảo sát lắp đặt'}`;
      showToast('☀️ Đang mở Zalo kết nối kỹ sư năng lượng Lumior...');
      window.open(`https://zalo.me/0974100372?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      closeModal();
    });
  }

  // 7. Toast Helper
  const toastEl = document.getElementById('lmToast');
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

  // 8. Smooth Scroll-Reveal & Escape Key Handling
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      if (navLinks) navLinks.classList.remove('is-open');
    }
  });

  const revealTargets = document.querySelectorAll(
    '.lm-about-editorial, .lm-bento-card, .lm-island-visual, .lm-step-row, .lm-calc-card, .lm-testi-photo-card, .lm-testi-quote-card, .lm-paperwork-cta'
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
      el.classList.add('lm-reveal');
      el.style.transitionDelay = `${(idx % 4) * 55}ms`;
      io.observe(el);
    });
  }
});

