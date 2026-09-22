document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. DATA 
    // ----------------------------------------------------
    // We now use the globally injected cofyProducts catalog
    const products = (window.cofyProducts || []).filter(p => p.id !== 'p64');

    // Filter Aggregations
    const categories = ['Coffee Beans', 'Ground Coffee', 'Machines', 'Snacks', 'Accessories', 'Drinks'];
    const origins = ['Brazil', 'Colombia', 'Guatemala', 'Ethiopia', 'Kenya', 'Dominican Republic'];
    const roasts = ['Light', 'Medium', 'Dark'];
    const ratings = [5, 4, 3];

    // ----------------------------------------------------
    // 2. STATE & CONFIG
    // ----------------------------------------------------
    let state = {
        products: [...products],
        filtered: [...products],
        currentPage: 1,
        perPage: 12,
        filters: {
            categories: [],
            price: 1500, // max price higher for machines
            origins: [],
            roasts: [],
            ratings: []
        },
        sort: 'featured',
        wishlist: window.CofyBrew ? window.CofyBrew.getWishlist() : (JSON.parse(localStorage.getItem('cofybrew_wishlist')) || [])
    };

    // ----------------------------------------------------
    // 3. INITIALIZATION
    // ----------------------------------------------------
    init();

    function init() {
        renderSidebarFilters();
        cloneSidebarToMobile();
        attachEventListeners();
        
        // Handle URL parameters for search/category
        const params = new URLSearchParams(window.location.search);
        const q = params.get('q');
        const cat = params.get('category');
        
        if (q) {
            document.getElementById('searchInput').value = q;
            // Fake an input event to trigger search rendering later, but for now we'll just filter grid
        }
        if (cat) {
            state.filters.categories = [cat];
            const catItem = document.querySelector(`.shop-cat-item[data-category="${cat}"]`);
            if (catItem) catItem.classList.add('active');
        }

        renderRecentProducts();
        
        if(q) {
             const term = q.toLowerCase();
             state.filtered = products.filter(p => p.name.toLowerCase().includes(term) || (p.category && p.category.toLowerCase().includes(term)));
             renderGrid();
        } else {
             applyFilters();
        }
    }

    // ----------------------------------------------------
    // 4. RENDERING FILTERS
    // ----------------------------------------------------
    function getCount(type, val) {
        if(type === 'category') return products.filter(p => p.category === val).length;
        if(type === 'origin') return products.filter(p => p.origin && p.origin.includes(val)).length;
        if(type === 'roast') return products.filter(p => p.roast === val).length;
        return 0;
    }

    function renderSidebarFilters() {
        const catCont = document.getElementById('filterCategoryContainer');
        if (catCont) {
            catCont.innerHTML = categories.map(cat => `
                <div class="form-check">
                    <input class="form-check-input filter-cb" type="checkbox" value="${cat}" id="cb-cat-${cat.replace(/\s+/g,'-')}" data-type="categories" ${state.filters.categories.includes(cat) ? 'checked' : ''}>
                    <label class="form-check-label" for="cb-cat-${cat.replace(/\s+/g,'-')}">
                        ${cat} <span class="filter-count">(${getCount('category', cat)})</span>
                    </label>
                </div>
            `).join('');
        }

        const origCont = document.getElementById('filterOriginContainer');
        if (origCont) {
            origCont.innerHTML = origins.map(orig => `
                <div class="form-check">
                    <input class="form-check-input filter-cb" type="checkbox" value="${orig}" id="cb-orig-${orig.replace(/\s+/g,'-')}" data-type="origins">
                    <label class="form-check-label" for="cb-orig-${orig.replace(/\s+/g,'-')}">
                        ${orig} <span class="filter-count">(${getCount('origin', orig)})</span>
                    </label>
                </div>
            `).join('');
        }

        const roastCont = document.getElementById('filterRoastContainer');
        if (roastCont) {
            roastCont.innerHTML = roasts.map(roast => `
                <div class="form-check">
                    <input class="form-check-input filter-cb" type="checkbox" value="${roast}" id="cb-roast-${roast}" data-type="roasts">
                    <label class="form-check-label" for="cb-roast-${roast}">
                        ${roast} <span class="filter-count">(${getCount('roast', roast)})</span>
                    </label>
                </div>
            `).join('');
        }

        const ratingCont = document.getElementById('filterRatingContainer');
        if (ratingCont) {
            ratingCont.innerHTML = ratings.map(r => `
                <div class="form-check">
                    <input class="form-check-input filter-cb" type="checkbox" value="${r}" id="cb-rating-${r}" data-type="ratings">
                    <label class="form-check-label" for="cb-rating-${r}">
                        ${getStars(r)} & up
                    </label>
                </div>
            `).join('');
        }
        
        // Update price range slider max
        const priceFilters = document.querySelectorAll('input[type="range"]');
        priceFilters.forEach(pf => {
            pf.max = 1500;
            pf.value = 1500;
        });
        document.querySelectorAll('.range-max').forEach(el => el.innerText = '$0 - $1500');
    }

    function cloneSidebarToMobile() {
        const desktopSidebar = document.querySelector('.shop-sidebar');
        const mobileBody = document.getElementById('mobileFilterBody');
        if(desktopSidebar && mobileBody) {
            const clone = desktopSidebar.cloneNode(true);
            const inputs = clone.querySelectorAll('input');
            const labels = clone.querySelectorAll('label');
            const titles = clone.querySelectorAll('.filter-group-title');
            const bodies = clone.querySelectorAll('.collapse');

            inputs.forEach(input => { if(input.id) input.id += '-mob'; });
            labels.forEach(label => { if(label.getAttribute('for')) label.setAttribute('for', label.getAttribute('for') + '-mob'); });
            
            titles.forEach((title, i) => {
                const targetId = `collapseMob${i}`;
                title.setAttribute('data-bs-target', `#${targetId}`);
                if(bodies[i]) bodies[i].id = targetId;
            });

            const priceVal = clone.querySelector('#priceRangeValue');
            if(priceVal) priceVal.id = 'priceRangeValue-mob';
            const priceRange = clone.querySelector('#priceRangeFilter');
            if(priceRange) priceRange.id = 'priceRangeFilter-mob';
            const clearBtn = clone.querySelector('#clearFiltersBtn');
            if(clearBtn) clearBtn.id = 'clearFiltersBtn-mob';
            
            mobileBody.innerHTML = '';
            mobileBody.appendChild(clone);
        }
    }

    function getStars(num) {
        let stars = '';
        for(let i=0; i<5; i++) {
            stars += i < num ? '<i class="bi bi-star-fill"></i>' : '<i class="bi bi-star text-muted"></i>';
        }
        return stars;
    }

    // ----------------------------------------------------
    // 5. EVENT LISTENERS
    // ----------------------------------------------------
    function attachEventListeners() {
        document.addEventListener('change', (e) => {
            if(e.target.classList.contains('filter-cb')) {
                const type = e.target.getAttribute('data-type');
                const val = e.target.type === 'checkbox' ? (type === 'ratings' ? parseInt(e.target.value) : e.target.value) : e.target.value;
                
                const isMob = e.target.id.endsWith('-mob');
                const otherId = isMob ? e.target.id.replace('-mob', '') : e.target.id + '-mob';
                const otherCb = document.getElementById(otherId);
                if(otherCb) otherCb.checked = e.target.checked;

                if(e.target.checked) {
                    if(!state.filters[type].includes(val)) state.filters[type].push(val);
                } else {
                    state.filters[type] = state.filters[type].filter(v => v !== val);
                }
                
                state.currentPage = 1;
                applyFilters();
            }
        });

        const priceFilters = document.querySelectorAll('input[type="range"]');
        priceFilters.forEach(pf => {
            pf.addEventListener('input', (e) => {
                const val = e.target.value;
                state.filters.price = parseFloat(val);
                
                if (document.getElementById('priceRangeValue')) document.getElementById('priceRangeValue').innerText = `$0 - $${val}`;
                if (document.getElementById('priceRangeValue-mob')) document.getElementById('priceRangeValue-mob').innerText = `$0 - $${val}`;
                
                if(e.target.id === 'priceRangeFilter' && document.getElementById('priceRangeFilter-mob')) {
                    document.getElementById('priceRangeFilter-mob').value = val;
                } else if(document.getElementById('priceRangeFilter')) {
                    document.getElementById('priceRangeFilter').value = val;
                }

                state.currentPage = 1;
                applyFilters();
            });
        });

        document.addEventListener('click', (e) => {
            if(e.target.id === 'clearFiltersBtn' || e.target.id === 'clearFiltersBtn-mob') {
                state.filters = { categories: [], price: 1500, origins: [], roasts: [], ratings: [] };
                document.querySelectorAll('.filter-cb').forEach(cb => cb.checked = false);
                document.querySelectorAll('input[type="range"]').forEach(r => r.value = 1500);
                document.querySelectorAll('.range-max').forEach(el => el.innerText = '$0 - $1500');
                
                document.querySelectorAll('.shop-cat-item').forEach(el => el.classList.remove('active'));

                state.currentPage = 1;
                applyFilters();
            }
        });

        const sortSelect = document.getElementById('sortSelect');
        if(sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                state.sort = e.target.value;
                state.currentPage = 1;
                applyFilters();
            });
        }

        const catItems = document.querySelectorAll('.shop-cat-item[data-category]');
        catItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const cat = item.getAttribute('data-category');
                
                catItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                if (document.getElementById('clearFiltersBtn')) document.getElementById('clearFiltersBtn').click();
                
                state.filters.categories = [cat];
                
                const cbs = document.querySelectorAll(`.filter-cb[value="${cat}"]`);
                cbs.forEach(cb => cb.checked = true);

                state.currentPage = 1;
                applyFilters();
                
                const grid = document.getElementById('productGrid');
                if (grid) grid.scrollIntoView({behavior: 'smooth', block: 'start'});
            });
        });
        
        const viewAll = document.getElementById('viewAllCategories');
        if(viewAll) {
            viewAll.addEventListener('click', (e) => {
                e.preventDefault();
                if (document.getElementById('clearFiltersBtn')) document.getElementById('clearFiltersBtn').click();
                const grid = document.getElementById('productGrid');
                if (grid) grid.scrollIntoView({behavior: 'smooth', block: 'start'});
            });
        }

        document.addEventListener('click', (e) => {
            const addToCartBtn = e.target.closest('.add-cart-btn, .add-featured-btn');
            if(addToCartBtn) {
                const id = addToCartBtn.getAttribute('data-id');
                const product = products.find(p => p.id === id);
                if(product && window.CofyBrew) {
                    window.CofyBrew.addToCart(product);
                    showAddedToast(product.name);
                }
            }

            const wishlistBtn = e.target.closest('.btn-wishlist');
            if(wishlistBtn) {
                e.preventDefault();
                const id = wishlistBtn.getAttribute('data-id');
                toggleWishlist(id, wishlistBtn);
            }

            const pageBtn = e.target.closest('.page-btn:not(:disabled)');
            if(pageBtn) {
                const page = pageBtn.getAttribute('data-page');
                if(page === 'prev' && state.currentPage > 1) state.currentPage--;
                else if(page === 'next') state.currentPage++;
                else state.currentPage = parseInt(page);
                
                renderGrid();
                const grid = document.getElementById('productGrid');
                if (grid) grid.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        });

        const searchInput = document.getElementById('searchInput');
        if(searchInput) {
            searchInput.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                const resultsContainer = document.getElementById('searchResults');
                if(!resultsContainer) return;
                
                if(term.length < 2) {
                    resultsContainer.innerHTML = '<p class="text-muted small">Start typing to search...</p>';
                    // If they clear the search, go back to filters
                    if (term.length === 0) applyFilters();
                    return;
                }
                const matches = products.filter(p => p.name.toLowerCase().includes(term) || (p.category && p.category.toLowerCase().includes(term)));
                
                state.filtered = matches;
                state.currentPage = 1;
                renderGrid();
                
                if(matches.length === 0) {
                    resultsContainer.innerHTML = '<p class="text-muted small">No products found.</p>';
                } else {
                    resultsContainer.innerHTML = matches.slice(0,4).map(p => `
                        <div class="col-md-6">
                            <a href="#" class="d-flex align-items-center text-decoration-none text-dark bg-light p-2 rounded mb-2">
                                <img src="${p.image}" alt="${p.name}" style="width: 50px; height: 50px; object-fit: contain; background: #fff; padding: 5px; border-radius: 4px;" class="me-3">
                                <div>
                                    <div class="fw-bold">${p.name}</div>
                                    <div class="text-coffee small">$${p.price.toFixed(2)}</div>
                                </div>
                            </a>
                        </div>
                    `).join('');
                }
            });
        }

        const initCarousel = (prevId, nextId, trackId) => {
            const prev = document.getElementById(prevId);
            const next = document.getElementById(nextId);
            const track = document.getElementById(trackId);
            
            if(!prev || !next || !track) return;
            const scrollStep = 300;
            next.addEventListener('click', () => track.parentElement.scrollBy({left: scrollStep, behavior: 'smooth'}));
            prev.addEventListener('click', () => track.parentElement.scrollBy({left: -scrollStep, behavior: 'smooth'}));
        };

        initCarousel('flavorsPrev', 'flavorsNext', 'flavorsTrack');
        initCarousel('recentPrev', 'recentNext', 'recentTrack');
    }

    // ----------------------------------------------------
    // 6. FILTER & SORT LOGIC
    // ----------------------------------------------------
    function applyFilters() {
        let res = [...products];

        if(state.filters.categories.length > 0) res = res.filter(p => state.filters.categories.includes(p.category));
        if(state.filters.origins.length > 0) res = res.filter(p => p.origin && state.filters.origins.some(o => p.origin.includes(o)));
        if(state.filters.roasts.length > 0) res = res.filter(p => p.roast && state.filters.roasts.includes(p.roast));
        if(state.filters.ratings.length > 0) {
            const minRating = Math.min(...state.filters.ratings);
            res = res.filter(p => p.rating >= minRating);
        }
        res = res.filter(p => p.price <= state.filters.price);

        switch(state.sort) {
            case 'price-low': res.sort((a,b) => a.price - b.price); break;
            case 'price-high': res.sort((a,b) => b.price - a.price); break;
            case 'rating': res.sort((a,b) => b.rating - a.rating); break;
            case 'name-asc': res.sort((a,b) => a.name.localeCompare(b.name)); break;
            case 'name-desc': res.sort((a,b) => b.name.localeCompare(a.name)); break;
            case 'featured': res.sort((a,b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
        }

        state.filtered = res;
        renderGrid();
    }

    // ----------------------------------------------------
    // 7. RENDER GRID & PAGINATION
    // ----------------------------------------------------
    function renderGrid() {
        const grid = document.getElementById('productGrid');
        const countText = document.getElementById('productsCountText');
        const emptyMsg = document.getElementById('noProductsMsg');
        
        if (!grid) return;
        
        if(state.filtered.length === 0) {
            grid.innerHTML = '';
            if (countText) countText.innerText = 'Showing 0 products';
            if (emptyMsg) emptyMsg.classList.remove('d-none');
            const pagContainer = document.getElementById('paginationContainer');
            if (pagContainer) pagContainer.innerHTML = '';
            return;
        }
        
        if (emptyMsg) emptyMsg.classList.add('d-none');

        const total = state.filtered.length;
        const totalPages = Math.ceil(total / state.perPage);
        
        if(state.currentPage > totalPages) state.currentPage = totalPages;

        const start = (state.currentPage - 1) * state.perPage;
        const end = Math.min(start + state.perPage, total);
        
        if (countText) countText.innerText = `Showing ${start + 1}–${end} of ${total} products`;

        const visibleProducts = state.filtered.slice(start, end);

        grid.innerHTML = visibleProducts.map(p => {
            const inWishlist = state.wishlist.includes(p.id);
            return `
            <div class="col-12 col-sm-6 col-lg-4 col-xl-3 fade-in-up visible">
                <div class="product-card" data-id="${p.id}">
                    <button class="btn-wishlist shop-managed ${inWishlist ? 'active' : ''}" data-id="${p.id}" aria-label="Toggle Wishlist">
                        <i class="bi ${inWishlist ? 'bi-heart-fill' : 'bi-heart'}"></i>
                    </button>
                    <div class="product-img-box">
                        <img src="${p.image}" alt="${p.name}" class="product-img">
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${p.name}</h3>
                        <div class="product-origin">${p.origin || 'Blend'}</div>
                        <div class="product-meta d-flex justify-content-between align-items-end mt-2">
                            <div>
                                <div class="product-price">$${p.price.toFixed(2)}</div>
                                <div class="product-rating">
                                    <i class="bi bi-star-fill"></i> ${p.rating} (${p.reviews})
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn-add-cart-circle add-cart-btn shop-managed" data-id="${p.id}" aria-label="Add to cart">
                        <img src="assets/svg icon.svg" class="cart-svg-icon" alt="Add to cart">
                    </button>
                </div>
            </div>
        `}).join('');

        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        const pag = document.getElementById('paginationContainer');
        if (!pag) return;
        if(totalPages <= 1) {
            pag.innerHTML = '';
            return;
        }

        let html = `<button class="page-btn" data-page="prev" ${state.currentPage === 1 ? 'disabled style="opacity:0.3"' : ''}><i class="bi bi-arrow-left"></i></button>`;
        
        for(let i=1; i<=totalPages; i++) {
            html += `<button class="page-btn ${state.currentPage === i ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        
        html += `<button class="page-btn" data-page="next" ${state.currentPage === totalPages ? 'disabled style="opacity:0.3"' : ''}><i class="bi bi-arrow-right"></i></button>`;
        
        pag.innerHTML = html;
    }

    // ----------------------------------------------------
    // 8. RECENT PRODUCTS CAROUSEL
    // ----------------------------------------------------
    function renderRecentProducts() {
        const track = document.getElementById('recentTrack');
        if(!track) return;
        
        // Take a random selection or defined recent ones
        let recent = products.filter(p => p.recent);
        if (recent.length === 0) recent = products.slice(0, 6); // fallback
        
        track.innerHTML = recent.map(p => `
            <div class="product-card" data-id="${p.id}">
                <button class="btn-wishlist shop-managed ${state.wishlist.includes(p.id) ? 'active' : ''}" data-id="${p.id}" aria-label="Toggle Wishlist" style="position:absolute; top:10px; right:10px; z-index:2; background:none; border:none; color:var(--gold);">
                    <i class="bi ${state.wishlist.includes(p.id) ? 'bi-heart-fill' : 'bi-heart'}"></i>
                </button>
                <div class="product-img-box" style="position:relative;">
                    <img src="${p.image}" alt="${p.name}" class="product-img" style="cursor:pointer;" onclick="window.location.href='shop.html?q=${encodeURIComponent(p.name)}'">
                </div>
                <div class="product-info p-3 text-center">
                    <h3 class="product-name">${p.name}</h3>
                    <div class="product-price">$${p.price.toFixed(2)}</div>
                    <button class="btn btn-outline-gold btn-sm mt-2 add-cart-btn shop-managed" data-id="${p.id}">Add to Cart</button>
                </div>
            </div>
        `).join('');
    }

    // ----------------------------------------------------
    // 9. HELPER UI LOGIC
    // ----------------------------------------------------
    function showAddedToast(name) {
        let toast = document.getElementById('shopAddedToast');
        if(!toast) {
            toast = document.createElement('div');
            toast.id = 'shopAddedToast';
            toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--dark-green);color:#fff;padding:12px 24px;border-radius:8px;font-size:0.9rem;z-index:9999;opacity:0;transition:all 0.3s;pointer-events:none;box-shadow:0 4px 20px rgba(0,0,0,0.2);';
            document.body.appendChild(toast);
        }
        toast.innerHTML = '<i class="bi bi-check-circle-fill me-2" style="color:var(--gold)"></i>' + name + ' added to cart!';
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
        }, 2500);
    }

    function toggleWishlist(id, btnElement) {
        if(window.CofyBrew) {
            const added = window.CofyBrew.toggleWishlistItem(id);
            state.wishlist = window.CofyBrew.getWishlist();
            if(added) {
                btnElement.classList.add('active');
                btnElement.innerHTML = '<i class="bi bi-heart-fill"></i>';
            } else {
                btnElement.classList.remove('active');
                btnElement.innerHTML = '<i class="bi bi-heart"></i>';
            }
        }
    }
});
