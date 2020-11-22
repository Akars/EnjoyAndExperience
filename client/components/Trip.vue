<template>
  <div>
    <div class="slider">
      <ul id="slider-list">
          <li>
              <img src="../images/c.jpg" alt=""/>
          </li>
          <li>
              <img src="../images/c.jpg" alt=""/>
          </li>
          <li>
              <img src="../images/c.jpg" alt=""/>
          </li>
          <li>
              <img src="../images/c.jpg" alt=""/>
          </li>
          <li>
              <img src="../images/c.jpg" alt=""/>
          </li>
      </ul>
    </div>
    
    <div class="wrapper">
      <h1>Trips</h1>

        <div class ="trip">
          <div class = "lieu" v-for = "trip in trips" :key="trip.id">
            <div>
              <h3> {{trip.title}}</h3>
              <div class = "trip-img">
                <img class = "content-img" :src="trip.image" />
              </div>
              <article>
                {{trip.description}}
              </article>
              <p> {{trip.username}} </p>
              <p class = "prix"> {{trip.price}}$/pers</p>
            <div>

            <div class="trip-content" v-if="editingTrip.id !== trip.id">
              <div class="trip-title">
                <div>
                <button @click="editTrip(trip, user.email)">Modifier</button>
                <button @click="deleteTrip(trip.id)">Delete</button>"
                </div>
              </div>
              <p>{{ trip.description }}</p>
            </div>
            <div v-else>
              <p>
                <input type="text" v-model="editingTrip.title" />
                <input type="number" v-model="editingTrip.price" />
              </p>
              <p>
                <input type="text" v-model="editingTrip.image" />,
                <input type="text " v-model="editingTrip.description" />
              </p>
              <div class="button-action">
                <button class="delete" @click="abortEditTrip()">
                  Discards
                </button>
                <button class="add-basket" @click="sendEditTrip()">
                  Confirm
                </button>
              </div>
            </div>

          </div>  
        </div>
        <!--
        <div class="trip">
        <div class = "lieu">
            <h3>Djerba - Tunisie</h3>
            <img border ="0"  src="images/bali.jpg" width="400" height="170">
            <p>aurelia.ngau@gmail.com </p>
            <article>
              Djerba promises you a stay synonymous with softness, change of scenery 
              and tranquility. Houmt Souk, the administrative capital of the island 
              will charm you with its picturesque.
              his renovated 4-star hotel, located in a quiet environment, is separated 
              from the sandy beach by a pleasant promenade. The hotel has 300 rooms 
              spread over 2 buildings of 2 floors with 2 elevators.
            </article>
            <button type="button" id="add" class="add-button">Add to cart</button>
            <p class="prix">130€/pers</p>
        </div>

        <div class = "lieu">
            <h3>Bangkok - Thailand</h3>
            <img border ="0"  src="images/bali.jpg" width="400" height="170">
            <p>aurelia.ngau@gmail.com </p>
            <article>
             10days/9nights in hotel (3 stars)<br>
            Depart from France<br>
            You will discover the beautiful capital of Thailand, Bangkok. 
            Through this circuit, you will see the historic sites of Ayutthaya and Sukhothai, 
            classified as UNESCO World Heritage Sites, the floating market, have a visit in a 
            farm with an elephant and many other activities...
            </article>
            <button type="button" id="add" class="add-button">Add to cart</button>
            <p class="prix">800€/pers</p> 
        </div>

        <div class = "lieu">
            <h3>Sri-Lanka</h3>
            <img border ="0"  src="images/bali.jpg" width="400" height="170">
            <p>aurelia.ngau@gmail.com </p>
            <article>
             8 days/ 5 nights in hotel<br>
             Sri Lanka invites you to let yourself be carried away by the richness of its biodiversity. 
             A relaxing atmosphere in the middle of nature reserves, tropical forests, bird songs and 
             the sound of rivers. The Sri Lankan population, very welcoming, will make you discover its 
             traditions, its culinary specialties, its unique and authentic places...
             During your stay, benefit from the half-board formula: breakfast and dinner buffet at the 
             restaurant.
            </article>
            <button type="button" id="add" class="add-button">Add to cart</button>
            <p class="prix">700€/pers</p> 
        </div>

        <div class = "lieu">
            <h3>Algarve - Portugal</h3>
            <img border ="0"  src="images/bali.jpg" width="400" height="170">
            <p>aurelia.ngau@gmail.com </p>
            <article>
            8days/ 7 nights in hotel (3 stars)<br>
            Portugal's southernmost region, the Algarve will delight travelers in search of beautiful 
            beaches and idyllic temperatures.
            It is only 10 minutes walk from the old town of Albufeira, full of history, and many shops, 
            bars and restaurants and 2 minutes from the beach !<br>
            Activities: swimming pool, solarium, petanque, golf, tennis courts, archery...
            </article>
            <button type="button" id="add" class="add-button">Add to cart</button>
            <p class="prix">170€/pers</p>
        </div>

        <div class = "lieu">
            <h3>Creete - Greece</h3>
            <img border ="0"  src="images/bali.jpg" width="400" height="170">
            <p>aurelia.ngau@gmail.com </p>
            <article>
            4days/ 3nights in hotel<br>
            Crete has an undeniable cultural heritage. This magical island brings together history 
            and traditions, culture and nature, the pleasures of physical exercise and the spirit, 
            the joys of eating and sharing.
            Many discoveries and excursions guided by our local island employees.<br>
            Advantages of the hotel : Beautiful swimming pool area, ideal location, refined decoration
            </article>
            <button type="button" id="add" class="add-button">Add to cart</button>
            <p class="prix">220€/pers</p>
        </div>

        <div class = "lieu">
            <h3>Dalmatian Coast - Croatia</h3>
            <img border ="0"  src="images/bali.jpg" width="400" height=" 170">
            <p>aurelia.ngau@gmail.com </p>
            <article>
            5days/4 nights in a hotel<br>
            To stay on the Dalmatian Coast is to discover a concentrate of the most beautiful 
            sites from Croatia to Bosnia-Herzegovina. You will be amazed by the historical and natural 
            treasures that you will find along the Adriatic Sea. The Dalmatian Coast will answer all your 
            desires of culture, authenticity, relaxation, idleness, nature and sport!<br>
            The hotel offers you :<br>
            - Outdoor swimming pool.<br>
            - Pebble beach in front of the hotel. Deckchairs and parasols available for a fee.<br>
            - Fitness room in the spa.<br>
            </article>
            <button type="button" id="add" class="add-button">Add to cart</button>
            <p class="prix">200€/pers</p>
        </div>
        -->
      </div>

     
    </div>
    <div v-if="user !== null">
      <div class="container-form">
      <form id="newPainting" @submit.prevent="addTrip">
        <h3>Add a new paint<span>i</span>ng</h3>
        <h4>Please fill this form</h4>
        <fieldset>
          <input placeholder="Painting's name" v-model="newTrip.title" type="text" tabindex="1" required autofocus/>
        </fieldset>
        <fieldset>
          <input placeholder="Movement type" v-model="newTrip.description" type="text" tabindex="3" required/>
        </fieldset>
        <fieldset>
          <input placeholder="Painting's link picture" v-model="newTrip.image" type="text" tabindex="5" required/>
        </fieldset>
        <fieldset>
          <input placeholder="Price" v-model="newTrip.price" type="number" tabindex="6" required/>
        </fieldset>
        <fieldset>
          <button type="submit">Add the painting</button>
        </fieldset>
      </form>
      <!-- End of the add painting form  -->
    </div>
    </div>

