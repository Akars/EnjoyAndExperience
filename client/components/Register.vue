<template>
<div class="test">

 <div class="col">

        <div class="hide-md-lg">
          <p>Sign in:</p>
        </div>
        <div class="sign">
          <input class="textfield" type="text" name="username" placeholder="Username" v-model = "userEmail" required>
        </div>
        <div class="sign">
          <input class="textfield" type="password" name="password" placeholder="Password" v-model = "userPassword" required>
        </div>
        <div class="sign">
          <input class="buttonSignIn" type="submit" value="Login" @click="registerUser(userEmail, userPassword)">
        </div>
        <div class="sign">
          user: {{userEmail}} password: {{userPassword}}
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
    }
  },
  async mounted () {
      

  },
  methods: {
      registerUser(email, password){
        this.$emit('register-user', email, password);
      },
  },
}
</script>

<style scoped>
.test{
  
  margin-top: 5%;
  background: url(images/avion.jpg) no-repeat;
  width: 100%;
  background-size: cover;
  height: 80vh;
  opacity: 87%;
}

.col{
  
  
  text-align: center;
  
  
}

.hide-md-lg{
  font-family: 'Playfair Display', serif;
  color:#ebede4;
  font-size:55px;
  font-weight: 200;
  text-align: center;
}


.sign{
  margin-top: 20px;
}


</style>