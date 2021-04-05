<template>
  <div>
    <v-card class="mx-auto" max-width="1000" tile>
      <v-img
        height="200"
        src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
      ></v-img>
      <v-row style="margin:2.5%;position:absolute; top: 130px">
        <v-list-item>
          <v-list-item-avatar size="100">
            <img v-bind:src="profile" v-bind:alt="name" />
          </v-list-item-avatar>
          <v-list-item-content style="padding-top: 50px; width: 300px">
            <h5>{{ name }}</h5>

            <!-- <v-list-item-title class="title" style="margin-top:20px;">Injamamul Haque Sonet</v-list-item-title>
            <v-list-item-subtitle>Software Engineer | dokanee</v-list-item-subtitle> -->
          </v-list-item-content>
          <template>
            <v-row style="padding-left: 30px">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-2"
                    fab
                    dark
                    small
                    color="orange"
                    style="margin-top:30px;"
                    v-on="on"
                    v-bind="attrs"
                  >
                    <v-icon dark>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">User Profile</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            label="Name*"
                            required
                            v-bind:value="name"
                            v-model="name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-col cols="12" md="12">
                            <v-textarea
                              solo
                              name="input-7-4"
                              label="Biography / about"
                              v-bind:value="biography"
                              v-model="biography"
                            ></v-textarea>
                          </v-col>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="
                        dialog = false;
                        updateUser();
                      "
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </template>
        </v-list-item>
      </v-row>
      <h4 style="padding-top: 70px; text-align: left; padding-left: 50px;">
        About:
      </h4>
      <h4 v-if="biography === ''">
        You have no biography yet! lets fill in some!
      </h4>

      <h4
        style="text-align: left; padding-left: 50px;font-size: 17px; padding-bottom: 40px"
      >
        {{ biography }}
      </h4>
    </v-card>
    <v-btn
      text
      style="margin-top: 20px; height: 100px; width: 150px"
      @click="toListing"
    >
      <v-icon dark color="orange">
        mdi-plus
      </v-icon>
      New listing
    </v-btn>
    <UserListings
      v-bind:user="user"
      v-bind:profile="true"
      v-bind:rating="rating"
      v-bind:numRatings="numRatings"
      v-bind:name="name"
      v-bind:profileURL="profile"
    ></UserListings>
  </div>
</template>

<script>
import firebase from "firebase";
import UserListings from "./UserListings";

export default {
  props: ["user"],
  data() {
    return {
      name: "",
      email: "",
      profile: "",
      rating: 0,
      biography: "",
      dialog: false,
    };
  },
  components: {
    UserListings,
  },
  created() {
    console.log(this.user);
    firebase
      .firestore()
      .collection("users")
      .where("id", "==", this.user)
      .get()
      .then((res) => {
        const data = res.docs[0].data();
        this.name = data.Name;
        this.email = data.Email;
        this.profile = data.ProfileURL;
        this.rating = data.Rating;
        this.biography = data.Biography;
        this.rating = data.Rating;
        this.numRatings = data.numRatings;
        console.log(this.name);
      });
  },
  methods: {
    updateUser: function() {
      console.log(this.biography);
      firebase
        .firestore()
        .collection("users")
        .doc(this.user)
        .update({
          Name: this.name,
          Biography: this.biography,
        });
    },

    toListing: function() {
      this.$router.push({ path: `/newListing`, name: "newListing" });
    },
  },
};
</script>

<style scoped>
#mx-auto {
  position: absolute;
  top: 50px;
}
</style>
