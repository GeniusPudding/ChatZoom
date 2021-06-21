<template>
  <el-table :data="roomData" style="width: 72%" :row-class-name="tableRowClassName">
    <el-table-column prop="msgs" label="">
      <template slot-scope="scope">
        <el-button type="warning" @click="enterRoom(scope.$index)">Enter</el-button>
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
import { mapFields } from "vuex-map-fields"
export default {
  data() {
    return {
      ownRooms: [],
      pubRooms: [],
      // roomData: [],
      mode: "", // personal or search
      routeName:'',
      firestore: Object
    };
  },
  computed: {
    ...mapState(["username"]),
    ...mapFields(["roomData"])
  },
  firestore(){
    // console.log('firestore:',this.$cookies.get("chatzoom").username)
    let username = this.$cookies.get("chatzoom").username
    return{
      //load info of rooms from db
      ownRooms: db.collection("rooms").where("owner", "==", username),
      pubRooms: db.collection("rooms").where("prop", "==", 'public')
    }

  },

  mounted() {
    console.log("mounted roomData:", this.roomData);
    console.log("this.$route.name:", this.$route.name);
    this.roomData = this.$route.name == 'Personal' ? this.ownRooms : this.pubRooms

  },

  components: {
    // roomItem
  },
  methods: {
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
