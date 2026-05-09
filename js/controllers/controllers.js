/*-------------------------Connexion------------------------*/
app.controller('connexionController', function ($scope, $location, $http) {

    $scope.lblLogin = "Login";
    $scope.lblMdp = "Mot de passe";
    $scope.lblBtn = "Valider";
    $scope.lblMessage = "erreur de login ou de mot de passe";
    $scope.msgErreur = false;
    $scope.valider = function () {
        var login = $scope.login;
        var mdp = $scope.mdp;
        var req = {
            method: 'POST',
            url: 'ajax/traiterconnexion.php',
            data: { login: login, mdp: mdp }
        };

        $http(req)
            .then(function (response) {
                console.log(response);
                var visiteur = response.data;
                if (!visiteur || !visiteur.id) {
                    $scope.msgErreur = true;
                }
                else {
                    $scope.msgErreur = false;
                    $location.url("accueil");
                }
            });
    };
});

/*-----------------------Accueil------------------------------*/

app.controller('accueilController', function ($scope) {
    $scope.titre = "Gestion des rapports de visite";
});
/*-----------------------Medecins------------------------------*/
app.controller('medecinsController', function ($scope, $http, $rootScope) {
    $scope.titre = "Gestion des médecins";
    $scope.btnVisible = true;
    $scope.isCollapsed = true;
    $scope.srcMenu = "vues/menuMedecins.html";
    $scope.menu = function () {
        $scope.isCollapsed = !$scope.isCollapsed;
    };

    $scope.choisirMedecin = function (medecin) {
        $scope.$emit('medecinChoisi', medecin);
        $rootScope.medecin = medecin;
        $scope.rechercheMedecin.nom = medecin.nom + " " + medecin.prenom;
        $scope.medecins = [];
        console.log($rootScope.medecin);
    };

    $scope.rechercheMedecin = {};
    $scope.chargerMedecins = function () {
        var nomMedecin = $scope.rechercheMedecin.nom;
        if (nomMedecin.length > 1) {
            var req = {
                method: 'POST',
                url: 'ajax/traiterrecherchemedecins.php',
                data: { nomMedecin: nomMedecin }
            };
            $http(req)
                .then(function (response) {
                    var lesMedecins = response.data;
                    $scope.medecins = lesMedecins;
                });
        }

    };

});
/*-----------------------Rapports------------------------------*/
app.controller('rapportsController', function ($scope) {
    $scope.titre = "Gestion des rapports de visite";
    $scope.btnVisible = true;
    $scope.isCollapsed = true;
    $scope.srcMenu = "vues/menuRapports.html";
    $scope.menu = function () {
        $scope.isCollapsed = !$scope.isCollapsed;
    };
});


app.controller('choisirRapportController', function ($scope, $http) {
    $scope.titre = "Choisir un rapport";
    $scope.btnVisible = true;
    $scope.isCollapsed = true;
    $scope.srcMenu = "vues/menuRapports.html";
    $scope.lblDateRapport = "Choisir une date :";
    $scope.menu = function () {
        $scope.isCollapsed = !$scope.isCollapsed;
    };

    $scope.changementDate = function () {
        $scope.message = "";
        var dateRapport = $scope.dateRapport;
        var jour = dateRapport.getDate();
        var mois = dateRapport.getMonth() + 1;
        var annee = dateRapport.getFullYear();
        var date = annee + '-' + mois + '-' + jour;
        var req = {
            method: 'POST',
            url: 'ajax/traiterlesvisitesaunedate.php',
            data: { dateRapport: date }
        };

        $http(req)
            .then(function (response) {
                var lesRapports = response.data;
                if (lesRapports.length == 0)
                    $scope.message = "désolé, pas de rapport ce jour..."
                else {
                    $scope.rapports = lesRapports;
                }
            });
    };

});

/*--------------------------------------- MajRapport-----------------------------*/

