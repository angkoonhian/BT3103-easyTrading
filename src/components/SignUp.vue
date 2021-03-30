<template>
  <div class="form">
      <h1 class="title">Register</h1>
      <div class="tile is-vertical is-4">
          <b-field label="Email">
              <b-input icon="email" type="email" v-model="email"/>
          </b-field>
          <b-field label="password">
              <b-input type="password" password-reveal v-model="password"/>
          </b-field>
          <b-button class="is-primary" @click="register()">Register</b-button>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import database from '../firebase';
export default ({
    data() {
        return {
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        register: function() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                    return database.collection('users').doc(cred.user.id).set({
                        Email: cred.user.email,
                        Rating: 0,
                        id: cred.user.id
                    })
                })
                .catch((error) => {
                    console.error(error)
                })
            this.$router.push('/sales')
        }
    },
    components:{
    }
})
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>