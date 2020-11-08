<template>
  <div>
    <section class="section section-light">
      <h2>Why choosing Enjoy & experience ?</h2>
      <div class="reasons">
          <div class="r1">
              <i class="fas fa-medal"></i>
              <p>We select the trips with a lot of care.</p>
          </div>

          <div class="r1">
              <i class="fas fa-handshake"></i>
              <p>We have a lot of partnerships.</p>
          </div>

          <div class="r1">
              <i class="fas fa-suitcase-rolling"></i>
              <p>A wide choice of stays all over the world.</p>
          </div>

          <div class="r1">
              <i class="fas fa-assistive-listening-systems"></i>
              <p>Our customer relations and services are a top priority.</p>
          </div>
      </div>   
    </section>

    <div class="pimg2">
        <div class="ptext">
            <span class="bordertrans">
                Discovering the world
            </span>
        </div>
    </div>

    <section class="section section-dark">
        <p> "Travel makes one modest, you see what a tiny place you 
            occupy in the world." ~ Gustave FLAUBERT</p>
    </section>

    <div class="pimg3">
      <div class="ptext">
          <span class="bordertrans">
              Traveling with friends and family
          </span>
      </div>
    </div>

    <section class="section section-light">
        <h2>Come discover your stay !</h2>
        <router-link class="dis" to='/trips'>Trips</router-link>
        <router-link class="dis" to='/register'>Register</router-link>
        <router-link class="dis" to='/login'>Login</router-link>
    </section>
  </div>
</template>

<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object }
  },
  data () {
    return {
      newArticle: {
        name: '',
        description: '',
        image: '',
        price: 0
      },
      editingArticle: {
        id: -1,
        name: '',
        description: '',
        image: '',
        price: 0
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.pimg1, .pimg2, .pimg3{
    position: relative;
    opacity: 0.7;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
}


.pimg1{
    background-image: url('images/route.jpg');
    min-height: 100%;
}

.pimg2{
    background-image: url('images/globe.jpg');
    min-height: 400px;
}

.pimg3{
    background-image: url('images/van.jpg');
    min-height: 400px;
}

.section{
    text-align: center;
    padding: 50px 60px;
}

.section-light{
    background-color: #f4f4f4;
    color: #666;
}

.section-dark{
    background-color: #282e34;
    color: #dddddd;
}

.ptext{
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    color: #bdd1d9;
    font-size: 27px;
    font-weight: bolder;
    letter-spacing: 8px;
    text-transform: uppercase;
    
}

.ptext .bordertrans{
    background-color: transparent;
    color: black;
}

@media (max-width: 568px) {
    .pimg1, .pimg2, .pimg3{
        background-attachment: scroll;
    }
}

section p{
    font-size: 15px;
    font-family: 'Arbutus Slab';
}

.reasons{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

.r1{
    padding-right: 250px;
    margin-top: 10px;
    width: 20%;
    padding: 40px;
}

.r1 i{
    font-size: 30px;
}

.dis{
    color: #666;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s ease 0s;
    font-family: 'Arbutus Slab';
    cursor: pointer;
    margin-right: 20px;
}

.dis:hover{
    color:#89a3ad;
    border-bottom: 1px solid #89a3ad;
}
</style>

