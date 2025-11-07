Vue.createApp({
  data() {
    return{
        map:L.map('map', {
    center: [43.9625, 5.7740],
    zoom: 15,
    layers: [
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }),
    ],
}),
    }
    
  },
  computed: {

  },
  methods:{
    
  },
}).mount('#map');