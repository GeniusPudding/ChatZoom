<template>
  <div class="bg">
      <roomList></roomList>
  </div>
</template>
<script>
import roomList from "../components/roomList.vue";
import { mapFields } from "vuex-map-fields";
export default {
  components: {
    
    roomList,
  },
  computed: {
    ...mapFields(["username"]),
  },
  mounted() {
    if (!this.username) {
      this.username = this.$cookies.get("chatzoom").username;
    }
  },
}
</script>

<style>
.bg{
  background-color: aliceblue;
  height: 100vh;
  background-size:cover;
  background-image: url('../assets/images/bg.jpg'), linear-gradient(to top, #0250c5 0%, #d43f8d 100%);
}
</style>