<template>
  <div style="margin-top: 50px">
    <h1>Post your listing</h1>
    <br />
    <div id="commonOptions">
      <!-- <v-radio-group v-model="radioGroup"></v-radio-group> -->
      <h2><i>1. Choose a listing type</i></h2>
      <input
        type="radio"
        id="sale"
        name="listingtype"
        v-on:click="selectedType = 'sale'"
        checked
      /> I am selling/trading an item
      <input
        type="radio"
        id="rent"
        name="listingtype"
        v-on:click="selectedType = 'rent'"
      /> I am renting an item
      <input
        type="radio"
        id="service"
        name="listingtype"
        v-on:click="selectedType = 'service'"
      /> I am providing a service

      
      <h2>2. Choose your sub-category</h2>
      <div
        v-show="selectedType === 'sale'"
        v-for="x in subcat_sales"
        :key="x.id"
      >
        <input
          type="radio"
          name="subcat"
          v-on:click="selectedSubcat = x"
          checked="checked"
          required
        /> {{ x }}
      </div>
      <div
        v-show="selectedType === 'rent'"
        v-for="x in subcat_rent"
        :key="x.id"
      >
        <input
          type="radio"
          name="subcat"
          v-on:click="selectedSubcat = x"
          checked="checked" 
          required
        /> {{ x }}
      </div>
      <h2><i>3. Give your listing a title</i></h2>
      <input
        type="text"
        id="listingname"
        maxlength="50"
        size="70"
        placeholder="no more than 50 chars"
        v-model="title"
      />
      <h2><i>4. Describe your listing</i></h2>
      <textarea
        type="text"
        rows="8"
        cols="70"
        v-model="desc"
      ></textarea>
      <h2><i>5. Location where you want to deal</i></h2>
      <input
        type="text"
        id="listingloc"
        maxlength="50"
        size="70"
        placeholder="no more than 50 chars"
        v-model="loc"
      />
      <h2><i>6. Upload your pictures:</i></h2>
      <div v-if="imgcount>0">You can upload more than one photo by clicking on the upload button again.</div>
      <br />
      <div>
        <div>
          <v-btn @click="click1">Upload from Computer</v-btn>
          <input
            type="file"
            ref="input1"
            style="display: none"
            @change="previewImage"
            accept="image/*"
          />
        </div>
        <div v-if="imageData != null">
          <img class="preview" height="268" width="356" :src="img1" /><br />
        </div>
      </div>
    </div>
    <div id="additionalOptions" v-show="selectedType === 'sale'">
      <h2><i>7. Name your price and/or trades</i></h2>
      $<v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <input type="number" step="0.01" v-model="price" v-bind="attrs" v-on="on" />
          </template>
        <span>Price field is optional if you just want to purely trade for another item</span>
      </v-tooltip><br />
      -or-<br />
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <input type="text" maxlength="50" size="70" v-model="alt_trade" v-bind="attrs" v-on="on" placeholder="item you want to trade for"/>
          </template>
        <span>This field is optional if you want a purely monetary transaction</span>
      </v-tooltip>
      <h2><i>8. Name your transaction/delivery preferences</i></h2>
      <input
        type="text"
        placeholder="e.g. pick up at mrt, cash only, etc"
        size="70"
        v-model="trans_method"
      /><br />
      <v-btn v-on:click="submitListing('sale')">Submit</v-btn>
    </div>
    <div id="additionalOptions" v-show="selectedType === 'rent'">
      <h2><i>7. Name your price</i></h2>
      <br />
      $ <input type="number" step="0.01" v-model="price" /> per
      <select v-model="interval" required>
        <option
          v-for="x in rent_intervals"
          :key="x.id"
          v-bind:value="x"
          >{{ x }}</option
        >
      </select>
      <h2><i>8. Name your rules</i></h2>
      <br />
      <textarea type="text" rows="8" cols="70" v-model="tnc"></textarea><br />
      <v-btn v-on:click="submitListing('rent')">Submit</v-btn>
    </div>
  </div>
</template>

<script>
// import database from '../firebase.js'
import firebase from "firebase";

export default {
  components: {},
  name: "NewListing",
  data() {
    return {
      imgcount: 0, 
      radioGroup: "",
      listing: {},
      selectedType: "sale",
      selectedSubcat: "Miscellaneous",
      title: "",
      desc: "",
      loc: "",
      price: "",
      alt_trade: "",
      trans_method: "",
      subcat_sales: [
        "Mobile & Electronics",
        "Hobbies & Games",
        "Sports",
        "Education",
        "Fashion",
        "Miscellaneous"
      ],
      subcat_rent: ["Automobiles", "Property", "Books", "Games", "Electronics", "Miscellaneous"],
      rent_intervals: ["hour", "day", "week", "month", "year"],
      interval: "hour",
      tnc: "",
      img1: "",
      imageData: null,
      imgurls: [],
    };
  },
  methods: {
    submitListing: function(x) {
      this.listing["Type"] = this.selectedType;
      this.listing["Subcat"] = this.selectedSubcat;
      this.listing["Title"] = this.title;
      this.listing["Description"] = this.desc;
      this.listing["Location"] = this.loc;
      this.listing["Price"] = this.price;
      this.listing["UserID"] = localStorage.getItem("UID");
      this.listing["images"] = this.imgurls;
      if (x === "sale") {
        var others = {};
        others["Alternatives"] = this.alt_trade;
        others["Transaction method"] = this.trans_method;
        this.listing["sale"] = others;
      } else if (x === "rent") {
        var others2 = {};
        others2["Interval"] = this.interval;
        others2["Terms and Conditions"] = this.tnc;
        this.listing["rent"] = others2;
      }
      // firebase.database().ref('Listings').push(this.listing).then(
      //     ()=>
      //         {location.reload()});
      if (this.title===''||this.imgurls.length===0||this.desc==='') {
        alert('Please fill in your title/description and upload your images')
      } else {
      firebase
        .firestore()
        .collection("Listings")
        .add(this.listing)
        .then(() => {
          location.reload();
        });
      console.log(this.listing); }
    },
    // create () {
    //     const post = {
    //         photo: this.img1,
    //         caption: this.caption
    //     }
    //     firebase.database().ref('PhotoGallery').push(post)
    //     .then((response) => {
    //         console.log(response)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // },
    click1() {
      this.$refs.input1.click();
    },
    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },
    onUpload() {
      this.img1 = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img1 = url;
            this.imgurls.push(this.img1);
            console.log("imgurl array "+this.imgurls);
            this.imgcount++; 
          });
        }
      );
      // console.log("ran")
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 50px;
  font-weight: 600;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
h2 {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #e09d20;
  padding-top:20px
}
#additionalOptions,
#commonOptions {
  text-align: center;
}
textarea {
  background-color: #fff8e1
}
</style>
