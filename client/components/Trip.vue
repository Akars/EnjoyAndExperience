<template>
  <div >
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

      <div class="trip">
        <div class = "lieu" v-for = "trip in trips" :key="trip.id">
          <div>
            <h2> {{trip.title}}</h2>
            <div class = "trip-img">
              <div :style="{ backgroundImage: 'url(' + trip.image + ')' }"></div>
            </div>
            <p> {{trip.username}} </p>
            <article>
              {{trip.description}}
            </article>
            <p> {{trip.price}}€/pers</p>
          <div>
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
  width: 150px;
	height: 150px;
	background-size: cover;
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
