<template>
  <el-button style="display: inline-block;" align="right" type="warning" @click="logOut">登出</el-button>
</template>
<script>
import firebase from "firebase";
import { mapFields } from "vuex-map-fields";
export default {
  methods: {
    computed: {
      ...mapFields(["isLogin","inchat"]),//這裡不曉得為何改不了
    },
    logOut() {
      this.isLogin = false;
      this.inchat = false
      this.$router.push('/personal')
      firebase.auth().signOut();
      
    },
  },
};
</script>

<style>
</style>