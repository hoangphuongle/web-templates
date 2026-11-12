// ── Interactive Step-by-Step Accordion ("How it works") ──
const stepItems = document.querySelectorAll('.step-item');
const stepIndicator = document.getElementById('howStepIndicator');

stepItems.forEach(item => {
  item.addEventListener('click', () => {
    stepItems.forEach(s => s.classList.remove('active'));
    item.classList.add('active');
    if (stepIndicator) {
      stepIndicator.textContent = item.dataset.step;
    }
  });
});

// ── Interactive Car Type Filter in "How it works" widget ──
const typeItems = document.querySelectorAll('.car-type-item');
typeItems.forEach(item => {
  item.addEventListener('click', () => {
    typeItems.forEach(t => t.classList.remove('active'));
    item.classList.add('active');
  });
});

// ── Collection Category Filter Tabs ──
const colTabs = document.querySelectorAll('.col-tab');
const carCards = document.querySelectorAll('.car-card');
const seeAllBtn = document.getElementById('seeAllBtn');

function filterCollection(filter) {
  colTabs.forEach(t => t.classList.toggle('active', t.dataset.filter === filter));
  carCards.forEach(card => {
    const match = filter === 'all' || card.dataset.cat === filter;
    card.style.display = match ? '' : 'none';
  });
}

colTabs.forEach(tab => {
  tab.addEventListener('click', () => filterCollection(tab.dataset.filter));
});

if (seeAllBtn) {
  seeAllBtn.addEventListener('click', () => filterCollection('all'));
}

// ── Booking Modal ──
function openModal(name, price) {
  document.getElementById('modalCarName').textContent = name;
  document.getElementById('modalCarPrice').textContent = 'Giá thuê: ' + price + ' · Xác nhận giữ xe ngay';
  document.getElementById('bookingModal').classList.add('open');
}
function closeModal() {
  document.getElementById('bookingModal').classList.remove('open');
}
function submitBooking(e) {
  e.preventDefault();
  closeModal();
  window.open('https://zalo.me/0974100372', '_blank');
}
