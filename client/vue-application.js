const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')
const Trip = window.httpVueLoader('./components/Trip.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/trip', component: Trip},
  { path: '/panier', component: Panier },
  { path: '/register', component: Register},
  { path: '/login', component: Login}
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    trips: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    },
  },
  async mounted () {
    this.getTrips()
  },
  methods: {
    async getTrips(){
      try{
        const res = await axios.get('/api/trip')
        this.trips = res.data
      }
      catch(e){
        console.log("Cannot get trips")
      }
    },

    async addTrip (trip) {
      const res = await axios.post('/api/trip', trip) //Sent trip to the api
      this.trips.push(res.data)
    },

    async updateTrip (newTrip) {
      try{
        await axios.put('/api/trip/' + newTrip.id, newTrip)
        const trip = this.trips.find(a => a.id === newTrip.id)
        trip.title = newTrip.title
        trip.price = newTrip.price
        trip.image = newTrip.image
        trip.description = newTrip.description
        trip.username = newTrip.username
      }
      catch(e){
        console.log("Cannot update the trip")
      }
    },

    async deleteTrip (tripId) {
      try{
        await axios.delete('/api/trip/' + tripId)
        const index = this.articles.findIndex(a => a.id === tripId)
        this.trips.splice(index, 1)
      }
      catch(e){
        console.log("Cannot delete the trip")
      }
    },
//////////////////////////////////////////////////////////////
    async registerUser(userEmail, userPassword){
      const data = {email: userEmail, password: userPassword}
      await axios.post('/api/register', data)
      console.log("haloç")
    },

    async loginUser(userEmail, userPassword, id){
      const data = {email: userEmail, password: userPassword}
      await axios.post('/api/login', data)
      const res = await axios.get('/api/me')
      console.log(res.data)
      id = res.data
      console.log(id)
    },

    async getUserId(id){
      console.log("hello")
      const res = await axios.get('/api/me')
      this.id = res.data
      console.log(this.id)
    },
//////////////////////////////////////////////////////////////
    async addToPanier(articleId){
      const quantity = 1
      const id = articleId

      const newArticle = {
        id: id,
        quantity: quantity
      }

      const res = await axios.post('/api/panier', newArticle)
      this.panier = res.data
    },

    async removeFromPanier(articleId){
      const res = await axios.delete('/api/panier/' +  articleId)
      this.panier = res.data
    },

    async putToPanier(articleId, quantity){

      const res = await axios.put('/api/panier/'+ articleId, {quantity: quantity})

      this.panier = res.data
    },
  }
})
