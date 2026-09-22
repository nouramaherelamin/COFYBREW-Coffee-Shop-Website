/**
 * COFYBREW — Centralized Authentication Logic
 */
(function () {
  'use strict';
  
  const USER_KEY = 'cofybrew_user';

  // Demo user data format:
  // { name: 'John Doe', email: 'john@example.com', token: 'demo-token-123' }

  function getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY)) || JSON.parse(sessionStorage.getItem(USER_KEY)) || null;
    } catch (e) {
      return null;
    }
  }

  function login(email, password, rememberMe) {
    // Demo validation
    if (!email || !password) return { success: false, message: 'Please enter email and password.' };
    if (password.length < 6) return { success: false, message: 'Password must be at least 6 characters.' };

    const name = email.split('@')[0];
    const user = { name: name.charAt(0).toUpperCase() + name.slice(1), email: email, token: 'demo-' + Date.now() };

    if (rememberMe) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    updateAuthUI();
    return { success: true, user: user };
  }

  function register(name, email, password) {
    if (!name || !email || !password) return { success: false, message: 'Please fill in all fields.' };
    if (password.length < 6) return { success: false, message: 'Password must be at least 6 characters.' };

    const user = { name: name, email: email, token: 'demo-' + Date.now() };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    
    updateAuthUI();
    return { success: true, user: user };
  }

  function logout() {
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(USER_KEY);
    updateAuthUI();
    window.location.reload();
  }

  function updateAuthUI() {
    const user = getUser();
    // Update Navbar Account Icon
    document.querySelectorAll('.navbar-icons a[aria-label="Account"]').forEach(a => {
      const icon = a.querySelector('i');
      if (user) {
        a.setAttribute('title', 'Hello, ' + user.name);
        if (icon) icon.className = 'bi bi-person-check-fill text-gold';
      } else {
        a.setAttribute('title', 'Login / Register');
        if (icon) icon.className = 'bi bi-person';
      }
    });

    // Update Login Page/Modal UI if it exists
    const loginWelcome = document.getElementById('loginWelcome');
    const loginFormContainer = document.getElementById('authMainCard');
    if (loginWelcome && loginFormContainer) {
      if (user) {
        loginWelcome.classList.remove('d-none');
        loginFormContainer.classList.add('d-none');
        const nameEl = document.getElementById('loginUserName');
        if (nameEl) nameEl.textContent = user.name;
      } else {
        loginWelcome.classList.add('d-none');
        loginFormContainer.classList.remove('d-none');
      }
    }
  }

  // Initialize Auth
  document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();

    // Login Form Submit
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail')?.value.trim();
        const pwd = document.getElementById('loginPassword')?.value;
        const remember = document.getElementById('rememberMe')?.checked;
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        
        if(submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Signing in...';
        }

        setTimeout(() => {
          const res = login(email, pwd, remember);
          if (res.success) {
            const successEl = document.getElementById('loginSuccess');
            if (successEl) {
              successEl.textContent = 'Welcome back, ' + res.user.name + '! Redirecting...';
              successEl.classList.remove('d-none');
            }
            setTimeout(() => window.location.href = 'index.html', 1200);
          } else {
             if(submitBtn) {
                 submitBtn.disabled = false;
                 submitBtn.innerHTML = 'Login';
             }
             showNotification(res.message, 'error'); // Basic error handling for demo
          }
        }, 800);
      });
    }

    // Register Form Submit
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName')?.value.trim();
        const email = document.getElementById('registerEmail')?.value.trim();
        const pwd = document.getElementById('registerPassword')?.value;
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        
        if(submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creating account...';
        }

        setTimeout(() => {
          const res = register(name, email, pwd);
          if (res.success) {
            const successEl = document.getElementById('registerSuccess');
            if (successEl) {
              successEl.textContent = 'Account created successfully! Redirecting...';
              successEl.classList.remove('d-none');
            }
            setTimeout(() => window.location.href = 'index.html', 1200);
          } else {
              if(submitBtn) {
                 submitBtn.disabled = false;
                 submitBtn.innerHTML = 'Create Account';
             }
             showNotification(res.message, 'error');
          }
        }, 800);
      });
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
      });
    }

    // Forgot Password Demo
    const forgotPwdLink = document.getElementById('forgotPasswordLink');
    if (forgotPwdLink) {
        forgotPwdLink.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = await showPrompt("Enter your email address to reset your password:");
            if (email) {
                showNotification("If an account exists for " + email + ", a password reset link has been sent.", "info");
            }
        });
    }
    
    // Social Login Demo
    const socialBtns = document.querySelectorAll('.btn-social');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification("Social authentication is not connected in this front-end demo.", "info");
        });
    });
  });

  // Export globally
  window.CofyAuth = {
    getUser,
    login,
    register,
    logout
  };

})();
