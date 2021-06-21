<template>
  <el-table :data="roomData" style="width: 72%" :row-class-name="tableRowClassName">
    <el-table-column prop="msgs" label="">
      <template slot-scope="scope">
        <el-button type="warning" @click="enterRoom(scope.$index)">{{ text }}</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="owner" label="房主"> </el-table-column>
    <el-table-column prop="groupname" label="群組名稱"> </el-table-column>
    <el-table-column prop="prop" label="類型" width="100"> </el-table-column>
  </el-table>
</template>
<script>
// import roomItem from './buttons/roomItem.vue'
import { db } from "../firebase/db";
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  data() {
    return {
      ownQuery: Object,
      memQuery: Object,
      pubQuery: Object,
      // roomData: [],
      mode: "", // personal or search
      routeName: "",
      firestore: Object,
      isLoaded: false,
      text: "",
    };
  },
  computed: {
    ...mapState(["username"]),
    ...mapFields(["roomData", "curRoom", "inChat"]),
  },
  async mounted() {
    console.log("mounted roomData:", this.roomData);
    console.log("this.$route.name:", this.$route.name);
    this.ownQuery = db.collection("rooms").where("owner", "==", this.username);
    this.memQuery = db.collection("rooms").where("members", "array-contains", this.username);
    this.pubQuery = db.collection("rooms").where("prop", "==", "public");
    this.roomData = await this.getRooms();
    this.inChat = false;
    this.text = this.$route.name == "Personal" ? "Enter!" : "Join!";

    console.log("this.roomData:", this.roomData);

  },
  // watch:{
  //   "this.roomData": ()=>{
  //     if(!this.isLoaded && this.roomData){
  //       this.isLoaded = true
  //     }

  //   }
  // },
  components: {
    // roomItem
  },
  methods: {
    async getRooms() {
      const rooms = [];
      if (this.$route.name == "Personal") {
        this.ownQuery.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            rooms.push({ ...doc.data(), room_id: doc.id });
            console.log("rooms:", rooms);
          });
        });
        this.memQuery.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            rooms.push({ ...doc.data(), room_id: doc.id });
            console.log("rooms:", rooms);
          });
        });
      } else {
        this.pubQuery.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            rooms.push({ ...doc.data(), room_id: doc.id });
            console.log("rooms:", rooms);
          });
        });
      }

      return rooms;
    },
    tableRowClassName(bundle) {
      if (bundle.row.prop === "private") {
        return "private-row";
      } else {
        return "public-row";
      }
    },
    enterRoom(index) {
      console.log("enter:", this.roomData[index].owner, index);
      if (this.roomData[index].owner == "GG") {
        console.log("GG!");
      }
      this.curRoom = this.roomData[index];
      console.log("this.curRoom:", this.curRoom);
      this.inChat = true;
      this.$router.push("chatroom");
    },
  },
};
</script>

<style>
.el-table .private-row {
  background: rgb(158, 154, 147);
}

.el-table .public-row {
  background: #f0f9eb;
}
</style>
