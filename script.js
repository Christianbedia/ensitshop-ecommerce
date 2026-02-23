/**
 * PROJET E-COMMERCE - JAVASCRIPT VANILLA
 * Gestion complète du cycle de vie des produits, du panier et du DOM.
 * 
 * DESCRIPTION GÉNÉRALE :
 * Ce fichier JavaScript gère l'intégralité du fonctionnement du site e-commerce :
 * - Affichage dynamique des produits
 * - Filtrage et tri des produits
 * - Gestion du panier (ajout, suppression, sauvegarde)
 * - Interface utilisateur (modale du panier, notifications)
 * - Formulaire de contact
 */

// ==========================================
// 1. BASE DE DONNÉES SIMULÉE (JSON Array)
// ==========================================
// Tableau contenant tous les produits disponibles dans la boutique
// Chaque produit a : id, name, category, price, image, description
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

// ==========================================
// 2. GESTION DE L'ÉTAT ET DU DOM
// ==========================================

// PANIER : Stockage des produits sélectionnés par l'utilisateur
// JSON.parse() récupère le panier depuis le localStorage du navigateur
// Le || [] signifie "si vide, utiliser un tableau vide par défaut"
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// CACHE DOM : Récupération de tous les éléments HTML dont on aura besoin
// Cela évite de chercher l'élément dans le DOM à chaque utilisation (meilleure performance)
const productsGrid = document.getElementById('productsGrid'); // Zone d'affichage des produits
const cartBtn = document.getElementById('cartBtn'); // Bouton du panier en haut
const cartModal = document.getElementById('cartModal'); // Fenêtre modale du panier
const closeCart = document.getElementById('closeCart'); // Bouton fermer la modale
const cartItems = document.getElementById('cartItems'); // Liste des articles du panier
const cartTotal = document.getElementById('cartTotal'); // Affichage du montant total
const cartCount = document.getElementById('cartCount'); // Compteur du nombre d'articles
const checkoutBtn = document.getElementById('checkoutBtn'); // Bouton valider la commande
const clearCartBtn = document.getElementById('clearCartBtn'); // Bouton vider le panier
const searchInput = document.getElementById('searchInput'); // Barre de recherche
const filterBtns = document.querySelectorAll('.filter-btn'); // Boutons de catégories
const sortSelect = document.getElementById('sortSelect'); // Menu déroulant tri

// ==========================================
// 3. INITIALISATION DU SITE
// ==========================================
// DOMContentLoaded : Événement qui se déclenche quand toute la page HTML est chargée
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products); // Affiche tous les produits au démarrage
    updateCartUI(); // Met à jour le compteur du panier

    // Affiche l'année actuelle dans le footer (mise à jour automatique chaque année)
    document.getElementById('year').textContent = new Date().getFullYear();
});

// ==========================================
// 4. FONCTIONS D'AFFICHAGE (RENDER)
// ==========================================

/**
 * FONCTION : displayProducts()
 * Affiche les produits dans la grille du site
 * - Vide la grille existante
 * - Crée une carte pour chaque produit
 * - Ajoute les boutons "Ajouter au panier"
 * @param productsToDisplay : tableau des produits à afficher
 */
