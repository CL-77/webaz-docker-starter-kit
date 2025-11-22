<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil - Escape Game Forca</title>

    <link rel="stylesheet" href="css/accueil.css">
    <link rel="shortcut icon" href="../img/tacheometre.png">
</head>
<body>
    <h1>Escape Game Forca</h1>
    <div id="hall_of_fame">
        <h2>HALL OF FAME</h2>
        <table>
            <tr><th>Rang</th><th>Nom</th><th>Score</th></tr>
            <?php
                foreach ($tab_scores as $ligne) {
                    echo "<tr>";
                    foreach ($ligne as $key => $elem) {
                        echo "<td>" . $elem . "</td>";
                    }
                    echo "</tr>";
                } 
            ?>
        </table> 
    </div>
    <a href="http://localhost:1234/jeu">Jouer</a> 
</body>
</html>
