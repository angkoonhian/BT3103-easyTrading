<template>
  <div>
      <h1 class="welcome">Welcome to Easy Trading :)</h1>
      <img id="bg" src="../assets/login1.jpg">
      <img class="right" style="z-index: 0" src="../assets/white.png">
      <div class="right">
          <img src="../assets/logo.png" class="logo">
          <input class="input1" onfocus="value=''" value="Username"/>

          <input class="input2" onfocus="value=''" value="Password"/>
          <p class="cut">____________OR____________</p>
          <p class="other">Login by Google</p>
      </div>      
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
#bg {
    position: fixed;
    width: 1200px;
    left:0px;
    top:0px;
    height: 100%;
}
.right {
    position:absolute;
    right:0px;    
    top:0px;
    height: 100%;
    width: 55%;
}
.welcome {
  position: absolute;
  top: 8px;
  left: 16px;
  color:antiquewhite;
  z-index: 1000;
}
.logo {
    width: 300px;
    position:absolute;
    top:17%;
    left: 25%;
}
.input1 {
    position: absolute;
    margin: 10px;
    top:40%;
    left: 25%;
      font-family: inherit;
  width: 250px;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  color: rgb(193, 183, 183);
  padding: 7px 0;
  
}
.input2 {
    position: absolute;
    margin: 10px;
    top:50%;
    left: 25%;
    width: 250px;
  border: 0;
  border-bottom: 2px solid #9b9b9b;
  outline: 0;
  font-size: 1.3rem;
  color: rgb(193, 183, 183);
  padding: 7px 0;
}
.cut {
    position: absolute;
    margin: 10px;
    top:65%;
    left: 25%;
    width: 250px;  
    color:#9b9b9b;    
}
.other {
    position: absolute;
    margin: 10px;
    top:70%;
    left: 25%;
    width: 250px; 
    font-style: bolder;
    color:rgba(201, 136, 24, 0.851);     
}
</style>