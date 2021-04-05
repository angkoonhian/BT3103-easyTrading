<template>
  <div>
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
            <v-card-actions>
              <v-list-item class="grow" style="font-weight: 700">
                <v-list-item-avatar color="grey darken-3">
                  <img v-bind:src="profileURL" class="elevation-6" alt="" />
                </v-list-item-avatar>
                {{ name }}
              </v-list-item>
            </v-card-actions>
            <v-row
              align="center"
              class="mx-0"
              style="margin-bottom: 10px; padding-left: 20px;"
            >
              <v-rating
                v-bind:value="rating"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ml-4">{{ rating }} ({{ numRatings }})</div>
            </v-row>
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img height="250" v-bind:src="x[1].images[0]"></v-img>

            <v-card-title>{{ x[1]["Title"] }}</v-card-title>

            <v-card-text>
              <div class="my-2 subtitle-1">
                <strong>Location:</strong> {{ x[1]["Location"] }}
              </div>
              <div class="subtitle-1">
                <strong>Type:</strong> {{ x[1]["Type"] }}
              </div>
              <div><strong>Description:</strong> {{ x[1]["Description"] }}</div>
              <div><strong>Options:</strong> ${{ x[1]["Price"] }}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            <v-card-actions>
              <v-btn color="orange darken-2" text>
                View
              </v-btn>
              <v-btn color="orange darken-2" text v-if="profile">
                Contact
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

export default {
  props: ["user", "profile", "rating", "numRatings", "name", "profileURL"],
  data() {
    return {
      items: [],
    };
  },
  components: {},
  methods: {
    fetchItems: function() {
      // database.collection('Listings').get()
      // firebase.firestore().collection('Listings').get()
      this.items = [];
      firebase
        .firestore()
        .collection("Listings")
        .where("UserID", "==", this.user)
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
  },
  created() {
    console.log(this.user);
    this.fetchItems();
    console.log(this.items[0][1]["images"]);
  },
};
</script>

<style scoped></style>
