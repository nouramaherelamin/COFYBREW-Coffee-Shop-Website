/**
 * COFYBREW — Unified JavaScript
 * Handles: Cart, Wishlist, Navbar, Animations, Forms, Counters
 * Storage Keys: cofybrew_cart | cofybrew_wishlist
 */

window.cofyNotify = function(options) {
    return new Promise((resolve) => {
        const {
            message,
            type = 'info',
            isConfirm = false,
            isPrompt = false,
            duration = 4000
        } = options;

        if (!document.getElementById('cofy-toast-styles')) {
            const style = document.createElement('style');
            style.id = 'cofy-toast-styles';
            style.textContent = `
                .cofy-toast-container { position: fixed; top: 20px; right: 20px; z-index: 99999; display: flex; flex-direction: column; gap: 12px; pointer-events: none; max-width: calc(100vw - 40px); }
                .cofy-toast { width: 420px; max-width: 100%; background-color: #fcf9f2; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); padding: 20px; display: flex; align-items: flex-start; gap: 16px; position: relative; overflow: hidden; pointer-events: auto; transform: translateX(120%); transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease; opacity: 0; }
                .cofy-toast.cofy-toast-show { transform: translateX(0); opacity: 1; }
                .cofy-toast.cofy-toast-hide { transform: translateX(120%); opacity: 0; }
                .cofy-toast-icon { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 18px; font-weight: bold; }
                .cofy-toast-success .cofy-toast-icon { background-color: #3f7b5e; color: white; }
                .cofy-toast-error .cofy-toast-icon { background-color: #d9534f; color: white; }
                .cofy-toast-warning .cofy-toast-icon { background-color: #f0ad4e; color: white; }
                .cofy-toast-info .cofy-toast-icon { background-color: #5bc0de; color: white; }
                .cofy-toast-content { flex-grow: 1; padding-right: 20px; }
                .cofy-toast-title { font-weight: 700; color: #10291d; margin: 0 0 4px 0; font-size: 16px; text-transform: capitalize; }
                .cofy-toast-message { color: #444; margin: 0; font-size: 14px; line-height: 1.4; white-space: pre-wrap; font-family: inherit; }
                .cofy-toast-close { position: absolute; top: 16px; right: 16px; background: transparent; border: none; font-size: 22px; cursor: pointer; color: #999; line-height: 1; padding: 0; }
                .cofy-toast-close:hover { color: #10291d; }
                .cofy-toast-progress { position: absolute; bottom: 0; left: 0; height: 4px; background-color: rgba(0,0,0,0.1); width: 100%; }
                .cofy-toast-progress-bar { height: 100%; width: 100%; transition: width linear; }
                .cofy-toast-success .cofy-toast-progress-bar { background-color: #3f7b5e; }
                .cofy-toast-error .cofy-toast-progress-bar { background-color: #d9534f; }
                .cofy-toast-warning .cofy-toast-progress-bar { background-color: #f0ad4e; }
                .cofy-toast-info .cofy-toast-progress-bar { background-color: #5bc0de; }
                .cofy-toast-timer { position: absolute; bottom: 8px; right: 16px; font-size: 12px; color: #999; }
                .cofy-toast-actions { margin-top: 12px; display: flex; gap: 8px; }
                .cofy-toast-btn { padding: 6px 16px; border-radius: 6px; border: none; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
                .cofy-toast-btn-primary { background: #10291d; color: #fff; }
                .cofy-toast-btn-primary:hover { background: #1b4531; }
                .cofy-toast-btn-secondary { background: #e0dcd3; color: #333; }
                .cofy-toast-btn-secondary:hover { background: #d0cbbd; }
                .cofy-toast-input { width: 100%; padding: 8px 12px; margin-top: 8px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; box-sizing: border-box; font-family: inherit; }
                .cofy-toast-input:focus { outline: none; border-color: #10291d; }
                @media (max-width: 576px) { .cofy-toast-container { top: 10px; right: 10px; left: 10px; max-width: none; } .cofy-toast { width: 100%; } }
            `;
            document.head.appendChild(style);
        }

        let container = document.getElementById('cofy-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'cofy-toast-container';
            container.className = 'cofy-toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `cofy-toast cofy-toast-${type}`;

        let iconHTML = '';
        let title = type;
        if (type === 'success') iconHTML = '✓';
        else if (type === 'error') iconHTML = '!';
        else if (type === 'warning') iconHTML = '!';
        else if (type === 'info') iconHTML = 'i';

        let interactiveHTML = '';
        if (isPrompt) {
            interactiveHTML = `<input type="text" class="cofy-toast-input" placeholder="Type here..." />`;
        }
        if (isConfirm || isPrompt) {
            interactiveHTML += `
                <div class="cofy-toast-actions">
                    <button class="cofy-toast-btn cofy-toast-btn-primary" id="cofy-toast-ok">OK</button>
                    <button class="cofy-toast-btn cofy-toast-btn-secondary" id="cofy-toast-cancel">Cancel</button>
                </div>
            `;
        }

        toast.innerHTML = `
            <div class="cofy-toast-icon">${iconHTML}</div>
            <div class="cofy-toast-content">
                <h4 class="cofy-toast-title">${title}</h4>
                <p class="cofy-toast-message">${message}</p>
                ${interactiveHTML}
            </div>
            <button class="cofy-toast-close">&times;</button>
            ${(!isConfirm && !isPrompt) ? `<div class="cofy-toast-timer"></div><div class="cofy-toast-progress"><div class="cofy-toast-progress-bar"></div></div>` : ''}
        `;

        container.appendChild(toast);

        toast.offsetHeight; // force reflow
        toast.classList.add('cofy-toast-show');

        let timerId = null;
        let isClosed = false;

        const closeToast = (returnValue) => {
            if (isClosed) return;
            isClosed = true;
            clearTimeout(timerId);
            toast.classList.remove('cofy-toast-show');
            toast.classList.add('cofy-toast-hide');
            setTimeout(() => {
                if(toast.parentElement) toast.remove();
            }, 400);
            resolve(returnValue);
        };

        if (isConfirm || isPrompt) {
            const btnOk = toast.querySelector('#cofy-toast-ok');
            const btnCancel = toast.querySelector('#cofy-toast-cancel');
            const input = toast.querySelector('.cofy-toast-input');

            btnOk.addEventListener('click', () => {
                if (isPrompt) closeToast(input.value);
                else closeToast(true);
            });
            btnCancel.addEventListener('click', () => {
                if (isPrompt) closeToast(null);
                else closeToast(false);
            });
            if (input) {
                input.focus();
                input.addEventListener('keydown', (e) => {
                    if(e.key === 'Enter') closeToast(input.value);
                    if(e.key === 'Escape') closeToast(null);
                });
            }
        } else {
            const progressBar = toast.querySelector('.cofy-toast-progress-bar');
            const timerText = toast.querySelector('.cofy-toast-timer');
            let startTime = Date.now();
            
            progressBar.style.transition = `width ${duration}ms linear`;
            progressBar.style.width = '0%';
            
            const updateTimer = () => {
                if (isClosed) return;
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, duration - elapsed);
                timerText.textContent = Math.ceil(remaining / 1000) + 's';
                if (remaining > 0) {
                    requestAnimationFrame(updateTimer);
                }
            };
            requestAnimationFrame(updateTimer);

            timerId = setTimeout(() => closeToast(undefined), duration);
        }

        toast.querySelector('.cofy-toast-close').addEventListener('click', () => closeToast(isPrompt ? null : (isConfirm ? false : undefined)));
    });
};