app.controller('majRapportController', function ($scope, $location, $http) {

    $scope.btnVisible = true;
    $scope.isCollapsed = true;
    $scope.titre = "Mise à jour du rapport";
    $scope.lblMotif = "Motif :";
    $scope.lblBilan = "Bilan :";
    $scope.lblEnvoyer = "Envoyer";
    $scope.srcMenu = "vues/menuRapports.html";

    $scope.menu = function () {
        $scope.isCollapsed = !$scope.isCollapsed;
    };

    var id = $location.search().id;
    var req = {
        method: 'POST',
        url: 'ajax/traiterchoixrapport.php',
        data: { id: id }
    };
    $http(req)
        .then(function (response) {
            var leRapport = response.data;
            var id = leRapport.id;
            var motif = leRapport.motif;
            var bilan = leRapport.bilan;
            $scope.bilan = bilan;
            $scope.motif = motif;
        });

    $scope.valider = function () {
        var req = {
            method: 'POST',
            url: 'ajax/traitermajrapport.php',
            data: {
                id: id,
                bilan: $scope.bilan,
                motif: $scope.motif
            }
        };
        $http(req)
            .then(function (response) {
                if (response.data == 1)
                    alert("Rapport mis à jour");
                else
                    alert("Veuillez réessayer plus tard...");
            });

    };
});

/*-----------------------------------Controleur MajMedecin--------------------------------*/
app.controller('majMedecinController', function ($scope, $http, $rootScope, $location) {

    if (!$scope.medecin) {
        $location.url("medecins");
        return;
    }

    $scope.srcMenu = "vues/menuMedecins.html";
    $scope.btnVisible = true;
    $scope.titre = "Mise à jour";
    $scope.isCollapsed = true;
    $scope.menu = function () {
        $scope.isCollapsed = !$scope.isCollapsed;
    };
    $scope.lblAdresse = "Adresse";
    $scope.lblTel = "Téléphone";
    $scope.lblSpecialite = "Spécialité complémentaire ";
    $scope.lblEnvoyer = "Mettre à jour";

    var medecin = $scope.medecin; // héritage du rootScope

    $scope.m = {};
    $scope.m.adresse = medecin.adresse;
    $scope.m.tel = medecin.tel;
    $scope.m.specialite = medecin.specialitecomplementaire;
    $scope.msgSucces = false;
    $scope.msgErreur = false;
    $scope.valider = function () {
        $scope.msgSucces = false;
        $scope.msgErreur = false;
        var req = {
            method: 'POST',
            url: 'ajax/traitermajmedecin.php',
            data: {
                id: medecin.id,
                adresse: $scope.m.adresse,
                tel: $scope.m.tel,
                specialite: $scope.m.specialite
            }
        };
        $http(req)
            .then(function (response) {
                if (response.data == 1) {
                    $scope.msgSucces = true;
                } else {
                    $scope.msgErreur = true;
                }
            });

    };
});

/*---------------------------------Controleur DerniersRapports---------------------*/
app.controller('derniersRapportsController', function ($scope, $http, $rootScope, $location) {

    // TEST DE SÉCURITÉ
    if (!$scope.medecin) {
        $location.url("medecins");
        return;
    }
    $scope.srcMenu = "vues/menuMedecins.html";
    $scope.titre = "Derniers rapports de " + $rootScope.medecin.nom;
    $scope.btnVisible = true;
    $scope.isCollapsed = true;
    $scope.menu = function () {
        $scope.isCollapsed = !$scope.isCollapsed;
    };
    var req = {
        method: 'POST',
        url: 'ajax/traitergetlesrapports.php',
        data: { idMedecin: $scope.medecin.id }
    };
    $http(req)
        .then(function (response) {
            $scope.rapports = response.data;
            if ($scope.rapports.length == 0) {
                $scope.message = "Désolé, pas de rapport pour ce médecin...";
                $scope.typeMessage = "alert alert-info";
            }
        });
});