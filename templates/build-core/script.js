/* ==========================================================================
   BUILDCORE. — FULL-SERVICE CONSTRUCTION & PROJECT MANAGEMENT (SCRIPT.JS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Menu
  const burger = document.getElementById('bcBurger');
  const navLinks = document.getElementById('bcNavLinks');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  // 2. Interactive Client Stories Switcher
  const stories = [
    {
      name: 'Gia Đình Anh Minh & Sarah Brooks',
      role: 'Chủ đầu tư Biệt thự Thảo Điền (450m²)',
      img: 'img/story-villa.jpg',
      quote:
        '“Từ bản vẽ 3D đến thi công thực tế giống nhau đến 99%. Đội ngũ kỹ sư BuildCore giám sát rất kỹ từng mẻ bê tông và chống thấm.”',
    },
    {
      name: 'KS. Hoàng Quân · James Carter',
      role: 'Giám Đốc Dự Án · Tổ Hợp Thương Mại Metropole',
      img: 'img/hero-engineer.jpg',
      quote:
        '“Hệ thống theo dõi tiến độ trực tiếp 24/7 của BuildCore giúp ban quản lý kiểm soát 100% chất lượng bê tông, cốt thép và bàn giao vượt tiến độ 3 tuần.”',
    },
    {
      name: 'Tập Đoàn ApexBuild',
      role: 'Tòa nhà Văn phòng & Showroom Quận 1',
      img: 'img/story-commercial.jpg',
      quote:
        '“Bảng dự toán BOQ của BuildCore cực kỳ minh bạch, không phát sinh chi phí ẩn và hoàn thiện hệ mặt dựng kính vượt mong đợi.”',
    },
  ];

  let activeStoryIdx = 1;
  const mainImg = document.getElementById('bcStoryMainImg');
  const mainName = document.getElementById('bcStoryMainName');
  const mainRole = document.getElementById('bcStoryMainRole');
  const storyQuote = document.getElementById('bcStoryQuote');

  function setStory(idx) {
    activeStoryIdx = (idx + stories.length) % stories.length;
    const item = stories[activeStoryIdx];
    if (mainImg) mainImg.src = item.img;
    if (mainName) mainName.textContent = item.name;
    if (mainRole) mainRole.textContent = item.role;
    if (storyQuote) storyQuote.textContent = item.quote;
  }

  document.querySelectorAll('[data-story-idx], [data-story-select]').forEach((el) => {
    el.addEventListener('click', () => {
      const idx = parseInt(
        el.getAttribute('data-story-idx') ?? el.getAttribute('data-story-select') ?? '1',
        10
      );
      setStory(idx);
    });
  });

  document.getElementById('bcStoryPrev')?.addEventListener('click', () => setStory(activeStoryIdx - 1));
  document.getElementById('bcStoryNext')?.addEventListener('click', () => setStory(activeStoryIdx + 1));

  // 3. Interactive How It Works Steps -> Updates Frosted Amber Area-Chart HUD
  const stepItems = document.querySelectorAll('.bc-step-item');
  const journeyPct = document.getElementById('bcJourneyPct');
  const journeyTrend = document.getElementById('bcJourneyTrend');
  const journeyStage = document.getElementById('bcJourneyStage');

  stepItems.forEach((step) => {
    step.addEventListener('click', () => {
      stepItems.forEach((s) => s.classList.remove('is-active'));
      step.classList.add('is-active');
      if (journeyPct) journeyPct.textContent = step.getAttribute('data-pct') || '72%';
      if (journeyTrend) journeyTrend.textContent = step.getAttribute('data-trend') || '';
      if (journeyStage) journeyStage.textContent = step.getAttribute('data-stage') || '';
    });
  });

  // 4. Interactive Construction Cost Estimator
  const estType = document.getElementById('bcEstType');
  const estPackage = document.getElementById('bcEstPackage');
  const estArea = document.getElementById('bcEstArea');
  const estAreaVal = document.getElementById('bcEstAreaVal');
  const estTotal = document.getElementById('bcEstTotal');
  const estSendBtn = document.getElementById('bcEstSendBtn');

  function updateEstimate() {
    const mult = parseFloat(estType?.value || '1');
    const unitPrice = parseInt(estPackage?.value || '6200000', 10);
    const area = parseInt(estArea?.value || '240', 10);
    if (estAreaVal) estAreaVal.textContent = `${area} m²`;
    const total = Math.round(area * unitPrice * mult);
    if (estTotal) estTotal.textContent = total.toLocaleString('vi-VN') + ' VNĐ';
  }

  [estType, estPackage, estArea].forEach((input) => {
    if (input) input.addEventListener('input', updateEstimate);
  });
  updateEstimate();

  if (estSendBtn) {
    estSendBtn.addEventListener('click', () => {
      const area = estArea?.value || '240';
      const total = estTotal?.textContent || '1.488.000.000 VNĐ';
      openModal(`Nhận Bảng Dự Toán BOQ Chi Tiết (${area}m² · ~${total})`);
    });
  }

  // 5. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('.bc-faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.bc-faq-q');
    const icon = item.querySelector('.bc-faq-icon');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        faqItems.forEach((other) => {
          other.classList.remove('is-open');
          const otherIcon = other.querySelector('.bc-faq-icon');
          if (otherIcon) otherIcon.textContent = '+';
        });
        if (!isOpen) {
          item.classList.add('is-open');
          if (icon) icon.textContent = '−';
        }
      });
    }
  });

  // 6. Consultation & Quote Modal
  const modal = document.getElementById('bcModal');
  const modalTitle = document.getElementById('bcModalTitle');
  const modalClose = document.getElementById('bcModalClose');
  const modalForm = document.getElementById('bcModalForm');

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
      const name = document.getElementById('bcModalName')?.value.trim() || '';
      const phone = document.getElementById('bcModalPhone')?.value.trim() || '';
      const type = document.getElementById('bcModalType')?.value || '';
      const area = document.getElementById('bcModalArea')?.value.trim() || '';
      const note = document.getElementById('bcModalNote')?.value.trim() || '';
      const msg = `Chào BuildCore, mình là ${name} (${phone}). Cần tư vấn: ${type} - Quy mô: ${area || 'Chưa rõ'}. Ghi chú: ${note || 'Nhận báo giá BOQ'}`;
      showToast('🏗️ Đang kết nối Zalo Kỹ sư trưởng BuildCore...');
      window.open(`https://zalo.me/0974100372?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      closeModal();
    });
  }

  // 7. Toast Helper
  const toastEl = document.getElementById('bcToast');
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
    '.bc-bento-tall, .bc-bento-card, .bc-stat-col, .bc-stories-stage, .bc-step-item, .bc-journey-visual-card, .bc-estimator-box, .bc-faq-item'
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
      el.classList.add('bc-reveal');
      el.style.transitionDelay = `${(idx % 3) * 60}ms`;
      io.observe(el);
    });
  }
});

