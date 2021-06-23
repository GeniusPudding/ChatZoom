<template>
  <header class="header" style="background-color:#E8AAE1;height: 15 vh;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)" >
    <b style="font-style:oblique;display: inline-block">
      Hi! 
      
    </b> 
    <div v-if="$route.name !== 'Login'">{{username}}</div>
    <div v-else>Please login first!</div>
    <logout style="" v-if="$route.name !== 'Login'"></logout>
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

<style></style>
