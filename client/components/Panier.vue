<template>
  <div>
    <h2>Mon Panier</h2>
    <div>
      <article v-for="trip in panier.trips" :key="trip.id">
        <div class="trip-img">
          <div
            :style="{
              backgroundImage:
                'url(' + trips.find((a) => a.id === trip.id).image + ')',
            }"
          ></div>
        </div>
        <div>
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
        <div id="validityButton">
          <button @click ="pay()">Check in</button>
        </div>
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
      }
    }
  },
  async mounted () {

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
.trip-img {
  display: center;
  margin-right: auto;
  margin-left: auto;
  margin-top: 5%;
}
.trip-img div {
  width: 120px;
  height: 120px;
  background-size: cover;
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