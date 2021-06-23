<template>
  <div id="app">
      <article class='main'>
        <czHeader></czHeader>
        <navMenu></navMenu>
        <router-view  style="position:absolute; right:0px; width: 72%" ></router-view>
      </article>
  </div>
</template>
<script>
import navMenu from "./components/navMenu.vue";
import czHeader from './components/czHeader.vue'
export default {
  components:{
    navMenu,
    czHeader
  }
}
</script>

<style> 
@import url("https://www.w3schools.com/w3css/4/w3.css");
@import url("https://fonts.googleapis.com/css?family=Raleway");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1f476e;
  background-image: url('./assets/images/bg.jpg'), linear-gradient(to top, #0250c5 0%, #d43f8d 100%);
}


</style>