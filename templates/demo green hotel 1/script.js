document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('bookingModal');
    const openBtn = document.getElementById('openBooking');
    const closeBtn = document.querySelector('.close-modal');
    const form = document.querySelector('.booking-form');

    // Tab switching for Booking Widget
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Open Modal
    if (openBtn) {
        openBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close Modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close on outside click
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Handle Form Submit
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect data (for simulation)
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            console.log('Booking Data:', data);
            
            alert('Cảm ơn bạn! Yêu cầu đặt phòng của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại qua email hoặc số điện thoại trong thời gian sớm nhất.');
            
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            form.reset();
        });
    }

    // Simple sticky header effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '5px 0';
        } else {
            header.style.padding = '0';
        }
    });

    // Services Slider Logic
    const sliderTrack = document.querySelector('.slider-track');
    const sliderItems = document.querySelectorAll('.slider-item');
    const infoTexts = document.querySelectorAll('.info-text');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const progressFill = document.querySelector('.progress-fill');
    
    let currentIndex = 0;
    const totalItems = sliderItems.length;

    function updateSlider(index) {
        // Update active classes for items
        sliderItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        // Update active classes for info texts
        infoTexts.forEach((text, i) => {
            text.classList.toggle('active', i === index);
        });

        // Move slider track
        const moveDistance = index * (320 + 30); // Updated: item width + gap
        sliderTrack.style.transform = `translateX(-${moveDistance}px)`;

        // Update progress bar
        const progress = ((index + 1) / totalItems) * 100;
        if (progressFill) progressFill.style.width = `${progress}%`;
        
        currentIndex = index;
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= totalItems) nextIndex = 0;
            updateSlider(nextIndex);
        });

        prevBtn.addEventListener('click', () => {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) prevIndex = totalItems - 1;
            updateSlider(prevIndex);
        });
    }

    // Initialize progress bar
    if (progressFill && totalItems > 0) {
        progressFill.style.width = `${(1/totalItems) * 100}%`;
    }

    // Amenities Auto-Slider Logic
    const amenitiesTrack = document.querySelector('.amenities-track');
    let isPaused = false;
    let scrollAmount = 0;
    
    if (amenitiesTrack) {
        // Clone items for infinite loop
        const items = amenitiesTrack.innerHTML;
        amenitiesTrack.innerHTML += items;

        function step() {
            if (!isPaused) {
                scrollAmount -= 0.5; // Tốc độ cuộn
                if (Math.abs(scrollAmount) >= amenitiesTrack.scrollWidth / 2) {
                    scrollAmount = 0;
                }
                amenitiesTrack.style.transform = `translateX(${scrollAmount}px)`;
            }
            requestAnimationFrame(step);
        }

        amenitiesTrack.addEventListener('mouseenter', () => isPaused = true);
        amenitiesTrack.addEventListener('mouseleave', () => isPaused = false);

        requestAnimationFrame(step);
    }

    // Universal Accordion Logic (for both Why Choose Us and FAQ)
    function initAccordion(itemClass, headerClass) {
        const items = document.querySelectorAll(itemClass);
        items.forEach(item => {
            const header = item.querySelector(headerClass);
            if (header) {
                header.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all items in this specific section
                    items.forEach(i => {
                        i.classList.remove('active');
                        const icon = i.querySelector(`${headerClass} i`);
                        if (icon) {
                            icon.classList.remove('fa-chevron-up');
                            icon.classList.add('fa-chevron-down');
                        }
                    });
                    
                    // Open clicked item if it wasn't active
                    if (!isActive) {
                        item.classList.add('active');
                        const icon = item.querySelector(`${headerClass} i`);
                        if (icon) {
                            icon.classList.remove('fa-chevron-down');
                            icon.classList.add('fa-chevron-up');
                        }
                    }
                });
            }
        });
    }

    // Initialize both accordions
    initAccordion('.accordion-item', '.accordion-header');
    initAccordion('.faq-item', '.faq-question');

    // Back to Top Logic
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.style.display = 'flex';
                backToTopBtn.style.opacity = '1';
            } else {
                backToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (window.scrollY <= 500) backToTopBtn.style.display = 'none';
                }, 300);
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
