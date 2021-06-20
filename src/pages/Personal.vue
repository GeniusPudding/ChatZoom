<template>
  <div>
    <navMenu></navMenu>
    <roomList></roomList>
    <createRoom></createRoom>
  </div>
</template>
<script>
import navMenu from "../components/navMenu.vue";
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
    navMenu,
    roomList,
    createRoom,
  },
};
</script>

<style>
</style>