function displayProducts(productsToDisplay) {
    productsGrid.innerHTML = ''; // Nettoyage avant affichage (vide la grille)

    // forEach : boucle sur chaque produit du tableau
    productsToDisplay.forEach(product => {
        // Création d'une nouvelle carte de produit
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Template Literals (backticks) : façon moderne d'insérer variables dans du texte
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price.toLocaleString('fr-FR')} FCFA</span>
                    <!-- Bouton pour ajouter le produit au panier (passe l'ID du produit) -->
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Ajouter
                    </button>
                </div>
            </div>
        `;
        // Ajoute la carte à la grille (appendChild = ajouter comme enfant)
        productsGrid.appendChild(productCard);
    });
}

/**
 * FONCTION : getCategoryName()
 * Traduit les codes de catégorie techniques en français lisible
 * Exemple : 'electronics' devient 'High-Tech'
 * @param category : code de la catégorie en anglais
 * @return : nom de la catégorie en français
 */
function getCategoryName(category) {
    const categories = {
        'electronics': 'High-Tech',
        'clothing': 'Vêtements',
        'books': 'Librairie',
        'home': 'Maison'
    };
    return categories[category] || category; // Retourne la traduction ou l'original si pas trouvé
}

// ==========================================
// 5. LOGIQUE DU PANIER (CART LOGIC)
// ==========================================

/**
 * FONCTION : addToCart()
 * Ajoute un produit au panier
 * - Si le produit existe déjà : augmente sa quantité de 1
 * - Si nouveau produit : l'ajoute avec quantité = 1
 * @param productId : ID du produit à ajouter
 */
function addToCart(productId) {
    // Cherche le produit dans la liste globale par son ID
    const product = products.find(p => p.id === productId);
    // Cherche si ce produit est déjà dans le panier
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // Le produit existe : augmente sa quantité
        existingItem.quantity++;
    } else {
        // Nouveau produit : l'ajoute au panier
        // Spread operator (...) : copie toutes les propriétés du produit
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(); // Sauvegarde dans le navigateur (localStorage)
    updateCartUI(); // Met à jour le compteur
    showNotification("Produit ajouté au panier !"); // Affiche un message de confirmation
}

/**
 * FONCTION : removeFromCart()
 * Supprime complètement un produit du panier
 * @param productId : ID du produit à supprimer
 */
function removeFromCart(productId) {
    // filter() crée un nouveau tableau SANS l'article supprimé
    // item.id !== productId : on garde les articles qui NE sont PAS celui-ci
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    displayCartItems(); // Rafraîchit l'affichage du panier
}

/**
 * FONCTION : updateQuantity()
 * Augmente ou diminue la quantité d'un produit
 * @param productId : ID du produit
 * @param change : +1 pour ajouter, -1 pour retirer
 */
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        // Si la quantité devient 0 ou négative, on supprime l'article
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
            displayCartItems();
        }
    }
}

// ==========================================
// 6. PERSISTANCE (LOCALSTORAGE)
// ==========================================

/**
 * FONCTION : saveCart()
 * Sauvegarde le panier dans le navigateur (localStorage)
 * Cette données persiste même après fermeture du navigateur
 */
function saveCart() {
    // JSON.stringify() convertit l'objet JavaScript en chaîne de texte pour le stocker
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * FONCTION : updateCartUI()
 * Met à jour le petit badge rouge affichant le nombre d'articles
 * Utilise reduce() pour calculer la somme des quantités
 */
function updateCartUI() {
    // reduce() : boucle et accumule une valeur
    // 'sum' = total actuel, 'item' = produit du moment
    // sum + item.quantity : ajoute la quantité au total
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems; // Affiche le nombre
}

/**
 * FONCTION : displayCartItems()
 * Affiche le contenu du panier dans la fenêtre modale
 * Génère le HTML avec les articles, prix, et boutons d'action
 */
function displayCartItems() {
    // Si panier vide : affiche un message
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Votre panier est vide</p>
            </div>`;
        cartTotal.textContent = '0 FCFA';
        return; // Arrête la fonction ici
    }

    // Réinitialise le contenu du panier
    cartItems.innerHTML = '';
    let total = 0; // Variable pour accumuler le montant total

    // Boucle sur chaque article du panier
    cart.forEach(item => {
        total += item.price * item.quantity; // Ajoute au total (prix × quantité)
        
        // Crée une div pour cet article
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        // Contenu HTML de l'article avec les boutons d'action
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString('fr-FR')} FCFA</div>
                <!-- Boutons pour changer la quantité (- et +) -->
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <!-- Bouton pour supprimer l'article -->
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });

    // Affiche le montant total du panier formaté
    cartTotal.textContent = total.toLocaleString('fr-FR') + ' FCFA';
}

// ==========================================
// 7. SYSTÈME DE FILTRES ET DE RECHERCHE
// ==========================================

/**
 * Ajoute des écouteurs d'événements à tous les boutons de catégorie
 * Quand on clique : met à jour la classe "active" et applique les filtres
 */
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Enlève la classe 'active' de tous les boutons
        filterBtns.forEach(b => b.classList.remove('active'));
        // L'ajoute au bouton cliqué
        btn.classList.add('active');

        // Applique tous les filtres (catégorie + recherche + tri)
        applyFilters();
    });
});

// Écouteur sur la barre de recherche
// 'input' : déclenche la fonction à chaque caractère saisi (recherche en temps réel)
searchInput.addEventListener('input', applyFilters);

// Écouteur sur le menu déroulant de tri
// 'change' : déclenche quand on change l'option sélectionnée
sortSelect.addEventListener('change', applyFilters);

/**
 * FONCTION : applyFilters()
 * Fonction centrale qui combine tous les filtres à la fois :
 * 1. Filtre par catégorie
 * 2. Filtre par mot-clé de recherche
 * 3. Applique le tri (prix, nom, etc.)
 */
function applyFilters() {
    // Récupère la catégorie sélectionnée (ex: 'electronics', 'all', etc.)
    const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
    // Récupère le texte saisi dans la barre de recherche
    const searchTerm = searchInput.value.toLowerCase();
    // Récupère l'option de tri sélectionnée
    const sortValue = sortSelect.value;

    // ÉTAPE 1 : Filtre par catégorie
    // Si 'all' : garde tous les produits, sinon filtre par catégorie
    let filtered = activeCategory === 'all' ? 
        products : 
        products.filter(p => p.category === activeCategory);

    // ÉTAPE 2 : Filtre par recherche (mot-clé)
    // Cherche le terme dans le nom OU la description
    if (searchTerm) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }

    // ÉTAPE 3 : Applique le tri au résultat
    filtered = sortProducts(filtered, sortValue);

    // Affiche les produits filtrés et triés
    displayProducts(filtered);
}

/**
 * FONCTION : sortProducts()
 * Trie un tableau de produits selon différents critères
 * @param productsArray : tableau des produits à trier
 * @param sortType : type de tri ('price-asc', 'price-desc', 'name', etc.)
 * @return : tableau trié
 */
