<?php
session_start();
require_once '../data/pdogsbrapports.php';
$data = json_decode(file_get_contents('php://input'), true);
$login = (isset($data['login']) ? $data['login'] : "");
$mdp = (isset($data['mdp']) ? $data['mdp'] : "");
$pdo = PdoGsbRapports::getPdo();
$visiteur = $pdo->getLeVisiteur($login, $mdp);
if ($visiteur != null) {
    $_SESSION['visiteur'] = $visiteur;
    $_SESSION['visiteur']['login'] = $login;
    $_SESSION['visiteur']['mdp'] = $mdp;
} else
    $visiteur = array();
echo json_encode($visiteur);

?>