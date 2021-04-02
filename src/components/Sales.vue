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
      <section v-for="(x, i) in items" v-bind:key="i">
         
        <div
          class="profile"
          v-bind:style="{
            backgroundImage:
              'url(' +
              'https://media.wired.com/photos/5b8999943667562d3024c321/master/w_2560%2Cc_limit/trash2-01.jpg' +
              ')',
          }"
        >desmond
          <v-rating
            :value="3"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
          ></v-rating>
        </div>
        
        <img v-bind:src="x[1]['images']" /> {{ x.id }}
        <h2>{{ x[1]["Title"] }}</h2>
        <!-- {{x[1]}} -->
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
          <!-- {{ x[1]["UserID"] }} -->
          {{ profiles["id"] }}
        </aside>
      </section>
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
      subcats: [
        "Mobile & Electronics",
        "Hobbies & Games",
        "Sports",
        "Education",
        "Fashion",
      ],
    };
  },
  methods: {
    fetchItems: function(x) {
      // database.collection('Listings').get()
      // firebase.firestore().collection('Listings').get()
      this.items = [];
      if (x === "all") {
        firebase
          .firestore()
          .collection("Listings")
          .get()
          .then((querySnapShot) => {
            let item = {};
            querySnapShot.forEach((doc) => {
              item = doc.data();
              // console.log("executed: "+item);
              this.items.push([doc.id, item]);
            });
          });
        // console.log(this.items);
        console.log(this.profiles);
      } else {
        firebase
          .firestore()
          .collection("Listings")
          .where("Subcat", "==", x)
          .get()
          .then((querySnapShot) => {
            let item = {};
            querySnapShot.forEach((doc) => {
              item = doc.data();
              // console.log("executed: "+item);
              this.items.push([doc.id, item]);
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

<style scoped>
/* Flex-related code */
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Or space-between or space-around */
}

.flex > section {
  align-items: center;
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  text-align: center;
  max-width: 400px;
}

.flex > section > p {
  flex-grow: 1;
}

.flex > section > h4 {
  text-align: left;
}

/* This rule ist just because of the responsive images */
@media (max-width: 1600px) {
  .flex > section {
    max-width: 250px;
  }
}

/* .flex div {
  display: flex;
  justify-content: space-between;
} */

.flex aside {
  width: 100%;
}

/* Basic styling for UI */

body {
  font: 16px "Titillium Web", sans-serif;
  margin: 0;
}

img {
  width: 400px;
}

@media (max-width: 1600px) {
  img {
    width: 282px;
  }
}

/* nav {
  background: #330099;
}

nav ul {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav ul li {
  flex-grow: 1;
}

nav ul li a {
  text-align: center;
  color: #fff;
  padding: 0.5em;
  display: block;
  text-transform: uppercase;
  text-decoration: none;
}

nav ul li a.active {
  background: #24006B;
}

nav ul li a:hover {
  background: #AA80FF;
  color: #000;
  font-weight: 700;
}

header {
  text-align: center;
}

h1 {
  color: #777380;
  font-weight: 200;
  font-size: 35px;
}
*/

h2 {
  font-size: 25px;
  word-wrap: break-all;
}

.flex > section {
  background: #fff;
  padding: 0em;
  margin: 0.5em;
  border-radius: 10px;
  box-shadow: 0px 0px 15px #aaaaaa;
}

.flex > section:hover {
  box-shadow: 0px 0px 20px #ffa600;
}

button:hover {
  background-color: #006b6b;
  background-size: 3em;
  background-position: 1.5em 50%;
}

.hh {
  background: rgb(255, 153, 0);
  color: #fff;
  font-weight: 700;
  padding: 0.3em 0.6em;
  border-radius: 1em;
  display: flex;
  font-size: 120%;
  word-break: break-all;
}

.profile {
  text-align: left;
  background-repeat: no-repeat;
  background-position: 0.5em 50%;
  background-size: 2em;
  border: 0;
  cursor: pointer;
  color: rgb(0, 0, 0);
  /* font-size: 13px; */
  /* padding: -5em 150em; */
  padding-left: 3em;
  padding-top: 0.5em;
  display: block;
  width: 100%;
}
</style>
