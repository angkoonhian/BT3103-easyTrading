<template>
  <div>
    <Header></Header>
    Your Listings
    
    <div class="flex">
      <section v-for="x,i in items" v-bind:key="i">
        
    
        <img
          v-bind:src="x[1]['images']"
        /> {{x.id}}
        <h2>{{x[1]['Title']}}</h2>
        <!-- {{x[1]}} -->
    
         
        <aside>
          {{x[0]}}
          <!-- {{x[2]}} -->
        </aside>
      </section>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "../components/Header";

export default {
  data() {
    return {
      items: [],
    };
  },
  components: {
    Header,
  },
  methods: {
    fetchItems: function() {
      // database.collection('Listings').get()
      // firebase.firestore().collection('Listings').get()
      this.items = [];
    //   console.log("hey")
      console.log(localStorage.getItem('UID')); 
      let x = localStorage.getItem('UID'); 
        firebase
        .firestore()
        .collection("Listings").where('UserID', '==', x)
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            // console.log("executed: "+item);
            this.items.push([doc.id, item]);
          })
          
        });
      
    },
  },
  created() {
    this.fetchItems();
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
  word-break: break-all;
}

.flex > section {
  background: #fff;
  padding: 1em;
  margin: 0.5em;
  border-radius: 4px;
  box-shadow: 0px 0px 15px #aaaaaa;
}

.flex > section:hover {
  box-shadow: 0px 0px 20px #3d3d3d;
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
  background-position: 2em 50%;
  background-size: 2em;
  border: 0;
  cursor: pointer;
  color: rgb(0, 0, 0);
  /* font-size: 13px; */
  padding: 0em 13em;
  padding-left: 5em;
  display: block;
  width: 70%;
}
</style>
