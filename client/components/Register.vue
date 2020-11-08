<template>
 <div class="col">
        <div class="hide-md-lg">
          <p>Sign in:</p>
        </div>

        <input type="text" name="username" placeholder="Username" v-model = "userEmail" required>
        <input type="password" name="password" placeholder="Password" v-model = "userPassword" required>
        <input type="submit" value="Login" @click="registerUser(userEmail, userPassword)">
        user: {{userEmail}} password: {{userPassword}}
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