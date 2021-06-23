<template>
  <el-table
    style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
    :data="roomData"
    :row-class-name="tableRowClassName"
  >
    <el-table-column prop="msgs" label="">
      <template slot-scope="scope">
        <el-button
          style="box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.1)"
          type="warning"
          @click="enterRoom(scope.$index)"
          >{{ text }}</el-button
        >
      </template>
    </el-table-column>
    <el-table-column prop="owner" label="房主"> </el-table-column>
    <el-table-column prop="groupname" label="群組名稱"> </el-table-column>
    <el-table-column prop="prop" label="類型" width="100"> </el-table-column>
  </el-table>
</template>
<script>
// import roomItem from './buttons/roomItem.vue'
import firebase from "firebase";
import { db } from "../firebase/db";
// import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  data() {
    return {
      // roomData: [],
      isLoaded: false,
      text: "",
    };
  },
  computed: {
    // ...mapState([""]),
    ...mapFields(["roomData", "curRoom", "inChat", "username"]),
    roomRef() {
      return db.collection("rooms").doc(this.curRoom.room_id);
    },
    ownRef() {
      return db.collection("rooms").where("owner", "==", this.username);
    },
    memRef() {
      return db
        .collection("rooms")
        .where("members", "array-contains", this.username);
    },
    pubRef() {
      return db.collection("rooms").where("prop", "==", "public");
    },
  },
  async mounted() {
    // console.log("mounted roomData:", this.roomData);
    // console.log("this.$route.name:", this.$route.name);
    // console.log("this.username:", this.username);
    if (!this.username) {
      this.username = this.$cookies.get("chatzoom").username;
    }
    this.roomData = await this.getRooms();
    this.inChat = false;
    this.text = this.$route.name == "Personal" ? "Enter!" : "Join!";
    // console.log("this.roomData:", this.roomData);
    if (this.$route.name == "Personal") {
      this.msgObserver = this.ownRef.onSnapshot(
        (doc) => {
          doc.docChanges().forEach((change) => {
            if (change.type === "added") {
              let room = change.doc.data();
              // console.log(" room: ", room);
              if (!this.roomData.some((r) => r.groupname == room.groupname)) {
                // console.log("New room: ", room);
                this.roomData.push(room);
              }
              // this.roomData.push(change.doc.data())
            }
          });
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    }
    //TODO: add Badge
  },
  methods: {
    async getRooms() {
      const rooms = [];
      if (this.$route.name == "Personal") {
        this.ownRef.get().then((queryRooms) => {
          queryRooms.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            rooms.push({ ...doc.data(), room_id: doc.id });
            // console.log("rooms:", rooms);
          });
        });
        this.memRef.get().then((queryRooms) => {
          queryRooms.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            rooms.push({ ...doc.data(), room_id: doc.id });
            // console.log("rooms:", rooms);
          });
        });
      } else {
        this.pubRef.get().then((queryRooms) => {
          queryRooms.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            if (
              doc.data().owner != this.username &&
              !doc.data().members.includes(this.username)
            ) {
              rooms.push({ ...doc.data(), room_id: doc.id });
            }
            // console.log("rooms:", rooms);
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
      // console.log("enter:", this.roomData[index].owner, index);
      this.curRoom = this.roomData[index];
      // console.log("this.curRoom:", this.curRoom);
      // console.log("enter this.username:", this.username);
      // console.log("addUser:", this.$route.name);
      if (this.$route.name == "Search") {
        console.log("addUser");
        this.addUser();
      }

      this.inChat = true;
      this.$router.push("chatroom");
    },
    async addUser() {
      await this.roomRef.update({
        members: firebase.firestore.FieldValue.arrayUnion(this.username),
      });
      let doc = await this.roomRef.get();
      // console.log("add yourself doc.data():", doc.data());
      this.curRoom = { ...doc.data(), room_id: this.curRoom.room_id };
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
