<template>
  <b-container
    class="bv-example-row bv-example-row-flex-cols"
    style="padding-top: 50px;"
  >
    <v-card elevation="2" style="padding-bottom: 100px">
      <b-row align-h="center">
        <b-col cols="8">
          <v-col cols="2" md="2">
            <v-avatar color="primary" size="56">
              <img v-bind:src="userProfile" />
            </v-avatar>
          </v-col>
          <v-col cols="10" md="10">
            <v-textarea
              solo
              name="input-7-4"
              label="Review on this seller"
            ></v-textarea>
            <v-btn color="warning">
              POST REVIEW
            </v-btn>
          </v-col>
        </b-col>
      </b-row>
    </v-card>
  </b-container>
</template>
<script>
import firebase from "firebase";

export default {
  props: ["user"],
  data() {
    return {
      userProfile: "",
    };
  },
  setup() {},
  methods: {
    getAvatar: function() {
      firebase
        .firestore()
        .collection("users")
        .doc(this.user)
        .get()
        .then((res) => {
          this.userProfile = res.data().ProfileURL;
        });
    },
  },
  created() {
    this.getAvatar();
  },
};
</script>
<style scoped></style>
