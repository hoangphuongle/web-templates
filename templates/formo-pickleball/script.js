/* ==========================================================================
   FORMO PICKLEBALL ACADEMY — INTERACTIVE SCRIPT (VIETNAMESE EDITION)
   ========================================================================== */

(function () {
  'use strict';

  // 1. MODAL ĐẶT SÂN & ĐĂNG KÝ HỌC THỬ
  const bookingModal = document.getElementById('bookingModal');
  const modalProgramTitle = document.getElementById('modalProgramTitle');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const pickleballForm = document.getElementById('pickleballForm');
  const toast = document.getElementById('toast');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');

  window.openBookingModal = function (title) {
    if (modalProgramTitle && title) {
      modalProgramTitle.textContent = title;
    }
    if (bookingModal) {
      bookingModal.classList.add('open');
    }
    if (mobileNavDrawer) {
      mobileNavDrawer.classList.remove('open');
    }
  };

  function closeBookingModal() {
    if (bookingModal) {
      bookingModal.classList.remove('open');
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeBookingModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', function (e) {
      if (e.target === bookingModal) {
        closeBookingModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeBookingModal();
    }
  });

  function showToast(msg) {
    if (!toast) return;
    if (msg) toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(window.__formoToastTimer);
    window.__formoToastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 3400);
  }

  if (pickleballForm) {
    pickleballForm.addEventListener('submit', function (e) {
      e.preventDefault();
      closeBookingModal();
      showToast('🎾 Đã gửi yêu cầu đặt lịch! Điều phối viên CLB sẽ liên hệ xác nhận ngay.');
      pickleballForm.reset();
    });
  }

  // 2. MENU DI ĐỘNG
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileNavDrawer.classList.toggle('open');
    });

    mobileNavDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNavDrawer.classList.remove('open');
      });
    });
  }

  // 3. CHUYỂN SLIDE HERO (OWN THE COURT / MASTER THE KITCHEN / BOOST YOUR DUPR 5.0)
  const heroSlides = [
    {
      prefix: 'OWN THE',
      highlight: 'COURT',
      desc: 'Hoàn thiện kỹ thuật Dink sát lưới, làm chủ cú Drop bóng số 3 (3rd Shot Drop) và bứt phá điểm DUPR cùng học viện Pickleball chuyên nghiệp.'
    },
    {
      prefix: 'MASTER THE',
      highlight: 'KITCHEN',
      desc: 'Làm chủ mọi pha đấu tay đôi tốc độ cao tại vạch Non-Volley Zone với kỹ thuật Reset bóng gọn, phản công nhanh và chiến thuật đánh đôi bài bản.'
    },
    {
      prefix: 'BOOST YOUR',
      highlight: 'DUPR 5.0',
      desc: 'Trải nghiệm tổ hợp 12 sân thảm chuẩn USA Pickleball có mái che, giải đấu tính điểm DUPR hàng tuần và phân tích kỹ thuật qua video.'
    }
  ];

  let currentHeroIdx = 0;
  const heroSlideTitle = document.getElementById('heroSlideTitle');
  const heroSlideDesc = document.getElementById('heroSlideDesc');
  const heroPrevBtn = document.getElementById('heroPrevBtn');
  const heroNextBtn = document.getElementById('heroNextBtn');

  function updateHeroSlide(index) {
    if (!heroSlideTitle || !heroSlideDesc) return;
    const slide = heroSlides[index];
    heroSlideTitle.style.opacity = '0.25';
    heroSlideDesc.style.opacity = '0.25';
    setTimeout(function () {
      heroSlideTitle.innerHTML = '<span>' + slide.prefix + '</span> <em class="lime-txt">' + slide.highlight + '</em>';
      heroSlideDesc.textContent = slide.desc;
      heroSlideTitle.style.opacity = '1';
      heroSlideDesc.style.opacity = '1';
    }, 150);
  }

  if (heroPrevBtn) {
    heroPrevBtn.addEventListener('click', function () {
      currentHeroIdx = (currentHeroIdx - 1 + heroSlides.length) % heroSlides.length;
      updateHeroSlide(currentHeroIdx);
    });
  }

  if (heroNextBtn) {
    heroNextBtn.addEventListener('click', function () {
      currentHeroIdx = (currentHeroIdx + 1) % heroSlides.length;
      updateHeroSlide(currentHeroIdx);
    });
  }

  // 4. ACCORDION CHƯƠNG TRÌNH HỌC (#programAccordion)
  const accordion = document.getElementById('programAccordion');
  if (accordion) {
    const items = accordion.querySelectorAll('.acc-item');
    items.forEach(function (item) {
      const header = item.querySelector('.acc-header');
      if (!header) return;
      header.addEventListener('click', function () {
        const isAlreadyActive = item.classList.contains('active');
        items.forEach(function (other) {
          other.classList.remove('active');
          const icon = other.querySelector('.acc-icon');
          if (icon) icon.textContent = '+';
        });

        if (!isAlreadyActive) {
          item.classList.add('active');
          const myIcon = item.querySelector('.acc-icon');
          if (myIcon) myIcon.textContent = '−';
        }
      });
    });
  }

  // 5. ĐĂNG KÝ ĐÁNH THỬ VỢT PRO SHOP
  const paddlePills = document.querySelectorAll('.pb-pills span');
  paddlePills.forEach(function (pill) {
    pill.style.cursor = 'pointer';
    pill.title = 'Bấm để đăng ký mượn đánh thử dòng vợt này';
    pill.addEventListener('click', function () {
      const paddleName = pill.textContent.trim();
      window.openBookingModal('Đăng Ký Đánh Thử Vợt: ' + paddleName);
    });
  });

  // 6. TƯƠNG TÁC THẺ HUẤN LUYỆN VIÊN (.coach-card)
  const coachCards = document.querySelectorAll('.coach-card');
  coachCards.forEach(function (card) {
    card.addEventListener('click', function () {
      coachCards.forEach(function (c) {
        c.classList.remove('active');
      });
      card.classList.add('active');
    });
  });

  // 7. SLIDER ĐÁNH GIÁ CỦA HỌC VIÊN (#testiPrev / #testiNext)
  const testimonials = [
    {
      text: 'Khóa học tại FORMO đã thay đổi hoàn toàn cú Drop bóng số 3 và sự kiên nhẫn của mình ở vạch Kitchen. Điểm DUPR của mình tăng từ 3.25 lên 4.30 chỉ sau 2 tháng và vừa giành HCV đôi nam 4.0!',
      author: 'Anh Quốc Bảo · Hội viên CLB (DUPR 4.32)',
      img: 'img/review-player.png'
    },
    {
      text: 'HLV Trần Minh Quân giúp mình sửa tư thế mở vợt trước ngực và kỹ năng Reset bóng chỉ sau 3 buổi. Giờ vào các pha đấu tay đôi tốc độ cao trên lưới mình tự tin hơn hẳn!',
      author: 'Chị Minh Thư · Vô địch Đôi Nam Nữ Phong Trào (DUPR 4.10)',
      img: 'img/coach-3.png'
    },
    {
      text: 'Hệ thống 12 sân thảm có mái che cực kỳ êm chân, ánh sáng chống chói chuẩn thi đấu. Cộng đồng giao lưu Open Play văn minh và còn được thử vợt JOOLA, Selkirk miễn phí!',
      author: 'Anh Hoàng & Anh Duy · Cặp Đôi Nam DUPR 4.55',
      img: 'img/coach-1.png'
    }
  ];

  let currentTestiIdx = 0;
  const testiText = document.getElementById('testiText');
  const testiAuthor = document.getElementById('testiAuthor');
  const testiImg = document.getElementById('testiImg');
  const testiPrev = document.getElementById('testiPrev');
  const testiNext = document.getElementById('testiNext');

  function renderTestimonial(idx) {
    if (!testiText || !testiAuthor) return;
    const item = testimonials[idx];
    testiText.style.opacity = '0.3';
    setTimeout(function () {
      testiText.textContent = item.text;
      testiAuthor.textContent = item.author;
      if (testiImg && item.img) {
        testiImg.src = item.img;
      }
      testiText.style.opacity = '1';
    }, 140);
  }

  if (testiPrev) {
    testiPrev.addEventListener('click', function () {
      currentTestiIdx = (currentTestiIdx - 1 + testimonials.length) % testimonials.length;
      renderTestimonial(currentTestiIdx);
    });
  }

  if (testiNext) {
    testiNext.addEventListener('click', function () {
      currentTestiIdx = (currentTestiIdx + 1) % testimonials.length;
      renderTestimonial(currentTestiIdx);
    });
  }
})();
