<template>
  <div >
    <div class="testing">
      <div class="choose">
        <h1>First, choose the continent!</h1>
      </div>
      <nav class="navigationTrip">
          <div class="menuTrip">
              <button type="button" id="europe_nav" class="menu_trip" formnovalidate onclick="return showEurope();">Europe</button>
              <button type="button" id="asia_nav" class="menu_trip" formnovalidate onclick="return showAsia();">Asia</button>
              <button type="button" id="america_nav" class="menu_trip" formnovalidate onclick="return showAmerica();">America</button>
              <button type="button" id="australia_nav" class="menu_trip" formnovalidate onclick="return showAustralia();">Australia</button>
              <button type="button" id="africa_nav" class="menu_trip" formnovalidate onclick="return showAfrica();">Africa</button>
          </div>            
      </nav>
    </div>
    <div class="wrapper">
      <h1>Trips</h1>

      <div class="trip">

        <div class="lieu">
          <h3>Bali</h3>
          <p>Le lorem ipsum est, en imprimerie, une suite de mots sans signification 
            utilisée à titre provisoire pour calibrer une mise en page, le texte définitif 
            venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. 
            Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</p>
          <button type="button" id="add" class="add-button">Add to cart</button>
          <p class="prix">200$</p>
        </div>

        <div class="lieu">
          <h3>Bali</h3>
          <p>Le lorem ipsum est, en imprimerie, une suite de mots sans signification 
            utilisée à titre provisoire pour calibrer une mise en page, le texte définitif 
            venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. 
            Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</p>
          <button type="button" id="add" class="add-button">Add to cart</button>
          <p class="prix">200$</p>
        </div>

        <div class="lieu">
          <h3>Bali</h3>
          <img border="0"  src="images/bali.jpg" width="400" height="170">
          
          <p>Le lorem ipsum est, en imprimerie, une suite de mots sans signification 
            utilisée à titre provisoire pour calibrer une mise en page, le texte définitif 
            venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. 
            Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</p>
          <button type="button" id="add" class="add-button">Add to cart</button>
          <p class="prix">200$</p>
        </div>

        <div class="lieu">
          <h3>Dubai - United Arab Emirates</h3>
          <p>7days/6night in hotel (4 stars)<br>
          If you want to relax, Dubai is for you. Hotel located on the 
          artificial island THe Palm Jumeriah. You will have a private beach of fine sand. 
          Equipment of the hotel: polynesian style complex room, wifi, store, 
          laundry services, private pool and beach.</p>
          <button type="button" id="add" class="add-button">Add to cart</button>
          <p class="prix">650$ per person</p>
        </div>

        <div class="lieu">
          <h3>Bali</h3>
          <p>Le lorem ipsum est, en imprimerie, une suite de mots sans signification 
            utilisée à titre provisoire pour calibrer une mise en page, le texte définitif 
            venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. 
            Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.</p>
          <button type="button" id="add" class="add-button">Add to cart</button>
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
.choose h1{
  font-family: 'Playfair Display', serif;
  font-size: 35px;
  margin-top: 7vh;
  margin-bottom: 20px;
  text-align: center;
}

.testing{
  background-size: cover;
  margin-top: 120px;
  width: 100%;
  height: 20vh;
  border-bottom: 20vh;
}


.wrapper{
  margin: 50px;
}


.wrapper h1{
  font-family: 'Playfair Display', serif;
  font-size: 35px;
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
  margin: 20px;
  width: 400px;
  padding: 20px;
  line-height: 20px;
  position: relative;
  

  box-shadow: 0px 2px 8px 2px #555;
  border-radius: 6px;
}


.trip .lieu p{
  letter-spacing: 1px;
  font-family: 'Arbutus Slab';
  color: black;
  font-size: 13px;
}

.trip .lieu .prix{
  float: right;
}

.add-button{
  padding: 9px 25px;
  background-color: #d4f4ff;
  border:none;
 
  cursor: pointer;
  transition: all 0.3s ease 0s;
  margin-top: 10px;
  font-family: 'Arbutus Slab'
}

.add-button:hover{
  background-color:#8bb0e0;
  color: white;
}

.choose{
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 35px;
  text-align: center;
}

.menuTrip button{
	  padding: 9px 25px;
    background-color: rgb(231,212,255);
    border:none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    margin-top: 10px;
}

.menuTrip{
	text-align: center;
}

.menuTrip button:hover{
    background-color:#9786ad;
    color: white;
}



</style>
