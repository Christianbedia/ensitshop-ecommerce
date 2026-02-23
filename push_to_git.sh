#!/bin/bash

echo "=== Vérification de l'état Git ==="
git status

echo ""
echo "=== Ajout de tous les fichiers ==="
git add .

echo ""
echo "=== Commit des changements ==="
git commit -m "Ajout du backend PHP avec config.php et database.sql" || echo "Rien à commiter"

echo ""
echo "=== Push vers GitHub ==="
git push origin main

echo ""
echo "=== Vérification finale ==="
git log --oneline -3

echo ""
echo "✅ Push terminé ! Vérifiez sur : https://github.com/Christianbedia/ensitshop-ecommerce"

