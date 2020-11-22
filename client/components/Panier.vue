<template>
  <div>
    <h2>Mon Panier</h2>
    <div>
      <article v-for="article in panier.articles" :key="article.id">
        <div class="article-img">
          <div
            :style="{
              backgroundImage:
                'url(' + articles.find((a) => a.id === article.id).image + ')',
            }"
          ></div>
        </div>
        <h1 class = "nameProduct">{{ articles.find(a => a.id === article.id).name }}: {{articles.find(a => a.id === article.id).price}}€</h1>
        <p class = "descriptionProduct">{{ articles.find(a => a.id === article.id).description }}</p>
        <div class="inputForm">
          <p>Qte: </p>
          <input id="number" type="number" min ="1" value="1" v-model="nbrOfArticle">
          <button v-on:click="putToPanier(article.id, parseInt(nbrOfArticle))">Change quantity</button>
          <p class = "price">Total: {{ articles.find(a => a.id === article.id).price * article.quantity }}€</p>
        </div>
      </article>
        <div id="validityButton">
          <button>Validate the card</button>
        </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object },
    user: {type: Number},
    isNotConnected: {type: Boolean},
  },
  data () {
    return {
      nbrOfArticle: 1,
    }
  },
  async mounted () {

  },
  methods: {
    putToPanier(articleId, quantity){
      this.$emit('put-to-panier', articleId, quantity)
    },
  }
}
</script>

<style scoped>
.article-img {
  display: center;
  margin-right: auto;
  margin-left: auto;
  margin-top: 5%;
}
.article-img div {
  width: 120px;
  height: 120px;
  background-size: cover;
}

article{
  border:solid;
  margin: 20px;
  padding: 20px;
  width: 350px;
  
}

input {
    display: inline-block;
    border: none;
    border-bottom: #00BFFF 1px solid;
    margin-bottom: 20px;
    padding-top: 2px;
    padding-bottom: 4px;
    padding-left: 4px;
    font-family: 'Arbutus Slab'
}

button{
  padding: 9px 25px;
  background-color: #d4f4ff;
  border:none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  margin-top: 10px;
  font-family: 'Arbutus Slab'
}

button:hover{
    background-color:#8bb0e0;
    color: white;
}

.nameProduct{
  display:flex;
}

p{
  font-family: 'Arbutus Slab';
}

#validityButton{
  padding-left: 25%
}

</style>