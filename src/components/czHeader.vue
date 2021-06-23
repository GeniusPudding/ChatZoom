<template>
  <header
    class="w3-bar w3-theme-d2 w3-left-align w3-large w3-animate-top"
  >
    <h1 class="w3-bar-item w3-hide-medium  w3-padding-large w3-hover-white w3-large w3-theme-d2">
      <b > Hi! </b>
      <i class="el-icon-s-opportunity"></i>
      <div  v-if="$route.name !== 'Login'">{{ username }}</div>
      <div  v-else>Please login first!</div>
    </h1>
    <logout  class="w3-bar-item  w3-right w3-button w3-padding-large" v-if="$route.name !== 'Login'"></logout>
  </header>
</template>
<script>
import logout from "./buttons/logout.vue";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["username"]),
  },
  components: {
    logout,
  },
};
</script>

<style>

</style>
