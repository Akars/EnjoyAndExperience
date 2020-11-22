<template>
<div class="cool">
  <div class = "test">
    <div class="col">
            <div class="hide-md-lg">
              <h2>Login: </h2>
            </div>
            <div v-if = "user === null">
              <div class="sign">
                <input type="text" name="username" placeholder="Username" v-model = "userEmail" required>
              </div>
              <div class="sign">
                <input type="password" name="password" placeholder="Password" v-model = "userPassword" required>
              </div>
              <div class="sign">
                <input class="buttonSignIn" type="submit" value="Login" @click="loginUser(userEmail, userPassword);">
              </div>
              <a href = "index.html#/register" class = "navigation">NOT REGISTERED YET ?</a>
            </div>
            <div v-else>
              <h1>Welcome back! {{user.email}}</h1>
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
    user: {type: Object},
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
    loginUser(email, password){
      this.$emit('login-user', email, password);
    },
    getUserId(){
      this.$emit('get-user-id')
    },
    goToHome(){
      window.location.href = "index.html#/"
    },
    logout(){
      this.$emit('logout');
    },
  },
}
</script>

<style scoped>
.test{
  background: url(../images/r.jpg) no-repeat;
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

.col{
  margin-top: 3rem;
  padding: 0px;
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
  color: white;
}

.buttonSignIn:hover{
  background: rgba(0,0,0,0.5);
}

.tee{
  background-color: white;
  height: 10vh;

}

::placeholder {
  color: #dce3e6;
}

.navigation{
  color: #eaf2cb;
  transition: all 0.3s ease 0s;
}






</style>