</template>

<script>
module.exports = {
  props: {
    trips: { type: Array, default: []},
    panier: { type: Object },
    user: {type: Object},
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
    editTrip (trip, username) {
      console.log(username)
      this.editingTrip.id = trip.id
      this.editingTrip.title = trip.title
      this.editingTrip.price = trip.price
      this.editingTrip.image = trip.image
      this.editingTrip.description = trip.description
      this.editingTrip.username = username
      console.log(this.editingTrip.username)
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
.choose h1{
  font-family: 'Playfair Display', serif;
  font-size: 35px;
  margin-bottom: 20px;
  text-align: center;
  color: #3f555e;
}

/*Trips*/


.wrapper{
  margin: 30px;
  margin-top: 25vh;
}

.wrapper h1{
  font-family: 'Playfair Display', serif;
  font-size: 35px;
  margin-bottom: 30px;
  text-align: center;
  color: #3f555e;
}


.trip{
  display: flex;
  flex-wrap: wrap;
  width: auto;
  justify-content: center;
}

.trip-img{
  padding: 25px;
	border-radius: 25px;
  background: #ffffff;
}

.content-img{
  width: 100%;
  height: 300px;
  border-radius: 2%;
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


.trip .lieu h3{
  font-family: 'Aleo', serif;
  font-size: 23px;
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
/******/
article{
  margin-bottom: 20px ;
}

/*Button nav*/
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
/******/

/*Slider*/
.slider{
  width:250px;
  height:100px;
  padding:0;
  margin: auto;
  position:relative;
  margin:30px 60px 100px;
  margin-top: 90px;
}

#slider-list{
  list-style-type:none;
  display:flex;
  margin:0;
  position:absolute;
  left:0;
  top:0;
  padding:0;
  animation:slide 15s linear infinite;
}

#slider-list img{
  width:320px;
  height:200px;
  margin-right: 20px;
}

@keyframes slide{
  0%{left:0px;}
  10%{left:0px;}
  35%{left:-100%;}
  45%{left:-100%;}
  75%{left:-200%;}
  85%{left:-200%;}
  90%{left:0px;}
}
/******/


</style>
