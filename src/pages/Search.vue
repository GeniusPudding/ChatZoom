<template>
  <div>
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

</style>