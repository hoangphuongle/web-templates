/* ==========================================================================
   PIZZA KING - APPLICATION STATE & DATA
   ========================================================================== */

// 1. Database sản phẩm đầy đủ và chi tiết
const PRODUCTS = [
    {
        id: 1,
        name: "Pizza Pepperoni Hoàng Gia",
        category: "bo",
        price: 189000,
        image: "assets/hero_pizza.png",
        filterStyle: "none",
        tag: "Bán Chạy",
        tagClass: "tag-hot",
        rating: 5,
        reviews: 95,
        desc: "Xúc xích Pepperoni bò thượng hạng thái lát tròn đặc trưng, phủ ngập phô mai Mozzarella kéo sợi trên nền sốt cà chua San Marzano truyền thống ngọt dịu."
    },
    {
        id: 2,
        name: "Pizza Hải Sản Pesto Cao Cấp",
        category: "hai-san",
        price: 229000,
        image: "assets/hero_pizza.png",
        filterStyle: "hue-rotate(45deg)",
        tag: "Mới",
        tagClass: "tag-new",
        rating: 4.8,
        reviews: 82,
        desc: "Tôm sú biển tươi ngon, mực ống giòn sần sật, cồi sò điệp kết hợp cùng sốt Pesto húng tây thơm mát độc quyền và lá Oregano tươi vùng Địa Trung Hải."
    },
    {
        id: 3,
        name: "Pizza Bò Mỹ Sốt BBQ Khói",
        category: "bo",
        price: 209000,
        image: "assets/hero_pizza.png",
        filterStyle: "none",
        tag: "Bán Chạy",
        tagClass: "tag-hot",
        rating: 5,
        reviews: 104,
        desc: "Thịt bò Mỹ băm thượng hạng ướp gia vị nướng, hành tây thái mỏng, ớt chuông xanh giòn ngọt, rưới sốt BBQ ngọt khói thơm lừng đặc sắc."
    },
    {
        id: 4,
        name: "Pizza Gà Nướng Nấm Cay",
        category: "ga",
        price: 179000,
        image: "assets/hero_pizza.png",
        filterStyle: "none",
        tag: "",
        tagClass: "",
        rating: 4.5,
        reviews: 67,
        desc: "Thịt ức gà ta nướng thơm mềm xé sợi, nấm đùi gà dai giòn, hành tây đỏ cay nhẹ, điểm xuyết lát ớt xanh Jalapeno cay tê đậm chất ẩm thực đương đại."
    },
    {
        id: 5,
        name: "Pizza Ngũ Nấm Chay Hoàng Triều",
        category: "chay",
        price: 169000,
        image: "assets/hero_pizza.png",
        filterStyle: "hue-rotate(90deg)",
        tag: "Lành Mạnh",
        tagClass: "tag-promo",
        rating: 4.7,
        reviews: 46,
        desc: "Sự kết hợp ngọt lành của 5 loại nấm tươi sạch (nấm đùi gà, nấm hương, kim châm, nấm rơm, bào ngư), sốt kem phô mai trắng và rưới dầu Truffle hảo hạng."
    },
    {
        id: 6,
        name: "Khoai Tây Múi Cau Đút Lò",
        category: "khai-vi",
        price: 59000,
        image: "assets/hero_pizza.png",
        filterStyle: "brightness(1.2) sepia(0.3) hue-rotate(340deg)",
        tag: "",
        tagClass: "",
        rating: 4.9,
        reviews: 128,
        desc: "Khoai tây múi cau dày thịt nướng đút lò chín vàng rắc bột tỏi, hương thảo khô, rắc ngập phô mai bột Parmesan thơm lừng."
    },
    {
        id: 7,
        name: "Cánh Gà Nướng Sốt Mật Ong (4pcs)",
        category: "khai-vi",
        price: 89000,
        image: "assets/hero_pizza.png",
        filterStyle: "brightness(0.9) saturate(1.8) hue-rotate(10deg)",
        tag: "Ưa Thích",
        tagClass: "tag-new",
        rating: 4.8,
        reviews: 74,
        desc: "Cánh gà tươi chiên giòn rụm rồi phủ lớp sốt mật ong mù tạt ngọt dịu óng ả kiểu Hàn Quốc. Ăn kèm dưa chuột muối giòn ngọt."
    },
    {
        id: 8,
        name: "Thức Uống Mát Lạnh Coca-Cola",
        category: "khai-vi",
        price: 20000,
        image: "assets/hero_pizza.png",
        filterStyle: "brightness(0.5) contrast(1.5) saturate(2) hue-rotate(350deg)",
        tag: "",
        tagClass: "",
        rating: 5,
        reviews: 210,
        desc: "Lon Coca-Cola 320ml mát lạnh sảng khoái, người bạn đồng hành hoàn hảo giúp cân bằng vị béo ngậy của pizza phô mai."
    }
];

// 2. Danh sách chi nhánh cửa hàng chi tiết
const STORES = {
    hcm: [
        {
            id: "hcm-1",
            name: "Pizza King Nguyễn Trãi",
            address: "235 Nguyễn Trãi, Quận 1, TP. HCM",
            phone: "028.7300.7675",
            hours: "09:00 - 22:00",
            status: "Đang mở cửa",
            lat: 45, // Map positioning in %
            lng: 52
        },
        {
            id: "hcm-2",
            name: "Pizza King Phan Xích Long",
            address: "148 Phan Xích Long, Q. Phú Nhuận, TP. HCM",
            phone: "028.7300.7676",
            hours: "09:00 - 22:00",
            status: "Đang mở cửa",
            lat: 25,
            lng: 60
        }
    ],
    hn: [
        {
            id: "hn-1",
            name: "Pizza King Bà Triệu",
            address: "191 Bà Triệu, Q. Hai Bà Trưng, Hà Nội",
            phone: "024.7300.7677",
            hours: "09:00 - 22:00",
            status: "Đang mở cửa",
            lat: 35,
            lng: 40
        }
    ],
    ct: [
        {
            id: "ct-1",
            name: "Pizza King Mậu Thân",
            address: "80 Mậu Thân, Q. Ninh Kiều, Cần Thơ",
            phone: "0292.7300.0767",
            hours: "09:00 - 22:00",
            status: "Đang mở cửa",
            lat: 65,
            lng: 35
        }
    ]
};

