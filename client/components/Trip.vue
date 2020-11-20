<template>
  <div class = "test">
    <div class="col">
            <div class="hide-md-lg">
              <p>Login: </p>
            </div>
            <div v-if = "userId === null">
              <div class="sign">
                <input type="text" name="username" placeholder="Username" v-model = "userEmail" required>
              </div>
              <div class="sign">
                <input type="password" name="password" placeholder="Password" v-model = "userPassword" required>
              </div>
              <div class="sign">
                <input type="submit" value="Login" @click="loginUser(userEmail, userPassword, userId);">
              </div>
              <a href = "index.html#/register" class = "navigation">NOT REGISTERED YET ?</a>
            </div>
                
            <div v-else>
                <p> You are connected </p>
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
