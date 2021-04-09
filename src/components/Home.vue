<template>
  <v-app style="margin-top: 50px">
    <template>
      <v-carousel
        cycle
        height="500"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>
    </template>

    <br />
    <template>
      <!-- <v-card> -->
      <v-tabs
        v-model="tab"
        background-color="orange accent-4"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab v-on:click="currentTab = 'sales'">
          Sales
        </v-tab>

        <v-tab v-on:click="currentTab = 'rentals'">
          Rental
        </v-tab>
      </v-tabs>
      <div v-if="currentTab === 'sales'"><Sales></Sales></div>
      <div v-if="currentTab === 'rentals'"><Rentals></Rentals></div>
    </template>
  </v-app>
</template>
<script>
import Sales from "./Sales";
import Rentals from "./Rentals";

export default {
  components: {
    Sales,
    Rentals,
  },
  data() {
    return {
      currentTab: "sales",
      items: [
        {
          src:
            "https://mk0adespressoj4m2p68.kinstacdn.com/wp-content/uploads/2020/02/ecommerce-advertising-the-complete-guide.jpg",
        },
        {
          src: "https://mweb-cdn.karousell.com/build/fb-og-3Lk91FbWAJ.png",
        },
        {
          src:
            "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-skincare-products-glowing-skin-1609813960.jpg",
        },
        {
          src:
            "https://mk0adespressoj4m2p68.kinstacdn.com/wp-content/uploads/2015/03/facebook-ads-ecommerce.jpg",
        },
        {
          src:
            "https://www.itl.cat/pngfile/big/251-2514844_facebook-ad-design.jpg",
        },
      ],
      tabs: null,
      text: "asdasdasdasdsads",
      listings: {
        sale: {},
        rental: {},
        service: {},
      },
    };
  },
  methods: {},
  created() {},
};
</script>
<style scoped>
/* v-tab {
  position: sticky;
} */
</style>
