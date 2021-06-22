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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>