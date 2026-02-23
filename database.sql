
-- BASE DE DONNÉES ENSITSHOP E-COMMERCE

-- Ce fichier crée toutes les tables nécessaires pour le site e-commerce

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS ensitshop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ensitshop;


-- TABLE: users (Utilisateurs)
--
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- TABLE: products (Produits)

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    description TEXT,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- TABLE: orders (Commandes)

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    customer_phone VARCHAR(20),
    customer_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- TABLE: order_items (Articles de commande)

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(200),
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- TABLE: contact_messages (Messages de contact)

CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- INSERTION DES DONNÉES INITIALES


-- Insérer les produits depuis le JavaScript
INSERT INTO products (name, category, price, image, description, stock) VALUES
('Smartphone Premium', 'electronics', 350000, 'images/smartphone.jpg', 'Smartphone dernière génération avec écran OLED', 50),
('Laptop Pro', 'electronics', 750000, 'images/laptop.jpg', 'Ordinateur portable haute performance', 30),
('Casque Audio', 'electronics', 20000, 'images/casque.jpg', 'Casque sans fil avec réduction de bruit', 100),
('T-Shirt Premium', 'clothing', 12000, 'images/tshirt.jpg', 'T-shirt en coton bio de qualité supérieure', 200),
('Jean Classique', 'clothing', 25000, 'images/jean.jpg', 'Jean confortable et durable', 150),
('Veste Élégante', 'clothing', 45000, 'images/veste.jpg', 'Veste moderne pour toutes occasions', 80),
('Livre de Programmation', 'books', 15000, 'images/livre.jpg', 'Guide complet du développement web', 60),
('Montre Connectée', 'electronics', 85000, 'images/montre.jpg', 'Montre intelligente avec suivi santé', 40),
('Tapis Décoratif', 'home', 35000, 'images/tapis.jpg', 'Tapis moderne pour salon', 25),
('Coussin Confort', 'home', 8000, 'images/coussin.jpg', 'Coussin moelleux et décoratif', 120),
('Lampe Design', 'home', 18000, 'images/lampe.jpg', 'Lampe LED moderne', 70),
('Set de Cuisine', 'home', 42000, 'images/cuisine.jpg', 'Ensemble complet d\'ustensiles de cuisine', 45);

-- Créer un utilisateur admin par défaut
-- Mot de passe: admin123 (hashé avec password_hash)
INSERT INTO users (username, email, password, full_name, role) VALUES
('admin', 'admin@ensitshop.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrateur', 'admin');


-- VUES UTILES (Optionnel)


-- Vue pour les statistiques de commandes
CREATE OR REPLACE VIEW order_statistics AS
SELECT 
    DATE(created_at) as order_date,
    COUNT(*) as total_orders,
    SUM(total_amount) as total_revenue,
    AVG(total_amount) as average_order_value
FROM orders
GROUP BY DATE(created_at)
ORDER BY order_date DESC;

-- Vue pour les produits populaires
CREATE OR REPLACE VIEW popular_products AS
SELECT 
    p.id,
    p.name,
    p.category,
    p.price,
    COUNT(oi.id) as times_ordered,
    SUM(oi.quantity) as total_quantity_sold
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id
ORDER BY total_quantity_sold DESC;

