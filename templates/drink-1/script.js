document.addEventListener('DOMContentLoaded', () => {
    const openBooking = document.getElementById('openBooking');
    const bookingModal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');

    if (openBooking && bookingModal) {
        // Open Modal
        openBooking.addEventListener('click', (e) => {
            e.preventDefault();
            bookingModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });

        // Close Modal via Button
        closeModal.addEventListener('click', () => {
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close Modal via Overlay Click
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                bookingModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Form Submission (Demo)
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cảm ơn bạn! Yêu cầu đặt bàn của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại sớm nhất.');
            bookingModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            bookingForm.reset();
        });
    }

    // Social Widget Toggle
    const widgetTrigger = document.getElementById('widgetTrigger');
    const socialWidget = document.getElementById('socialWidget');
    const widgetBooking = document.getElementById('widgetBooking');

    if (widgetTrigger && socialWidget) {
        widgetTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            socialWidget.classList.toggle('active');
        });

        // Close widget when clicking outside
        document.addEventListener('click', (e) => {
            if (!socialWidget.contains(e.target)) {
                socialWidget.classList.remove('active');
            }
        });
    }

    // Social Widget Booking Trigger
    if (widgetBooking && bookingModal) {
        widgetBooking.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            bookingModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            socialWidget.classList.remove('active');
        });
    }

    // FAQ Accordion - Premium Style
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.display = 'none';
                otherItem.querySelector('.faq-icon i').classList.replace('fa-minus', 'fa-plus');
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.display = 'block';
                icon.classList.replace('fa-plus', 'fa-minus');
            }
        });
    });

    console.log('Hashtag Tea - Drink Project Loaded');
});
