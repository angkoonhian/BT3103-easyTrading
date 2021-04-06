<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="rgb(239, 117, 47)">
                        <v-toolbar-title>Register Form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              prepend-icon="person"
                              name="login"
                              label="Login"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              id="password"
                              prepend-icon="lock"
                              name="password"
                              label="Password"
                              type="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="rgb(239, 117, 47)" @click="register()" style="margin-left:80px"><span style="color:white;text-align:center;line-height: 60px;">Register</span></v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>


<script>
import firebase from "firebase";
import { db } from "../firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    register: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((cred) => {
          return db
            .collection("users")
            .doc(cred.user.id)
            .set({
              Email: cred.user.email,
              Rating: 0,
              id: cred.user.id,
            });
        })
        .catch((error) => {
          console.error(error);
        });
      this.$router.push("/sales");
    },
  },
  components: {},
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
