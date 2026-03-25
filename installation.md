Pour Windows : faire ```git config --global core.autocrlf false```  dans un terminal pour empêcher git de convertir les fins de ligne des fichiers (entraîne des conflits avec Docker)

ROAD2 Installation générale : \
Installler la branche road2 avec ```git clone https://github.com/Bruce-BPN/road2``` \
A la racine du projet (```cd .\road2```) exécuter ```git submodule update --init``` pour installer le sous module route-graphe-generator \
Se placer dans le dossier dev (```cd .\docker\dev```) \
Avec DockerDesktop installé et ouvert, lancer ```docker-compose —env-file test.env build``` pour construire les images 

ROAD2 Construction des données : \
S’assurer que le port 5432 n’est pas utilisé sur l’ordinateur \
Lancer ```docker-compose --env-file test.env up -d pgrouting``` pour lancer la base de donnée \
Si on ne veux pas importer soit même la BDTOPO, aller dans le fichier test.env et commenter la ligne 17 (R2GG_ARG) pour avoir un import automatique de la Corse \
Si on veut l’importer soit même, Importer les couches tronçons de route et non_communication de la BDTOPO sur la zone voulue via PGADMIN dans une nouvelle base de donnée nommée BDTOPO dans laquelle on importe l’extension PostGIS en se connectant au serveur sur localhost:5432 \
Lancer ```docker-compose --env-file test.env up -d r2gg```  pour lancer la création des tuiles valhalla


ROAD2 Lancement serveur : \
S’assurer que les ports 8079, 8080, 9229 et 9230 ne sont pas utilisés sur l’ordinateur \
Lancer ```docker-compose --env-file test.env up road2``` 

Interface : \
Installer l’interface avec ```git clone https://gitlab.com/ensg_pdi14_2026/pdi14_2026/-/tree/interface``` \ 
Installer MAMP et le configurer pour qu’il cherche le fichier index dans le dossier interface \
Aller dans un navigateur et ouvrir localhost
