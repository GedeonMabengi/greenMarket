# GreenMarket Mobile

Application Flutter connectee a l'API Laravel du projet GreenMarket.

## Fonctionnalites

- Catalogue produits avec recherche et filtre par categorie
- Detail produit avec producteur, stock et prix
- Panier local
- Connexion et inscription via Laravel Sanctum
- Creation de commande depuis le panier

## Lancer en local

Depuis le dossier Laravel, lancez l'API:

```bash
php artisan serve
```

Depuis `mobile_app`, lancez Flutter:

```bash
flutter pub get
flutter run
```

Par defaut, l'app utilise `http://10.0.2.2:8000/api`, pratique pour l'emulateur Android. Pour un navigateur, Windows, ou un telephone physique, indiquez l'URL de votre serveur:

```bash
flutter run --dart-define=API_BASE_URL=http://127.0.0.1:8000/api
```

Sur telephone physique, remplacez `127.0.0.1` par l'adresse IP locale de votre ordinateur.
