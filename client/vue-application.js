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
      trips: []
    },
    user: null,
  },
  async mounted () {
    this.getTrips()
    this.getUser()
    this.getPanier()
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
        alert("Error adding the trip")
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
        alert("Cannot update the trip")
      }
    },

    async deleteTrip (tripId) {
      try{
        await axios.delete('/api/trip/' + tripId)
        const index = this.trips.findIndex(a => a.id === tripId)
        this.trips.splice(index, 1)
        this.$forceUpdate()
      }
      catch(e){
        alert("Cannot delete the trip")
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
        alert("email already taken")
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
        alert("email or password incorrect")
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
    async getPanier(){
      try{
        const res = await axios.get('/api/panier')
        this.panier = res.data
      }
      catch(e){
        alert("Error to get the cart")
      }
    },
    async addToPanier(tripId){
      const quantity = 1
      const id = tripId

      const newTrip = {
        id: id,
        quantity: quantity
      }

      try{
        const res = await axios.post('/api/panier', newTrip)
        this.panier.trips.push(newTrip)
        this.panier.updatedAt = new Date()  
      }
      catch(e){
        alert("Error adding in panier")
      }
    },

    async removeFromPanier(tripId){
      try{
        await axios.delete('/api/panier/' + tripId)
        const index = this.panier.trips.findIndex(a => a.id === tripId)
        this.panier.trips.splice(index, 1)
        this.panier.updatedAt = new Date()
        this.$forceUpdate()
      }
      catch(e){
        alert("Error removing the article")
      }
    },

    async putToPanier(tripId, quantity){
      try{
        const res = await axios.put('/api/panier/'+ tripId, {quantity: quantity})
        const trip = this.panier.trips.find(a => a.id === tripId)
        trip.quantity = quantity
        this.panier.updatedAt = new Date()
        this.$forceUpdate()
      }
      catch(e){
        alert("Error the quantity is inappropriate")
      }
    },

    async pay(){
      try{
        await axios.post('/api/panier/pay')
        this.panier.trips.splice(0, this.panier.trips.length)
        this.panier.updateTrip = new Date()
        this.panier.createdAt = new Date()
        alert("Thank you for your purchase !")
      }
      catch(e){
        router.push('/login')
        alert("You need to connect or create an account first")
      }
    }
  }
})
