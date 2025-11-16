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
map.addLayer(heatmap);


let vue = Vue.createApp({
  data() {
    return{
      inventaire:[],
      cheat_mode: false,
    }
    
  },
  computed: {

  },
  methods:{

  },
  beforeMount() {
   
  },
 mounted(){
    let app=this;
function supression(){
  console.log(event.target)
    app.inventaire.push({alt:event.target.alt,src:event.target.src})
    event.target.remove()
    console.log(app.inventaire)
  };

  console.log('Initialisation');
  console.log(app.inventaire)
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
   test1.addTo(map).on('click',function(){ supression()});
   test2.addTo(map).on('click',function(){ supression()});
   console.log(map)



 },
});

vue.mount('#application');
