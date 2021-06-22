<template>
  <header class="header" style="background-color:#E8AAE1">
    [header TBD] Hi! 
    <div v-if="$route.name !== 'Login'">{{username}}</div>
    <div v-else>Please login first!</div>
    <logout v-if="$route.name !== 'Login'"></logout>
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
