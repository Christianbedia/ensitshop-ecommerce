// Données des produits
const products = [
    {
        id: 1,
        name: "Smartphone Premium",
        category: "electronics",
        price: 350000,
        image: "images/smartphone.jpg",
        description: "Smartphone dernière génération avec écran OLED"
    },
    {
        id: 2,
        name: "Laptop Pro",
        category: "electronics",
        price: 750000,
        image: "images/laptop.jpg",
        description: "Ordinateur portable haute performance"
    },
    {
        id: 3,
        name: "Casque Audio",
        category: "electronics",
        price: 20000,
        image: "images/casque.jpg",
        description: "Casque sans fil avec réduction de bruit"
    },
    {
        id: 4,
        name: "T-Shirt Premium",
        category: "clothing",
        price: 12000,
        image: "images/tshirt.jpg",
        description: "T-shirt en coton bio de qualité supérieure"
    },
    {
        id: 5,
        name: "Jean Slim",
        category: "clothing",
        price: 4500,
        image: "images/jean.jpg",
        description: "Jean confortable et élégant"
    },
    {
        id: 6,
        name: "Veste en Cuir",
        category: "clothing",
        price: 15000,
        image: "images/veste.jpg",
        description: "Veste en cuir véritable"
    },
    {
        id: 7,
        name: "Roman Bestseller",
        category: "books",
        price: 12000,
        image: "images/livre.jpg",
        description: "Le roman le plus vendu de l'année"
    },
    {
        id: 8,
        name: "Guide de Cuisine",
        category: "books",
        price: 9000,
        image: "images/cuisine.jpg",
        description: "Apprenez à cuisiner comme un chef"
    },
    {
        id: 9,
        name: "Lampe Design",
        category: "home",
        price: 15000,
        image: "images/lampe.jpg",
        description: "Lampe moderne pour votre intérieur"
    },
    {
        id: 10,
        name: "Coussin Décoratif",
        category: "home",
        price: 5000,
        image: "images/coussin.jpg",
        description: "Coussin confortable et élégant"
    },
    {
        id: 11,
        name: "Montre Connectée",
        category: "electronics",
        price: 18000,
        image: "images/montre.jpg",
        description: "Montre intelligente avec suivi santé"
    },
    {
        id: 12,
        name: "Tapis Moderne",
        category: "home",
        price: 90000,
        image: "images/tapis.jpg",
        description: "Tapis doux et design pour salon"
    }
];

// État du panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Éléments DOM
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);
    updateCartUI();
});

// Afficher les produits
function displayProducts(productsToDisplay) {
    productsGrid.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price.toLocaleString('fr-FR')} FCFA</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Ajouter
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Obtenir le nom de la catégorie en français
function getCategoryName(category) {
    const categories = {
        'electronics': 'Électronique',
        'clothing': 'Vêtements',
        'books': 'Livres',
        'home': 'Maison'
    };
    return categories[category] || category;
}

// Ajouter au panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
}

// Retirer du panier
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    displayCartItems();
}

// Mettre à jour la quantité
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
            displayCartItems();
        }
    }
}

// Sauvegarder le panier dans LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Mettre à jour l'interface du panier
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Afficher les articles du panier
function displayCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Votre panier est vide</p>
            </div>
        `;
        cartTotal.textContent = '0.00';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString('fr-FR')} FCFA</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toLocaleString('fr-FR') + ' FCFA';
}

// Filtrer les produits
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;
        let filtered = category === 'all' ? products : products.filter(p => p.category === category);

        const sortValue = sortSelect.value;
        filtered = sortProducts(filtered, sortValue);

        displayProducts(filtered);
    });
});

// Trier les produits
sortSelect.addEventListener('change', () => {
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
    let filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
    filtered = sortProducts(filtered, sortSelect.value);
    displayProducts(filtered);
});

function sortProducts(productsArray, sortType) {
    const sorted = [...productsArray];

    switch(sortType) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return sorted;
    }
}

// Rechercher des produits
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;

    let filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

    if (searchTerm) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }

    displayProducts(filtered);
});

// Modal du panier
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
    displayCartItems();
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active');
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

// Passer la commande
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Votre panier est vide');
        return;
    }

    alert('Merci pour votre commande! Total: ' + cartTotal.textContent);
    cart = [];
    saveCart();
    updateCartUI();
    displayCartItems();
});

// Vider le panier
clearCartBtn.addEventListener('click', () => {
    if (confirm('Voulez-vous vraiment vider le panier?')) {
        cart = [];
        saveCart();
        updateCartUI();
        displayCartItems();
    }
});

