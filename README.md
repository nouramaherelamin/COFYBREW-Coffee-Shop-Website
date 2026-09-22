# ☕ COFYBREW — Coffee Shop Website

> "More Than Just Coffee" — A modern, fully responsive front-end e‑commerce website for a coffee brand, built with HTML5, CSS3, Bootstrap 5, and vanilla JavaScript.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-7952B3?style=flat&logo=bootstrap&logoColor=white)

---

## 📖 Overview

**COFYBREW** is a static, multi-page front-end website for a premium coffee brand. It includes a full shopping experience — product browsing, filtering, search, cart, wishlist, and demo authentication — along with content pages such as a blog-style "Journal," an "About" page, and a "Contact" page with an FAQ section.

The project is built entirely with front-end technologies (no backend/server required) and uses `localStorage` / `sessionStorage` to persist cart, wishlist, and login state across sessions for demo purposes.

---

## ✨ Features

- **Home page** — hero section, featured products, animated counters, and scroll-triggered animations
- **Shop page** — full product catalog with:
  - Category, price, and roast-level filters (desktop sidebar + mobile view)
  - Live search
  - Sorting and pagination
  - Add-to-cart and add-to-wishlist actions with toast/badge feedback
- **Cart page** — view, update, and manage items added to the cart
- **Wishlist page** — save favorite products and manage them independently of the cart
- **Journal page** — category-filterable blog/article grid with live search
- **About & Contact pages** — brand story and contact form with FAQ accordion
- **Login / Register page** — demo authentication flow (client-side only, no real backend)
- **Global UI features**:
  - Sticky/scroll-aware navbar
  - Global search modal
  - Newsletter signup form
  - "Back to top" button
  - Responsive design across all breakpoints (mobile, tablet, desktop)

---

## 🗂️ Project Structure

```
cofybrew/
├── index.html              # Home page
├── shop.html                # Shop / product catalog
├── cart.html                 # Shopping cart
├── wishlist.html              # Saved products
├── journal.html               # Blog / journal
├── about.html                  # About page
├── contact.html                 # Contact page + FAQ
├── login.html                    # Login / Register
│
├── css/
│   ├── style.css              # Global site styles
│   └── shop.css                # Shop-page-specific styles
│
├── js/
│   ├── script.js               # Global site logic (navbar, cart/wishlist state, animations, etc.)
│   ├── shop.js                  # Shop page logic (filtering, search, sort, pagination)
│   ├── products.js               # Centralized product catalog (single source of truth)
│   ├── auth.js                    # Centralized demo authentication logic
│   └── journal.js                  # Journal page filtering & search
│
└── assets/                          # Images, logos, and icons
```

> **Note:** HTML files reference `css/`, `js/`, and `assets/` folders — make sure the CSS and JS files are placed inside `css/` and `js/` subfolders respectively (and any Bootstrap files are either linked via CDN or placed accordingly) for the site to render correctly.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Page structure & semantics |
| **CSS3** | Custom styling & responsive layout |
| **Bootstrap 5.3.2** | Grid system, components, utilities |
| **Bootstrap Icons** | Iconography |
| **Vanilla JavaScript (ES5/ES6)** | All interactivity — no frameworks |
| **Google Fonts** (Inter, Playfair Display) | Typography |
| **localStorage / sessionStorage** | Client-side persistence for cart, wishlist, and auth |

---

## 🚀 Getting Started

Since this is a static front-end project, no build tools or dependencies are required.

1. **Clone the repository**
   ```bash
   git clone https://github.com/nouramaherelamin/<repo-name>.git
   cd <repo-name>
   ```

2. **Open it in a browser**
   Simply open `index.html` in your browser, or serve it locally for the best experience (recommended, since some browsers restrict features when opening files directly via `file://`):

   ```bash
   # Using Python
   python -m http.server 5500

   # Or using the VS Code "Live Server" extension
   ```

3. Navigate to `http://localhost:5500` (or the port shown) in your browser.

---

## 🧠 How Key Features Work

- **Product Catalog (`products.js`)** — All products live in a single `cofyProducts` array exposed on `window.cofyProducts`, used across the Home, Shop, and Wishlist pages as a single source of truth.
- **Cart & Wishlist (`script.js`)** — Managed via `localStorage`, so items persist between page reloads and browser sessions.
- **Authentication (`auth.js`)** — A demo-only auth system: it validates simple rules (e.g. password length), creates a mock user object, and stores it in `localStorage` (if "Remember Me" is checked) or `sessionStorage`. **This is not a real authentication system and should not be used with real user credentials.**
- **Filtering & Search** — Implemented independently on the Shop page (`shop.js`) and Journal page (`journal.js`) using DOM filtering rather than a backend query.

---

## 📌 Notes & Limitations

- This is a **front-end only** demo project — there is no real backend, database, or payment processing.
- Authentication, cart, and wishlist data are stored **locally in the browser** and are not shared across devices or persisted to a server.
- Intended primarily as a **portfolio / learning project** showcasing responsive design and vanilla JS interactivity patterns.

---

## 👩‍💻 Author

**Noura Maher Elamin**
Computer & Information Systems student, Egyptian Chinese University

- GitHub: [@nouramaherelamin](https://github.com/nouramaherelamin)
- LinkedIn: [nouramaherelamin](https://www.linkedin.com/in/nouramaherelamin/)

---

## 📄 License

This project is available for personal and educational use. Feel free to fork and build upon it — attribution is appreciated. If you'd like to apply a specific open-source license (MIT, etc.), add a `LICENSE` file to the repository.
