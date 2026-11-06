let rideCart = 1;

function orderBike(name, price) {
  rideCart++;
  document.getElementById('rideCartCount').textContent = rideCart;
  openRideModal(name, 'Price: ' + price + ' • Free Nationwide Delivery');
}

function filterByBrand(brand, btnEl) {
  document.querySelectorAll('.bf-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.brand === brand);
  });
  if (btnEl) {
    btnEl.classList.add('active');
  }
  const cards = document.querySelectorAll('.bike-card');
  let matched = 0;
  cards.forEach(card => {
    const show = brand === 'all' || card.dataset.brand === brand;
    card.style.display = show ? '' : 'none';
    if (show) matched++;
  });
  if (matched === 0) {
    cards.forEach(card => (card.style.display = ''));
  }
  const sec = document.getElementById('ebikes');
  if (sec && !btnEl) {
    sec.scrollIntoView({ behavior: 'smooth' });
  }
}

function openRideModal(title, sub) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalSub').textContent = sub;
  document.getElementById('rideModal').classList.add('open');
}

function closeRideModal() {
  document.getElementById('rideModal').classList.remove('open');
}
