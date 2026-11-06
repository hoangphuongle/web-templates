// Mobile Menu
    function toggleMobileMenu() {
        document.getElementById('mobileMenu').classList.toggle('open');
        document.getElementById('mobileOverlay').classList.toggle('open');
        document.body.classList.toggle('menu-open');
    }

    // Hero Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    let autoSlideTimer;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        if(dots[currentSlide]) dots[currentSlide].classList.remove('active');
        
        currentSlide = (index + totalSlides) % totalSlides;
        
        slides[currentSlide].classList.add('active');
        if(dots[currentSlide]) dots[currentSlide].classList.add('active');
        
        updateSliderPosition();
        resetAutoSlide();
    }

    function updateSliderPosition() {
        if(!slides[0]) return;
        const containerWidth = document.querySelector('.slider-wrapper').offsetWidth;
        const slideWidth = slides[0].offsetWidth;
        const style = window.getComputedStyle(slides[0]);
        const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
        
        // Căn giữa slide đang active
        const offset = (containerWidth - slideWidth) / 2 - parseFloat(style.marginLeft);
        const translateX = offset - (currentSlide * (slideWidth + margin));
        
        document.getElementById('slidesContainer').style.transform = `translateX(${translateX}px)`;
    }

    function changeSlide(dir) {
        goToSlide(currentSlide + dir);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(() => changeSlide(1), 5000);
    }

    window.addEventListener('resize', updateSliderPosition);
    setTimeout(updateSliderPosition, 100);

    // Start auto-slide
    resetAutoSlide();

    // Ticket type price update
    document.querySelectorAll('input[name="ticketType"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const priceDisplay = document.querySelector('.price-display');
            const totalDisplay = document.querySelector('.booking-total strong');
            if (this.value === 'round-trip') {
                priceDisplay.innerHTML = '120.000đ<span>/khứ hồi</span>';
                totalDisplay.textContent = '120.000đ';
            } else {
                priceDisplay.innerHTML = '60.000đ<span>/lượt</span>';
                totalDisplay.textContent = '60.000đ';
            }
        });
    });

    // Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const currentBody = currentItem.querySelector('.accordion-body');
            
            // Close all others
            document.querySelectorAll('.accordion-item').forEach(item => {
                if(item !== currentItem) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-body').style.maxHeight = null;
                }
            });

            // Toggle current
            currentItem.classList.toggle('active');
            if (currentItem.classList.contains('active')) {
                currentBody.style.maxHeight = currentBody.scrollHeight + "px";
            } else {
                currentBody.style.maxHeight = null;
            }
        });
    });

    // Open first accordion by default
    if(accordionHeaders.length > 0) {
        accordionHeaders[0].click();
    }

    // Social Hub Toggle
    function toggleSocialHub() {
        document.getElementById('floatingHub').classList.toggle('active');
    }