// 3. Khởi tạo trạng thái ứng dụng (Cart)
let cart = JSON.parse(localStorage.getItem('pizza_king_cart')) || [];
let activeQuickViewPizza = null;
let currentQuickViewPrice = 0;

/* ================= ================= =================
   CORE INITS & EVENT LISTENERS
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    // Render danh sách sản phẩm ban đầu ra HTML
    renderProducts(PRODUCTS);

    // Cập nhật giao diện giỏ hàng ban đầu
    updateCartUI();

    // Khởi tạo bộ đếm ngược deal
    initCountdown();

    // Lắng nghe sự kiện scroll của Window
    window.addEventListener("scroll", handleHeaderScroll);

    // ================= SỰ KIỆN MENU DI ĐỘNG =================
    const mobileMenuOpenBtn = document.getElementById("mobileMenuOpen");
    const mobileMenuCloseBtn = document.getElementById("mobileMenuClose");
    const mobileSidebar = document.getElementById("mobileSidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    mobileMenuOpenBtn?.addEventListener("click", () => {
        mobileSidebar.classList.add("open");
        sidebarOverlay.classList.add("open");
    });

    const closeSidebar = () => {
        mobileSidebar.classList.remove("open");
        sidebarOverlay.classList.remove("open");
    };

    mobileMenuCloseBtn?.addEventListener("click", closeSidebar);
    sidebarOverlay?.addEventListener("click", closeSidebar);

    // Đóng sidebar khi nhấn link trong menu
    const sidebarLinks = document.querySelectorAll(".sidebar-link:not(.sidebar-dropdown-toggle)");
    sidebarLinks.forEach(link => link.addEventListener("click", closeSidebar));

    // Xử lý menu dropdown trên mobile sidebar
    const mobileDropdownToggle = document.querySelector(".sidebar-dropdown-toggle");
    mobileDropdownToggle?.addEventListener("click", function(e) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle("open");
    });

    // ================= SỰ KIỆN SHOPPING CART DRAWER =================
    const cartTriggers = document.querySelectorAll(".cart-trigger-btn");
    const cartDrawerClose = document.getElementById("cartDrawerClose");
    const cartDrawer = document.getElementById("cartDrawer");
    const cartOverlay = document.getElementById("cartOverlay");
    const continueShopping = document.getElementById("continueShopping");

    const openCart = () => {
        cartDrawer.classList.add("open");
        cartOverlay.classList.add("open");
    };

    const closeCart = () => {
        cartDrawer.classList.remove("open");
        cartOverlay.classList.remove("open");
    };

    cartTriggers.forEach(btn => btn.addEventListener("click", openCart));
    cartDrawerClose?.addEventListener("click", closeCart);
    cartOverlay?.addEventListener("click", closeCart);
    continueShopping?.addEventListener("click", closeCart);

    // ================= SỰ KIỆN BỘ LỌC THỰC ĐƠN =================
    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const category = btn.getAttribute("data-category");
            filterCategory(category);
        });
    });

    // ================= SỰ KIỆN TÌM KIẾM =================
    const searchTrigger = document.getElementById("searchTrigger");
    const searchOverlayClose = document.getElementById("searchOverlayClose");
    const searchOverlayBar = document.getElementById("searchOverlayBar");

    searchTrigger?.addEventListener("click", () => {
        searchOverlayBar.classList.add("open");
        document.getElementById("searchInput").focus();
    });

    searchOverlayClose?.addEventListener("click", () => {
        searchOverlayBar.classList.remove("open");
    });

    // ================= SỰ KIỆN QUICK VIEW MODAL =================
    const modalClose = document.getElementById("modalClose");
    const quickViewModal = document.getElementById("quickViewModal");

    const closeModal = () => {
        quickViewModal.classList.remove("open");
        activeQuickViewPizza = null;
    };

    modalClose?.addEventListener("click", closeModal);
    quickViewModal?.addEventListener("click", (e) => {
        if(e.target === quickViewModal) closeModal();
    });

    // Lắng nghe sự kiện click thay đổi kích cỡ & viền bánh trên Modal
    const sizeOptions = document.querySelectorAll(".size-options .option-card");
    sizeOptions.forEach(opt => {
        opt.addEventListener("click", function() {
            sizeOptions.forEach(o => o.classList.remove("active"));
            this.classList.add("active");
            this.querySelector("input").checked = true;
            calculateModalPrice();
        });
    });

    const crustOptions = document.querySelectorAll(".crust-options .option-card");
    crustOptions.forEach(opt => {
        opt.addEventListener("click", function() {
            crustOptions.forEach(o => o.classList.remove("active"));
            this.classList.add("active");
            this.querySelector("input").checked = true;
            calculateModalPrice();
        });
    });

    const toppingCheckboxes = document.querySelectorAll(".checkbox-options .option-card-checkbox");
    toppingCheckboxes.forEach(opt => {
        opt.addEventListener("click", function(e) {
            // Ngăn sự kiện click bị kích hoạt 2 lần do cấu trúc lồng thẻ label
            if (e.target.tagName !== 'INPUT') {
                const checkbox = this.querySelector("input");
                checkbox.checked = !checkbox.checked;
            }
            this.classList.toggle("active", this.querySelector("input").checked);
            calculateModalPrice();
        });
    });

    // Nút tăng giảm số lượng trên Modal
    const modalQtyMinus = document.getElementById("modalQtyMinus");
    const modalQtyPlus = document.getElementById("modalQtyPlus");
    const modalQtyInput = document.getElementById("modalQtyInput");

    modalQtyMinus?.addEventListener("click", () => {
        let val = parseInt(modalQtyInput.value);
        if (val > 1) {
            modalQtyInput.value = val - 1;
            calculateModalPrice();
        }
    });

    modalQtyPlus?.addEventListener("click", () => {
        let val = parseInt(modalQtyInput.value);
        modalQtyInput.value = val + 1;
        calculateModalPrice();
    });

    // Nút xác nhận thêm vào giỏ từ Modal
    const modalAddToCartBtn = document.getElementById("modalAddToCartBtn");
    modalAddToCartBtn?.addEventListener("click", () => {
        if (activeQuickViewPizza) {
            addCustomizedPizzaToCart();
            closeModal();
            openCart();
        }
    });

    // ================= SỰ KIỆN HỆ THỐNG CỬA HÀNG =================
    const storeTabButtons = document.querySelectorAll(".store-tab-btn");
    storeTabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            storeTabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const city = btn.getAttribute("data-city");
            renderStoresByCity(city);
        });
    });

    // ================= SỰ KIỆN TAB MEGA MENU (Đồng bộ danh mục dọc và 3 cột) =================
    const megamenuTabs = document.querySelectorAll(".megamenu-tab");
    const megamenuContents = document.querySelectorAll(".megamenu-tab-content");

    megamenuTabs.forEach(tab => {
        tab.addEventListener("mouseenter", () => {
            // Hủy kích hoạt tất cả các tab và nội dung khác
            megamenuTabs.forEach(t => t.classList.remove("active"));
            megamenuContents.forEach(c => c.classList.remove("active"));

            // Kích hoạt tab hiện tại và phần nội dung tương ứng
            tab.classList.add("active");
            const targetId = tab.getAttribute("data-tab");
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add("active");
            }
        });
    });

    // Khởi tạo slider banner
    initHeroSlider();
});

/* ================= ================= =================
   UI RENDERING & DYNAMIC LAYOUTS
   ========================================================= */

