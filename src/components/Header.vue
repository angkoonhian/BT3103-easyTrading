<template>
  <div>
    <img id = "logo" src="../assets/logo.png">
    <input id = "search">
      <ul>
        <li><router-link to="/login" exact>Log in</router-link></li>
        <li><router-link to="/signup" exact>Sign up</router-link></li>
      </ul>
  </div>
</template>

<script>
export default ({
    data() {
        return {
        }
    },
    components:{
    }
})
</script>

<style scoped>
#logo {
    width: 200px;
    position: absolute;
    top: 0px;
    left: 0px;
}
#search {
    position: absolute;
    top:27px;
    left:250px;
    border-radius: 20px;
    height: 20px;
}
</style>