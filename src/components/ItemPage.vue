<template>
  <div>
    <br />
    <br />
    <h1 v-for="(x, i) in itemInfo" v-bind:key="i">
      {{ x[1].Title }} for {{ x[1].Type }}
    </h1>
    <v-container>
      <v-row no-gutters>
        <v-col v-for="(x, i) in itemInfo" v-bind:key="i" md="12">
          <v-card color="grey lighten-4">
            <v-card-text>
              <v-row no-gutters>
                <v-col md="6">
                  <v-card color="grey lighten-4">
                    <v-img
                      height="600"
                      :width="600"
                      v-bind:src="x[1].images[0]"
                    ></v-img>
                  </v-card>
                </v-col>
                <v-col md="6">
                  <v-card color="grey lighten-4">
                    <v-card-actions>
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

                      <div>{{ x[2] }} ({{ x[4] }} reviews)</div>
                    </v-row>
                    <v-card-text class="text-left">
                      <p><strong>Options:</strong> ${{ x[1]["Price"] }}</p>
                      <p>
                        <strong>Transaction method:</strong>
                        {{ x[1]["sale"]["Transaction method"] }}
                      </p>
                      <p>
                        <strong>Description:</strong> {{ x[1]["Description"] }}
                      </p>
                      <p>
                        <strong>Alternatives:</strong>
                        {{ x[1]["sale"]["Alternatives"] }}
                      </p>
                      <p><strong>Location:</strong> {{ x[1]["Location"] }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="warning">
                Chat Now
              </v-btn>
              <v-btn color="white">
                See all reviews
              </v-btn>
              <v-btn color="error">
                Report Listing
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// import firebase from 'firebase'
import firebase from "firebase";

export default {
  props: ["listing"],
  data() {
    return {
      itemInfo: [],
      rating: 0,
      name: "",
      numRatings: 0,
      profileURL: "",
      user: localStorage.UID,
    };
  },
  methods: {
    fetchItem: function(listing) {
      this.itemInfo = [];
      firebase
        .firestore()
        .collection("Listings")
        .doc(listing)
        .get()
        .then((doc) => {
          let item = doc.data();
          console.log(item.UserID);
          firebase
            .firestore()
            .collection("users")
            .where("id", "==", item.UserID)
            .get()
            .then((res) => {
              this.rating = res.docs[0].data().Rating;
              this.name = res.docs[0].data().Name;
              this.numRating = res.docs[0].data().numRatings;
              this.profileURL = res.docs[0].data().ProfileURL;
              this.itemInfo.push([
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
      console.log(this.itemInfo);
    },
  },
  components: {},
  created() {
    this.fetchItem(this.listing);
  },
};
</script>

<style scoped>
/*  */
</style>
