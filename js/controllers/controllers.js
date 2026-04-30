app.controller('connexionController', function ($scope, $location) {
    $scope.lblLogin = "Login";
    $scope.lblMdp = "Mot de passe";
    $scope.btnValider = "Valider";
    $scope.lblMessage = "Login ou mot de passe incorrect";
    $scope.valider = function () {
        if ($scope.login == "admin" && $scope.mdp == "admin") {
            $scope.msgErreur = false;
            $location.path('/accueil');
        }
        else
            $scope.msgErreur = true;

    };
});

app.controller('accueilController', function ($scope) {
    $scope.titre = "Gestion des rapports de visite";
});

app.controller('rapportsController', function ($scope) {
    $scope.titre = "Gestion des rapports";
});

app.controller('medecinsController', function ($scope) {
    $scope.titre = "Gestion des médecins";
});
