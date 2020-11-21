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
    
  },
  data () {
    return {
        userEmail:"",
        userPassword:"",
        userId: null,
    }
  },
  async mounted () {
      

  },
  methods: {
      loginUser(email, password, id){
        this.$emit('login-user', email, password, id);
      },
      getUserId(id){
        this.$emit('get-user-id', id)
      }
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