// Render danh sách sản phẩm
function renderProducts(productsList) {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    if (productsList.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fa-solid fa-pizza-slice" style="font-size: 3rem; margin-bottom: 16px; opacity: 0.5;"></i>
                <p>Không tìm thấy món ăn nào phù hợp với từ khóa.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = productsList.map(prod => {
        const hasTag = prod.tag !== "";
        const tagHTML = hasTag ? `<span class="product-tag ${prod.tagClass}">${prod.tag}</span>` : "";
        
        let starsHTML = "";
        for(let i = 1; i <= 5; i++) {
            if(i <= Math.floor(prod.rating)) {
                starsHTML += `<i class="fa-solid fa-star"></i>`;
            } else if (i - 0.5 <= prod.rating) {
                starsHTML += `<i class="fa-solid fa-star-half-stroke"></i>`;
            } else {
                starsHTML += `<i class="fa-regular fa-star"></i>`;
            }
        }

        return `
            <div class="product-card" data-category="${prod.category}" data-id="${prod.id}" style="animation: fadeZoomIn 0.5s ease;">
                <div class="product-img-wrapper">
                    ${tagHTML}
                    <img src="${prod.image}" alt="${prod.name}" class="product-img" style="filter: ${prod.filterStyle};">
                    <button class="quick-view-btn" onclick="openQuickView(${prod.id})"><i class="fa-solid fa-eye"></i> Tùy chỉnh & Xem nhanh</button>
                </div>
                <div class="product-info">
                    <div class="product-rating">
                        ${starsHTML}
                        <span>(${prod.reviews})</span>
                    </div>
                    <h3 class="product-name">${prod.name}</h3>
                    <p class="product-desc">${prod.desc}</p>
                    <div class="product-bottom">
                        <span class="product-price">${formatPrice(prod.price)}</span>
                        <button class="btn btn-primary btn-sm add-to-cart-btn" onclick="addToCartDirect(${prod.id})">
                            <i class="fa-solid fa-cart-plus"></i> Chọn mua
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

// Xử lý scroll để làm gọn Header
function handleHeaderScroll() {
    const header = document.getElementById("mainHeader");
    const topbar = document.getElementById("topBar");
    if (!header) return;

    if (window.scrollY > 100) {
        header.classList.add("scrolled");
        if (topbar) topbar.style.marginTop = `-${topbar.offsetHeight}px`;
    } else {
        header.classList.remove("scrolled");
        if (topbar) topbar.style.marginTop = "0px";
    }
}

// Bộ lọc danh mục
function filterCategory(category) {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    grid.style.opacity = "0";

    setTimeout(() => {
        if (category === "all") {
            renderProducts(PRODUCTS);
        } else {
            const filtered = PRODUCTS.filter(p => p.category === category);
            renderProducts(filtered);
        }
        grid.style.opacity = "1";
    }, 250);
}

// Render danh sách cửa hàng theo thành phố
function renderStoresByCity(cityCode) {
    const storeList = document.getElementById("storeList");
    if (!storeList) return;

    const list = STORES[cityCode] || [];
    storeList.innerHTML = list.map((store, index) => {
        const isActive = index === 0 ? "active" : "";
        return `
            <div class="store-item ${isActive}" data-city="${cityCode}" data-lat="${store.lat}" data-lng="${store.lng}" onclick="selectStore(this)">
                <div class="store-item-header">
                    <h4>${store.name}</h4>
                    <span class="store-status status-open">${store.status}</span>
                </div>
                <p><i class="fa-solid fa-location-dot"></i> ${store.address}</p>
                <p><i class="fa-solid fa-phone"></i> Hotline: <a href="tel:${store.phone.replace(/\./g, '')}">${store.phone}</a></p>
                <p><i class="fa-regular fa-clock"></i> Giờ hoạt động: ${store.hours}</p>
            </div>
        `;
    }).join("");

    // Tự động kích hoạt chi nhánh đầu tiên trên bản đồ ảo
    if (list.length > 0) {
        updateVirtualMap(list[0]);
    }
}

// Xử lý chọn chi nhánh trên giao diện
function selectStore(element) {
    const items = document.querySelectorAll(".store-item");
    items.forEach(item => item.classList.remove("active"));
    element.classList.add("active");

    const city = element.getAttribute("data-city");
    const lat = element.getAttribute("data-lat");
    const lng = element.getAttribute("data-lng");
    
    // Tìm chi tiết cửa hàng trong database
    const storeObj = STORES[city].find(s => s.lat == lat && s.lng == lng);
    if (storeObj) {
        updateVirtualMap(storeObj);
    }
}

// Cập nhật bản đồ ảo và bảng chi tiết
function updateVirtualMap(store) {
    const activeMarker = document.getElementById("activeMarker");
    const mapInfoName = document.getElementById("mapInfoName");
    const mapInfoAddress = document.getElementById("mapInfoAddress");
    const mapInfoDirection = document.getElementById("mapInfoDirection");

    if (activeMarker) {
        activeMarker.style.top = `${store.lat}%`;
        activeMarker.style.left = `${store.lng}%`;
        
        // Cập nhật tooltip
        const tooltip = activeMarker.querySelector(".marker-tooltip");
        if (tooltip) {
            tooltip.innerHTML = `
                <strong>${store.name}</strong>
                <span>${store.address.split(",")[0]}</span>
            `;
        }
    }

    if (mapInfoName) mapInfoName.textContent = store.name;
    if (mapInfoAddress) mapInfoAddress.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${store.address}`;
    if (mapInfoDirection) {
        mapInfoDirection.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`;
    }
}

/* ================= ================= =================
   SHOPPING CART CONTROLLER
   ========================================================= */

// Cập nhật toàn bộ giao diện Giỏ hàng
function updateCartUI() {
    const cartCount = document.getElementById("cartCount");
    const mobileCartCount = document.getElementById("mobileCartCount");
    const cartDrawerCount = document.getElementById("cartDrawerCount");
    const cartEmpty = document.getElementById("cartEmpty");
    const cartItemsList = document.getElementById("cartItemsList");
    const cartDrawerFooter = document.getElementById("cartDrawerFooter");
    const cartSubtotal = document.getElementById("cartSubtotal");
    const cartTotal = document.getElementById("cartTotal");

    // 1. Tính tổng số lượng mặt hàng
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    if(cartCount) cartCount.textContent = totalQty;
    if(mobileCartCount) mobileCartCount.textContent = totalQty;
    if(cartDrawerCount) cartDrawerCount.textContent = totalQty;

    // 2. Tính tổng tiền tạm tính
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // 3. Xử lý trạng thái rỗng của giỏ hàng
    if (cart.length === 0) {
        if(cartEmpty) cartEmpty.style.display = "flex";
        if(cartItemsList) cartItemsList.style.display = "none";
        if(cartDrawerFooter) cartDrawerFooter.style.display = "none";
    } else {
        if(cartEmpty) cartEmpty.style.display = "none";
        if(cartItemsList) cartItemsList.style.display = "flex";
        if(cartDrawerFooter) cartDrawerFooter.style.display = "block";

        // Render các mặt hàng
        if (cartItemsList) {
            cartItemsList.innerHTML = cart.map((item, index) => {
                const optionsMeta = [];
                if (item.size) optionsMeta.push(`Kích cỡ: ${item.size}`);
                if (item.crust) optionsMeta.push(`Viền bánh: ${item.crust}`);
                if (item.toppings && item.toppings.length > 0) {
                    optionsMeta.push(`Toppings thêm: ${item.toppings.join(', ')}`);
                }

                const metaHTML = optionsMeta.length > 0 
                    ? `<div class="cart-item-meta">${optionsMeta.map(m => `<span>${m}</span>`).join("")}</div>`
                    : "";

                return `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img" style="filter: ${item.filterStyle || 'none'};">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            ${metaHTML}
                            <div class="cart-item-footer">
                                <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
                                <div class="qty-control">
                                    <button class="qty-btn" onclick="updateQty(${index}, -1)"><i class="fa-solid fa-minus"></i></button>
                                    <span class="qty-input">${item.quantity}</span>
                                    <button class="qty-btn" onclick="updateQty(${index}, 1)"><i class="fa-solid fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                        <button class="cart-item-remove" onclick="removeCartItem(${index})" aria-label="Xóa"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                `;
            }).join("");
        }

        // Cập nhật bảng tính tiền
        if(cartSubtotal) cartSubtotal.textContent = formatPrice(subtotal);
        if(cartTotal) cartTotal.textContent = formatPrice(subtotal); // Miễn phí giao hàng
    }

    // Lưu vào LocalStorage
    localStorage.setItem('pizza_king_cart', JSON.stringify(cart));
}

