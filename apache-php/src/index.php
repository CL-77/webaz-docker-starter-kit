<?php

declare(strict_types=1);

require_once 'flight/Flight.php';

Flight::route('/', function() {
    Flight::render('accueil');
});


Flight::route('/objets', function () {
    $host = 'db';
    $port = 5432;
    $dbname = 'mydb';
    $user = 'postgres';
    $pass = 'postgres';

    // Connexion BDD
    $link = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$pass");

    $sql = "SELECT o.*, i.url, i.taille_x, i.taille_y FROM objet o JOIN icone i ON o.id_icone = i.id";

    if ( ! isset($_GET['id']) ) {
        $sql = "SELECT o.*, i.url, i.taille_x, i.taille_y FROM objet o JOIN icone i ON o.id_icone = i.id";
        $query = pg_query($link, $sql);
    } else {
        $id_objet = $_GET['id'];
        $sql = "SELECT o.*, i.url, i.taille_x, i.taille_y FROM objet o JOIN icone i ON o.id_icone = i.id WHERE o.id = $1";
        $query = pg_query_params($link, $sql, [ $id_objet ]); // protection contre injection SQL
    }
    $results = pg_fetch_all($query);
    Flight::json($results);
});


Flight::route('/test-db', function () {
    $host = 'db';
    $port = 5432;
    $dbname = 'mydb';
    $user = 'postgres';
    $pass = 'postgres';

    // Connexion BDD
    $link = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$pass");

    $sql = "SELECT * FROM points";
    $query = pg_query($link, $sql);
    $results = pg_fetch_all($query);
    Flight::json($results);
});

Flight::start();

?>
