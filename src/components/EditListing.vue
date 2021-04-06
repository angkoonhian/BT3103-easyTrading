<template>
  <div style="margin-top: 50px">
    <h1>Edit your listing</h1>
    <br />
    <div id="commonOptions">

      
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
          selected="selected"
          required
        />{{ x }}
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
          required
        />{{ x }}
      </div>
      <h2><i>3. Give your listing a title</i></h2>
      <br />
      <input
        type="text"
        id="listingname"
        maxlength="50"
        size="70"
        placeholder="no more than 50 chars"
        v-model="title"
      />
      <h2><i>4. Describe your listing</i></h2>
      <br />
      <textarea
        type="text"
        rows="8"
        cols="70"
        v-model="desc"
        style="background-color: #f9f9f9"
      ></textarea>
      <h2><i>5. Location where you want to deal</i></h2>
      <br />
      <input
        type="text"
        id="listingloc"
        maxlength="50"
        size="70"
        placeholder="no more than 50 chars"
        v-model="loc"
      />
      <h2><i>6. Upload more pictures</i></h2>
      <br />
      <div>
        <div>
          <button @click="click1">Upload from Computer</button>
          <input
            type="file"
            ref="input1"
            style="display: none"
            @change="previewImage"
            accept="image/*"
          />
        </div>
        <div v-if="imageData != null || img1 != null">
          <img class="preview" height="268" width="356" :src="img1" /><br />
        </div>
      </div>
    </div>
    <div id="additionalOptions" v-show="selectedType === 'sale'">
      <h2><i>7. Name your price and/or trades</i></h2>
      <br />
      $ <input type="number" step="0.01" v-model="price" /><br />
      -or-<br />
      <input type="text" maxlength="50" size="70" v-model="alt_trade" />
      
      <button v-on:click="submitListing('sale', listingid)">Submit</button>
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
          selected="selected"
          >{{ x }}</option
        >
      </select>
      <h2><i>8. Name your rules</i></h2>
      <br />
      <textarea type="text" rows="8" cols="70" v-model="tnc"></textarea><br />
      <button v-on:click="submitListing('rent', listingid)">Submit</button>
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
      listing: {},
      selectedType: "sale",
      selectedSubcat: "",
      title: "",
      desc: "",
      loc: "",
      price: "",
      alt_trade: "",
      listingid: "", 
      subcat_sales: [
        "Mobile & Electronics",
        "Hobbies & Games",
        "Sports",
        "Education",
        "Fashion",
      ],
      subcat_rent: ["Automobiles", "Property", "Books", "Games", "Electronics"],
      rent_intervals: ["hour", "day", "week", "month", "year"],
      interval: "",
      tnc: "",
      img1: "",
      imageData: null,
      imgurls: [],
    };
  },
  created() {
      this.fetchListing();
  }, 
  methods: {
    submitListing: function(x, y) {
        console.log("mofo"+y);
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
        
        this.listing["sale"] = others;
        // console.log(this.listing["sale"])
      } else if (x === "rent") {
        var others2 = {};
        others2["Interval"] = this.interval;
        others2["Terms and Conditions"] = this.tnc;
        this.listing["rent"] = others2;
      }
      firebase
        .firestore()
        .collection("Listings")
        .doc(y)
        .update(this.listing)
        .then(() => {
          this.$router.push('/profile')
        });
        // console.log("listingid"+y);
    },
    fetchListing: function() {
       let doc_id = this.$route.params.doc_id; 
       this.listingid = doc_id; 
       console.log('CALLED!'+doc_id); 
        firebase.firestore().collection('Listings').doc(doc_id).get().then( (doc) => {
            let x = doc.data(); 
            this.title = x['Title']; 
            this.desc = x['Description']; 
            this.selectedType = x['Type']; 
            this.selectedSubcat = x['Subcat']; 
            this.loc = x['Location']; 
            this.price = x['Price']; 
            this.img1 = x['images'][0];
            this.imgurls = x['images'];
            console.log(this.imgurls); 
            if (this.selectedType == 'rent') {
                this.interval = x['rent']['Interval']; 
                this.tnc = x['rent']['Terms and Conditions'];
            } else if (this.selectedType == 'sale') {
                this.alt_trade = x['sale']['Alternatives'];
                this.trans_method = x['sale']['Alternatives']['Transaction method']
            }
        });
        console.log(this.listingid); 
    }, 
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
            console.log(this.imgurls);
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
}
#additionalOptions,
#commonOptions {
  text-align: center;
}
</style>