// Thêm sản phẩm trực tiếp từ trang chủ (Kích thước mặc định)
function addToCartDirect(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    // Đối với Khai vị / Nước uống, thêm trực tiếp luôn. Đối với Pizza, sẽ lấy size mặc định là nhỏ
    const isPizza = prod.category !== "khai-vi";
    
    const cartItem = {
        id: prod.id,
        name: prod.name,
        image: prod.image,
        filterStyle: prod.filterStyle,
        quantity: 1,
        price: prod.price,
        size: isPizza ? "Cỡ Nhỏ (20cm)" : "",
        crust: isPizza ? "Mỏng Giòn Ý" : "",
        toppings: [],
        timestamp: Date.now()
    };

    // Kiểm tra xem sản phẩm giống hệt đã có trong giỏ chưa
    const existingIndex = cart.findIndex(item => 
        item.id === cartItem.id && 
        item.size === cartItem.size && 
        item.crust === cartItem.crust && 
        JSON.stringify(item.toppings) === JSON.stringify(cartItem.toppings)
    );

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push(cartItem);
    }

    updateCartUI();

    // Mở ngăn kéo giỏ hàng trượt ra cho trực quan
    document.getElementById("cartDrawer").classList.add("open");
    document.getElementById("cartOverlay").classList.add("open");
}

