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
app.controller('medecinsController', function ($scope) {
    $scope.titre = "Gestion des médecins";
    $scope.btnVisible = true;
    $scope.isCollapsed = true;
    $scope.srcMenu = "vues/menuMedecins.html";
    $scope.menu = function () {
        $scope.isCollapsed = !$scope.isCollapsed;
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
