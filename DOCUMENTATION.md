# 📱 ENSITSHOP - Documentation du Projet E-Commerce

## 📋 Vue d'ensemble
**ENSITSHOP** est un site de commerce électronique complètement fonctionnel développé en HTML, CSS et JavaScript vanilla (sans frameworks).

### Fonctionnalités principales :
- ✅ Affichage dynamique des produits
- ✅ Filtrage par catégorie
- ✅ Recherche en temps réel
- ✅ Tri par prix et nom
- ✅ Panier persistant (sauvegarde locale)
- ✅ Formulaire de contact
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Animations fluides
- ✅ Notifications utilisateur (Toast)

---

## 📁 Structure du projet

```
ensitshop-ecommerce/
├── index.html           # Page HTML principale
├── styles.css           # Feuille de style CSS
├── script.js            # Code JavaScript
├── images/              # Dossier des images produits
├── README.md            # Instructions du projet
└── DOCUMENTATION.md     # Cette documentation détaillée
```

---

## 🏗️ Architecture du Code

### **HTML (index.html)**
Structure complète avec sections :
1. **Header** : Logo, navigation, recherche, panier
2. **Hero** : Section accueil avec CTA
3. **Filtres** : Boutons catégories + menu tri
4. **Grille de produits** : Générée dynamiquement par JS
5. **Promo** : Vidéos YouTube + Slider produits
6. **À propos** : Informations + valeurs
7. **Contact** : Formulaire + infos de contact
8. **Footer** : Informations générale
9. **Modale Panier** : Fenêtre d'affichage du panier

### **CSS (styles.css)**
- **Variables globales** : Couleurs, ombres, etc.
- **Responsive Design** : Media queries pour tous les appareils
- **Animations** : Transitions et animations CSS
- **Grid & Flexbox** : Mise en page moderne

### **JavaScript (script.js)**
Divisé en 9 sections logiques :

| Section | Description |
|---------|-------------|
| **1. Base de données** | Tableau de produits simulé |
| **2. Gestion d'état** | Variables et cache DOM |
| **3. Initialisation** | Lancement du site |
| **4. Affichage** | Fonctions de rendu (render) |
| **5. Panier** | Ajout, suppression, quantité |
| **6. Persistance** | localStorage (sauvegarde) |
| **7. Filtres & Recherche** | Filtrage + tri combinés |
| **8. UI** | Modale, toasts, événements |
| **9. Formulaire** | Gestion du contact |

---

## 🔄 Flux de données

```
Utilisateur clique
        ↓
JavaScript déclenche un événement
        ↓
Fonction met à jour les données
        ↓
localStorage sauvegarde
        ↓
DOM se met à jour (HTML)
        ↓
CSS affiche le résultat
        ↓
Utilisateur voit le changement
```

---

## 📚 Fonctionnalités détaillées

### 1️⃣ **Affichage des produits**
```javascript
displayProducts(products)
// Crée une carte pour chaque produit
// Injecte le HTML dynamiquement
// Inclut image, nom, prix, bouton
```

### 2️⃣ **Gestion du panier**
```javascript
addToCart(productId)        // Ajoute au panier
removeFromCart(productId)   // Supprime du panier
updateQuantity(id, change)  // Change la quantité
displayCartItems()          // Affiche la modale
saveCart()                  // Sauvegarde dans le navigateur
```

### 3️⃣ **Filtrage combiné**
```javascript
applyFilters()
// Combine 3 filtres :
// 1. Catégorie (boutons)
// 2. Recherche (texte)
// 3. Tri (dropdown)
```

### 4️⃣ **Notifications**
```javascript
showNotification("Message")
// Toast qui apparaît 3 secondes
// Puis disparaît automatiquement
```

### 5️⃣ **Formulaire de contact**
```javascript
// Validation simple
// Affiche message de succès
// Réinitialise le formulaire
// (en production : faire un appel API)
```

---

## 🎨 Palette de couleurs

| Nom | Code | Utilisation |
|-----|------|-------------|
| Primary | `#0f172a` | Texte principal, header |
| Secondary | `#334155` | Texte secondaire, sous-titres |
| Accent | `#2563eb` | Boutons, liens importants |
| Light BG | `#f8fafc` | Fond des pages |
| White | `#ffffff` | Cartes produits |
| Border | `#e2e8f0` | Séparations discrètes |
| Success | `#10b981` | Messages positifs |
| Danger | `#ef4444` | Erreurs |