// Thêm deal Siêu Combo Hoàng Gia vào giỏ
function addComboToCart() {
    const comboItem = {
        id: 999, // Mã combo đặc biệt
        name: "Siêu Combo Hoàng Gia",
        image: "assets/hero_pizza.png",
        filterStyle: "none",
        quantity: 1,
        price: 225000,
        size: "1 Pizza vừa tùy chọn",
        crust: "Bánh đút lò chuẩn Ý",
        toppings: ["Khoai tây múi cau đút lò", "2 Coca-cola"],
        timestamp: Date.now()
    };

    cart.push(comboItem);
    updateCartUI();

    // Mở ngăn kéo giỏ hàng
    document.getElementById("cartDrawer").classList.add("open");
    document.getElementById("cartOverlay").classList.add("open");
}

// Cập nhật số lượng mặt hàng
window.updateQty = function(index, delta) {
    if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        updateCartUI();
    }
};

// Xóa một mặt hàng khỏi giỏ
window.removeCartItem = function(index) {
    if (cart[index]) {
        cart.splice(index, 1);
        updateCartUI();
    }
};

// Xóa sạch giỏ hàng
window.clearCart = function() {
    if (confirm("Anh/chị có chắc chắn muốn xóa toàn bộ giỏ hàng không ạ?")) {
        cart = [];
        updateCartUI();
    }
};

// Thanh toán giả lập
window.checkout = function() {
    alert("Cảm ơn anh/chị đã đặt hàng tại Pizza King!\nĐơn hàng đang được bộ phận nhà bếp chuẩn bị.\nShipper sẽ giao bánh nóng hổi đến cho bạn trong vòng 30 phút!");
    cart = [];
    updateCartUI();
    document.getElementById("cartDrawer").classList.remove("open");
    document.getElementById("cartOverlay").classList.remove("open");
};

/* ================= ================= =================
   MODAL QUICK VIEW CONTROLLER & CUSTOMIZER
   ========================================================= */
window.openQuickView = function(productId) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    activeQuickViewPizza = prod;

    // Reset các tùy chọn trên Modal về mặc định
    document.getElementById("modalPizzaImg").src = prod.image;
    document.getElementById("modalPizzaImg").style.filter = prod.filterStyle;
    document.getElementById("modalPizzaTitle").textContent = prod.name;
    document.getElementById("modalPizzaDesc").textContent = prod.desc;
    document.getElementById("modalReviewsCount").textContent = `(${prod.reviews} đánh giá)`;
    
    // Thẻ tag khuyến mãi/hot
    const modalTag = document.getElementById("modalPizzaTag");
    if(prod.tag) {
        modalTag.style.display = "inline-block";
        modalTag.textContent = prod.tag;
        modalTag.className = `modal-tag ${prod.tagClass}`;
    } else {
        modalTag.style.display = "none";
    }

    // Reset các lựa chọn giao diện Option Cards về cái đầu tiên
    const sizeOptions = document.querySelectorAll(".size-options .option-card");
    sizeOptions.forEach((o, i) => {
        o.classList.toggle("active", i === 0);
        o.querySelector("input").checked = (i === 0);
    });

    const crustOptions = document.querySelectorAll(".crust-options .option-card");
    crustOptions.forEach((o, i) => {
        o.classList.toggle("active", i === 0);
        o.querySelector("input").checked = (i === 0);
    });

    // Reset checkbox toppings phụ
    const toppings = document.querySelectorAll(".checkbox-options .option-card-checkbox");
    toppings.forEach(t => {
        t.classList.remove("active");
        t.querySelector("input").checked = false;
    });

    // Ẩn/Hiện phân loại tùy biến dựa trên thể loại sản phẩm (Không hiện size/crust cho nước ngọt/khai vị)
    const isPizza = prod.category !== "khai-vi";
    const customizerSections = document.querySelectorAll(".customizer-section");
    customizerSections.forEach((sec, idx) => {
        // Chỉ hiện tùy biến đế bánh & viền nếu là pizza
        if (idx < 2) {
            sec.style.display = isPizza ? "block" : "none";
        }
    });

    // Reset số lượng bánh về 1
    document.getElementById("modalQtyInput").value = 1;

    // Tính toán giá trị tiền ban đầu của Modal
    calculateModalPrice();

    // Mở Modal
    document.getElementById("quickViewModal").classList.add("open");
};

// Tính toán giá trị tiền pizza thời gian thực trên Modal
function calculateModalPrice() {
    if (!activeQuickViewPizza) return;

    let basePrice = activeQuickViewPizza.price;
    let addedPrice = 0;

    const isPizza = activeQuickViewPizza.category !== "khai-vi";

    if (isPizza) {
        // Cộng thêm tiền kích thước
        const sizeActive = document.querySelector(".size-options .option-card.active");
        if (sizeActive) {
            addedPrice += parseInt(sizeActive.getAttribute("data-price-add"));
        }

        // Cộng thêm tiền viền bánh
        const crustActive = document.querySelector(".crust-options .option-card.active");
        if (crustActive) {
            addedPrice += parseInt(crustActive.getAttribute("data-price-add"));
        }
    }

    // Cộng thêm tiền toppings
    const toppingActives = document.querySelectorAll(".checkbox-options .option-card-checkbox.active");
    toppingActives.forEach(top => {
        addedPrice += parseInt(top.getAttribute("data-price-add"));
    });

    // Nhân số lượng
    const qty = parseInt(document.getElementById("modalQtyInput").value) || 1;
    currentQuickViewPrice = (basePrice + addedPrice) * qty;

    // Hiển thị ra giao diện
    document.getElementById("modalCalculatedPrice").textContent = formatPrice(currentQuickViewPrice);
}

