/* ==========================================================================
   RUNOVA — Interactive Court Booking Map, Time-Slot Calculator & Accordion
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('rnBurger');
  const navLinks = document.getElementById('rnNavLinks');

  // Set default booking date to today
  const dateInput = document.getElementById('rnBookDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }

  // Mobile Menu
  if (burger && navLinks) {
    burger.addEventListener('click', () => navLinks.classList.toggle('is-open'));
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => navLinks.classList.remove('is-open'));
    });
  }

  // Court Zone Filter Tabs
  const zoneTabs = document.querySelectorAll('[data-zone]');
  const courtUnits = document.querySelectorAll('.rn-court-unit');

  document.querySelectorAll('.rn-zone-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const zone = tab.getAttribute('data-zone');
      document.querySelectorAll('.rn-zone-tab').forEach((t) => t.classList.toggle('is-active', t === tab));
      courtUnits.forEach((court) => {
        const cZone = court.getAttribute('data-zone');
        const show = zone === 'all' || cZone === zone;
        court.classList.toggle('is-hidden', !show);
      });
    });
  });

  // Live Court & Time-Slot Selection + Price Calculation
  const sumCourtEl = document.getElementById('rnSumCourt');
  const sumSlotEl = document.getElementById('rnSumSlot');
  const sumTotalEl = document.getElementById('rnSumTotal');
  const addonChecks = document.querySelectorAll('.rn-addon-check input[type="checkbox"]');

  const formatVND = (num) => `${num.toLocaleString('vi-VN')}đ`;

  const recalcBooking = () => {
    const selectedCourt = document.querySelector('.rn-court-unit.is-selected');
    const courtName = selectedCourt ? selectedCourt.getAttribute('data-court') : 'Sân 01 (Thảm BWF)';
    const hourlyRate = selectedCourt ? parseInt(selectedCourt.getAttribute('data-rate') || '110000', 10) : 110000;

    const activeSlots = Array.from(document.querySelectorAll('.rn-slot-btn.is-active'));
    const slotCount = Math.max(1, activeSlots.length);
    const hours = slotCount * 2; // Each slot is 2 hours
    const slotNames = activeSlots.map((s) => s.getAttribute('data-slot')).join(', ') || '18:00 - 20:00';

    let addonTotal = 0;
    addonChecks.forEach((chk) => {
      if (chk.checked) {
        addonTotal += parseInt(chk.getAttribute('data-addon-price') || '0', 10);
      }
    });

    const total = hourlyRate * hours + addonTotal;

    if (sumCourtEl) sumCourtEl.textContent = courtName;
    if (sumSlotEl) sumSlotEl.textContent = `${slotNames} (${hours} giờ)`;
    if (sumTotalEl) sumTotalEl.textContent = formatVND(total);
  };

  // Click on Court Unit
  courtUnits.forEach((unit) => {
    unit.addEventListener('click', () => {
      if (unit.disabled || unit.classList.contains('is-busy')) return;
      courtUnits.forEach((u) => {
        if (!u.classList.contains('is-busy')) {
          u.classList.remove('is-selected');
          const st = u.querySelector('.rn-court-status');
          if (st) st.textContent = 'Còn trống';
        }
      });
      unit.classList.add('is-selected');
      const statusEl = unit.querySelector('.rn-court-status');
      if (statusEl) statusEl.textContent = 'Đang chọn ✓';
      recalcBooking();
    });
  });

  // Click on Time Slot Button (allow selecting 1 or multiple 2-hour slots)
  const slotBtns = document.querySelectorAll('.rn-slot-btn');
  slotBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const activeCount = document.querySelectorAll('.rn-slot-btn.is-active').length;
      if (btn.classList.contains('is-active') && activeCount <= 1) {
        return; // Keep at least 1 slot active
      }
      btn.classList.toggle('is-active');
      recalcBooking();
    });
  });

  addonChecks.forEach((chk) => chk.addEventListener('change', recalcBooking));

  // Submit Court Booking Form -> Zalo 0974 100 372
  const bookingForm = document.getElementById('rnCourtBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const court = sumCourtEl?.textContent || 'Sân 01';
      const slots = sumSlotEl?.textContent || '18:00 - 20:00';
      const date = dateInput?.value || '';
      const name = document.getElementById('rnBookName')?.value || '';
      const phone = document.getElementById('rnBookPhone')?.value || '';
      const total = sumTotalEl?.textContent || '';
      const selectedAddons = Array.from(addonChecks)
        .filter((c) => c.checked)
        .map((c) => c.value)
        .join(', ') || 'Không có';

      const msg = encodeURIComponent(
        `[RUNOVA ĐẶT SÂN CẦU LÔNG]\n- Sân: ${court}\n- Ngày đánh: ${date}\n- Khung giờ: ${slots}\n- Dịch vụ kèm theo: ${selectedAddons}\n- Tổng tạm tính: ${total}\n- Người đặt: ${name} (${phone})`
      );
      window.open(`https://zalo.me/0974100372?text=${msg}`, '_blank', 'noopener');
    });
  }

  // Facilities Accordion
  document.querySelectorAll('.rn-acc-item').forEach((item) => {
    const head = item.querySelector('.rn-acc-head');
    if (head) {
      head.addEventListener('click', () => {
        document.querySelectorAll('.rn-acc-item').forEach((other) => {
          other.classList.toggle('is-open', other === item);
        });
      });
    }
  });

  // Testimonials Slider
  const testimonials = [
    {
      quote: '"OVER A YEAR AT<br />RUNOVA <span class="rn-muted">THE BEST<br />SPORTS CENTER</span> FOR<br />BADMINTON AND FUN!"',
      vi: '"Hơn 1 năm gắn bó cùng CLB Runova — Mặt thảm sân cực bám chân, trần cao thoáng không bị chói đèn và đặt lịch giữ sân online siêu tiện lợi!"',
      name: 'Minh Khôi · Noah Carter',
      role: 'Đội trưởng CLB Cầu Lông Quận 7 · Hội viên Vàng',
      avatar: 'img/about-player.png',
    },
    {
      quote: '"PRO BWF COURTS &<br />FAST <span class="rn-muted">ONLINE COURT<br />BOOKING</span> IN JUST<br />30 SECONDS!"',
      vi: '"Sơ đồ chọn sân trực quan như đặt vé xem phim, biết ngay sân nào trống giờ vàng 18h–20h mà không cần gọi điện hỏi từng sân."',
      name: 'Thanh Thảo · Sarah Nguyen',
      role: 'Vận động viên Phong trào · Giải Đôi Nữ Runova Open',
      avatar: 'img/community-girl.png',
    },
  ];
  let testiIdx = 0;
  const renderTesti = () => {
    const t = testimonials[testiIdx];
    const qEl = document.getElementById('rnTestiQuote');
    const vEl = document.getElementById('rnTestiVi');
    const nEl = document.getElementById('rnTestiName');
    const rEl = document.getElementById('rnTestiRole');
    const aEl = document.getElementById('rnTestiAvatar');
    if (qEl) qEl.innerHTML = t.quote;
    if (vEl) vEl.textContent = t.vi;
    if (nEl) nEl.textContent = t.name;
    if (rEl) rEl.textContent = t.role;
    if (aEl) aEl.src = t.avatar;
  };

  document.getElementById('rnTestiPrev')?.addEventListener('click', () => {
    testiIdx = (testiIdx - 1 + testimonials.length) % testimonials.length;
    renderTesti();
  });
  document.getElementById('rnTestiNext')?.addEventListener('click', () => {
    testiIdx = (testiIdx + 1) % testimonials.length;
    renderTesti();
  });

  // Community Join Form
  const commForm = document.getElementById('rnCommForm');
  const commInput = document.getElementById('rnCommInput');
  const commMsg = document.getElementById('rnCommMsg');
  if (commForm && commInput && commMsg) {
    commForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!commInput.value.trim()) return;
      commMsg.hidden = false;
      commMsg.textContent = `✓ Đã ghi nhận "${commInput.value.trim()}"! Quản trị viên CLB sẽ mời bạn vào nhóm Zalo giao lưu cầu lông.`;
      commInput.value = '';
    });
  }

  // Pro Shop & Class Modal
  const modal = document.getElementById('rnModal');
  const modalClose = document.getElementById('rnModalClose');
  const modalItem = document.getElementById('rnModalItem');
  const quickForm = document.getElementById('rnQuickForm');

  document.querySelectorAll('[data-open-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (modalItem) modalItem.value = btn.getAttribute('data-open-modal') || '';
      modal?.classList.add('is-open');
    });
  });

  modalClose?.addEventListener('click', () => modal?.classList.remove('is-open'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('is-open');
  });

  quickForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const item = modalItem?.value || '';
    const name = document.getElementById('rnModalName')?.value || '';
    const phone = document.getElementById('rnModalPhone')?.value || '';
    const note = document.getElementById('rnModalNote')?.value || '';
    const msg = encodeURIComponent(
      `[RUNOVA PRO SHOP] Xin chào, tôi muốn đặt:\n- Sản phẩm / Dịch vụ: ${item}\n- Họ tên: ${name}\n- SĐT: ${phone}\n- Ghi chú: ${note}`
    );
    window.open(`https://zalo.me/0974100372?text=${msg}`, '_blank', 'noopener');
    modal?.classList.remove('is-open');
  });
});

