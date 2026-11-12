// Interactive Logic for Pizza Lab

document.addEventListener('DOMContentLoaded', () => {
    // 1. Toggle Category Dropdown
    const categoryBtn = document.getElementById('category-menu-toggle');
    const dropdownMenu = document.getElementById('mega-menu');

    if (categoryBtn && dropdownMenu) {
        categoryBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdownMenu.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!categoryBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.remove('active');
            }
        });
    }

    // 2. Interactive Search Effect
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
        searchBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchBar.value.trim();
                if (query) {
                    alert(`Đang tìm kiếm món ăn: "${query}"...`);
                }
            }
        });
    }

    // 3. Table Booking Modal Functionality
    const bookingBtn = document.getElementById('booking-btn');
    const bookingModal = document.getElementById('booking-modal');
    const bookingCloseBtn = document.getElementById('booking-close-btn');
    const bookingOverlay = document.getElementById('booking-modal-overlay');
    const bookingForm = document.getElementById('booking-form');

    const openBookingModal = (e) => {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();
        if (bookingModal) {
            bookingModal.classList.add('open');
        }
    };
    window.openBookingModal = openBookingModal;

    const closeBookingModal = () => {
        if (bookingModal) {
            bookingModal.classList.remove('open');
        }
    };

    if (bookingBtn) {
        bookingBtn.addEventListener('click', openBookingModal);
    }

    if (bookingCloseBtn) {
        bookingCloseBtn.addEventListener('click', closeBookingModal);
    }

    if (bookingOverlay) {
        bookingOverlay.addEventListener('click', closeBookingModal);
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('booking-name').value;
            const phone = document.getElementById('booking-phone').value;
            const date = document.getElementById('booking-date').value;
            const guests = document.getElementById('booking-guests').value;
            const time = document.getElementById('booking-time').value;
            
            // Format date display (YYYY-MM-DD -> DD/MM/YYYY)
            let dateDisplay = date;
            if (date) {
                const parts = date.split('-');
                if (parts.length === 3) {
                    dateDisplay = `${parts[2]}/${parts[1]}/${parts[0]}`;
                }
            }
            
            alert(`🎉 ĐẶT BÀN THÀNH CÔNG!\n\nXin chào ${name},\nPizza King đã nhận yêu cầu đặt bàn cho ${guests} vào lúc ${time} ngày ${dateDisplay}.\nChúng tôi sẽ gọi lại cho bạn qua số điện thoại ${phone} để xác nhận vị trí ngồi đẹp nhất.\n\nCảm ơn Quý khách!`);
            closeBookingModal();
            bookingForm.reset();
        });
    }

    // Hero Section Order trigger opens booking modal
    window.addToCart = () => {
        openBookingModal();
    };

    // Store Locations click feedback
    const storeBtn = document.getElementById('store-btn');
    if (storeBtn) {
        storeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('📍 HỆ THỐNG CỬA HÀNG PIZZA KING:\n\n1. 120 Hai Bà Trưng, Quận 1, TP. HCM\n2. 450 Điện Biên Phủ, Quận Bình Thạnh, TP. HCM\n3. 88 Nguyễn Trãi, Quận 5, TP. HCM\n\nHotline: 0974 100 372 (Miễn phí giao hàng bán kính 5km)');
        });
    }

    // 4. Register and Login clicks feedback
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');

    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Chức năng Đăng nhập đang được phát triển.');
        });
    }

    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Chức năng Đăng ký đang được phát triển.');
        });
    }

    // 5. Apple-Style Large Slider Mechanics
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('#hero-slider .slide');
    const dots = document.querySelectorAll('#hero-slider .dot');
    let slideInterval;

    window.setSlide = (index) => {
        if (slides.length === 0) return;
        
        // Reset index boundary
        if (index >= slides.length) currentSlideIndex = 0;
        else if (index < 0) currentSlideIndex = slides.length - 1;
        else currentSlideIndex = index;

        // Toggle active slide class
        slides.forEach((slide, idx) => {
            if (idx === currentSlideIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Toggle active dot class
        dots.forEach((dot, idx) => {
            if (idx === currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Reset slide timer interval
        resetSlideInterval();
    };

    window.nextSlide = () => {
        setSlide(currentSlideIndex + 1);
    };

    window.prevSlide = () => {
        setSlide(currentSlideIndex - 1);
    };

    const resetSlideInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(window.nextSlide, 5000); // Transitions every 5 seconds
    };

    // Initialize auto-sliding
    if (slides.length > 0) {
        resetSlideInterval();
    }

    // 6. Promotions Horizontal Card Slider Scroll
    const promoSlider = document.getElementById('promo-cards-slider');
    
    window.scrollPromoLeft = () => {
        if (promoSlider) {
            const card = promoSlider.querySelector('.promo-product-card');
            const cardWidth = card ? card.offsetWidth : 240;
            promoSlider.scrollBy({
                left: -(cardWidth + 20), // Card width + gap (20px)
                behavior: 'smooth'
            });
        }
    };

    window.scrollPromoRight = () => {
        if (promoSlider) {
            const card = promoSlider.querySelector('.promo-product-card');
            const cardWidth = card ? card.offsetWidth : 240;
            promoSlider.scrollBy({
                left: (cardWidth + 20), // Card width + gap (20px)
                behavior: 'smooth'
            });
        }
    };

    // 7. Interactive Suggestions Tabs
    const suggestTabs = document.querySelectorAll('.suggestions-tabs .tab-item');
    if (suggestTabs.length > 0) {
        suggestTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                suggestTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Simulated category change
                const categoryName = tab.textContent.trim();
                console.log(`Đang lọc danh mục gợi ý: ${categoryName}`);
            });
        });
    }

    // 8. Interactive Explore Menu Tabs
    const exploreTabs = document.querySelectorAll('.explore-menu-tabs .explore-tab');
    if (exploreTabs.length > 0) {
        exploreTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                exploreTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Simulated explore tab change
                const tabText = tab.textContent.trim();
                console.log(`Đang khám phá danh mục thực đơn: ${tabText}`);
            });
        });
    }

    // 9. Floating Social Connection Suite Interactions
    const socialSuite = document.getElementById('social-float-suite');
    const socialTrigger = document.getElementById('social-float-trigger');

    if (socialSuite && socialTrigger) {
        socialTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            socialSuite.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!socialSuite.contains(e.target)) {
                socialSuite.classList.remove('active');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                socialSuite.classList.remove('active');
            }
        });
    }

    // 10. Customer Testimonials Carousel Dots Simulation
    const reviewDots = document.querySelectorAll('.reviews-carousel-dots .reviews-dot');
    if (reviewDots.length > 0) {
        reviewDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                reviewDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                console.log(`Bản trình bày đánh giá khách hàng chuyển sang slide: ${index + 1}`);
            });
        });
    }

    // 11. FAQ Accordion Functionality
    const faqHeaders = document.querySelectorAll('.faq-accordion-stack .faq-header');
    if (faqHeaders.length > 0) {
        faqHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const isActive = item.classList.contains('active');
                
                // Collapse all items
                document.querySelectorAll('.faq-accordion-stack .faq-item').forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
                });
                
                // Toggle clicked item
                if (!isActive) {
                    item.classList.add('active');
                    header.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    // 12. Booking Banner Form Submission
    const bannerForm = document.getElementById('booking-banner-form');
    if (bannerForm) {
        bannerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('banner-name').value;
            const phone = document.getElementById('banner-phone').value;
            const service = document.getElementById('banner-service').value;
            const date = document.getElementById('banner-date').value;
            
            alert(`🎉 GỬI THÔNG TIN ĐẶT BÀN THÀNH CÔNG!\n\nXin chào ${name},\nPizza King đã nhận yêu cầu đăng ký tư vấn & đặt bàn của bạn tại: "${service}" vào ngày ${date}.\nChúng tôi sẽ liên hệ lại với bạn qua số điện thoại ${phone} trong ít phút nữa để xác nhận chi tiết.\n\nCảm ơn Quý khách!`);
            bannerForm.reset();
        });
    }

    // 13. Footer Newsletter Subscription Form Submission
    const footerSubscribeForm = document.getElementById('footer-subscribe-form');
    if (footerSubscribeForm) {
        footerSubscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = footerSubscribeForm.querySelector('.subscribe-input');
            const email = emailInput ? emailInput.value : '';
            
            alert(`🎉 ĐĂNG KÝ NHẬN TIN THÀNH CÔNG!\n\nCảm ơn bạn đã đăng ký với địa chỉ email: ${email}.\nChúng tôi sẽ gửi các thông tin khuyến mãi hấp dẫn nhất của Pizza King đến hòm thư của bạn.\n\nChúc bạn một ngày tuyệt vời!`);
            footerSubscribeForm.reset();
        });
    }
});
