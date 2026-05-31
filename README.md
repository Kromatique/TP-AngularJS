## 🏥 Projet GSB Rapports (TP-AngularJS)

### 1. Présentation du projet
Le projet **GSB Rapports** s'inscrit dans le cadre du suivi de l'activité des visiteurs médicaux du laboratoire Galaxy Swiss Bourdin (GSB). L'application mobile/web permet aux visiteurs sur le terrain de saisir et d'enregistrer leurs rapports de visite auprès des médecins de leur secteur. Elle permet de documenter le motif de la visite, de rédiger un bilan précis, et d'enregistrer les échantillons de médicaments offerts à titre de démonstration lors de l'entretien.

### 2. Architecture et Technologies
Ce projet met en œuvre une architecture moderne et performante de type **SPA (Single Page Application)** :
*   **Langages et Outils** : **HTML5/CSS3** avec le framework **Bootstrap** pour un design propre et adaptatif. Le front-end s'appuie sur le framework **AngularJS** pour le dynamisme, tandis que le back-end utilise **PHP 8** couplé à une base de données **MySQL**.
*   **Architecture Client/Serveur découplée** :
    *   **Le Client (Front-end)** : Construit en AngularJS, il gère entièrement l'affichage et la navigation sans recharger la page. Il utilise un système de routage (`$routeProvider`) pour afficher dynamiquement les différents écrans de l'application dans un conteneur unique.
    *   **Le Serveur (Back-end/API)** : Conçu selon le modèle **MVC (Modèle-Vue-Contrôleur)**. Des scripts PHP légers servent de contrôleurs d'API (dossier `/ajax`) et communiquent avec un Modèle d'accès aux données centralisé (`PdoGsbRapports`) pour interroger la base de données.

### 3. Gestion et structure des données
Les données circulent sous forme de requêtes asynchrones en arrière-plan. Le client AngularJS envoie et reçoit des objets de données au format **JSON** via le protocole HTTP (service `$http`). Côté serveur, PHP décode ces objets JSON pour effectuer les requêtes de persistance SQL, puis réencode les résultats en JSON pour les renvoyer au client.

La base de données relationnelle est exploitée pour **stocker** les données métiers à travers les tables suivantes :
*   **visiteur** : Sert à **stocker** les identifiants de connexion et informations personnelles des délégués médicaux.
*   **medecin** : Sert à **stocker** l'annuaire des professionnels de santé (nom, prénom, adresse, téléphone, spécialité complémentaire).
*   **rapport** : Sert à **stocker** la fiche du rapport de visite contenant le motif, le bilan écrit, la date de la visite, le visiteur ayant rédigé le rapport et le médecin concerné.
*   **medicament** : Sert à **stocker** le catalogue des produits pharmaceutiques distribués par GSB (identifiant, nom commercial, composition, effets).
*   **offrir** : Table d'association servant à **stocker** les échantillons offerts au cours d'une visite spécifique, en associant un rapport, un médicament et la quantité distribuée.

Toutes les modifications saisies à l'écran par l'utilisateur sont immédiatement liées aux variables AngularJS grâce au **Two-Way Data Binding**, puis envoyées au serveur afin de les **stocker** de manière durable dans la base de données MySQL.

### 4. Fonctionnalités principales (Cas d'utilisation)
*   **Visiteur Médical Authentifié** :
    *   S'authentifier de manière sécurisée avec son identifiant et mot de passe.
    *   Rechercher dynamiquement un médecin de son secteur par saisie prédictive de son nom.
    *   Consulter et mettre à jour les coordonnées professionnelles d'un médecin (adresse, téléphone, spécialité complémentaire).
    *   Consulter l'historique des derniers rapports de visite rédigés pour un médecin sélectionné.
    *   Consulter la liste de ses propres visites effectuées à une date précise.
    *   Mettre à jour les informations d'un rapport existant (modifier le motif ou le bilan).
    *   Saisir un nouveau rapport de visite en renseignant le médecin visité, le bilan, le motif, la date, et ajouter dynamiquement une liste d'échantillons de médicaments offerts en indiquant pour chacun la quantité distribuée.

### 5. Cartographie des fichiers clés

| Nom du fichier | Emplacement | Rôle précis dans la logique du code |
| :--- | :--- | :--- |
| **`app.js`** | `/js/app.js` | Fichier de configuration front-end qui déclare l'application AngularJS et définit la table des routes d'accès pour charger la bonne vue et le bon contrôleur sans rechargement de page. |
| **`controllers.js`** | `/js/controllers/controllers.js` | Contient tous les contrôleurs de l'application AngularJS. C'est ici qu'est écrite toute la logique d'interaction, la gestion de la portée locale (`$scope`) et les appels d'API via `$http`. |
| **`pdogsbrapports.php`** | `/data/pdogsbrapports.php` | Classe PHP d'accès aux données (DAL) écrite selon le design pattern Singleton. Elle encapsule l'ensemble des requêtes préparées PDO exécutées sur la base de données. |
| **`nouveauRapport.html`** | `/vues/nouveauRapport.html` | Vue HTML du formulaire de saisie de visite. Elle utilise des directives AngularJS (`ng-model`, `ng-repeat`, `ng-click`) pour lier dynamiquement les saisies de rapports et d'échantillons. |
| **`traiterajouterrapport.php`** | `/ajax/traiterajouterrapport.php` | Contrôleur d'API côté serveur qui reçoit la requête JSON d'ajout de rapport, extrait les variables et appelle la méthode `ajouterRapport` du modèle pour insérer les données en base. |
