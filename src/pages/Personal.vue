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
export default {
  computed: {
    ...mapFields(["username"]),
  },
  mounted() {
    if (!this.username) {
      this.username = this.$cookies.get("chatzoom").username;
    }
  },
  components: {
    
    roomList,
    createRoom,
  },
};
</script>

<style>
</style>