// Xử lý thêm Pizza tùy chỉnh từ Modal vào Giỏ hàng
function addCustomizedPizzaToCart() {
    const isPizza = activeQuickViewPizza.category !== "khai-vi";
    
    // Lấy thông tin kích cỡ
    let sizeName = "";
    let sizePriceAdd = 0;
    if (isPizza) {
        const sizeActive = document.querySelector(".size-options .option-card.active");
        if (sizeActive) {
            sizeName = sizeActive.querySelector("span").textContent;
            sizePriceAdd = parseInt(sizeActive.getAttribute("data-price-add"));
        }
    }

    // Lấy thông tin viền bánh
    let crustName = "";
    let crustPriceAdd = 0;
    if (isPizza) {
        const crustActive = document.querySelector(".crust-options .option-card.active");
        if (crustActive) {
            crustName = crustActive.querySelector("span").textContent;
            crustPriceAdd = parseInt(crustActive.getAttribute("data-price-add"));
        }
    }

    // Lấy danh sách topping phụ
    const toppingsList = [];
    let toppingsPriceAdd = 0;
    const toppingActives = document.querySelectorAll(".checkbox-options .option-card-checkbox.active");
    toppingActives.forEach(top => {
        const text = top.querySelector("span").textContent.split(" (")[0];
        toppingsList.push(text);
        toppingsPriceAdd += parseInt(top.getAttribute("data-price-add"));
    });

    const qty = parseInt(document.getElementById("modalQtyInput").value) || 1;
    const unitPrice = activeQuickViewPizza.price + sizePriceAdd + crustPriceAdd + toppingsPriceAdd;

    const cartItem = {
        id: activeQuickViewPizza.id,
        name: activeQuickViewPizza.name,
        image: activeQuickViewPizza.image,
        filterStyle: activeQuickViewPizza.filterStyle,
        quantity: qty,
        price: unitPrice,
        size: sizeName,
        crust: crustName,
        toppings: toppingsList,
        timestamp: Date.now()
    };

    // Kiểm tra xem sản phẩm giống hệt (cùng tùy biến) đã có trong giỏ chưa
    const existingIndex = cart.findIndex(item => 
        item.id === cartItem.id && 
        item.size === cartItem.size && 
        item.crust === cartItem.crust && 
        JSON.stringify(item.toppings) === JSON.stringify(cartItem.toppings)
    );

    if (existingIndex > -1) {
        cart[existingIndex].quantity += qty;
    } else {
        cart.push(cartItem);
    }

    updateCartUI();
}

/* ================= ================= =================
   SEARCH OVERLAY CONTROLLER
   ========================================================= */
function searchPizzas() {
    const input = document.getElementById("searchInput").value.trim();
    if (!input) return;

    document.getElementById("searchOverlayBar").classList.remove("open");
    
    // Tìm kiếm trong database
    const results = PRODUCTS.filter(prod => 
        prod.name.toLowerCase().includes(input.toLowerCase()) || 
        prod.desc.toLowerCase().includes(input.toLowerCase())
    );

    // Di chuyển màn hình tới khu vực thực đơn và lọc kết quả
    window.location.hash = "#thuc-don";
    
    // Reset các tab lọc về không active
    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach(b => b.classList.remove("active"));

    const grid = document.getElementById("productsGrid");
    if(grid) {
        grid.style.opacity = "0";
        setTimeout(() => {
            renderProducts(results);
            grid.style.opacity = "1";
        }, 200);
    }
}

// Tìm kiếm nhanh từ thẻ gợi ý
window.quickSearch = function(keyword) {
    document.getElementById("searchInput").value = keyword;
    searchPizzas();
};

/* ================= ================= =================
   AUXILIARY UTILITIES (COUNTDOWN & CURRENCY FORMAT)
   ========================================================= */

// Hàm định dạng tiền tệ VND (e.g. 189000 -> 189.000 đ)
function formatPrice(number) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
        .format(number)
        .replace(/₫/g, 'đ');
}

// Khởi chạy đếm ngược Combo Deal (Tự động lặp lại 3 tiếng mỗi chu kỳ cho demo)
function initCountdown() {
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if(!hoursEl || !minutesEl || !secondsEl) return;

    // Đặt chu kỳ 2 tiếng 45 phút cho bắt mắt
    let totalSeconds = 2 * 3600 + 45 * 60 + 18;

    const timer = setInterval(() => {
        totalSeconds--;

        if (totalSeconds <= 0) {
            // Tự động hồi sinh bộ đếm để demo không bị đứng
            totalSeconds = 2 * 3600 + 45 * 60 + 18;
        }

        const hrs = Math.floor(totalSeconds / 3600);
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const secs = totalSeconds % 60;

        hoursEl.textContent = String(hrs).padStart(2, '0');
        minutesEl.textContent = String(mins).padStart(2, '0');
        secondsEl.textContent = String(secs).padStart(2, '0');

    }, 1000);
}

/* ================= ================= =================
   HERO BANNER SLIDER & 3D FLIPPING CONTROLLER
   ========================================================= */

// Dữ liệu các slides để đồng bộ nội dung khi lật card
const SLIDES_DATA = [
    {
        cursive: "Cực phẩm đút lò nóng hổi",
        title: "Pizza tươi mỗi ngày",
        subtitle: "Giảm đến 20% khi đặt trực tuyến qua web",
        buttonText: "Xem ngay",
        buttonLink: "#thuc-don",
        pizzaFilter: "none",
        discount: "-20%",
        discountLabel: "MỖI THỨ BA"
    },
    {
        cursive: "Chuẩn vị khơi dậy vị giác",
        title: "Đại dương vương giả",
        subtitle: "Hải sản tươi ngon quyện sốt Pesto hảo hạng",
        buttonText: "Khám phá ngay",
        buttonLink: "#thuc-don",
        pizzaFilter: "none",
        discount: "NEW",
        discountLabel: "HOT TREND"
    },
    {
        cursive: "Đậm đà hương vị truyền thống",
        title: "Bò nướng BBQ khói",
        subtitle: "Thơm lừng đậm vị thịt bò Mỹ ngập tràn phô mai",
        buttonText: "Đặt hàng ngay",
        buttonLink: "#thuc-don",
        pizzaFilter: "none",
        discount: "HOT",
        discountLabel: "MUA 1 TẶNG 1"
    }
];

