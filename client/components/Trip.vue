<template>
  <div >
    
    <div class="wrapper">
      <h1>Trips</h1>

      <div class="trip">

        <div class="lieu">
          <h3>Bali</h3>
          <p>Le lorem ipsum est, en imprimerie, une suite de mots sans signification 
            utilisée à titre provisoire pour calibrer une mise en page, le texte définitif 
            venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. 
            Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</p>
          <p class="prix">200$</p>
        </div>

        <div class="lieu">
          <h3>Bali</h3>
          <p>Le lorem ipsum est, en imprimerie, une suite de mots sans signification 
            utilisée à titre provisoire pour calibrer une mise en page, le texte définitif 
            venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. 
            Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</p>
          <p class="prix">200$</p>
        </div>

        <div class="lieu">
          <h3>Bali</h3>
          <p>Le lorem ipsum est, en imprimerie, une suite de mots sans signification 
            utilisée à titre provisoire pour calibrer une mise en page, le texte définitif 
            venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. 
            Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</p>
          <p class="prix">200$</p>
        </div>

        <div class="lieu">
          <h3>Bali</h3>
          <p>Le lorem ipsum est, en imprimerie, une suite de mots sans signification 
            utilisée à titre provisoire pour calibrer une mise en page, le texte définitif 
            venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. 
            Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</p>
          <p class="prix">200$</p>
        </div>
        <div class="lieu">
          <h3>Bali</h3>
          <p>Le lorem ipsum est, en imprimerie, une suite de mots sans signification 
            utilisée à titre provisoire pour calibrer une mise en page, le texte définitif 
            venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. 
            Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</p>
          <p class="prix">200$</p>
        </div>

      </div>

    </div>
    
</template>

<script>
module.exports = {
  props: {
    trips: { type: Array, default: []},
    panier: { type: Object }
  },
  data () {
    return {
        newTrip: {
          title: "",
          price: null,
          image: "",
          description: "",
          username: "",
        },
        editingTrip: {
          id: -1,
          title: "",
          price: null,
          image: "",
          description: "",
          username: "",
        }
    }
  },
  async mounted () {
      

  },
  methods: {
    addTrip(){
      this.$emit('add-trip', this.newTrip)
    },
    addToPanier(tripId){
      this.$emit('add-to-panier', tripId)
    },
    removeFromPanier(articleId){
    this.$emit('remove-from-panier', articleId)
   },
    deleteTrip (tripId) {
      this.$emit('delete-trip', tripId)
    },
    editTrip (trip) {
      this.editTrip.id = trip.id
      this.editTrip.title = trip.title
      this.editTrip.price = trip.price
      this.editTrip.image = trip.image
      this.editTrip.description = trip.description
      this.editTrip.username = trip.username
    },
    sendEditTrip () {
      this.$emit('update-trip', this.editingTrip)
      this.abortEditTrip()
    },
    abortEditTrip () {
      this.editingTrip = {
        id: -1,
        name: '',
        description: '',
        image: '',
        price: 0
      }
    },
  },
}
</script>

<style scoped>



.wrapper{
  margin: 50px;
  margin-top: 12vh;
}


.wrapper h1{
  font-family: 'Playfair Display', serif;
  font-size: 45px;
  margin-bottom: 30px;
  text-align: center;
}

.trip{
  display: flex;
  flex-wrap: wrap;
  width: auto;
  justify-content: center;
}

.trip .lieu{
  background: grey;
  margin: 20px;
  width: 400px;
  padding: 20px;
  line-height: 20px;
  position: relative;
}

</style>
