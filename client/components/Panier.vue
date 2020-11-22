<template>
  <div class="trip">
    <div class="titre">
      <h2>My shopping cart</h2>
    </div>
    
    <div class="des">
      <article class="lieu" v-for="trip in panier.trips" :key="trip.id">
        <div class="trip-img">
          <div class="content-img"
            :style="{
              backgroundImage:
                'url(' + trips.find((a) => a.id === trip.id).image + ')',
            }"
          ></div>
        </div>
        
          <h1 class = "Title">{{ trips.find(a => a.id === trip.id).title }}: {{trips.find(a => a.id === trip.id).price}}€</h1>
          <p class = "descriptionProduct">{{ trips.find(a => a.id === trip.id).description }}</p>
        
        <div class="inputForm">
          <p>Qte: {{trip.quantity}}</p>
          <div v-if="editingCart.id !== trip.id">
          <button class = "quantity-button" @click="editCart(trip)" >Change quantity</button>
          <button @click="removeFromPanier(trip.id)">Remove from cart</button>
          </div>
          <div v-else>
            <p>Quantity : <input type="number" v-model="editingCart.quantity" /></p>
            <div class="button-action">
              <button class="validate" @click="abortEditQuantity()">Discard</button>
              <button class="add-basket" @click="putToPanier(editingCart.id, editingCart.quantity)">Confirm</button>
            </div>
          </div>  
          <p class = "price">Total: {{ trips.find(a => a.id === trip.id).price * trip.quantity}}€</p>
        </div>
      </article>
      <p> Total cost: {{ totalItem }}</p>
        
    </div>
    <div id="validityButton">
          <button @click ="pay()">Check in</button>
        </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    trips: { type: Array, default: [] },
    panier: { type: Object },
    user: {type: Number},
  },
  data () {
    return {
      editingCart:{
        id: -1,
        quantity: 0,
      },
    }
  },
  async mounted () {

  },

  computed: {

    totalPanier() {
      return this.panier.trips.map((trip) => ({
        ...trip,
        ...this.trips.find((a) => a.id === trip.id),
      }));
    },
    totalItem: function(){
      let sum = 0;
      this.totalPanier.forEach(function(trip) {
         sum += (parseInt(trip.price) * parseInt(trip.quantity));
      });

     return sum;
   }
  },
  methods: {
    pay(){
      this.$emit('pay-panier')
    },
    editCart(trip){
      this.editingCart.id = trip.id
      this.editingCart.quantity = trip.quantity
    },
    putToPanier(tripId, quantity){
      this.$emit('put-to-panier', tripId, quantity)
    },
    removeFromPanier(articleId){
      this.$emit('remove-from-panier', articleId)
    },
    abortEditQuantity(){
      this.editingCart.id = -1
      this.editingCart.quantity = 0
    },
  }
}
</script>

<style scoped>
.des{
  display: flex;
  flex-wrap: wrap;
  width: auto;
  justify-content: center;
}

.trip-img {
  padding: 0;
	border-radius: 25px;
  background: #ffffff;
  width: 100%;
}

.trip-img div {
  width: 100%;
  height: 200px;
  background-size: cover;
}

.lieu{
  margin: 20px;
  margin-top:30px;
  width: 400px;
  padding: 20px;
  line-height: 20px;
  position: relative;
  box-shadow: 0px 2px 8px 2px #555;
  border-radius: 6px;
}
.trip{
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  margin-bottom: 50px;
  margin-top:30px;
}

.content-img{
  width: 100%;
  height: 300px;
  border-radius: 2%;
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

#validityButton button{
    font-size: 20px;
    background-color: #b4ede1;
    transition: all 0.3s eaase 0s;
     float: right;

}

#validityButton button:hover{
  background-color: #357c8c;
  color: white;
}

.trip h2{
  font-family: 'Playfair Display', serif;
  font-size: 35px;
  margin-top: 50px;
  margin-bottom:50px;
  text-align:center;
  color: #3f555e;
}



</style>