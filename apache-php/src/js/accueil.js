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
      console.log("Selection en cours");
      console.log(objet);
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
                let carte = L.marker([obj.lat, obj.lon], { icon: L.icon({iconUrl: obj.url, iconSize: [obj.taille_x, obj.taille_y]}) ,alt:obj.nom+obj.code_revele}).addTo(map).on('click', function() {action_carte(obj.code_revele)} );
              } else if (obj.nom == "pc") {
                let pc = L.marker([obj.lat, obj.lon], { icon: L.icon({iconUrl: obj.url, iconSize: [obj.taille_x, obj.taille_y]}),alt:obj.nom }).addTo(map).on('click', function() {action_pc(obj.code_bloquant, obj.id_bloque)} );
              } else if (obj.nom == "porte") {
                let porte = L.marker([obj.lat, obj.lon], { icon: L.icon({iconUrl: obj.url, iconSize: [obj.taille_x, obj.taille_y]}),alt:obj.nom }).addTo(map).on('click', function() {action_porte(obj.indice, obj.id_bloque)} );
              } else {
                let objet = L.marker([obj.lat, obj.lon], { icon: L.icon({iconUrl: obj.url, iconSize: [obj.taille_x, obj.taille_y]}),alt:obj.nom }).addTo(map).on('click', function() {suppression()} );
              }
            }
        })
      });
    } else {
      fetch('/objets?id=' + param)
    .then(reponseHTTP => reponseHTTP.json())
    .then(tabJSON => {
        tabJSON.forEach(function(obj){
          let objet = L.marker([obj.lat, obj.lon], { icon: L.icon({iconUrl: obj.url, iconSize: [obj.taille_x, obj.taille_y]}),alt:obj.nom }).addTo(map).on('click', function() {suppression()} );
        });
      })
    }
  };

    function suppression(){
        console.log(event.target);
        console.log({alt:event.target.alt,src:event.target.src});
        app.inventaire.push({alt:event.target.alt,src:event.target.src});
        event.target.remove();
        console.log(app.inventaire);
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
 
   /* 
   console.log('Initialisation');
   console.log(app.inventaire);
   let icontest1 = L.icon({
    iconUrl: 'img/camera.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    //shadowUrl: 'my-icon-shadow.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94]
   });
   let icontest2 = L.icon({
    iconUrl: 'img/cle.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    //shadowUrl: 'my-icon-shadow.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94]
   });
   let test1 = L.marker([43.9625, 5.7740],{icon: icontest1,alt:'test1'});
   let test2 = L.marker([43.9625, 5.6740],{icon: icontest2,alt:'test2'});
   test1.addTo(map).on('click',function(){ suppression()});
   test2.addTo(map).on('click',function(){ suppression()});
   console.log(map)
   */

   get_objets('start');

 }
});

vue.mount('#application');
