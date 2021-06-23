<template>
  <div>
    
    <roomList></roomList>
    <createRoom></createRoom>
  </div>
</template>
<script>

import roomList from "../components/roomList.vue";
import createRoom from "../components/buttons/createRoom.vue";
import { mapFields } from "vuex-map-fields";
import { db } from "../firebase/db";
import firebase from "firebase";
export default {
  computed: {
    ...mapFields(["username","allusers","isLogin"]),
    userRef() {
      return db.collection("usernames").doc('ppCKgMH4WK8b1AfrM0eM');
    },
  },
  async mounted() {
    if (!this.username) {
      this.username = this.$cookies.get("chatzoom").username;
    }
    this.isLogin = true
    await this.userRef.update({
        names: firebase.firestore.FieldValue.arrayUnion(this.username),
    });
    let doc = await this.userRef.get();
    // console.log("mounted doc.data():", doc.data());
    this.allusers = doc.data().names
  },
  components: {
    
    roomList,
    createRoom,
  },
};
</script>

<style>
</style>