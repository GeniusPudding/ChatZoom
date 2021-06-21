<template>
  <header class="header">
    [header TBD] Hi <div v-if="username">{{username}}</div>
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
