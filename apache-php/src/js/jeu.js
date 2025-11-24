let map = L.map('map', {
    center: [43.9625, 5.7740],
    zoom: 15,
    layers: [
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
    ],
})

let zoom15 = L.layerGroup([],{
  minzoom:15,
  maxzoom:19,
})

let zoom13 = L.layerGroup([],{
  minzoom:13,
  maxzoom:19,
})

map.addLayer(zoom15);
map.addLayer(zoom13);

let zooms ={15:zoom15,13:zoom13}



let heatmap = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
    layers: 'heatmap:objet',
    format: 'image/png',
    transparent: true,
    tiled: true,
    crs: L.CRS.EPSG4326
});


let vue = Vue.createApp({
  data() {
    return{
      inventaire: [],
      cheat_mode: false,
      selection: "",
      tps_debut:Date.now(),
    }
    
  },
  computed: {
     
  },
  methods:{
    switch_heatmap() {
      if (this.cheat_mode) {
        map.removeLayer(heatmap);
        this.cheat_mode = false;
      } else {
        map.addLayer(heatmap);
        this.cheat_mode = true;
      }
    },

    func_selection(objet) {
      this.selection=objet;
      if (objet.substr(0,5)=="carte"){
        alert("Mot de passe de l'ordinateur : " + objet.substr(5));
      }
    },
  },
  beforeMount() {
   
  },
 mounted(){
    let app=this;

  function get_objets(param) {
    if (param == 'start') {
      fetch('/objets')
    .then(reponseHTTP => reponseHTTP.json())
    .then(tabJSON => {
        tabJSON.forEach(function(obj){
          if (obj.depart == 't') {
              if (obj.nom == "carte") {
                let carte = L.marker([obj.lat, obj.lon], { icon: L.icon({iconUrl: obj.url, iconSize: [obj.taille_x, obj.taille_y]}) ,alt:obj.nom+obj.code_revele}).addTo(zooms[obj.min_zoom_visible]).on('click', function() {action_carte(obj.code_revele)} );
              } else if (obj.nom == "pc") {
                let pc = L.marker([obj.lat, obj.lon], { icon: L.icon({iconUrl: obj.url, iconSize: [obj.taille_x, obj.taille_y]}),alt:obj.nom }).addTo(zooms[obj.min_zoom_visible]).on('click', function() {action_pc(obj.code_bloquant, obj.id_bloque)} );
              } else if (obj.nom == "porte") {
                let porte = L.marker([obj.lat, obj.lon], { icon: L.icon({iconUrl: obj.url, iconSize: [obj.taille_x, obj.taille_y]}),alt:obj.nom }).addTo(zooms[obj.min_zoom_visible]).on('click', function() {action_porte(obj.indice, obj.id_bloque)} );
              } else {
                let objet = L.marker([obj.lat, obj.lon], { icon: L.icon({iconUrl: obj.url, iconSize: [obj.taille_x, obj.taille_y]}),alt:obj.nom }).addTo(zooms[obj.min_zoom_visible]).on('click', function() {suppression()} );
              }
            }
        })
      });
    } else {
      fetch('/objets?id=' + param)
    .then(reponseHTTP => reponseHTTP.json())
    .then(tabJSON => {
        tabJSON.forEach(function(obj){
          let objet = L.marker([obj.lat, obj.lon], { icon: L.icon({iconUrl: obj.url, iconSize: [obj.taille_x, obj.taille_y]}),alt:obj.nom }).addTo(zooms[obj.min_zoom_visible]).on('click', function() {suppression()} );
        });
      })
    }
  };

    function suppression(){
        app.inventaire.push({alt:event.target.alt,src:event.target.src});
        event.target.remove();
        if (app.inventaire.length == 8){
          fin_partie()
        }
    };

    function action_carte(code_revele) {
      alert("Mot de passe de l'ordinateur : " + code_revele);
      suppression();
    };

    function action_pc(code_bloquant, id_bloque) {
      let mdp = prompt("Veuillez saisir le mot de passe :");
      if (mdp == code_bloquant) {
        alert("Mot de passe correct.");
        event.target.remove();
        get_objets(id_bloque);
      } else {
        alert("Mot de passe incorrect.");
      }
    };

    function action_porte(indice, id_bloque) {
      if(app.selection=="cle"){
            event.target.remove();
            get_objets(id_bloque);
      } else{
            alert(indice);
      }
    };

    map.on('zoom',function(){niveau_zoom()})
    function niveau_zoom(){
      console.log("zoom")
      z = map.getZoom()
      if (z<13){
        map.removeLayer(zoom13)
      }
      else{
        map.addLayer(zoom13)
      }
      if (z<15){
        map.removeLayer(zoom15)
      }
      else{
        map.addLayer(zoom15)
      }
    }


    function fin_partie(){
      let tps_fin=Date.now();
      let tps_jeu=tps_fin-app.tps_debut;
      let score = Math.round(120-tps_jeu/1000);
      let msg_fin = prompt("Votre score est : " + score +"\nEntrez votre nom")
      window.location.href="http://localhost:1234/scores?insert=INSERT INTO score (nom, score) VALUES ('" + msg_fin + "', " + score + ");";
    }

   get_objets('start');

 }
});

vue.mount('#application');
