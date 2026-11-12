let cartTotal = 2;

function filterDishes(cat, el) {
  document.querySelectorAll('.cat-item').forEach(item => item.classList.remove('active'));
  if (el) el.classList.add('active');

  document.querySelectorAll('.dish-card').forEach(card => {
    const match = cat === 'all' || card.dataset.cat === cat;
    card.style.display = match ? '' : 'none';
  });
}

function addDishToCart(name, price) {
  cartTotal++;
  document.getElementById('cartCount').textContent = cartTotal;
  openOrderModal(name, 'Giá: ' + price + ' • Đã thêm vào giỏ món ăn');
}

function openOrderModal(name, sub) {
  document.getElementById('modalDishName').textContent = name;
  document.getElementById('modalDishPrice').textContent = sub;
  document.getElementById('orderModal').classList.add('open');
}

function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('open');
}