window.showNotification = function(message, type = 'info') {
    return window.cofyNotify({ message, type });
};
window.showConfirm = function(message) {
    return window.cofyNotify({ message, type: 'warning', isConfirm: true });
};
window.showPrompt = function(message) {
    return window.cofyNotify({ message, type: 'info', isPrompt: true });
};

(function () {
  'use strict';

  /* ============================================================
     CONSTANTS & STORAGE KEYS
  ============================================================ */
  var CART_KEY      = 'cofybrew_cart';
  var WISHLIST_KEY  = 'cofybrew_wishlist';
  var TAX_RATE      = 0.05;
  var FREE_SHIP     = 45;
  var SHIP_COST     = 5.99;

  /* ============================================================
     STORAGE HELPERS
  ============================================================ */
  function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch (e) { return []; }
  }
  function setCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartBadges();
  }
  function getWishlist() {
    try { return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
    catch (e) { return []; }
  }
  function setWishlist(ids) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
  }

  /* ============================================================
     CART FUNCTIONS
  ============================================================ */
  function addToCart(item) {
    var cart = getCart();
    var existing = cart.find(i => i.id === item.id);
    
    if (existing) {
      existing.quantity = Math.min((existing.quantity || 1) + 1, 99);
    } else {
      cart.push({
        id:       item.id,
        name:     item.name || 'Coffee Product',
        origin:   item.origin || '',
        variant:  item.variant || 'Standard',
        price:    parseFloat(item.price) || 0,
        quantity: 1,
        image:    item.image || 'assets/menu/coffee-product1.png'
      });
    }
    setCart(cart);
    
    // Show notification only if shop.js is NOT managing its own toast
    if (!window._shopManagesNotification) {
        showNotification(item.name + ' added to cart!', 'success');
    }
    return cart;
  }

  function getCartCount() {
    var cart = getCart();
    return cart.reduce(function (s, i) { return s + (i.quantity || 1); }, 0);
  }

  function updateCartBadges() {
    var count = getCartCount();
    var badges = document.querySelectorAll('.cart-badge');
    badges.forEach(function (b) {
      b.textContent = count;
    });
  }

  /* ============================================================
     WISHLIST FUNCTIONS
  ============================================================ */
  function toggleWishlistItem(productId) {
    var list = getWishlist();
    var idx = list.indexOf(productId);
    if (idx === -1) {
      list.push(productId);
    } else {
      list.splice(idx, 1);
    }
    setWishlist(list);
    return idx === -1; // true = added
  }

  function isWishlisted(productId) {
    return getWishlist().indexOf(productId) !== -1;
  }

  /* ============================================================
     NAVBAR — Scroll Behavior & Active State
  ============================================================ */
  function initNavbar() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;

    function handleScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run on load

    var currentFile = window.location.pathname.split('/').pop() || 'index.html';
    if (currentFile === '') currentFile = 'index.html';
    
    document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
      var href = link.getAttribute('href');
      if (href === currentFile) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ============================================================
     CART BADGE — Wishlist HEART BUTTONS on product cards
  ============================================================ */
  function initWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(function (btn) {
      if(btn.classList.contains('shop-managed')) return;
      // Guard: skip already-bound buttons to prevent duplicate listeners
      if (btn.dataset.wishlistBound) return;
      btn.dataset.wishlistBound = '1';

      var card = btn.closest('[data-id]');
      if (!card) return;
      var pid = card.getAttribute('data-id');
      if (!pid) return;

      var icon = btn.querySelector('i');
      if (icon) {
        if (isWishlisted(pid)) icon.className = 'bi bi-heart-fill text-gold';
        else icon.className = 'bi bi-heart';
      }

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var added = toggleWishlistItem(pid);
        if (icon) {
          icon.className = added ? 'bi bi-heart-fill text-gold' : 'bi bi-heart';
          btn.classList.add('heart-pop');
          setTimeout(function () { btn.classList.remove('heart-pop'); }, 400);
        }
      });
    });
  }

  /* ============================================================
     ADD TO CART BUTTONS 
  ============================================================ */
  function initAddToCartButtons() {
    document.querySelectorAll('.add-to-cart-btn, .btn-add-cart-circle').forEach(function (btn) {
      if (btn.classList.contains('shop-managed')) return;
      // Guard: skip already-bound buttons to prevent duplicate listeners
      if (btn.dataset.cartBound) return;
      btn.dataset.cartBound = '1';

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var id = btn.getAttribute('data-id') || btn.closest('[data-id]')?.getAttribute('data-id');
        if (!id) return;
        
        var product = window.cofyProducts?.find(p => p.id === id);
        
        if (product) {
            addToCart(product);
        } else {
            // Fallback for HTML data attributes
            addToCart({
                id: id,
                name: btn.getAttribute('data-name') || 'Coffee Product',
                price: parseFloat(btn.getAttribute('data-price') || 0),
                image: btn.getAttribute('data-img') || 'assets/menu/coffee-product1.png'
            });
        }

        var icon = btn.querySelector('i');
        if (icon) {
          var originalClass = icon.className;
          icon.className = 'bi bi-check2';
          setTimeout(function () { icon.className = originalClass; }, 1500);
        }

        document.querySelectorAll('.cart-badge').forEach(function (b) {
          b.classList.add('badge-pulse');
          setTimeout(function () { b.classList.remove('badge-pulse'); }, 400);
        });
      });
    });
  }

  /* ============================================================
     HOME PAGE — Category nav → Shop
  ============================================================ */
  function initCategoryNav() {
    document.querySelectorAll('.shop-cat-item[data-category]').forEach(function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        var cat = item.getAttribute('data-category');
        if (cat) window.location.href = 'shop.html?category=' + encodeURIComponent(cat);
      });
    });
    var viewAll = document.getElementById('viewAllCategories');
    if (viewAll) {
      viewAll.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'shop.html';
      });
    }
  }

  /* ============================================================
     ANIMATIONS — IntersectionObserver scroll reveals
  ============================================================ */
  function initScrollAnimations() {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .scale-in').forEach(function (el) {
        observer.observe(el);
      });

      document.querySelectorAll('.stagger-children').forEach(function (container) {
        var children = container.children;
        Array.from(children).forEach(function (child, index) {
          child.style.transitionDelay = (index * 0.08) + 's';
          child.classList.add('fade-in-up');
          observer.observe(child);
        });
      });
    } else {
      document.querySelectorAll('.fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .scale-in').forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  /* ============================================================
     COUNTER ANIMATION
  ============================================================ */
  function initCounters() {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    var started = false;
    var counters = document.querySelectorAll('.stat-number[data-target]');

    function runCounters() {
      counters.forEach(function (counter) {
        var target = parseFloat(counter.getAttribute('data-target'));
        var suffix = counter.getAttribute('data-suffix') || '';
        if (isNaN(target)) return;

        if (prefersReduced) {
          counter.textContent = target + suffix;
          return;
        }

        var duration = 1800;
        var startTime = null;
        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = Math.ceil(eased * target);
          counter.textContent = current + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }

    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !started) {
          started = true;
          runCounters();
        }
      });
    }, { threshold: 0.3 });

    counterObserver.observe(statsSection);
  }

  /* ============================================================
     BACK TO TOP
  ============================================================ */
  function initBackToTop() {
    var btn = document.getElementById('backToTop') || document.getElementById('backToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) btn.classList.add('show');
      else btn.classList.remove('show');
    }, { passive: true });

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     FOOTER NEWSLETTER (every page)
  ============================================================ */
  function initFooterNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form, #footerNewsletterForm');
    
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var inp = form.querySelector('input[type="email"]');
          var btn = form.querySelector('button');
          if (!inp || !btn) return;

          var email = inp.value.trim();
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            inp.style.borderColor = '#e74c3c';
            setTimeout(function () { inp.style.borderColor = ''; }, 2000);
            return;
          }

          var orig = btn.innerHTML;
          btn.innerHTML = '<i class="bi bi-check2"></i>';
          inp.value = '';
          
          // Show success message if next sibling is success div
          let successEl = form.nextElementSibling;
          if(successEl && successEl.id && successEl.id.includes('Success')) {
              successEl.classList.remove('d-none');
              setTimeout(() => successEl.classList.add('d-none'), 3000);
          }
          
          setTimeout(function () { btn.innerHTML = orig; }, 3000);
        });
    });
  }

  /* ============================================================
     SEARCH MODAL
  ============================================================ */
  function initSearchModal() {
    var searchForms = document.querySelectorAll('#searchModal form');
    searchForms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="search"], input[type="text"]');
        var query = input ? input.value.trim() : '';
        if (query) {
          window.location.href = 'shop.html?q=' + encodeURIComponent(query);
        } else {
          window.location.href = 'shop.html';
        }
      });
      
      // Auto complete suggestions logic
      const input = form.querySelector('input[type="search"], input[type="text"]');
      if(input && window.cofyProducts) {
          input.addEventListener('input', (e) => {
              const term = e.target.value.toLowerCase();
              const resultsContainer = document.getElementById('searchResults');
              if(!resultsContainer) return;
              
              if(term.length < 2) {
                  resultsContainer.innerHTML = '<p class="text-muted small">Start typing to search...</p>';
                  return;
              }
              const matches = window.cofyProducts.filter(p => p.id !== 'p64' && (p.name.toLowerCase().includes(term) || (p.category && p.category.toLowerCase().includes(term))));
              
              if(matches.length === 0) {
                  resultsContainer.innerHTML = '<p class="text-muted small">No products found.</p>';
              } else {
                  resultsContainer.innerHTML = matches.slice(0,4).map(p => `
                      <a href="shop.html?q=${encodeURIComponent(p.name)}" class="d-flex align-items-center text-decoration-none text-dark bg-light p-2 rounded mb-2">
                          <img src="${p.image}" alt="${p.name}" style="width: 50px; height: 50px; object-fit: contain; background: #fff; padding: 5px; border-radius: 4px;" class="me-3">
                          <div>
                              <div class="fw-bold">${p.name}</div>
                              <div class="text-coffee small">$${p.price.toFixed(2)}</div>
                          </div>
                      </a>
                  `).join('');
              }
          });
      }
    });
  }

  /* ============================================================
     WISHLIST PAGE — Full Render using global products
  ============================================================ */
  function initWishlistPage() {
    var grid = document.getElementById('wishlist-grid');
    if (!grid) return;

    var wishlistIds = getWishlist();
    var wishlistedProducts = (window.cofyProducts || []).filter(function (p) { return p.id !== 'p64' && wishlistIds.indexOf(p.id) !== -1; });
    var countLabel = document.getElementById('wishlist-count');
    if (countLabel) countLabel.textContent = wishlistedProducts.length + ' item' + (wishlistedProducts.length !== 1 ? 's' : '');

    if (wishlistedProducts.length === 0) {
      grid.innerHTML = '<div class="col-12 text-center py-5 fade-in-up visible">' +
        '<div style="font-size:4rem; color:#ccc; margin-bottom:1rem;"><i class="bi bi-heart"></i></div>' +
        '<h3 class="font-heading mb-3">Your wishlist is empty</h3>' +
        '<p class="text-muted mb-4">Discover our premium coffee selection and find your new favorites.</p>' +
        '<a href="shop.html" class="btn btn-gold px-5">Explore Shop <i class="bi bi-arrow-right ms-1"></i></a>' +
        '</div>';
      return;
    }

    grid.innerHTML = '';
    wishlistedProducts.forEach(function (p, index) {
      var col = document.createElement('div');
      col.className = 'col-xl-3 col-lg-4 col-md-6 col-12 fade-in-up visible';
      col.style.transitionDelay = (index * 0.08) + 's';
      col.setAttribute('data-pid', p.id);
      col.innerHTML = '<div class="product-card" data-id="' + p.id + '">' +
        '<button class="wishlist-btn shop-managed" aria-label="Remove from wishlist" onclick="window.cofyRemoveWishlist(\'' + p.id + '\', this)">' +
          '<i class="bi bi-heart-fill text-gold"></i>' +
        '</button>' +
        '<div class="product-img-wrapper" style="height:230px;">' +
          '<img src="' + p.image + '" alt="' + p.name + '" style="height:100%;width:100%;object-fit:contain;" onerror="this.src=\'assets/menu/coffee-product1.png\'">' +
        '</div>' +
        '<div class="product-info flex-grow-1 d-flex flex-column">' +
          '<h3 class="product-title">' + p.name + '</h3>' +
          '<div class="product-subtitle">' + p.origin + '</div>' +
          '<div class="d-flex justify-content-between align-items-center mt-auto pt-3">' +
            '<div class="product-price">$' + p.price.toFixed(2) + '</div>' +
            '<div class="product-rating"><i class="bi bi-star-fill text-gold"></i> ' + p.rating + ' (' + p.reviews + ')</div>' +
          '</div>' +
          '<div class="d-flex gap-2 mt-2">' +
            '<button class="add-to-cart-btn w-100 rounded d-flex align-items-center justify-content-center gap-2" ' +
              'style="position:static;width:auto !important;" ' +
              'data-id="' + p.id + '">' +
              '<i class="bi bi-cart3"></i> Add to Cart' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>';
      grid.appendChild(col);
    });

    // Remove from wishlist
    window.cofyRemoveWishlist = function (pid, btn) {
      var list = getWishlist();
      var newList = list.filter(function (id) { return id !== pid; });
      setWishlist(newList);
      var col = btn.closest('[data-pid]');
      if (col) {
        col.style.opacity = '0';
        col.style.transform = 'scale(0.8)';
        col.style.transition = 'all 0.3s';
        setTimeout(function () { col.remove(); updateWishlistCount(); }, 300);
      }
    };

    function updateWishlistCount() {
      var remaining = document.querySelectorAll('[data-pid]').length;
      if (countLabel) countLabel.textContent = remaining + ' item' + (remaining !== 1 ? 's' : '');
      if (remaining === 0) {
        grid.innerHTML = '<div class="col-12 text-center py-5">' +
          '<div style="font-size:4rem; color:#ccc;"><i class="bi bi-heart"></i></div>' +
          '<h3 class="font-heading my-3">Your wishlist is empty</h3>' +
          '<a href="shop.html" class="btn btn-gold px-5">Explore Shop</a>' +
          '</div>';
      }
    }

    setTimeout(function () {
      initAddToCartButtons();
    }, 0);
  }

  /* ============================================================
     CART PAGE  
  ============================================================ */
  function initCartPage() {
    var cartItemsList = document.getElementById('cartItemsList');
    if (!cartItemsList) return;

    function render() {
      var items  = getCart();
      var empty  = document.getElementById('cartEmptyState');
      var acts   = document.getElementById('cartActions');
      var sumCol = document.getElementById('orderSummaryCol');
      var title  = document.getElementById('cartItemsTitle');
      var clrBtn = document.getElementById('clearCartBtn');

      if (items.length === 0) {
        cartItemsList.innerHTML = '';
        if (empty)  empty.classList.remove('d-none');
        if (acts)   acts.classList.add('d-none');
        if (sumCol) sumCol.classList.add('d-none');
        if (clrBtn) clrBtn.classList.add('d-none');
        if (title)  title.textContent = '0 Items in Your Cart';
        updateCartBadges();
        return;
      }

      if (empty)  empty.classList.add('d-none');
      if (acts)   acts.classList.remove('d-none');
      if (sumCol) sumCol.classList.remove('d-none');
      if (clrBtn) clrBtn.classList.remove('d-none');

      var count = items.reduce(function (s, i) { return s + i.quantity; }, 0);
      if (title) title.textContent = count + (count === 1 ? ' Item' : ' Items') + ' in Your Cart';

      cartItemsList.innerHTML = items.map(function (item) {
        var lineTotal = (item.price * item.quantity).toFixed(2);
        return '<div class="cart-item-card" data-id="' + item.id + '">' +
          '<div class="cart-item-img-wrap">' +
            '<img src="' + item.image + '" alt="' + item.name + '" onerror="this.src=\'assets/menu/coffee-product1.png\'">' +
          '</div>' +
          '<div class="cart-item-info">' +
            '<div class="cart-item-name">' + item.name + '</div>' +
            '<div class="cart-item-meta">' + (item.origin || '') + '</div>' +
            '<div class="cart-item-variant">' + (item.variant || 'Standard') + '</div>' +
          '</div>' +
          '<div class="cart-item-price text-gold fw-600">$' + item.price.toFixed(2) + '</div>' +
          '<div class="cart-item-qty-wrap">' +
            '<button class="cart-qty-btn qty-minus" data-id="' + item.id + '" aria-label="Decrease">&minus;</button>' +
            '<span class="cart-qty-val">' + item.quantity + '</span>' +
            '<button class="cart-qty-btn qty-plus"  data-id="' + item.id + '" aria-label="Increase">+</button>' +
          '</div>' +
          '<div class="cart-item-total text-gold fw-700">$' + lineTotal + '</div>' +
          '<button class="cart-item-remove" data-id="' + item.id + '" aria-label="Remove">' +
            '<i class="bi bi-trash3"></i>' +
          '</button>' +
        '</div>';
      }).join('');

      updateSummary(items);
      updateCartBadges();
    }

    function updateSummary(items) {
      var sub  = items.reduce(function (s, i) { return s + i.price * i.quantity; }, 0);
      var ship = sub >= FREE_SHIP ? 0 : SHIP_COST;
      var tax  = sub * TAX_RATE;
      var tot  = sub + ship + tax;
      var get  = function (id) { return document.getElementById(id); };
      
      if (get('summarySubtotal')) get('summarySubtotal').textContent = '$' + sub.toFixed(2);
      if (get('summaryShipping')) get('summaryShipping').textContent = ship === 0 ? 'Free' : '$' + ship.toFixed(2);
      if (get('shippingNote'))    get('shippingNote').style.display  = sub < FREE_SHIP ? 'block' : 'none';
      if (get('summaryTax'))      get('summaryTax').textContent      = '$' + tax.toFixed(2);
      if (get('summaryTotal'))    get('summaryTotal').textContent    = '$' + tot.toFixed(2);
    }

    // Event delegation for cart item actions
    cartItemsList.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var id = btn.getAttribute('data-id');
      var items = getCart();

      if (btn.classList.contains('qty-plus')) {
        items = items.map(function (i) {
          if (i.id === id) i.quantity = Math.min(i.quantity + 1, 99);
          return i;
        });
        setCart(items); render();
      } else if (btn.classList.contains('qty-minus')) {
        items = items.map(function (i) {
          if (i.id === id) i.quantity = Math.max(i.quantity - 1, 1);
          return i;
        });
        setCart(items); render();
      } else if (btn.classList.contains('cart-item-remove')) {
        items = items.filter(function (i) { return i.id !== id; });
        setCart(items); render();
      }
    });

    // Clear cart
    var clrBtn = document.getElementById('clearCartBtn');
    if (clrBtn) {
      clrBtn.addEventListener('click', async function () {
        if (await showConfirm('Are you sure you want to clear your cart?')) {
          setCart([]); render();
        }
      });
    }

    // Checkout
    var checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', async function () {
        if(window.CofyAuth) {
            const user = window.CofyAuth.getUser();
            if(!user) {
                if(await showConfirm('Please log in to checkout.\n\nGo to Login page?')) {
                    window.location.href = 'login.html';
                }
                return;
            }
            showNotification('Thank you, ' + user.name + '!\nYour order is being processed.', 'success');
            setCart([]);
            setTimeout(() => window.location.href = 'index.html', 2000);
        } else {
            showNotification('Your order is being processed.', 'success');
        }
      });
    }

    render();
  }

  /* ============================================================
     CART RECOMMENDATIONS
  ============================================================ */
  function initCartRecommendations() {
    var grid = document.getElementById('cartRecsGrid');
    if (!grid || !window.cofyProducts) return;

    // Get IDs of items already in cart to exclude them
    var cartIds = getCart().map(function (i) { return i.id; });

    // Pick up to 4 products NOT in cart, sorted by rating descending
    var recs = window.cofyProducts
      .filter(function (p) { return p.id !== 'p64' && cartIds.indexOf(p.id) === -1; })
      .sort(function (a, b) { return b.rating - a.rating; })
      .slice(0, 4);

    if (recs.length === 0) {
      grid.innerHTML = '<p class="text-muted small py-3">No recommendations available.</p>';
      return;
    }

    grid.innerHTML = recs.map(function (p) {
      return [
        '<div class="col-md-6 col-lg-3">',
          '<div class="product-card" data-id="' + p.id + '">',
            '<button class="wishlist-btn" aria-label="Add to wishlist" data-id="' + p.id + '"><i class="bi bi-heart"></i></button>',
            '<div class="product-img-wrapper">',
              '<img src="' + p.image + '" alt="' + p.name + '" style="height:100%;width:100%;object-fit:contain;" onerror="this.src=\'assets/menu/coffee-product1.png\'">',
            '</div>',
            '<div class="product-info flex-grow-1 d-flex flex-column">',
              '<h3 class="product-title">' + p.name + '</h3>',
              '<div class="product-subtitle">' + p.origin + '</div>',
              '<div class="d-flex justify-content-between align-items-center mt-auto pt-3">',
                '<div class="product-price">$' + p.price.toFixed(2) + '</div>',
                '<div class="product-rating"><i class="bi bi-star-fill"></i> ' + p.rating + ' (' + p.reviews + ')</div>',
              '</div>',
              '<button class="add-to-cart-btn" aria-label="Add to cart" data-id="' + p.id + '"><img src="assets/svg icon.svg" class="cart-svg-icon" alt="Add to cart"></button>',
            '</div>',
          '</div>',
        '</div>'
      ].join('');
    }).join('');

    // Re-init buttons for dynamically rendered content (avoids duplicate listeners
    // since initAddToCartButtons / initWishlistButtons check shop-managed class)
    initAddToCartButtons();
    initWishlistButtons();
  }

  /* ============================================================
     MAIN INIT
  ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    updateCartBadges();
    initNavbar();
    initScrollAnimations();
    initCounters();
    initBackToTop();
    initFooterNewsletter();
    initSearchModal();
    initCategoryNav();

    var page = window.location.pathname.split('/').pop() || 'index.html';
    if (page === '') page = 'index.html';

    if (page === 'cart.html') {
      initCartPage();
      initCartRecommendations();
    }
    if (page === 'wishlist.html') {
      initWishlistPage();
    }

    initAddToCartButtons();
    initWishlistButtons();

    // Home page hero carousel controls
    var prevBtn = document.querySelector('.prev-btn.carousel-btn');
    var nextBtn = document.querySelector('.next-btn.carousel-btn');
    if (prevBtn || nextBtn) {
      var carousel = document.getElementById('heroCarousel');
      if (carousel) {
        var bsCarousel = bootstrap.Carousel.getOrCreateInstance(carousel);
        if (prevBtn) prevBtn.addEventListener('click', function () { bsCarousel.prev(); });
        if (nextBtn) nextBtn.addEventListener('click', function () { bsCarousel.next(); });
      }
    }
  });

  // Expose Global API
  window.CofyBrew = {
    addToCart: addToCart,
    getCart: getCart,
    setCart: setCart,
    getWishlist: getWishlist,
    setWishlist: setWishlist,
    toggleWishlistItem: toggleWishlistItem,
    isWishlisted: isWishlisted,
    updateCartBadges: updateCartBadges
  };

})();
