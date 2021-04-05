<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="orange accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-on:click="fetchItems('all')">
        All
      </v-tab>

      <v-tab v-for="x in subcats" :key="x.id" v-on:click="fetchItems(x)">
        {{ x }}
      </v-tab>
    </v-tabs>
    <div class="flex">
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
              <v-card-actions @click="toProfile(x[6])" style="cursor: pointer">
                <v-list-item class="grow" style="font-weight: 700">
                  <v-list-item-avatar color="grey darken-3">
                    <img v-bind:src="x[5]" class="elevation-6" alt="" />
                  </v-list-item-avatar>
                  {{ x[3] }}
                </v-list-item>
              </v-card-actions>
              <v-row
                align="center"
                class="mx-0"
                style="margin-bottom: 10px; padding-left: 20px;"
              >
                <v-rating
                  v-bind:value="x[2]"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ml-4">
                  {{ x[2] }} ({{ x[4] }} reviews)
                </div>
              </v-row>
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                ></v-progress-linear>
              </template>

              <v-img height="250" v-bind:src="x[1].images[0]"></v-img>

              <v-card-title style="word-wrap:break-all">{{ x[1]["Title"] }}</v-card-title>

              <v-card-text>
                <div class="my-2 subtitle-1">
                  <strong>Location:</strong> {{ x[1]["Location"] }}
                </div>
                <div><strong>Price:</strong> ${{ x[1]["Price"] }} per {{x[1]['rent']['Interval']}}</div>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>
              <v-card-actions>
                <v-btn color="orange darken-2" text>
                  View
                </v-btn>
                <v-btn color="orange darken-2" text>
                  Contact
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <!-- <section v-for="(x, i) in items" v-bind:key="i">
        <div
          class="profile"
          v-bind:style="{
            backgroundImage:
              'url(' +
              'https://media.wired.com/photos/5b8999943667562d3024c321/master/w_2560%2Cc_limit/trash2-01.jpg' +
              ')',
          }"
        >
          {{ x[3] }}
          <v-rating
            v-bind:value="x[2]"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating
          >{{ x[2] }}
        </div>

        <img v-bind:src="x[1]['images']" /> {{ x.id }}
        <h2>{{ x[1]["Title"] }}</h2>
        {{x[1]}}
        {{ x.id }}

        <div v-if="x[1]['Price'] != ''" class="hh">${{ x[1]["Price"] }}</div>
        <div v-if="x[1]['sale']['Alternatives'] != '' && x[1]['Price'] != ''">
          -or-
        </div>
        <div v-if="x[1]['sale']['Alternatives'] != '' && x[1]['Price'] == ''">
          -trading for-
        </div>
        <div v-if="x[1]['sale']['Alternatives'] != ''" class="hh">
          {{ x[1]["sale"]["Alternatives"] }}
        </div>
        <i> {{ x[1]["Location"] }}</i>
        <aside>
          {{ profiles["id"] }}
        </aside>
      </section> -->
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase'
import firebase from "firebase";

export default {
  data() {
    return {
      items: [],
      profiles: [],
      subcats: ["Automobiles", "Property", "Books", "Games", "Electronics", "Miscellaneous"],
    };
  },
  methods: {
    toProfile: function(x) {
      this.$router.push({
        path: `/profile`,
        name: "profile",
        params: { user: x },
        props: true,
      });
    },
    fetchItems: function(x) {
      // database.collection('Listings').get()
      // firebase.firestore().collection('Listings').get()
      this.items = [];
      if (x === "all") {
        firebase
          .firestore()
          .collection("Listings")
          .where("Type", "==", "rent")
          .get()
          .then((querySnapShot) => {
            querySnapShot.forEach(async (doc) => {
              let item = doc.data();
              console.log(item.UserID);
              await firebase
                .firestore()
                .collection("users")
                .where("id", "==", item.UserID)
                .get()
                .then((res) => {
                  this.rating = res.docs[0].data().Rating;
                  this.name = res.docs[0].data().Name;
                  this.numRating = res.docs[0].data().numRatings;
                  this.profileURL = res.docs[0].data().ProfileURL;
                  this.items.push([
                    doc.id,
                    item,
                    this.rating,
                    this.name,
                    this.numRating,
                    this.profileURL,
                    item.UserID,
                  ]);
                });
            });
          });
        console.log(this.items);
      } else {
        firebase
          .firestore()
          .collection("Listings")
          .where("Type", "==", "rent")
          .where("Subcat", "==", x)
          .get()
          .then((querySnapShot) => {
            querySnapShot.forEach(async (doc) => {
              let item = doc.data();
              //console.log(item.UserID);
              await firebase
                .firestore()
                .collection("users")
                .where("id", "==", item.UserID)
                .get()
                .then((res) => {
                  this.rating = res.docs[0].data().Rating;
                  this.name = res.docs[0].data().Name;
                  this.numRating = res.docs[0].data().numRatings;
                  this.profileURL = res.docs[0].data().ProfileURL;
                  this.items.push([
                    doc.id,
                    item,
                    this.rating,
                    this.name,
                    this.numRating,
                    this.profileURL,
                    item.UserID,
                  ]);
                });
            });
          });
      }
      this.items.forEach((x) => {
        firebase
          .firestore()
          .collection("User")
          .doc(x[0])
          .get()
          .then((x) => {
            this.profiles.push(x);
          });
      });
    },
  },
  created() {
    this.fetchItems("all");
  },
};
</script>

<style scoped></style>
