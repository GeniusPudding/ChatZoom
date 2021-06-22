<template>
  <div>
    <el-button type="warning" @click="logOut">登出</el-button>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapFields } from "vuex-map-fields";
export default {
  methods: {
    computed: {
      ...mapFields(["isLogin","inchat"]),
    },
    logOut() {
      this.isLogin = false;
      this.inchat = false
      firebase.auth().signOut();
      
    },
  },
};
</script>

<style>
</style>