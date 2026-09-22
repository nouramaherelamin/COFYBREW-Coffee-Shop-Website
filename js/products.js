/**
 * COFYBREW — Centralized Product Catalog
 * This file serves as the single source of truth for all products across the website.
 */
const cofyProducts = [
    // --- EXISTING PRODUCTS (Preserved properties) ---
    { id: 'p1', name: 'Dominican Republic Single Origin', origin: 'Dominican Republic', price: 12.00, rating: 4.8, reviews: 320, category: 'Coffee Beans', roast: 'Medium', image: 'assets/menu/coffee-product.webp', featured: true, recent: false },
    { id: 'p2', name: 'Cadillac Mtn. Blend', origin: 'Brazil & Guatemala', price: 14.00, rating: 4.7, reviews: 215, category: 'Coffee Beans', roast: 'Dark', image: 'assets/menu/coffee-product1.png', featured: true, recent: false },
    { id: 'p3', name: 'Pinup Coffee Collection', origin: 'Various Origins', price: 16.00, rating: 4.9, reviews: 410, category: 'Coffee Beans', roast: 'Medium', image: 'assets/menu/coffee-product2.png', featured: true, recent: false },
    { id: 'p4', name: 'Organic Coffee Beans', origin: 'Premium Arabica', price: 11.00, rating: 4.6, reviews: 190, category: 'Coffee Beans', roast: 'Light', image: 'assets/menu/coffee-product3.png', featured: true, recent: false },
    { id: 'p5', name: 'Ethiopian Yirgacheffe', origin: 'Ethiopia', price: 13.00, rating: 4.7, reviews: 180, category: 'Coffee Beans', roast: 'Light', image: 'assets/menu/coffee-product4.png', featured: false, recent: false },
    { id: 'p6', name: 'Colombian Supremo', origin: 'Colombia', price: 12.00, rating: 4.5, reviews: 120, category: 'Coffee Beans', roast: 'Medium', image: 'assets/menu/coffee-product5.png', featured: false, recent: false },
    { id: 'p7', name: 'Kenyan AA', origin: 'Kenya', price: 15.00, rating: 4.8, reviews: 205, category: 'Coffee Beans', roast: 'Medium', image: 'assets/menu/coffee-product6.png', featured: false, recent: false },
    { id: 'p8', name: 'House Blend', origin: 'Brazil & Colombia', price: 11.00, rating: 4.4, reviews: 98, category: 'Coffee Beans', roast: 'Dark', image: 'assets/menu/coffee-product7.png', featured: false, recent: false },
    { id: 'p9', name: 'Decaf Colombian', origin: 'Colombia', price: 13.50, rating: 4.3, reviews: 85, category: 'Ground Coffee', roast: 'Medium', image: 'assets/menu/coffee-product8.png', featured: false, recent: false },
    { id: 'p10', name: 'French Roast', origin: 'Guatemala', price: 14.00, rating: 4.6, reviews: 150, category: 'Ground Coffee', roast: 'Dark', image: 'assets/menu/coffee-product9.png', featured: false, recent: false },
    { id: 'p11', name: 'Breakfast Blend', origin: 'Brazil', price: 10.50, rating: 4.2, reviews: 110, category: 'Ground Coffee', roast: 'Light', image: 'assets/menu/coffee-product10.png', featured: false, recent: false },
    { id: 'p12', name: 'Espresso Blend', origin: 'Brazil & Ethiopia', price: 16.00, rating: 4.9, reviews: 290, category: 'Ground Coffee', roast: 'Dark', image: 'assets/menu/coffee-product11.webp', featured: false, recent: false },
    { id: 'p13', name: 'Pour Over Kit', origin: 'Equipment', price: 35.00, rating: 4.8, reviews: 60, category: 'Accessories', roast: null, image: 'assets/menu/coffee-product12.webp', featured: false, recent: false },
    { id: 'p14', name: 'Gooseneck Kettle', origin: 'Equipment', price: 45.00, rating: 4.7, reviews: 88, category: 'Accessories', roast: null, image: 'assets/menu/coffee-product13.webp', featured: false, recent: false },
    { id: 'p15', name: 'Burr Grinder', origin: 'Equipment', price: 85.00, rating: 4.9, reviews: 140, category: 'Machines', roast: null, image: 'assets/menu/coffee-product14.webp', featured: false, recent: false },
    { id: 'p16', name: 'Compact Espresso Machine', origin: 'Equipment', price: 299.00, rating: 4.5, reviews: 30, category: 'Machines', roast: null, image: 'assets/menu/machine.webp', featured: false, recent: false },
    { id: 'p17', name: 'Chocolate Biscotti', origin: 'Treats', price: 8.00, rating: 4.4, reviews: 45, category: 'Snacks', roast: null, image: 'assets/menu/dessert1.png', featured: false, recent: false },
    { id: 'p18', name: 'Caramel Waffle', origin: 'Treats', price: 5.50, rating: 4.6, reviews: 75, category: 'Snacks', roast: null, image: 'assets/menu/dessert2.png', featured: false, recent: false },
    { id: 'p19', name: 'Arabica Blend', origin: 'Blend', price: 14.00, rating: 4.5, reviews: 120, category: 'Coffee Beans', roast: 'Medium', image: 'assets/menu/coffee-product15.png', featured: false, recent: true },
    { id: 'p20', name: 'Dark Roast Reserve', origin: 'Brazil', price: 11.00, rating: 4.7, reviews: 160, category: 'Coffee Beans', roast: 'Dark', image: 'assets/menu/coffee-product16.png', featured: false, recent: true },
    { id: 'p21', name: 'Cold Brew Pack', origin: 'Blend', price: 12.50, rating: 4.8, reviews: 200, category: 'Ground Coffee', roast: 'Medium', image: 'assets/menu/coffee-product17.png', featured: false, recent: true },
    { id: 'p22', name: 'Signature Espresso', origin: 'Italy Style', price: 15.00, rating: 4.6, reviews: 145, category: 'Ground Coffee', roast: 'Dark', image: 'assets/menu/coffee-product18.avif', featured: false, recent: true },
    { id: 'p23', name: 'Morning Blend', origin: 'Colombia & Brazil', price: 13.00, rating: 4.4, reviews: 90, category: 'Coffee Beans', roast: 'Medium', image: 'assets/menu/coffee-product19.avif', featured: false, recent: true },
    { id: 'p24', name: 'Organic Light Roast', origin: 'Peru', price: 11.00, rating: 4.5, reviews: 85, category: 'Coffee Beans', roast: 'Light', image: 'assets/menu/coffee-product20.avif', featured: false, recent: true },
    
    // --- NEW PRODUCTS (Generated from unused assets) ---
    { id: 'p25', name: 'Classic Medium Roast', origin: 'Honduras', price: 12.50, rating: 4.6, reviews: 95, category: 'Coffee Beans', roast: 'Medium', image: 'assets/menu/coffee-product21.avif', featured: false, recent: false },
    { id: 'p26', name: 'Decaf House Blend', origin: 'Blend', price: 13.00, rating: 4.5, reviews: 110, category: 'Coffee Beans', roast: 'Dark', image: 'assets/menu/coffee-product22.avif', featured: false, recent: false },
    
    // Coffee Bags (coffee.png -> coffee13.png)
    { id: 'p27', name: 'Premium Coffee Pack', origin: 'Costa Rica', price: 15.50, rating: 4.8, reviews: 130, category: 'Coffee Beans', roast: 'Medium', image: 'assets/menu/coffee.png', featured: false, recent: false },
    { id: 'p28', name: 'Sumatra Mandheling', origin: 'Indonesia', price: 16.00, rating: 4.7, reviews: 85, category: 'Coffee Beans', roast: 'Dark', image: 'assets/menu/coffee1.png', featured: false, recent: false },
    { id: 'p29', name: 'Nicaragua Strictly High Grown', origin: 'Nicaragua', price: 14.50, rating: 4.6, reviews: 120, category: 'Coffee Beans', roast: 'Light', image: 'assets/menu/coffee2.png', featured: false, recent: false },
    { id: 'p30', name: 'Vietnam Robusta', origin: 'Vietnam', price: 10.50, rating: 4.3, reviews: 310, category: 'Coffee Beans', roast: 'Dark', image: 'assets/menu/coffee3.png', featured: false, recent: false },
    { id: 'p31', name: 'Tanzania Peaberry', origin: 'Tanzania', price: 17.00, rating: 4.9, reviews: 220, category: 'Coffee Beans', roast: 'Medium', image: 'assets/menu/coffee4.png', featured: false, recent: false },
    { id: 'p32', name: 'Mexican Altura', origin: 'Mexico', price: 13.00, rating: 4.5, reviews: 105, category: 'Coffee Beans', roast: 'Light', image: 'assets/menu/coffee5.png', featured: false, recent: false },
    { id: 'p33', name: 'Rwanda Bourbon', origin: 'Rwanda', price: 15.00, rating: 4.7, reviews: 175, category: 'Coffee Beans', roast: 'Medium', image: 'assets/menu/coffee6.png', featured: false, recent: false },
    { id: 'p34', name: 'Uganda Bugisu', origin: 'Uganda', price: 12.00, rating: 4.4, reviews: 90, category: 'Coffee Beans', roast: 'Dark', image: 'assets/menu/coffee7.png', featured: false, recent: false },
    { id: 'p35', name: 'Burundi Kayanza', origin: 'Burundi', price: 16.50, rating: 4.8, reviews: 140, category: 'Coffee Beans', roast: 'Light', image: 'assets/menu/coffee8.png', featured: false, recent: false },
    { id: 'p36', name: 'El Salvador Pacamara', origin: 'El Salvador', price: 18.00, rating: 4.9, reviews: 260, category: 'Coffee Beans', roast: 'Medium', image: 'assets/menu/coffee9.png', featured: false, recent: false },
    { id: 'p37', name: 'Panama Geisha', origin: 'Panama', price: 35.00, rating: 5.0, reviews: 300, category: 'Coffee Beans', roast: 'Light', image: 'assets/menu/coffee10.png', featured: false, recent: false },
    { id: 'p38', name: 'Jamaica Blue Mountain', origin: 'Jamaica', price: 40.00, rating: 4.9, reviews: 450, category: 'Coffee Beans', roast: 'Medium', image: 'assets/menu/coffee11.png', featured: false, recent: false },
    { id: 'p39', name: 'Hawaii Kona', origin: 'Hawaii', price: 38.00, rating: 4.8, reviews: 210, category: 'Coffee Beans', roast: 'Medium', image: 'assets/menu/coffee12.png', featured: false, recent: false },
    { id: 'p40', name: 'Yemen Mocha Mattari', origin: 'Yemen', price: 30.00, rating: 4.7, reviews: 155, category: 'Coffee Beans', roast: 'Dark', image: 'assets/menu/coffee13.png', featured: false, recent: false },
    
    // Drinks (drink1.png -> drink10.png)
    { id: 'p41', name: 'Vanilla Latte', origin: 'Cafe', price: 5.50, rating: 4.7, reviews: 340, category: 'Drinks', roast: null, image: 'assets/menu/drink1.png', featured: false, recent: false },
    { id: 'p42', name: 'Chocolate Mocha', origin: 'Cafe', price: 6.00, rating: 4.8, reviews: 420, category: 'Drinks', roast: null, image: 'assets/menu/drink2.webp', featured: false, recent: false },
    { id: 'p43', name: 'Caramel Cream Coffee', origin: 'Cafe', price: 6.50, rating: 4.9, reviews: 310, category: 'Drinks', roast: null, image: 'assets/menu/drink3.png', featured: false, recent: false },
    { id: 'p44', name: 'Matcha Latte', origin: 'Cafe', price: 5.75, rating: 4.6, reviews: 250, category: 'Drinks', roast: null, image: 'assets/menu/drink4.png', featured: false, recent: false },
    { id: 'p45', name: 'Strawberry Refresher', origin: 'Cafe', price: 5.00, rating: 4.5, reviews: 180, category: 'Drinks', roast: null, image: 'assets/menu/drink5.png', featured: false, recent: false },
    { id: 'p46', name: 'Chocolate Frappe', origin: 'Cafe', price: 6.50, rating: 4.8, reviews: 520, category: 'Drinks', roast: null, image: 'assets/menu/drink6.png', featured: false, recent: false },
    { id: 'p47', name: 'Mango Smoothie', origin: 'Cafe', price: 5.50, rating: 4.7, reviews: 290, category: 'Drinks', roast: null, image: 'assets/menu/drink7.png', featured: false, recent: false },
    { id: 'p48', name: 'Marshmallow Cocoa', origin: 'Cafe', price: 5.25, rating: 4.6, reviews: 195, category: 'Drinks', roast: null, image: 'assets/menu/drink8.png', featured: false, recent: false },
    { id: 'p49', name: 'Orange Iced Tea', origin: 'Cafe', price: 4.50, rating: 4.4, reviews: 130, category: 'Drinks', roast: null, image: 'assets/menu/drink9.png', featured: false, recent: false },
    { id: 'p50', name: 'Peach Iced Tea', origin: 'Cafe', price: 4.50, rating: 4.5, reviews: 150, category: 'Drinks', roast: null, image: 'assets/menu/drink10.png', featured: false, recent: false },
    
    // Desserts (dessert1.png -> dessert9.png)
    { id: 'p51', name: 'Chocolate Pastry', origin: 'Bakery', price: 4.50, rating: 4.8, reviews: 110, category: 'Snacks', roast: null, image: 'assets/menu/dessert3.png', featured: false, recent: false },
    { id: 'p52', name: 'Chocolate Cake', origin: 'Bakery', price: 6.50, rating: 4.9, reviews: 340, category: 'Snacks', roast: null, image: 'assets/menu/dessert4.png', featured: false, recent: false },
    { id: 'p53', name: 'Berry Muffin', origin: 'Bakery', price: 3.50, rating: 4.6, reviews: 180, category: 'Snacks', roast: null, image: 'assets/menu/dessert5.png', featured: false, recent: false },
    { id: 'p54', name: 'Cream Cookie Sandwich', origin: 'Bakery', price: 4.00, rating: 4.7, reviews: 220, category: 'Snacks', roast: null, image: 'assets/menu/dessert6.png', featured: false, recent: false },
    { id: 'p55', name: 'Chocolate Waffle', origin: 'Bakery', price: 5.50, rating: 4.8, reviews: 290, category: 'Snacks', roast: null, image: 'assets/menu/dessert7.png', featured: false, recent: false },
    { id: 'p56', name: 'Chocolate Dessert', origin: 'Bakery', price: 6.00, rating: 4.7, reviews: 250, category: 'Snacks', roast: null, image: 'assets/menu/dessert9.png', featured: false, recent: false },
    
    // Machines (machine1.webp -> machine7.avif)
    { id: 'p57', name: 'Professional Espresso Machine', origin: 'Equipment', price: 899.00, rating: 4.9, reviews: 45, category: 'Machines', roast: null, image: 'assets/menu/machine1.webp', featured: false, recent: false },
    { id: 'p58', name: 'Automatic Coffee Maker', origin: 'Equipment', price: 149.00, rating: 4.6, reviews: 180, category: 'Machines', roast: null, image: 'assets/menu/machine2.avif', featured: false, recent: false },
    { id: 'p59', name: 'Premium Coffee Machine', origin: 'Equipment', price: 599.00, rating: 4.8, reviews: 95, category: 'Machines', roast: null, image: 'assets/menu/machine3.avif', featured: false, recent: false },
    { id: 'p60', name: 'Commercial Coffee Grinder', origin: 'Equipment', price: 349.00, rating: 4.7, reviews: 120, category: 'Machines', roast: null, image: 'assets/menu/machine4.avif', featured: false, recent: false },
    { id: 'p61', name: 'Home Espresso Station', origin: 'Equipment', price: 499.00, rating: 4.8, reviews: 75, category: 'Machines', roast: null, image: 'assets/menu/machine5.avif', featured: false, recent: false },
    { id: 'p62', name: 'Barista Pro Machine', origin: 'Equipment', price: 1299.00, rating: 5.0, reviews: 25, category: 'Machines', roast: null, image: 'assets/menu/machine6.avif', featured: false, recent: false },
    { id: 'p63', name: 'Drip Coffee Brewer', origin: 'Equipment', price: 89.00, rating: 4.5, reviews: 310, category: 'Machines', roast: null, image: 'assets/menu/machine7.avif', featured: false, recent: false },
    
    // Ensure missing assets are added correctly
    { id: 'p64', name: 'Specialty Coffee Pack', origin: 'Various', price: 16.50, rating: 4.8, reviews: 90, category: 'Coffee Beans', roast: 'Light', image: 'assets/menu/Photo shop2.png', featured: false, recent: false },
    { id: 'p65', name: 'Ethiopia Yirgacheffe Celinga', origin: 'Ethiopia', price: 14.50, rating: 4.9, reviews: 240, category: 'Coffee Beans', roast: 'Light', image: 'assets/menu/photo shop1.png', featured: true, recent: false } // Featured on home page usually
];

// Provide it globally
window.cofyProducts = cofyProducts;
