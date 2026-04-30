var app = angular.module("gsbRapports",['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
            .when('/',{
                templateUrl :'vues/connexion.html',
                controller :'connexionController'
            })
            .otherwise({redirectTo: '/'});
});


