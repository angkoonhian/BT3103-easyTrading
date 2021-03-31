<template>
  <div id="nav" class="fixed" style="margin-bottom: 100px;">
    <!-- <v-navigation-drawer v-model="sidebar" app mobile-break-point="959">
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <v-app-bar app fixed dense shrink>
      <span class="d-none d-sm-flex d-md-none">
        <v-icon @click="sidebar = !sidebar"> </v-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          <img src="../assets/logo.png" id="logo" />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="mdi-microphone"
        class="mx-4 p-4"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
      ></v-text-field>
      <v-toolbar-items class="d-sm-none d-md-flex">
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebar: false,
      menuItems: [
        { title: "Home", path: "/home", icon: "home" },
        { title: "Sign Up", path: "/signup", icon: "face" },
        { title: "Sign In", path: "/login", icon: "lock_open" },
        { title: "Chat", path: "/chat", icon: "chat" },
      ],
    };
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
#logo {
  width: 150px;
  top: 0px;
  left: 0px;
}
#search {
  position: absolute;
  top: 27px;
  left: 250px;
  border-radius: 20px;
  height: 20px;
  width: 200px;
}

li {
  text-decoration: none;
  list-style: none;
  float: left;
  margin-left: 30px;
  position: relative;
  top: 10px;
  left: 1000px;
}

#nav {
  position: absolute;
  top: 0;
  margin-bottom: 10px;
}

#icon2 {
  width: 40px;
  position: absolute;
  top: 20px;
  left: 460px;
}
</style>
