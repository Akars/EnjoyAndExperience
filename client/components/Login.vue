<template>
  <div>
    <div class="col">
            <div class="hide-md-lg">
              <p>Login: </p>
            </div>
            <div v-if = "userId === null">
            <input type="text" name="username" placeholder="Username" v-model = "userEmail" required>
            <input type="password" name="password" placeholder="Password" v-model = "userPassword" required>
            <input type="submit" value="Login" @click="loginUser(userEmail, userPassword, userId);">
            id : {{ userId}}
            </div>
                
            <div v-else>
                <p> You are connected </p>
            </div>
            user: {{userEmail}} password: {{userPassword}}
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