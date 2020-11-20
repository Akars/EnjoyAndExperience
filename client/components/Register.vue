<template>
<<<<<<< HEAD
<div class="cool">
  <div class="test">
    <div class="col">
      <div class="hide-md-lg">
      <h2>SIGN IN:</h2>
    </div>
    <div class="sign">
      <label><b>Username</b></label>
      <input class="textfield" type="text" name="username" placeholder="Enter Username" v-model = "userEmail" required>
    </div>
    <div class="sign">
      <label><b>Password</b></label>
      <input class="textfield" type="password" name="password" placeholder="Enter Password" v-model = "userPassword" required>
=======
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
>>>>>>> 68ddedf4c3ed45f1258829b46a8b7920794758ac
    </div>
    <div class="sign">
      <input class="buttonSignIn" type="submit" value="Login" @click="registerUser(userEmail, userPassword)">
    </div>
<<<<<<< HEAD
    <!--<div class="sign">
    user: {{userEmail}} password: {{userPassword}}
    </div>-->    
=======
    <div class="sign">
    </div>
>>>>>>> 68ddedf4c3ed45f1258829b46a8b7920794758ac
  </div>
</div>
  <div class="tee">
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
<<<<<<< HEAD
  background: url(../f.jpg) no-repeat;
=======
  
  margin-top: 5%;
  background: url(../images/avion.jpg) no-repeat;
  width: 100%;
>>>>>>> 68ddedf4c3ed45f1258829b46a8b7920794758ac
  background-size: cover;
  margin-top: 9vh;
  width: 100%;
  height: 70vh;
  border-bottom: 20vh;
}

.col{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 26%;
  margin: auto;
  background-color:rgb(0, 0, 0, 0.1);
  color: white;
  padding: 20px;
  box-shadow: 0px 2px 8px 2px #555;
  border-radius: 6px;
  box-sizing: border-box;
}

.col h2{
  text-align: center;
  letter-spacing: 1px;
  font-family: 'Arbutus Slab';
  color: white;
  font-size: 35px;
  margin-bottom: 50px;
}

.sign label{
  text-transform: uppercase;
  font-family: 'Arbutus Slab';
  color: white;
  font-size:18px;
  letter-spacing: 2px;
}

.col{
  padding: 40px;;
}

input{
  width: 100%;
  padding: 8px 12px;
  margin: 8px 0px;
  display: inline-block;
  box-sizing: border-box;
  background-color: transparent;
  border: 1px solid white;
  margin-bottom: 30px;
  font-size:18px;
}

input:focus{
  outline: none;
}

.buttonSignIn{
  padding: 12px 20px;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 1px;
  font-size:18px;
}

.buttonSignIn:hover{
  background: rgba(0,0,0,0.5);
}

.tee{
  background-color: white;
  height: 10vh;

}


</style>