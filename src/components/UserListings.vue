<template>
  <div>
    <v-btn
      v-show="this.user === this.currentid"
      text
      style="margin-top: 20px; height: 100px; width: 150px"
      v-on:click="toListing"
    >
      <v-icon dark color="orange">
        mdi-plus
      </v-icon>
      New listing
    </v-btn>
    <CfmDlg ref="confirm" />


    <div class="flex">
      <v-row style="">
        <v-col
          v-for="(x, i) in items"
          v-bind:key="i"
          col="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card :loading="loading" class="mx-auto my-12" max-width="374">
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img height="250" v-bind:src="x[1].images[0]">
              <div class="hh">for {{ x[1]["Type"] }}</div>
            </v-img>

            <v-card-title>{{ x[1]["Title"] }}</v-card-title>

            <v-card-text>
              <div class="my-2 subtitle-1">
                <strong>Deal at:</strong> {{ x[1]["Location"] }}
              </div>
              <div class="my-2">
                <strong>Posted:</strong>
                <timeago
                  :datetime="x[1]['date'].toDate()"
                  :auto-update="60"
                  style="padding-left: 5px; font-weight: 100; font-size: 15px"
                ></timeago>
              </div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            <v-card-actions>
              <v-btn
                color="orange darken-2"
                text
                @click="getItemPage(x[0], user)"
                v-if="x[1]['Type'] === 'sale'"
              >
                view
              </v-btn>
              <v-btn
                color="orange darken-2"
                text
                @click="getItemRentalPage(x[0], user)"
                v-if="x[1]['Type'] === 'rent'"
              >
                view
              </v-btn>
              <v-btn
                v-show="isSameUser"
                color="orange darken-2"
                text
                v-on:click="route(x[0])"
              >
                edit
              </v-btn>
              <v-btn
                v-show="isSameUser"
                color="orange darken-2"
                text
                @click="delRecord(x[0])"
              >
                delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    
  </div>
</template>

<script>
import firebase from "firebase";
import CfmDlg from "./CfmDlg";

export default {
  props: [
    "user",
    "profile",
    "rating",
    "numRatings",
    "name",
    "profileURL",
    "isSameUser",
  ],
  data() {
    return {
      currentid: localStorage.UID,
      items: [],
      imgurls: [],
    };
  },
  components: { CfmDlg },
  methods: {
    getItemRentalPage: function(listingID, userId) {
      this.$router.push({
        name: "itemPageRent",
        params: { listing: listingID, userId: userId },
      });
    },
    getItemPage: function(listingID, userId) {
      this.$router.push({
        name: "itemPage",
        params: { listing: listingID, userId: userId },
      });
    },
    toListing: function() {
      this.$router.push({ path: `/newListing`, name: "newListing" });
    },
    deleteImage: function(img) {
      this.imgurls = this.imgurls.filter(function(value) {
        return value != img;
      });
    },
    fetchItems: function() {
      // database.collection('Listings').get()
      // firebase.firestore().collection('Listings').get()
      this.items = [];
      firebase
        .firestore()
        .collection("Listings")
        .where("UserID", "==", this.user)
        .orderBy("date", "desc")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            console.log(item);
            // console.log("executed: "+item);
            this.items.push([doc.id, item]);
          });
        });
    },
    async delRecord(x) {
      if (
        await this.$refs.confirm.open(
          "Confirm Deletion",
          "Are you sure you want to delete this listing permanently?"
        )
      ) {
        this.deleteRecord(x);
      }
    },
    deleteRecord(x) {
      firebase
        .firestore()
        .collection("Listings")
        .doc(x)
        .delete()
        .then(() => location.reload());
    },
    route: function(x) {
      this.$router.push({ name: "edit", params: { doc_id: x } });
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>

<style scoped>
.hh {
  background: rgb(255, 153, 0);
  color: #fff;
  font-weight: 700;
  padding: 0.3em 0.6em;
  border-radius: 0em;
  display: flex;
  font-size: 100%;
  word-break: break-all;
}
</style>
