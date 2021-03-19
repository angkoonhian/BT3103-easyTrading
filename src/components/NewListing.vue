<template>
<div>
    <Header></Header>
    <h1>Post your listing</h1><br>
    <div id="commonOptions">
        <h2><i>1. Choose your category</i></h2><br>
            <input type="radio" id="sale" name="listingtype" v-on:click="selectedType='sale'" checked>I am selling an item
            <input type="radio" id="rent" name="listingtype" v-on:click="selectedType='rent'">I am renting out an item
            <input type="radio" id="service" name="listingtype" v-on:click="selectedType='service'">I am providing a service
        <h2>2. Choose your sub-category</h2>
            <div v-show="selectedType==='sale'" v-for="x in subcat_sales" :key="x.id">
                <input type="radio" name="subcat" v-on:click="selectedSubcat=x" required/>{{x}}
            </div>
            <div v-show="selectedType==='rent'" v-for="x in subcat_rent" :key="x.id">
                <input type="radio" name="subcat" v-on:click="selectedSubcat=x" required>{{x}}
            </div>
        <h2><i>3. Give your listing a title</i></h2><br>
            <input type='text' id='listingname' maxlength="50" size="70" placeholder="no more than 50 chars" v-model='title'>
        <h2><i>4. Describe your listing</i></h2><br>
            <textarea type='text' maxlength="50" rows="8" cols = '70' v-model='desc'></textarea>
        <h2><i>5. Location where you want to deal</i></h2><br>
        <input type='text' id='listingloc' maxlength="50" size="70" placeholder="no more than 50 chars" v-model="loc">
    </div>
    <div id = "additionalOptions" v-show="selectedType==='sale'">
        <h2><i>6. Name your price and/or trades</i></h2><br>
        $ <input type="number" step=0.01 v-model = "price"><br>
        -or-<br>
        <input type='text' maxlength="50" size="70" v-model = "alt_trade">
        <h2><i>7. Name your transaction/delivery preferences</i></h2><br>
        <input type='text' placeholder="e.g. pick up at mrt, cash only, etc" size="70" v-model="trans_method"><br>
        <button v-on:click="submitListing('sale')">Submit</button>
    </div>
    <div id = "additionalOptions" v-show="selectedType==='rent'">
        <h2><i>6. Name your price</i></h2><br>
        $ <input type="number" step=0.01 v-model="price"> per 
        <select v-model="interval" required> 
            <option v-for="x in rent_intervals" :key="x.id" v-bind:value="x" selected = 'selected'>{{x}}</option>
        </select>
        <h2><i>7. Name your rules</i></h2><br>
        <textarea type='text' maxlength="50" rows="8" cols = '70' v-model="tnc"></textarea><br>
        <button v-on:click="submitListing('rent')">Submit</button>
    </div>
</div>
</template>

<script>
import Header from '../components/Header'

export default {
    components:{
        Header
    },
    name: 'NewListing',
    data() {
        return {
            listing: {}, 
            selectedType: 'sale', 
            selectedSubcat : '',
            title: '',
            desc: '', 
            loc: '', 
            price: 0, 
            alt_trade: '', 
            trans_method: '',
            subcat_sales: ['Mobile & Electronics', 'Hobbies & Games', 'Sports', 'Education', 'Fashion'], 
            subcat_rent: ['Automobiles', 'Property', 'Books', 'Games', 'Electronics'], 
            rent_intervals: ['hour', 'day', 'week', 'month', 'year'], 
            interval: '', 
            tnc: '', 
            
        }
    }, 
    methods: {
        submitListing: function(x) {
            this.listing['Type'] = this.selectedType; 
            this.listing['Subcat'] = this.selectedSubcat; 
            this.listing['Title'] = this.title; 
            this.listing['Description'] = this.desc; 
            this.listing['Location'] = this.loc; 
            this.listing['Price'] = this.price;
            if (x==='sale') {
                var others = {}; 
                others['Alternatives'] = this.alt_trade; 
                others['Transaction method'] = this.trans_method; 
                this.listing['sale'] = others; 
            } else if (x==='rent') {
                var others2 = {}; 
                others2['Interval'] = this.interval; 
                others2['Terms and Conditions'] = this.tnc; 
                this.listing['rent'] = others2; 
            }
            console.log(this.listing)
        }
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
    font-family: Avenir, Helvetica, Arial, sans-serif; 
    color: #2c3e50;
}
h2 {
    text-align: center;
    font-family: Avenir, Helvetica, Arial, sans-serif; 
   color:  #e09d20; 
}
 #additionalOptions, #commonOptions {
    text-align: center;
}

</style>
