<template>
<div class="cool">
  <div class="test">
    <div class="col">
      <div v-if = "user === null">
        <div class="hide-md-lg">
          <h2>SIGN UP:</h2>
        </div>
        <div class="sign" >
          <label><b>Username</b></label>
          <input class="textfield" type="email" id = "email" name="email" placeholder="Enter email" v-model = "userEmail" required>
        </div>
        <div class="sign">
          <label><b>Password</b></label>
          <input class="textfield" type="password" name="password" placeholder="Enter Password" v-model = "userPassword" required>
        </div>
        <div class="sign">
          <input class="buttonSignIn" type="submit" value="Login" @click="registerUser(userEmail, userPassword)">
        </div>
      </div>
      <div v-else>
                <h1>Welcome! {{user.email}}</h1>
             
        <button class = "logout" @click="logout()">Logout</button>
      </div>
          
    </div>
  </div>
  <div class="tee"></div>
  
</div>

</template>

<script>
module.exports = {
  props: {
    trips: { type: Array, default: []},
    panier:{type: Object},
    user: {type: Object}
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
      goToLogin(){
        window.location.href = "index.html#/login"
      },
      logout(){
        this.$emit('logout');
      }
  },
}
</script>

<style scoped>
.test{
  background: url(../images/n.webp) no-repeat;
  background-size: cover;
  margin-top: 90px;
  width: 100%;
  height: 70vh;
  border-bottom: 20vh;
}

.col{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  margin: auto;
  background-color:rgb(0, 0, 0, 0.1);
  color: white;
  padding: 20px;
  box-shadow: 0px 2px 8px 2px #555;
  border-radius: 6px;
  box-sizing: border-box;
}

.col h1{
    font-size: 1.5rem;
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
  color: white; 
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
  color: white;
}

.buttonSignIn:hover{
  background: rgba(0,0,0,0.5);
}


.logout{
  width: 100%;
  padding: 12px 20px;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 1px;
  font-size:18px;
  color: white;
  background-color: transparent;
}


.logout:hover{
  background: rgba(0,0,0,0.5);
}

.tee{
  background-color: white;
  height: 10vh;

}

::placeholder {
  color: #dce3e6;
}



</style>