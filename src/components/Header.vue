<template>
  <div id = "nav">
    <img id = "logo" src="../assets/logo.png">
    <input id = "search">
    <img id = "icon2" src="../assets/search.jpeg">
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
    width: 200px;
}



li {
  text-decoration: none;
  list-style: none;
  float:left;
  margin-left: 30px;
  position:relative;
  top:10px;
  left:1000px;
}

#nav {
  position:absolute;
  top:0;
  margin-bottom: 10px;
}

#icon2 {
    width: 40px;
    position: absolute;
    top: 20px;
    left: 460px; 
}
</style>