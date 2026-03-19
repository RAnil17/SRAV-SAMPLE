/* ==========================================================================
   SRAV Products — Premium Cart & Shop Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // State
    let cart = JSON.parse(localStorage.getItem('srav_cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('srav_wishlist')) || [];
    let currentCategory = "All";
    let currentType = "all";
    let currentSort = "default";
    let searchTerm = "";

    // UI Elements
    const cartToggle = document.getElementById('cart-toggle');
    const cartPanel = document.getElementById('cart-panel');
    const cartClose = document.getElementById('close-cart');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountElement = document.getElementById('cart-count');
    const cartTotalElement = document.getElementById('cart-total-value');
    
    const productGrid = document.getElementById('products-grid-dynamic');
    const filterContainer = document.getElementById('filter-chips-dynamic');
    const searchInput = document.getElementById('product-search');
    const typeBtns = document.querySelectorAll('.type-btn');
    const sortSelect = document.getElementById('sort-select');

    /* ------------------------------------------------------------------
       1. Cart & Wishlist State Management
    ------------------------------------------------------------------ */

    function updateCart() {
        localStorage.setItem('srav_cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }

    function addToCart(productId) {
        const product = productsData.find(p => p.id === productId);
        if (!product || product.mode !== 'ecommerce') return;

        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        updateCart();
        openCart();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    function changeQuantity(productId, delta) {
        const item = cart.find(i => i.id === productId);
        if (!item) return;
        
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }

    function toggleWishlist(productId, element) {
        const index = wishlist.indexOf(productId);
        if (index === -1) {
            wishlist.push(productId);
            element.classList.add('active');
        } else {
            wishlist.splice(index, 1);
            element.classList.remove('active');
        }
        localStorage.setItem('srav_wishlist', JSON.stringify(wishlist));
    }

    /* ------------------------------------------------------------------
       2. UI Rendering (Cart)
    ------------------------------------------------------------------ */

    function renderCart() {
        if (!cartItemsContainer) return;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart" style="text-align:center; padding: 40px 0; color: var(--muted);">
                    <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 15px; opacity:0.1;"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            if (cartTotalElement) cartTotalElement.innerText = "₹0";
            return;
        }

        let total = 0;
        cartItemsContainer.innerHTML = cart.map(item => {
            total += item.price * item.quantity;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="window.cartLogic.changeQuantity('${item.id}', -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="window.cartLogic.changeQuantity('${item.id}', 1)">+</button>
                        </div>
                    </div>
                    <div class="remove-item" onclick="window.cartLogic.removeFromCart('${item.id}')">
                        <i class="fas fa-trash-alt"></i>
                    </div>
                </div>
            `;
        }).join('');

        if (cartTotalElement) cartTotalElement.innerText = `₹${total.toLocaleString()}`;
    }

    function updateCartCount() {
        if (!cartCountElement) return;
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.innerText = count;
        cartCountElement.style.display = count > 0 ? "flex" : "none";
    }

    /* ------------------------------------------------------------------
       3. Shop Rendering & Filtering
    ------------------------------------------------------------------ */

    function renderProducts() {
        if (!productGrid) return;
        
        let filtered = productsData.filter(p => {
            const matchesCategory = currentCategory === "All" || p.category === currentCategory;
            const matchesType = currentType === "all" || p.type === currentType;
            const matchesSearch = p.name.toLowerCase().includes(searchTerm) || 
                                 p.description.toLowerCase().includes(searchTerm) ||
                                 p.category.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesType && matchesSearch;
        });

        // Sorting
        if (currentSort === "price-low") {
            filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        } else if (currentSort === "price-high") {
            filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        } else if (currentSort === "name-az") {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        productGrid.innerHTML = filtered.map(product => {
            const isEcommerce = product.mode === 'ecommerce';
            const isWishlisted = wishlist.includes(product.id);
            return `
                <div class="product-card" data-aos="fade-up" onclick="window.location.href='product-detail.html?id=${product.id}'" style="cursor:pointer">
                    <div class="product-img-wrap">
                        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="event.stopPropagation(); window.cartLogic.toggleWishlist('${product.id}', this)">
                            <i class="fas fa-heart"></i>
                        </button>
                        ${product.isNew ? '<span class="badge-new">NEW</span>' : ''}
                        ${product.isPopular ? '<span class="badge-popular"><i class="fas fa-fire"></i> Popular</span>' : ''}
                        
                        <div class="product-badge-mode ${isEcommerce ? 'mode-ecommerce' : 'mode-industrial'}">
                            ${isEcommerce ? 'Available' : 'Industrial'}
                        </div>
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-content">
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-desc">${product.description}</p>
                        
                        <div class="product-pricing" onclick="event.stopPropagation()">
                            ${isEcommerce 
                                ? `<div class="price-tag">₹${product.price.toLocaleString()}<span> incl. GST</span></div>
                                   <button class="btn-add-cart" onclick="window.cartLogic.addToCart('${product.id}')">
                                       <i class="fas fa-cart-plus"></i> Add
                                   </button>`
                                : `<div class="quote-needed">Quote-based</div>
                                   <button class="btn-quote" onclick="window.location.href='product-detail.html?id=${product.id}'">
                                       Request
                                   </button>`
                            }
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function initFilters() {
        if (filterContainer) {
            const categories = ["All", ...new Set(productsData.map(p => p.category))];
            filterContainer.innerHTML = categories.map(cat => {
                const catInfo = categoriesData.find(c => c.name === cat);
                const icon = catInfo ? catInfo.icon : "fas fa-tag";
                return `
                    <div class="filter-chip ${cat === 'All' ? 'active' : ''}" onclick="window.cartLogic.setCategory('${cat}', this)">
                        <i class="${icon}"></i> ${cat}
                    </div>
                `;
            }).join('');
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchTerm = e.target.value.toLowerCase();
                renderProducts();
            });
        }

        if (typeBtns) {
            typeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    typeBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentType = btn.dataset.type;
                    renderProducts();
                });
            });
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                renderProducts();
            });
        }
    }

    /* ------------------------------------------------------------------
       4. Interaction Controls
    ------------------------------------------------------------------ */

    function openCart() {
        cartPanel.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cartPanel.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (cartToggle) cartToggle.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    // Global Access
    window.cartLogic = {
        addToCart,
        removeFromCart,
        changeQuantity,
        toggleWishlist,
        setCategory: (cat, el) => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            el.classList.add('active');
            currentCategory = cat;
            renderProducts();
        },
        openCart,
        closeCart
    };

    // Initial Render
    renderCart();
    updateCartCount();
    initFilters();
    renderProducts();
});