function sortProducts(productsArray, sortType) {
    // Crée une copie du tableau (spread operator [...])
    // Cela évite de modifier le tableau original
    const sorted = [...productsArray];

    // Switch : effectue une action différente selon sortType
    switch (sortType) {
        case 'price-asc':
            // Tri par prix croissant (du moins cher au plus cher)
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            // Tri par prix décroissant (du plus cher au moins cher)
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            // Tri alphabétique (A-Z)
            // localeCompare() gère correctement les accents français
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
            // Si aucune option : retourne le tableau dans l'ordre par défaut
            return sorted;
    }
}

// ==========================================
// 8. INTERFACE UTILISATEUR (MODALE & TOAST)
// ==========================================

/**
 * Écouteur : Clic sur le bouton du panier
 * Ouvre la fenêtre modale et affiche le contenu du panier
 */
cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active'); // Affiche la modale (ajout classe CSS)
    displayCartItems(); // Rafraîchit l'affichage du panier
});

/**
 * Écouteur : Clic sur le bouton "X" de fermeture
 * Ferme la modale du panier
 */
closeCart.addEventListener('click', () => {
    cartModal.classList.remove('active'); // Masque la modale
});

/**
 * Écouteur : Clic en dehors de la modale
 * Si on clique sur le fond noir (pas sur la modale) : ferme
 * e.target === cartModal vérifie qu'on a bien cliqué sur le fond
 */
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
    }
});

/**
 * Écouteur : Clic sur "Passer la commande"
 * Valide la commande et vide le panier
 */
checkoutBtn.addEventListener('click', () => {
    // Vérification : panier vide ?
    if (cart.length === 0) {
        showNotification("Votre panier est vide !");
        return; // Arrête la fonction
    }

    // Affiche un message de succès
    showNotification("Commande validée avec succès !");

    // Vide complètement le panier après achat
    cart = [];
    saveCart();
    updateCartUI();
    displayCartItems();

    // Ferme la modale automatiquement après 2 secondes
    setTimeout(() => {
        cartModal.classList.remove('active');
    }, 2000);
});

/**
 * Écouteur : Clic sur "Vider le panier"
 * Demande confirmation et vide le panier si accepté
 */
clearCartBtn.addEventListener('click', () => {
    // confirm() : boîte de dialogue "OK / Annuler"
    if (confirm('Voulez-vous vraiment vider le panier?')) {
        cart = [];
        saveCart();
        updateCartUI();
        displayCartItems();
    }
});

/**
 * FONCTION : showNotification()
 * Affiche un message temporaire de notification (appelé "Toast")
 * - Apparaît en haut à droite
 * - Disparaît automatiquement après 3 secondes
 * - Remplace le vieux alert() moins élégant
 * 
 * @param message : le texte à afficher
 */
function showNotification(message) {
    const container = document.getElementById('toast-container');

    // ÉTAPE 1 : Crée un nouvel élément div
    const toast = document.createElement('div');
    toast.className = 'toast';
    // Ajoute une icône de checkmark et le message
    toast.innerHTML = `<i class="fas fa-check-circle" style="color: #4ade80"></i> ${message}`;

    // ÉTAPE 2 : Ajoute l'élément au DOM
    // appendChild() le rend visible (et déclenche l'animation CSS d'arrivée)
    container.appendChild(toast);

    // ÉTAPE 3 : Suppression automatique après 3 secondes
    setTimeout(() => {
        // Ajoute la classe 'hide' pour déclencher l'animation de départ
        toast.classList.add('hide');
        // Attend la fin de l'animation pour vraiment supprimer l'élément
        toast.addEventListener('animationend', () => {
            toast.remove(); // Supprime définitivement du HTML
        });
    }, 3000); // 3000 millisecondes = 3 secondes
}

// ==========================================
// 9. FORMULAIRE DE CONTACT
// ==========================================

/**
 * FORMULAIRE DE CONTACT
 * Récupère la référence au formulaire HTML
 */
const contactForm = document.getElementById('contactForm');

// Vérifie que le formulaire existe dans la page
if (contactForm) {
    /**
     * Écouteur : Soumission du formulaire
     * Se déclenche quand l'utilisateur clique sur "Envoyer le message"
     * e.preventDefault() empêche le rechargement de la page
     */
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Annule le comportement par défaut du formulaire

        // Récupère les valeurs saisies par l'utilisateur
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        // VALIDATION : Vérifie que tous les champs sont remplis
        // !name = vrai si le champ est vide ou absent
        if (!name || !email || !message) {
            showNotification('Veuillez remplir tous les champs !');
            return; // Arrête la fonction
        }

        // SI on arrive ici : tous les champs sont valides
        // Affiche un message de succès (simulation d'envoi)
        // \u0060${name}\u0060 : utilise le nom saisi dans le message
        showNotification(`Merci ${name}, votre message a été envoyé !`);

        // Réinitialise le formulaire (vide tous les champs)
        contactForm.reset();
        // EN PRODUCTION : faire un appel API avec fetch() pour vraiment envoyer l'email
    });
}