---

## 📱 Responsive Design

Le site s'adapte à tous les appareils :

| Appareil | Largeur |
|----------|---------|
| Mobile | < 768px |
| Tablette | 768px - 1024px |
| Desktop | > 1024px |

Tous les grilles CSS utilisent `grid-template-columns: repeat(auto-fit, minmax(...))` pour adaptabilité automatique.

---

## 💾 LocalStorage

Le panier se sauvegarde automatiquement :

```javascript
// Sauvegarde
localStorage.setItem('cart', JSON.stringify(cart))

// Récupération au démarrage
cart = JSON.parse(localStorage.getItem('cart')) || []
```

**Avantage** : Les produits du panier persistent même après fermeture du navigateur.

---

## 🔍 Comment utiliser le site

### Client / Utilisateur
1. **Parcourir** : Voir tous les produits
2. **Filtrer** : Sélectionner une catégorie
3. **Rechercher** : Taper un mot-clé
4. **Trier** : Par prix ou nom
5. **Ajouter** : Clic sur "Ajouter au panier"
6. **Vérifier** : Ouvrir le panier (badge rouge)
7. **Ajuster** : +/- pour changer quantités
8. **Passer commande** : Clic "Passer la commande"
9. **Contacter** : Remplir le formulaire

### Développeur / Prof
1. **Lire** : Commentaires en français dans chaque fichier
2. **Comprendre** : Les fonctions expliquent ce qu'elles font
3. **Modifier** : Variables globales faciles à changer
4. **Tester** : Chaque fonction indépendante et testable

---

## 🚀 Comment lancer le site

```bash
# Option 1 : Double-clic sur index.html
# (Fonctionne localement)

# Option 2 : Serveur Python
python -m http.server 8000
# Puis ouvrir http://localhost:8000

# Option 3 : Live Server (VS Code)
# Extension "Live Server" → clic droit → Open with Live Server
```

---

## 🛠️ Améliorations possibles

### À faire pour mise en production :
- [ ] Ajouter vrai formulaire d'envoi (backend)
- [ ] Implémenter paiement réel (Stripe, PayPal)
- [ ] Créer base de données (API REST)
- [ ] Ajouter authentification utilisateur
- [ ] Optimiser images (WebP, compression)
- [ ] Ajouter cache et service workers
- [ ] Tests automatisés

### Modifications faciles :
- Changer les couleurs : Modifier variables CSS `:root`
- Ajouter produits : Tableau `products` dans script.js
- Modifier prix : Mettre à jour dans `products`
- Textes : Chercher-remplacer dans index.html

---

## 📝 Commentaires du code

### JavaScript
- En-têtes de section avec délimiteurs
- Description pour chaque fonction
- Commentaires expliquant la logique
- Documentation des paramètres (@param)

### CSS
- Sections clairement délimitées
- Explications pour propriétés complexes
- Variables nommées explicitement

### HTML
- Commentaires pour grandes sections
- IDs explicites pour JavaScript
- Attributs data-* pour stocker données

---

## 🐛 Dépannage

| Problème | Cause | Solution |
|----------|-------|----------|
| Images non affichées | Chemin incorrect | Mettre images dans dossier `images/` |
| Produits ne s'affichent pas | JS non chargé | Vérifier console (F12) |
| Panier vide après refresh | localStorage désactivé | Réactiver ou utiliser sessionStorage |
| Formulaire n'envoie rien | Pas de backend | Normal en local (simulation) |

---

## 👨‍🏫 Pour le professeur

Ce projet démontre :
- ✅ Maîtrise du DOM (manipulation HTML)
- ✅ Gestion d'état (variables, objects)
- ✅ Événements (click, input, submit)
- ✅ Structures de données (arrays, objects)
- ✅ Algorithmes (filter, map, sort)
- ✅ Persistance (localStorage)
- ✅ Design responsive (CSS Grid/Flexbox)
- ✅ Bonnes pratiques (DRY, fonctions pures)
- ✅ Documentation (commentaires clairs)

---

## 📞 Contact support
- Email : contact@ensitshop.tn
- Téléphone : +225 0102030405

---

**Dernier update** : Janvier 2026 ✨
**Version** : 1.0 Complète
