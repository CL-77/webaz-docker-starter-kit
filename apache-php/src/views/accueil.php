<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>
    <link rel="stylesheet" href="css/accueil.css">

</head>
<body>
    <div id="application">
        <div id=cheat>
            <form action="" @submit.prevent="switch_heatmap">
                <div v-if="cheat_mode">
                    <button>Désactiver cheat mode</button>
                </div>
                <div v-else>
                    <button>Activer cheat mode</button>
                </div>
            </form>
        </div>
        <div id=inventaire>
            <ul>
                <li><img v-for="objet in inventaire" :src=objet.src :alt=objet.alt></img></li>
            </ul>
        </div>
    </div>
    <div id="map"></div>

    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
<!-- Leaflet -->

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>
<script src="js/accueil.js"></script>
</body>
</html>