let currentSlideIndex = 0;
let slideInterval = null;
const SLIDE_DURATION = 5000; // 5 giây tự động chuyển slide

function initHeroSlider() {
    // Hero slider is now static. Auto rotation disabled.
}

function startSlideShow() {
    stopSlideShow();
    slideInterval = setInterval(() => {
        nextSlide();
    }, SLIDE_DURATION);
}

function stopSlideShow() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

function nextSlide() {
    let nextIndex = (currentSlideIndex + 1) % SLIDES_DATA.length;
    changeSlide(nextIndex);
}

function goToSlide(index) {
    if (index === currentSlideIndex) return;
    changeSlide(index);
    startSlideShow(); // Reset lại thời gian đếm tự động
}

function changeSlide(nextIndex) {
    const card = document.getElementById("heroTextCard");
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".slider-dots .dot");
    const decoPizza = document.getElementById("decoPizzaImg");
    const floatBadge = document.getElementById("floatBadge");

    if (!card || slides.length === 0 || dots.length === 0) return;

    // 1. Kích hoạt hiệu ứng lật card 3D (Xoay 90 độ khuất mặt chữ)
    card.classList.add("flipping");
    
    // 2. Chuyển đổi slide nền ngay lập tức
    slides[currentSlideIndex].classList.remove("active");
    slides[nextIndex].classList.add("active");

    // 3. Đồng bộ hóa active dots điều khiển
    dots[currentSlideIndex].classList.remove("active");
    dots[nextIndex].classList.add("active");

    currentSlideIndex = nextIndex;

    // 4. Chờ 300ms (khoảng thời gian card xoay 90 độ và khuất tầm mắt) để thay đổi nội dung chữ
    setTimeout(() => {
        const slideData = SLIDES_DATA[nextIndex];
        
        // Cập nhật text trong card
        const cursiveEl = document.getElementById("slideCursive");
        const titleEl = document.getElementById("slideTitle");
        const subtitleEl = document.getElementById("slideSubtitle");
        const btnEl = document.getElementById("slideBtn");

        if (cursiveEl) cursiveEl.textContent = slideData.cursive;
        if (titleEl) titleEl.textContent = slideData.title;
        if (subtitleEl) subtitleEl.textContent = slideData.subtitle;
        if (btnEl) {
            btnEl.textContent = slideData.buttonText;
            btnEl.href = slideData.buttonLink;
        }

        // Cập nhật bộ lọc hình ảnh của pizza lơ lửng bên phải
        if (decoPizza) {
            decoPizza.style.filter = slideData.pizzaFilter;
        }

        // Cập nhật badge tròn giảm giá bên phải
        if (floatBadge) {
            const numEl = floatBadge.querySelector(".badge-num");
            const txtEl = floatBadge.querySelector(".badge-txt");
            if (numEl) numEl.textContent = slideData.discount;
            if (txtEl) txtEl.textContent = slideData.discountLabel;
        }

        // 5. Kết thúc hiệu ứng lật (card xoay trở lại 0 độ với nội dung mới)
        card.classList.remove("flipping");
    }, 320);
}

// Function to copy promo code to clipboard
function copyPromoCode(code, button) {
    navigator.clipboard.writeText(code).then(() => {
        const originalText = button.textContent;
        button.textContent = "Đã chép!";
        button.style.backgroundColor = "#2e7d32";
        button.style.color = "#ffffff";
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = "#c92127";
            button.style.color = "#ffffff";
        }, 2000);
    }).catch(err => {
        alert("Không thể sao chép tự động: " + code);
    });
}

// ==========================================================================
// FLOATING SOCIAL & CONTACT WIDGET INTERACTION (Back to top & Morphing Icons)
// ==========================================================================
function initFloatingWidget() {
    const btnScrollTop = document.getElementById("btnScrollTop");
    const btnContactCycle = document.getElementById("btnContactCycle");
    const socialCapsuleMenu = document.getElementById("socialCapsuleMenu");
    const capsuleToggleBtn = document.getElementById("capsuleToggleBtn");
    const contactIcons = document.querySelectorAll(".floating-contact-widget .contact-icon");
    const widgetEl = document.querySelector(".floating-contact-widget");
    
    if (!btnScrollTop || !btnContactCycle || !contactIcons.length || !socialCapsuleMenu) {
        return;
    }

    // 1. Show/Hide Back to top button based on scroll position
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btnScrollTop.classList.add("visible");
        } else {
            btnScrollTop.classList.remove("visible");
        }
    });

    // 2. Click scroll to top handler smoothly
    btnScrollTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 3. Toggle capsule menu when clicking the main pulsing circular button
    btnContactCycle.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent default link navigation if tag was cached as <a>
        e.stopPropagation();
        widgetEl.classList.toggle("active");
        socialCapsuleMenu.classList.toggle("active");
    });

    // 4. Toggle capsule menu when clicking the capsule arrow button to collapse it
    if (capsuleToggleBtn) {
        capsuleToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            widgetEl.classList.remove("active");
            socialCapsuleMenu.classList.remove("active");
        });
    }

    // 5. Close capsule menu when clicking anywhere else outside of the widget
    document.addEventListener("click", (e) => {
        if (socialCapsuleMenu.classList.contains("active") && !widgetEl.contains(e.target)) {
            widgetEl.classList.remove("active");
            socialCapsuleMenu.classList.remove("active");
        }
    });

    // 6. Dynamic Cycling of Contact Icons inside the circular toggler (Phone -> Zalo -> Messenger -> Phone)
    let activeIndex = 0;
    
    function cycleContactIcon() {
        // If the capsule is open (active) or the widget container is hovered, pause cycling icons so it doesn't distract
        if (socialCapsuleMenu.classList.contains("active") || widgetEl.matches(":hover")) return;

        // Remove active class from current active icon
        contactIcons[activeIndex].classList.remove("active");
        
        // Advance index
        activeIndex = (activeIndex + 1) % contactIcons.length;
        
        // Add active class to new icon
        const nextActive = contactIcons[activeIndex];
        if (nextActive) {
            nextActive.classList.add("active");
            
            // Cập nhật text tooltip động tương ứng với icon đang hiển thị
            const tooltipEl = document.getElementById("floatingTooltip");
            if (tooltipEl) {
                const type = nextActive.getAttribute("data-type");
                if (type === "phone") {
                    tooltipEl.textContent = "Gọi hotline: 1900 6750";
                } else if (type === "zalo") {
                    tooltipEl.textContent = "Chat Zalo hỗ trợ";
                } else if (type === "messenger") {
                    tooltipEl.textContent = "Chat Facebook Messenger";
                }
            }
        }
    }

    // Cycle every 3 seconds
    setInterval(cycleContactIcon, 3000);
}

