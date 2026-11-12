/**
 * HP Portfolio & Templates Multi-Language Switcher (VI, EN, RU, KO)
 * Works seamlessly across index.html and all 22 template pages.
 * Zero Google Translate top banner, instant translation + full-page auto-translation support.
 */
      (function () {
        const LANGS = [
          { code: 'vi', label: 'VI', flag: '🇻🇳', name: 'Tiếng Việt' },
          { code: 'en', label: 'EN', flag: '🇬🇧', name: 'English' },
          { code: 'ru', label: 'RU', flag: '🇷🇺', name: 'Русский' },
          { code: 'ko', label: 'KO', flag: '🇰🇷', name: '한국어' }
        ];

        // Built-in instant dictionary for common UI & Showcase elements
        const DICT = {
          en: {
            'Xem mẫu': 'Templates',
            'Zalo tư vấn': 'Zalo Chat',
            'Nhận thiết kế – Bàn giao 7 ngày': 'Custom Web Design – 7-Day Delivery',
            'Mẫu website đẹp,': 'Beautiful Web Templates,',
            'click để xem ngay': 'Click for Live Demo',
            'Chọn mẫu ưng ý, nhắn Zalo là xong. Thiết kế website cho Spa, Nail, Gym, Khách sạn, Nhà hàng & Doanh nghiệp.':
              'Pick your favorite design and message via Zalo or Telegram. Professional websites for Spas, Nail Salons, Gyms, Hotels, Restaurants & Businesses.',
            'Xem mẫu website ↓': 'Explore Templates ↓',
            'Nhắn Zalo miễn phí': 'Free Zalo Consultation',
            'Mẫu có sẵn': 'Ready Templates',
            'Trọn đời': 'Lifetime',
            'Bảo hành': 'Support',
            '7 ngày': '7 Days',
            'Bàn giao': 'Delivery',
            'Miễn phí': 'Free',
            'Tư vấn': 'Consultation',
            'Mẫu website demo': 'Live Demo Templates',
            'Tất cả': 'All',
            'Thể thao & Gym': 'Sports & Gym',
            'Giáo dục': 'Education',
            'Xe & Vận tải': 'Transport & Cars',
            'Khách sạn': 'Hotels & Resorts',
            'Đồ uống': 'Beverages & Cafe',
            'Nhà hàng': 'Restaurants & Food',
            'Xem demo': 'Live Demo',
            'Dự án thực tế': 'Real Projects',
            'Website đã bàn giao live': 'Delivered Live Websites',
            'Dịch vụ': 'Services',
            'Làm được gì cho bạn?': 'How Can We Help You?',
            'Thiết kế theo mẫu': 'Template Customization',
            'Thiết kế riêng': 'Custom Exclusive Design',
            'Quy trình': 'Process',
            'Xong trong 7 ngày': 'Ready in 7 Days',
            'Hỏi đáp': 'FAQ',
            'Câu hỏi thường gặp': 'Frequently Asked Questions',
            'Khách hàng nói gì': 'Testimonials',
            'Họ đã có web đẹp': 'Happy Clients',
            'Nhắn Zalo ngay': 'Chat on Zalo Now',
            '← Xem mẫu khác': '← Other Templates',
            'Nhắn tin Zalo': 'Chat on Zalo',
            'Bạn đang xem demo · Thích mẫu này?': 'Viewing Live Demo · Like this template?',
            // Car Rental (Mẫu 17)
            'Home': 'Home',
            'Services': 'Services',
            'How it Works': 'How it Works',
            'Get the app': 'Get the app',
            'Our Services': 'Our Services',
            'Well-Maintained Car': 'Well-Maintained Car',
            'Secure Payments': 'Secure Payments',
            '24/7 Support': '24/7 Support',
            'How it works': 'How it works',
            'Discover Your Perfect Car': 'Discover Your Perfect Car',
            'Secure Your Rental Booking': 'Secure Your Rental Booking',
            'Complete Your Booking Payment': 'Complete Your Booking Payment',
            'Your Booking is Confirmed': 'Your Booking is Confirmed',
            'Collection': 'Collection',
            'Explore Our Collection Cars': 'Explore Our Collection Cars',
            'All Type': 'All Type',
            'See All Collection': 'See All Collection',
            // FOODIE (Mẫu 18)
            'Menu': 'Menu',
            'Restaurants': 'Restaurants',
            'Offers': 'Offers',
            'About': 'About',
            'Sign In': 'Sign In',
            'Find Food →': 'Find Food →',
            'Fast Delivery': 'Fast Delivery',
            'Fresh Ingredients': 'Fresh Ingredients',
            'Wide Variety': 'Wide Variety',
            'SPECIAL OFFER': 'SPECIAL OFFER',
            'Flat 50% OFF': 'Flat 50% OFF',
            'On Your First Order': 'On Your First Order',
            'Order Now': 'Order Now',
            'POPULAR': 'POPULAR',
            'Most Ordered Dishes': 'Most Ordered Dishes',
            'View All →': 'View All →',
            // FORMO PICKLEBALL (Mẫu 21)
            'Trang chủ': 'Home',
            'Khóa học': 'Programs',
            'Giáo trình': 'Clinics',
            'HLV': 'Coaches',
            'Đánh giá': 'Reviews',
            'Đặt Sân Ngay': 'Book a Trial',
            'Khám Phá Khóa Học': 'Explore Programs',
            'TẬP LUYỆN TẠI FORMO PICKLEBALL': 'TRAIN AT FORMO PICKLEBALL',
            'Xem Chi Tiết': 'View Program',
            'ĐỘI NGŨ HUẤN LUYỆN VIÊN': 'MEET OUR COACHES',
            'CẢM NHẬN HỌC VIÊN': 'TESTIMONIAL',
            'Đặt Lịch Tập Ngay': 'Book a Session',
            // FRESH. (Mẫu 22)
            'Trái cây tươi': 'Fresh Fruit',
            'Doanh nghiệp': 'Businesses',
            'Về chúng tôi': 'About Us',
            'Liên hệ ngay ↗': 'Contact Us ↗',
            'Xem tất cả ↓': 'See All ↓',
            'Thêm giỏ ↗': 'Add to Cart ↗',
            'Mua ngay ↗': 'Shop Now ↗',
            'Tra cứu đơn ↗': 'Track Order ↗'
          },
          ru: {
            'Xem mẫu': 'Шаблоны',
            'Zalo tư vấn': 'Чат Zalo',
            'Nhận thiết kế – Bàn giao 7 ngày': 'Разработка сайтов — Сдача за 7 дней',
            'Mẫu website đẹp,': 'Красивые шаблоны сайтов,',
            'click để xem ngay': 'смотрите демо прямо сейчас',
            'Chọn mẫu ưng ý, nhắn Zalo là xong. Thiết kế website cho Spa, Nail, Gym, Khách sạn, Nhà hàng & Doanh nghiệp.':
              'Выберите понравившийся шаблон и напишите нам в Zalo или Telegram. Сайты для СПА, салонов красоты, фитнеса, отелей, ресторанов и бизнеса.',
            'Xem mẫu website ↓': 'Смотреть шаблоны ↓',
            'Nhắn Zalo miễn phí': 'Консультация в Zalo',
            'Mẫu có sẵn': 'Готовых шаблонов',
            'Trọn đời': 'Пожизненная',
            'Bảo hành': 'Гарантия',
            '7 ngày': '7 дней',
            'Bàn giao': 'Срок сдачи',
            'Miễn phí': 'Бесплатно',
            'Tư vấn': 'Консультация',
            'Mẫu website demo': 'Демонстрационные шаблоны',
            'Tất cả': 'Все',
            'Thể thao & Gym': 'Спорт и Фитнес',
            'Giáo dục': 'Образование',
            'Xe & Vận tải': 'Авто и Транспорт',
            'Khách sạn': 'Отели и Курорты',
            'Đồ uống': 'Кафе и Напитки',
            'Nhà hàng': 'Рестораны и Еда',
            'Xem demo': 'Смотреть демо',
            'Dự án thực tế': 'Реальные проекты',
            'Website đã bàn giao live': 'Запущенные сайты клиентов',
            'Dịch vụ': 'Услуги',
            'Làm được gì cho bạn?': 'Что мы предлагаем?',
            'Thiết kế theo mẫu': 'Сайт по готовому шаблону',
            'Thiết kế riêng': 'Индивидуальный дизайн',
            'Quy trình': 'Процесс работы',
            'Xong trong 7 ngày': 'Готово за 7 дней',
            'Hỏi đáp': 'Вопросы и ответы',
            'Câu hỏi thường gặp': 'Часто задаваемые вопросы',
            'Khách hàng nói gì': 'Отзывы клиентов',
            'Họ đã có web đẹp': 'Наши довольные клиенты',
            'Nhắn Zalo ngay': 'Написать в Zalo',
            '← Xem mẫu khác': '← Другие шаблоны',
            'Nhắn tin Zalo': 'Написать в Zalo',
            'Bạn đang xem demo · Thích mẫu này?': 'Просмотр демо · Нравится этот шаблон?',
            // Car Rental (Mẫu 17)
            'Home': 'Главная',
            'Services': 'Услуги',
            'How it Works': 'Как это работает',
            'FAQs': 'Вопросы',
            'Get the app': 'Скачать приложение',
            'Our Services': 'Наши услуги',
            'Our Premier services for your car rental needs': 'Премиальный сервис аренды автомобилей для ваших поездок',
            'Well-Maintained Car': 'Исправные авто',
            'Secure Payments': 'Безопасная оплата',
            '24/7 Support': 'Поддержка 24/7',
            'How it works': 'Как арендовать',
            'Discover Your Perfect Car': 'Выберите идеальный автомобиль',
            'Secure Your Rental Booking': 'Забронируйте автомобиль онлайн',
            'Complete Your Booking Payment': 'Оплатите удобным способом',
            'Your Booking is Confirmed': 'Бронирование подтверждено',
            'Collection': 'Автопарк',
            'Explore Our Collection Cars': 'Наш автопарк для аренды',
            'All Type': 'Все авто',
            'See All Collection': 'Смотреть все авто',
            // FOODIE (Mẫu 18)
            'Menu': 'Меню',
            'Restaurants': 'Рестораны',
            'Offers': 'Акции',
            'About': 'О нас',
            'Sign In': 'Войти',
            'Find Food →': 'Найти еду →',
            'Fast Delivery': 'Быстрая доставка',
            'On-time, every time': 'Всегда вовремя',
            'Fresh Ingredients': 'Свежие продукты',
            'Quality you can taste': 'Вкус и качество',
            'Wide Variety': 'Большой выбор',
            'From local to global': 'Кухни всего мира',
            'Delicious Dishes': 'Вкусных блюд',
            'Biryani': 'Плов / Бирьяни',
            'Burgers': 'Бургеры',
            'Indian': 'Индийская',
            'Chinese': 'Китайская',
            'Desserts': 'Десерты',
            'Salads': 'Салаты',
            'Beverages': 'Напитки',
            'SPECIAL OFFER': 'СПЕЦПРЕДЛОЖЕНИЕ',
            'Flat 50% OFF': 'Скидка 50%',
            'On Your First Order': 'На ваш первый заказ',
            'Order Now': 'Заказать сейчас',
            'POPULAR': 'ПОПУЛЯРНОЕ',
            'Most Ordered Dishes': 'Самые популярные блюда',
            'View All →': 'Смотреть все →',
            // REBEL RIDE (Mẫu 19 – Fixed Gear)
            'FIXED GEAR': 'ФИКСЕД ГИР',
            'TEST RIDE': 'ТЕСТ-ДРАЙВ',
            'POWER, PRECISION, PRESENCE': 'МОЩЬ, ТОЧНОСТЬ, СТИЛЬ УЛИЦ',
            'Shop Fixed Gear': 'Купить Фикс',
            'Build Your Fixie': 'Собрать свой Фикс',
            'WE’VE GOT YOU COVERED': 'МЫ ПОЗАБОТИЛИСЬ ОБО ВСЁМ',
            'See All Services': 'Все услуги',
            'PRECISION IN MOTION': 'ТОЧНОСТЬ В ДВИЖЕНИИ',
            'View All Fixed Gear': 'Смотреть все фиксы',
            'About Us': 'О компании',
            'FOLLOW ON INSTAGRAM': 'МЫ В INSTAGRAM',
            // LOAFLY BAKERY (Mẫu 20)
            'Category': 'Категории',
            'Shop': 'Витрина',
            'Contact': 'Контакты',
            'Bakers': 'Пекари',
            'Explore Our Items': 'Смотреть меню',
            'CATEGORY': 'КАТЕГОРИИ',
            'Breads': 'Хлеб',
            'PASTRIES': 'ВЫПЕЧКА',
            'Cakes': 'Торты',
            'Cookies': 'Печенье',
            'SOURDOUGH': 'ТАРТИН НА ЗАКВАСКЕ',
            'BAGUETTES': 'ФРАНЦУЗСКИЙ БАГЕТ',
            'MULTIGRAIN': 'МУЛЬТИЗЛАКОВЫЙ',
            'Add to Cart': 'В корзину',
            'TESTIMONIAL': 'ОТЗЫВЫ',
            'BOOKING': 'БРОНЬ СТОЛА',
            'BOOK YOUR TABLE': 'ЗАБРОНИРОВАТЬ СТОЛИК',
            'Submit': 'Отправить',
            'OPENING HOURS': 'ЧАСЫ РАБОТЫ',
            'Monday – Sunday': 'Понедельник – Воскресенье',
            'BLOG': 'БЛОГ ПЕКАРНИ',
            'Subscribe': 'Подписаться',
            // FORMO PICKLEBALL (Mẫu 21)
            'Trang chủ': 'Главная',
            'Khóa học': 'Программы',
            'Giáo trình': 'Клиники DUPR',
            'HLV': 'Тренеры',
            'Đánh giá': 'Отзывы',
            'Đặt Sân Ngay': 'Пробная игра',
            'Khám Phá Khóa Học': 'Все программы',
            'TẬP LUYỆN TẠI FORMO PICKLEBALL': 'ТРЕНИРУЙСЯ В FORMO PICKLEBALL',
            'Xem Chi Tiết': 'Подробнее',
            'ĐỘI NGŨ HUẤN LUYỆN VIÊN': 'НАШИ ТРЕНЕРЫ',
            'CẢM NHẬN HỌC VIÊN': 'ОТЗЫВЫ ИГРОКОВ',
            'Đặt Lịch Tập Ngay': 'Забронировать корт',
            // FRESH. (Mẫu 22)
            'Trái cây tươi': 'Свежие фрукты',
            'Doanh nghiệp': 'Для бизнеса',
            'Về chúng tôi': 'О нас',
            'Liên hệ ngay ↗': 'Связаться ↗',
            'Xem tất cả ↓': 'Смотреть все ↓',
            'Thêm giỏ ↗': 'В корзину ↗',
            'Mua ngay ↗': 'Купить ↗',
            'Tra cứu đơn ↗': 'Отследить ↗'
          },
          ko: {
            'Xem mẫu': '템플릿 보기',
            'Zalo tư vấn': 'Zalo 상담',
            'Nhận thiết kế – Bàn giao 7 ngày': '웹사이트 맞춤 제작 – 7일 내 완성',
            'Mẫu website đẹp,': '감각적인 웹사이트 템플릿,',
            'click để xem ngay': '클릭해서 바로 체험하세요',
            'Chọn mẫu ưng ý, nhắn Zalo là xong. Thiết kế website cho Spa, Nail, Gym, Khách sạn, Nhà hàng & Doanh nghiệp.':
              '마음에 드는 템플릿을 고르고 Zalo 또는 Telegram으로 문의하세요. 스파, 네일샵, 피트니스, 호텔, 레스토랑 및 기업용 전문 웹사이트.',
            'Xem mẫu website ↓': '템플릿 둘러보기 ↓',
            'Nhắn Zalo miễn phí': '무료 Zalo 상담',
            'Mẫu có sẵn': '보유 템플릿',
            'Trọn đời': '평생',
            'Bảo hành': '유지보수 보증',
            '7 ngày': '7일 이내',
            'Bàn giao': '제작 완료',
            'Miễn phí': '무료',
            'Tư vấn': '맞춤 상담',
            'Mẫu website demo': '라이브 데모 템플릿',
            'Tất cả': '전체',
            'Thể thao & Gym': '스포츠 · 피트니스',
            'Giáo dục': '교육 · 강의',
            'Xe & Vận tải': '렌터카 · 운송',
            'Khách sạn': '호텔 · 리조트',
            'Đồ uống': '카페 · 음료',
            'Nhà hàng': '레스토랑 · 배달',
            'Xem demo': '데모 보기',
            'Dự án thực tế': '실제 구축 사례',
            'Website đã bàn giao live': '운영 중인 라이브 웹사이트',
            'Dịch vụ': '서비스 안내',
            'Làm được gì cho bạn?': '어떤 웹사이트가 필요하신가요?',
            'Thiết kế theo mẫu': '템플릿 기반 제작',
            'Thiết kế riêng': '맞춤형 단독 디자인',
            'Quy trình': '제작 과정',
            'Xong trong 7 ngày': '7일 만에 완성됩니다',
            'Hỏi đáp': '자주 묻는 질문',
            'Câu hỏi thường gặp': '궁금한 점을 확인하세요',
            'Khách hàng nói gì': '고객 후기',
            'Họ đã có web đẹp': '만족하신 고객님들',
            'Nhắn Zalo ngay': 'Zalo로 문의하기',
            '← Xem mẫu khác': '← 다른 템플릿',
            'Nhắn tin Zalo': 'Zalo 메시지',
            'Bạn đang xem demo · Thích mẫu này?': '데모 체험 중 · 이 디자인이 마음에 드시나요?',
            // Car Rental (Mẫu 17)
            'Home': '홈',
            'Services': '서비스',
            'How it Works': '이용 방법',
            'FAQs': '자주 묻는 질문',
            'Get the app': '앱 다운로드',
            'Our Services': '프리미엄 서비스',
            'Our Premier services for your car rental needs': '편안하고 안전한 여행을 위한 맞춤형 렌터카 서비스',
            'Well-Maintained Car': '최상급 차량 관리',
            'Secure Payments': '안전한 결제 시스템',
            '24/7 Support': '24시간 고객 지원',
            'How it works': '이용 단계',
            'Discover Your Perfect Car': '원하는 차량 선택하기',
            'Secure Your Rental Booking': '빠른 온라인 예약 확정',
            'Complete Your Booking Payment': '간편 결제 진행',
            'Your Booking is Confirmed': '예약 최종 완료',
            'Collection': '차량 컬렉션',
            'Explore Our Collection Cars': '다양한 렌터카 라인업 둘러보기',
            'All Type': '전체 차량',
            'See All Collection': '전체 차량 보기',
            // FOODIE (Mẫu 18)
            'Menu': '메뉴',
            'Restaurants': '레스토랑',
            'Offers': '할인 혜택',
            'About': '소개',
            'Sign In': '로그인',
            'Find Food →': '음식 찾기 →',
            'Fast Delivery': '빠른 배달',
            'On-time, every time': '정시 도착 보장',
            'Fresh Ingredients': '신선한 식재료',
            'Quality you can taste': '믿을 수 있는 품질',
            'Wide Variety': '다양한 메뉴',
            'From local to global': '로컬부터 글로벌 맛집까지',
            'Delicious Dishes': '인기 메뉴',
            'Biryani': '비리야니 · 볶음밥',
            'Burgers': '수제버거',
            'Indian': '아시안 요리',
            'Chinese': '중식 · 면류',
            'Desserts': '디저트',
            'Salads': '샐러드',
            'Beverages': '음료 · 주스',
            'SPECIAL OFFER': '특별 프로모션',
            'Flat 50% OFF': '첫 주문 50% 할인',
            'On Your First Order': '신규 회원 첫 주문 혜택',
            'Order Now': '지금 주문하기',
            'POPULAR': '인기 메뉴',
            'Most Ordered Dishes': '가장 많이 주문한 메뉴',
            'View All →': '전체 보기 →',
            // REBEL RIDE (Mẫu 19 – Fixed Gear)
            'FIXED GEAR': '픽시 바이크',
            'TEST RIDE': '시승 신청',
            'POWER, PRECISION, PRESENCE': '파워, 정밀함, 스트릿 픽시',
            'Shop Fixed Gear': '픽시 구매하기',
            'Build Your Fixie': '나만의 픽시 커스텀',
            'WE’VE GOT YOU COVERED': '완벽한 라이딩 케어 서비스',
            'See All Services': '모든 서비스 보기',
            'PRECISION IN MOTION': '역동적인 픽시 라인업',
            'View All Fixed Gear': '전 제품 보기',
            'About Us': '브랜드 소개',
            'FOLLOW ON INSTAGRAM': '인스타그램 팔로우',
            // LOAFLY BAKERY (Mẫu 20)
            'Category': '카테고리',
            'Shop': '베이커리 샵',
            'Contact': '예약 · 문의',
            'Bakers': '파티시에',
            'Explore Our Items': '메뉴 둘러보기',
            'CATEGORY': '카테고리',
            'Breads': '천연발효빵',
            'PASTRIES': '페이스트리',
            'Cakes': '수제 케이크',
            'Cookies': '구움과자 · 쿠키',
            'SOURDOUGH': '사워도우 깜빠뉴',
            'BAGUETTES': '프렌치 바게트',
            'MULTIGRAIN': '통곡물 식빵',
            'Add to Cart': '장바구니 담기',
            'TESTIMONIAL': '고객 후기',
            'BOOKING': '테이블 예약',
            'BOOK YOUR TABLE': '매장 테이블 예약하기',
            'Submit': '예약 신청',
            'OPENING HOURS': '영업 시간',
            'Monday – Sunday': '월요일 – 일요일',
            'BLOG': '베이커리 노트',
            'Subscribe': '구독하기',
            // FORMO PICKLEBALL (Mẫu 21)
            'Trang chủ': '홈',
            'Khóa học': '프로그램',
            'Giáo trình': 'DUPR 클리닉',
            'HLV': '코칭 스태프',
            'Đánh giá': '수강 후기',
            'Đặt Sân Ngay': '체험 레슨 예약',
            'Khám Phá Khóa Học': '프로그램 보기',
            'TẬP LUYỆN TẠI FORMO PICKLEBALL': 'FORMO 피클볼 아카데미',
            'Xem Chi Tiết': '상세 보기',
            'ĐỘI NGŨ HUẤN LUYỆN VIÊN': '전문 코치진 소개',
            'CẢM NHẬN HỌC VIÊN': '수강생 후기',
            'Đặt Lịch Tập Ngay': '코트 · 레슨 예약',
            // FRESH. (Mẫu 22)
            'Trái cây tươi': '신선 과일',
            'Doanh nghiệp': '기업 기프트',
            'Về chúng tôi': '브랜드 소개',
            'Liên hệ ngay ↗': '문의하기 ↗',
            'Xem tất cả ↓': '전체 보기 ↓',
            'Thêm giỏ ↗': '장바구니 ↗',
            'Mua ngay ↗': '바로 구매 ↗',
            'Tra cứu đơn ↗': '배송 조회 ↗'
          }
        };

        // Inject CSS to hide Google Translate top frame/banner completely and style the switcher
        const style = document.createElement('style');
        style.textContent = `
    /* Hide Google Translate top banner & tooltips completely */
    .skiptranslate iframe,
    iframe.goog-te-banner-frame,
    .goog-te-banner-frame,
    #goog-gt-tt,
    .goog-te-balloon-frame,
    .goog-tooltip,
    .goog-tooltip:hover {
      display: none !important;
      visibility: hidden !important;
    }
    body {
      top: 0px !important;
      position: static !important;
    }
    .goog-text-highlight {
      background-color: transparent !important;
      box-shadow: none !important;
    }
    #hp_google_translate_elem {
      display: none !important;
    }

    /* Language Switcher Pill */
    .hp-lang-switcher {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      background: rgba(255, 255, 255, 0.09);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 999px;
      padding: 2px;
      font-family: -apple-system, BlinkMacSystemFont, 'Be Vietnam Pro', 'Plus Jakarta Sans', sans-serif;
      flex-shrink: 0;
    }
    .hp-lang-switcher.light-theme {
      background: #f1f5f9;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    .hp-lang-btn {
      border: none;
      background: transparent;
      color: rgba(255, 255, 255, 0.72);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 7px;
      border-radius: 999px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      transition: all 0.2s ease;
      line-height: 1;
      letter-spacing: 0.02em;
    }
    .hp-lang-switcher.light-theme .hp-lang-btn {
      color: #475569;
    }
    .hp-lang-btn:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.12);
    }
    .hp-lang-switcher.light-theme .hp-lang-btn:hover {
      color: #0f172a;
      background: rgba(0, 0, 0, 0.06);
    }
    .hp-lang-btn.active {
      background: #22c55e;
      color: #ffffff !important;
      box-shadow: 0 2px 8px rgba(34, 197, 94, 0.35);
    }
    .hp-lang-flag {
      font-size: 12px;
      line-height: 1;
    }
    @media (max-width: 1200px) {
      #hp-mid {
        display: none !important;
      }
    }
    @media (max-width: 1024px) {
      #hp-tel,
      .hp-vp-switcher {
        display: none !important;
      }
    }
    @media (max-width: 768px) {
      #hp-back {
        display: none !important;
      }
      #hp-bar {
        padding: 0 12px !important;
        gap: 8px !important;
      }
    }
    @media (max-width: 640px) {
      .hp-lang-flag {
        display: none;
      }
      .hp-lang-btn {
        padding: 4px 6px;
        font-size: 10px;
      }
      .hp-vp-switcher {
        display: none !important;
      }
      /* Only hide the brand text on mobile so Zalo/Telegram fit cleanly */
      #hp-bar > a:first-child span:last-child {
        display: none;
      }
      #hp-bar a[href*="t.me"],
      #hp-bar a[href*="zalo.me"] {
        padding: 6px 10px !important;
        font-size: 11px !important;
      }
    }
    @media (max-width: 390px) {
      .hp-lang-btn {
        padding: 3px 4px;
        font-size: 9.5px;
      }
      #hp-bar a[href*="t.me"],
      #hp-bar a[href*="zalo.me"] {
        padding: 5px 8px !important;
        font-size: 10.5px !important;
      }
    }

    /* Desktop / Mobile Viewport Preview Toggle inside #hp-bar */
    .hp-vp-switcher {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 999px;
      padding: 2px;
      flex-shrink: 0;
    }
    .hp-vp-btn {
      border: none;
      background: transparent;
      color: rgba(255, 255, 255, 0.7);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 9px;
      border-radius: 999px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      transition: 0.2s;
    }
    .hp-vp-btn:hover {
      color: #fff;
    }
    .hp-vp-btn.active {
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
    }

    /* Mobile Frame Overlay when user clicks Mobile View on Desktop */
    #hp-mobile-frame-backdrop {
      position: fixed;
      top: 52px;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999990;
      background: radial-gradient(circle at center, #1e293b 0%, #090d16 100%);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    #hp-mobile-frame-backdrop.open {
      display: flex;
    }
    .hp-phone-bezel {
      width: 395px;
      height: min(820px, calc(100vh - 86px));
      background: #000;
      border-radius: 44px;
      padding: 12px;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.65), 0 0 0 2px rgba(255, 255, 255, 0.14);
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .hp-phone-notch {
      width: 110px;
      height: 22px;
      background: #000;
      border-radius: 0 0 14px 14px;
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
    }
    .hp-phone-bezel iframe {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 32px;
      background: #fff;
    }
  `;
        document.head.appendChild(style);

        // Store original Vietnamese text for instant restoration
        const originalNodes = new Map();

        function getSavedLang() {
          try {
            return localStorage.getItem('hp_lang') || 'vi';
          } catch (e) {
            return 'vi';
          }
        }

        function saveLang(lang) {
          try {
            localStorage.setItem('hp_lang', lang);
          } catch (e) { }
        }

        function applyInstantDict(lang) {
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
          let node;
          while ((node = walker.nextNode())) {
            if (!node.parentElement) continue;
            const tag = node.parentElement.tagName;
            if (tag === 'SCRIPT' || tag === 'STYLE' || node.parentElement.closest('.hp-lang-switcher')) continue;

            const raw = node.nodeValue;
            const trimmed = raw.trim();
            if (!trimmed) continue;

            if (!originalNodes.has(node)) {
              originalNodes.set(node, raw);
            }

            const origRaw = originalNodes.get(node);
            const origTrimmed = origRaw.trim();

            if (lang === 'vi') {
              node.nodeValue = origRaw;
            } else if (DICT[lang] && DICT[lang][origTrimmed]) {
              node.nodeValue = origRaw.replace(origTrimmed, DICT[lang][origTrimmed]);
            }
          }
        }

        function setGoogleTranslateCookie(lang) {
          const val = lang === 'vi' ? '' : `/auto/${lang}`;
          document.cookie = `googtrans=${val}; path=/`;
          document.cookie = `googtrans=${val}; domain=${location.hostname}; path=/`;
        }

        function triggerGoogleTranslate(lang) {
          setGoogleTranslateCookie(lang);
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            select.value = lang;
            select.dispatchEvent(new Event('change'));
          }
        }

        function setLanguage(lang, userClicked) {
          saveLang(lang);
          document.querySelectorAll('.hp-lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
          });

          applyInstantDict(lang);
          triggerGoogleTranslate(lang);

          // If user clicked and Google Translate combo isn't ready yet or resetting to original language
          if (userClicked && lang === 'vi' && document.querySelector('.translated-ltr, .translated-rtl')) {
            setGoogleTranslateCookie('vi');
            location.reload();
          }
        }

        function createSwitcher(isLight) {
          const wrap = document.createElement('div');
          wrap.className = 'hp-lang-switcher notranslate' + (isLight ? ' light-theme' : '');
          wrap.setAttribute('translate', 'no');

          const current = getSavedLang();
          LANGS.forEach(item => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'hp-lang-btn notranslate' + (item.code === current ? ' active' : '');
            btn.dataset.lang = item.code;
            btn.title = item.name;
            btn.innerHTML = `<span class="hp-lang-flag">${item.flag}</span><span>${item.label}</span>`;
            btn.addEventListener('click', () => setLanguage(item.code, true));
            wrap.appendChild(btn);
          });

          return wrap;
        }

        function createViewportSwitcher() {
          const wrap = document.createElement('div');
          wrap.className = 'hp-vp-switcher notranslate';
          wrap.setAttribute('translate', 'no');

          const btnDesktop = document.createElement('button');
          btnDesktop.type = 'button';
          btnDesktop.className = 'hp-vp-btn active';
          btnDesktop.innerHTML = '🖥 <span>Desktop</span>';

          const btnMobile = document.createElement('button');
          btnMobile.type = 'button';
          btnMobile.className = 'hp-vp-btn';
          btnMobile.innerHTML = '📱 <span>Mobile</span>';

          let backdrop = null;

          btnDesktop.addEventListener('click', () => {
            btnDesktop.classList.add('active');
            btnMobile.classList.remove('active');
            if (backdrop) backdrop.classList.remove('open');
            document.body.style.overflow = '';
          });

          btnMobile.addEventListener('click', () => {
            btnMobile.classList.add('active');
            btnDesktop.classList.remove('active');
            if (!backdrop) {
              backdrop = document.createElement('div');
              backdrop.id = 'hp-mobile-frame-backdrop';
              const url = new URL(window.location.href);
              url.searchParams.set('hp_embed', '1');
              backdrop.innerHTML = `
          <div class="hp-phone-bezel">
            <div class="hp-phone-notch"></div>
            <iframe src="${url.toString()}" title="Mobile Preview"></iframe>
          </div>
        `;
              backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) btnDesktop.click();
              });
              document.body.appendChild(backdrop);
            }
            backdrop.classList.add('open');
            document.body.style.overflow = 'hidden';
          });

          wrap.appendChild(btnDesktop);
          wrap.appendChild(btnMobile);
          return wrap;
        }

        function mountSwitchers() {
          // If inside mobile preview iframe (?hp_embed=1), hide #hp-bar so the phone screen shows pure template
          if (window.location.search.includes('hp_embed=1')) {
            const hpBar = document.getElementById('hp-bar');
            if (hpBar) {
              hpBar.style.display = 'none';
              if (hpBar.nextElementSibling && hpBar.nextElementSibling.style.height === '52px') {
                hpBar.nextElementSibling.style.display = 'none';
              }
            }
            return;
          }

          // 1. Mount inside #hp-bar on all template pages
          const hpBar = document.getElementById('hp-bar');
          if (hpBar && !hpBar.querySelector('.hp-lang-switcher')) {
            // Fix any legacy GitHub links in #hp-bar back to local ../../index.html#templates
            hpBar.querySelectorAll('a[href*="hoangphuongle.github.io"]').forEach(a => {
              a.setAttribute('href', '../../index.html#templates');
            });

            const rightSpan = hpBar.lastElementChild;
            if (rightSpan && rightSpan.tagName === 'SPAN') {
              rightSpan.insertBefore(createSwitcher(false), rightSpan.firstChild);
              rightSpan.insertBefore(createViewportSwitcher(), rightSpan.firstChild);
            } else {
              hpBar.appendChild(createViewportSwitcher());
              hpBar.appendChild(createSwitcher(false));
            }
          }

          // 2. Mount inside main portfolio .nav-right on index.html
          const navRight = document.querySelector('.nav .nav-right');
          if (navRight && !navRight.querySelector('.hp-lang-switcher')) {
            navRight.insertBefore(createSwitcher(true), navRight.firstChild);
          }

          // Create hidden Google Translate container for full-page translation
          const gtDiv = document.createElement('div');
          gtDiv.id = 'hp_google_translate_elem';
          document.body.appendChild(gtDiv);

          window.hpGoogleTranslateInit = function () {
            if (window.google && window.google.translate) {
              new window.google.translate.TranslateElement(
                {
                  pageLanguage: 'auto',
                  includedLanguages: 'vi,en,ru,ko',
                  autoDisplay: false
                },
                'hp_google_translate_elem'
              );
              const saved = getSavedLang();
              if (saved && saved !== 'vi') {
                setTimeout(() => triggerGoogleTranslate(saved), 400);
              }
            }
          };

          const gtScript = document.createElement('script');
          gtScript.src = 'https://translate.google.com/translate_a/element.js?cb=hpGoogleTranslateInit';
          gtScript.async = true;
          document.body.appendChild(gtScript);

          // Apply instant dictionary if non-vi saved
          const saved = getSavedLang();
          if (saved && saved !== 'vi') {
            applyInstantDict(saved);
          }
        }

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', mountSwitchers);
        } else {
          mountSwitchers();
        }
      })();
