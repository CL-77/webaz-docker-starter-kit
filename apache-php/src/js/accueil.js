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

let vue = Vue.createApp({
  data() {
    return{
      inventaire:[],
    }
    
  },
  computed: {

  },
  methods:{

  },
  beforeMount() {
   
  },
 mounted(){
    let app=this
function supression(){
    app.inventaire.push(event.target.alt)
    event.target.remove()
    console.log(app.inventaire)
  }

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
   let test1 = L.marker([43.9625, 5.7740],{icon: icontest1,alt:'test1'});
   test1.addTo(map).on('click',function(){ supression()});
   console.log(map)

 },
});

vue.mount('#application');