// Fail-proof execution matching readyState
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        initFloatingWidget();
        initTestimonialSlider();
        initSocialWidgetSlider();
    });
} else {
    initFloatingWidget();
    initTestimonialSlider();
    initSocialWidgetSlider();
}

// ==========================================================================
// PREMIUM TESTIMONIALS SLIDER SECTION
// ==========================================================================
function initTestimonialSlider() {
    const prevBtn = document.getElementById("testimonialPrev");
    const nextBtn = document.getElementById("testimonialNext");
    const slides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".testimonials-dots .dot");
    
    if (!slides.length || !dots.length || !prevBtn || !nextBtn) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");

        // Update index with wraparound
        currentSlide = (index + totalSlides) % totalSlides;

        // Add active class to new slide and dot
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
    }

    prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showSlide(currentSlide - 1);
    });

    nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showSlide(currentSlide + 1);
    });

    dots.forEach((dot, idx) => {
        dot.addEventListener("click", (e) => {
            e.preventDefault();
            showSlide(idx);
        });
    });

    // Auto rotate every 6 seconds for extreme premium feel
    let autoRotate = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 6000);

    // Pause auto rotation on user hover
    const sliderBox = document.querySelector(".testimonials-slider-box");
    if (sliderBox) {
        sliderBox.addEventListener("mouseenter", () => clearInterval(autoRotate));
        sliderBox.addEventListener("mouseleave", () => {
            autoRotate = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 6000);
        });
    }
}

// ==========================================================================
// MULTI-SOCIAL PLATFORMS WIDGET SLIDER (TikTok -> Facebook -> Instagram)
// ==========================================================================
function initSocialWidgetSlider() {
    const cards = document.querySelectorAll(".social-widget-card");
    const switcher = document.getElementById("socialWidgetSwitcher");
    const switcherIcon = document.getElementById("switcherIcon");

    if (!cards.length || !switcher || !switcherIcon) return;

    let currentIndex = 0;
    const platforms = ["tiktok", "facebook", "instagram"];
    
    // Nút switcher sẽ hiển thị icon của nền tảng KẾ TIẾP để người dùng nhấn chuyển
    const icons = {
        tiktok: "fa-brands fa-tiktok",
        facebook: "fa-brands fa-facebook-f",
        instagram: "fa-brands fa-instagram"
    };

    const switcherColors = {
        tiktok: "#ff0050",      // TikTok red-pink
        facebook: "#1877f2",    // Facebook blue
        instagram: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" // Instagram grad
    };

    function showPlatform(index) {
        // 1. Ẩn tất cả các card mạng xã hội
        cards.forEach(card => card.classList.remove("active"));
        
        // 2. Hiển thị card mạng xã hội được chọn
        cards[index].classList.add("active");

        // 3. Tìm nền tảng tiếp theo để cập nhật cho nút switcher
        const nextIndex = (index + 1) % cards.length;
        const nextPlatform = platforms[nextIndex];

        // 4. Thay đổi icon của nút switcher thành icon của nền tảng kế tiếp
        switcherIcon.className = icons[nextPlatform];

        // 5. Thay đổi màu nền & độ đổ bóng của nút switcher khớp thương hiệu kế tiếp
        if (nextPlatform === "instagram") {
            switcher.style.background = switcherColors.instagram;
            switcher.style.boxShadow = "0 6px 18px rgba(220, 39, 67, 0.4)";
        } else {
            switcher.style.background = switcherColors[nextPlatform];
            if (nextPlatform === "tiktok") {
                switcher.style.boxShadow = "0 6px 18px rgba(255, 0, 80, 0.4)";
            } else {
                switcher.style.boxShadow = "0 6px 18px rgba(24, 119, 242, 0.4)";
            }
        }

        currentIndex = index;
    }

    // Sự kiện click nút chuyển đổi nhanh
    switcher.addEventListener("click", () => {
        const nextIndex = (currentIndex + 1) % cards.length;
        showPlatform(nextIndex);
    });

    // Tự động xoay sau mỗi 8 giây
    let autoPlay = setInterval(() => {
        const nextIndex = (currentIndex + 1) % cards.length;
        showPlatform(nextIndex);
    }, 8000);

    // Tạm dừng tự động xoay khi khách hàng di chuột vào vùng widget
    const container = document.querySelector(".social-widget-container");
    if (container) {
        container.addEventListener("mouseenter", () => clearInterval(autoPlay));
        container.addEventListener("mouseleave", () => {
            autoPlay = setInterval(() => {
                const nextIndex = (currentIndex + 1) % cards.length;
                showPlatform(nextIndex);
            }, 8000);
        });
    }

    // Khởi động hiển thị card mạng xã hội đầu tiên (TikTok)
    showPlatform(0);
}


