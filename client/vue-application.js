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
    user: null,
  },
  async mounted () {
    this.getTrips()
    this.getUser()
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
      try{
        const res = await axios.post('/api/trip', trip) //Sent trip to the api
        this.trips.push(res.data)
        this.$forceUpdate()
      }
      catch(e){
        console.log("Error adding the trip")
      }
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
        const index = this.trips.findIndex(a => a.id === tripId)
        this.trips.splice(index, 1)
      }
      catch(e){
        console.log("Cannot delete the trip")
      }
    },
//////////////////////////////////////////////////////////////
    async registerUser(userEmail, userPassword){
      try{
        const data = {email: userEmail, password: userPassword}
        await axios.post('/api/register', data)
        await axios.post('/api/login', data)
        await this.getUser()
        this.$forceUpdate()
      }
      catch(e){
        console.log("Error register")
      }
    },

    async loginUser(userEmail, userPassword){
      try{
        const data = {email: userEmail, password: userPassword}
        await axios.post('/api/login', data)  
        await this.getUser()
        this.$forceUpdate()
      }
      catch(e){
        console.log("Error login")
      }
    },

    async logout(){
      try{
        await axios.post('/api/logout')
        this.user = null
        this.$forceUpdate()
      }
      catch(e){
        console.log("Error logout")
      }
    },

    async getUserId(){
      console.log("hello")
      const res = await axios.get('/api/me')
      this.user = res.data
    },

    async getUser() {
      try {
        const res = await axios.get('/api/me')
        this.user = res.data
      } catch (e) {
        this.user = null
      }
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
