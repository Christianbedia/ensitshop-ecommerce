<?php
/**
 * FICHIER DE CONFIGURATION - ENSITSHOP
 * Ce fichier contient toutes les configurations nécessaires :
 * - Connexion à la base de données
 * - Constantes globales
 * - Gestion des erreurs
 * - Headers CORS pour les requêtes AJAX
 */

// 1. CONFIGURATION DE LA BASE DE DONNÉES

define('DB_HOST', 'localhost');      // Hôte BD
define('DB_NAME', 'ensitshop');      // Nom de la BD
define('DB_USER', 'root');           // Utilisateur MySQL (laisse root comme user))
define('DB_PASS', '');               // Mot de passe MySQL (ne met pas de mot de passe pour XAMPP )
define('DB_CHARSET', 'utf8mb4');     // Encodage des caractères


// 2. CONFIGURATION DE L'APPLICATION

define('SITE_NAME', 'ENSITSHOP');
define('SITE_URL', 'http://localhost/ensitshop');
define('ADMIN_EMAIL', 'admin@ensitshop.com');

// Clé secrète pour les tokens JWT (à changer bien sur )
define('JWT_SECRET', 'votre_cle_secrete_tres_complexe_ici_2024');

// Durée de validité du token (en secondes) - 24 heures
define('JWT_EXPIRATION', 86400);


// 3. GESTION DES ERREURS

// En développement : afficher toutes les erreurs
// En production : mettre à 0
error_reporting(E_ALL);
ini_set('display_errors', 1);


// 4. HEADERS CORS (pour les requêtes AJAX)

// Permettre les requêtes depuis n'importe quelle origine
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=UTF-8');

// Gérer les requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


// 5. CLASSE DE CONNEXION À LA BASE DE DONNÉES

class Database {
    private $host = DB_HOST;
    private $db_name = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASS;
    private $charset = DB_CHARSET;
    public $conn;

    /**
     * Établir la connexion à la base de données avec PDO
     * @return PDO|null
     */
    public function getConnection() {
        $this->conn = null;

        try {
            $dsn = "mysql:host={$this->host};dbname={$this->db_name};charset={$this->charset}";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
        } catch(PDOException $e) {
            echo json_encode([
                'success' => false,
                'message' => 'Erreur de connexion à la base de données: ' . $e->getMessage()
            ]);
            exit();
        }

        return $this->conn;
    }
}


// 6. FONCTIONS UTILITAIRES


/**
 * Nettoyer les données d'entrée
 * @param string $data
 * @return string
 */
function sanitize($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Valider une adresse email
 * @param string $email
 * @return bool
 */
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Générer un token JWT simple
 * @param array $data
 * @return string
 */
function generateToken($data) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode(array_merge($data, ['exp' => time() + JWT_EXPIRATION]));
    
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

/**
 * Vérifier un token JWT
 * @param string $token
 * @return array|false
 */
function verifyToken($token) {
    $tokenParts = explode('.', $token);
    if (count($tokenParts) !== 3) {
        return false;
    }
    
    $header = base64_decode($tokenParts[0]);
    $payload = base64_decode($tokenParts[1]);
    $signatureProvided = $tokenParts[2];
    
    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, JWT_SECRET, true);
    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    
    if ($base64UrlSignature !== $signatureProvided) {
        return false;
    }
    
    $payloadData = json_decode($payload, true);
    if (isset($payloadData['exp']) && $payloadData['exp'] < time()) {
        return false;
    }
    
    return $payloadData;
}

/**
 * Envoyer une réponse JSON
 * @param bool $success
 * @param mixed $data
 * @param string $message
 * @param int $code
 */
function sendResponse($success, $data = null, $message = '', $code = 200) {
    http_response_code($code);
    echo json_encode([
        'success' => $success,
        'data' => $data,
        'message' => $message
    ]);
    exit();
}

