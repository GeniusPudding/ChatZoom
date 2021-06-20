<template>
  <div>
      <el-button type="warning"  @click='logOut'>登出</el-button>
  </div>
</template>
<script>

import firebase from 'firebase'
export default {
methods: { 
  logOut() { 
      
    firebase.auth().signOut();
  } 
},
}
</script>

<style>

</style>