<template>
  <v-card class="mx-auto" max-width="1000" tile>
      <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"></v-img>
      <v-row style="margin:2.5%;position:absolute; top: 130px">
        <v-list-item>
        <v-list-item-avatar size="100">
            <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="John"
            >
        </v-list-item-avatar>
        <v-list-item-content>
            Hi! {{this.name}}
            <!-- <v-list-item-title class="title" style="margin-top:20px;">Injamamul Haque Sonet</v-list-item-title>
            <v-list-item-subtitle>Software Engineer | dokanee</v-list-item-subtitle> -->
        </v-list-item-content>
        </v-list-item>
    </v-row>
  </v-card>
</template>

<script>

export default {
  data() {
    return {
        name:"",
        email:""
    }
  },
  created() {
    this.loginState = localStorage.getItem("login");
    console.log(localStorage.getItem("login"));
    if (localStorage.getItem("login") == "true") {
      this.name = localStorage.getItem("username");
      this.email = localStorage.getItem("email");
    } 
  }
}

</script>


<style scoped>
#mx-auto {
    position: absolute;
    top:50px;
}
</style>