<template>
  <v-app style="margin: 0px">
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
      <v-card>
        <v-tabs
          v-model="tab"
          background-color="orange accent-4"
          centered
          dark
          icons-and-text
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1">
            Sales
          </v-tab>

          <v-tab href="#tab-2">
            Rental
          </v-tab>

          <v-tab href="#tab-3">
            Services
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
            <Sales></Sales>
            <template>
              <v-card :loading="loading" class="mx-auto my-12" max-width="374">
                <template slot="progress">
                  <v-progress-linear
                    color="deep-purple"
                    height="10"
                    indeterminate
                  ></v-progress-linear>
                </template>

                <v-img
                  height="250"
                  src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                ></v-img>

                <v-card-title>Cafe Badilico</v-card-title>

                <v-card-text>
                  <v-row align="center" class="mx-0">
                    <v-rating
                      :value="4.5"
                      color="amber"
                      dense
                      half-increments
                      readonly
                      size="14"
                    ></v-rating>

                    <div class="grey--text ml-4">
                      4.5 (413)
                    </div>
                  </v-row>

                  <div class="my-4 subtitle-1">
                    Location: Clementi
                  </div>

                  <div>
                    <strong>Description:</strong> Small plates, salads &
                    sandwiches - an intimate setting with 12 indoor seats plus
                    patio seating.
                  </div>
                  <div><strong>Options:</strong> $200 or bmwM3</div>
                </v-card-text>
                <v-card-actions>
                  <v-list-item class="grow" style="font-weight: 700">
                    <v-list-item-avatar color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        alt=""
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                      ></v-img>
                    </v-list-item-avatar>
                    Desmond
                  </v-list-item>
                </v-card-actions>

                <v-divider class="mx-4"></v-divider>
                <v-card-actions>
                  <v-btn color="deep-purple lighten-2" text>
                    View
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
  </v-app>
</template>
<script>
import firebase from "firebase";
import Sales from "./Sales";

export default {
  components: {
    Sales,
  },
  data() {
    return {
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
  methods: {
    fetchItems: function() {
      console.log("fetching items");
      firebase
        .firestore()
        .collection("Listings")
        .get()
        .then((querySnapShot) => {
          let item = {};
          querySnapShot.forEach((doc) => {
            item = doc.data();
            this.items.push(item);
          });
        });
      console.log(this.items);
    },
  },
  created() {
    this.fetchItems();
  },
};
</script>
<style scoped></style>
