const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')

const routes = [
  { path: '/', component: Home },
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
    articles: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    },
  },
  async mounted () {
    const res = await axios.get('/api/articles')
    this.articles = res.data
    const res2 = await axios.get('/api/panier')
    this.panier = res2.data
  },
  methods: {
    async addArticle (article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
    },

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

    async updateArticle (newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
    },

    async deleteArticle (articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
    },

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
    }
  }
})
