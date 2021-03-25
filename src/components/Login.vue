<template>
  <div>
      <h1 class="welcome">Welcome to Easy Trading :)</h1>
      <img id="bg" src="../assets/login1.jpg">
      <img class="right" style="z-index: 0" src="../assets/white.png">
      <div class="right">
          <img src="../assets/logo.png" class="logo">
          <input class="input1" onfocus="value=''" value="Username" v-model="username"/>

          <input class="input2" onfocus="value=''" value="Password" v-model="password"/>
          <button class="but" @click="login">Login</button>
          <p class="cut">____________OR____________</p>
          <div @click="socialLogin">
              <img id="icon" src="../assets/google.png">
              <p class="other">Login by Google</p>
          </div>
          <h1></h1>
      </div>      
  </div>
</template>

<script>
import firebase from "firebase"
//import { mapActions, mapGetters } from 'vuex';

export default ({
    data() {
        return {
            Username: '',
            password: ''
        }
    },
    methods: {
        login: function() {
            // Login with email and password
            try {
                firebase.auth().signInWithEmailAndPassword(this.username, this.password).then(
                    user => {
                        console.log(user.data);
                        this.$router.push('/sales')
                    }
                )
            } catch (err) {
                alert(err);
            }
            
        },
        socialLogin: function() {
            // Login wtih socialLogin
            const provider = new firebase.auth.GoogleAuthProvider();
                try {
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then(() => {
                        console.log("loggin done");
                        this.$router.push('/newListing')
                    });
                } catch (error) {
                    alert(error.message)
                    console.log(error);
                }
        }
    },
    components:{
    }
})
</script>

<style scoped>
#bg {
    position: fixed;
    width: 1200px;
    left:0px;
    top:0px;
    height: 100%;
}
.right {
    position:absolute;
    right:0px;    
    top:0px;
    height: 100%;
    width: 55%;
}
.welcome {
  position: absolute;
  top: 8px;
  left: 16px;
  color:antiquewhite;
  z-index: 1000;
}
.logo {
    width: 300px;
    position:absolute;
    top:17%;
    left: 25%;
}
.input1 {
    position: absolute;
    margin: 10px;
    top:30%;
    left: 25%;
      font-family: inherit;
  width: 250px;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  color: rgb(193, 183, 183);
  padding: 7px 0;
  
}
.input2 {
    position: absolute;
    margin: 10px;
    top:40%;
    left: 25%;
    width: 250px;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  color: rgb(193, 183, 183);
  padding: 7px 0;
}
.cut {
    position: absolute;
    margin: 10px;
    top:65%;
    left: 25%;
    width: 250px;  
    color:#9b9b9b;    
}
.other {
    position: absolute;
    margin: 10px;
    top:71%;
    left: 28%;
    width: 250px; 
    font-style: bolder;
    color:rgba(201, 136, 24, 0.851);   
    text-align: center;  
}

.but {
    position: absolute;
    margin: 10px;
    top:52%;
    left: 25%;
    width: 250px; 
    height: 40px;
    border:0px;
    font-weight: 6px;
    color:rgb(249, 249, 249);
    border-radius: 15px;
    background-color:rgba(201, 136, 24, 0.851);       
}

#icon {
    position: absolute;
    margin: 10px;
    top:70%;
    left: 30%;
    width: 250px; 
    height: 40px;
    width: 40px;
}

</style>