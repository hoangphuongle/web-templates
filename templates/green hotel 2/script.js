document.addEventListener('DOMContentLoaded', () => {
    // Tab switching for hero card images
    const cardImages = document.querySelectorAll('.card-img-item');
    const cardDots = document.querySelectorAll('.card-dots .dot');

    cardImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            // Remove active from all
            cardImages.forEach(i => i.classList.remove('active'));
            cardDots.forEach(d => d.classList.remove('active'));

            // Add to clicked
            img.classList.add('active');
            if (cardDots[index]) cardDots[index].classList.add('active');
        });
    });

    // Quick Booking Interactivity
    const optionBtns = document.querySelectorAll('.option-btn');
    const mainImg = document.getElementById('roomMainImage');
    const oldPrice = document.getElementById('oldPrice');
    const currentPrice = document.getElementById('currentPrice');
    const roomDesc = document.getElementById('roomDesc');
    const thumbnails = document.querySelectorAll('.thumb-item');

    const roomData = {
        standard: "Phòng Standard mang lại không gian ấm cúng, đầy đủ tiện nghi cho các cặp đôi hoặc du khách đi một mình. Diện tích 25m2 với nội thất gỗ tự nhiên sang trọng.",
        deluxe: "Phòng Deluxe rộng rãi với tầm nhìn hướng hồ bơi tuyệt đẹp. Trang bị thêm bồn tắm nằm và khu vực làm việc yên tĩnh. Diện tích 35m2.",
        suite: "Premium Suite là sự lựa chọn đẳng cấp nhất với phòng khách riêng, ban công Panorama hướng toàn cảnh núi rừng. Dịch vụ quản gia riêng 24/7. Diện tích 60m2."
    };

    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            optionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update data
            const type = btn.dataset.type;
            mainImg.src = btn.dataset.img;
            currentPrice.innerText = btn.dataset.price;
            oldPrice.innerText = btn.dataset.old;
            roomDesc.innerText = roomData[type];

            // Sync with thumbnails
            thumbnails.forEach(t => {
                t.classList.toggle('active', t.dataset.src === btn.dataset.img);
            });
        });
    });

    // Thumbnails click
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            mainImg.src = thumb.dataset.src;
        });
    });

    // Qty Selector
    const minusBtn = document.querySelector('.minus');
    const plusBtn = document.querySelector('.plus');
    const qtyVal = document.querySelector('.qty-val');

    if (minusBtn && plusBtn && qtyVal) {
        plusBtn.addEventListener('click', () => {
            let val = parseInt(qtyVal.innerText);
            qtyVal.innerText = val + 1;
        });

        minusBtn.addEventListener('click', () => {
            let val = parseInt(qtyVal.innerText);
            if (val > 1) qtyVal.innerText = val - 1;
        });
    }

    // FAQ Accordion V2
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    console.log('Green Hotel V2 - Luxury Edition Loaded');
});
