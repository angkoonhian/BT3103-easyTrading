<template>
  <NewListing></NewListing>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import NewListing from './NewListing.vue'

export default {
  name: 'App',
  components: {
    NewListing
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
