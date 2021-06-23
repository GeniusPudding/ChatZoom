<template>
  <div >
    <el-col class="w3-large w3-theme-l5 w3-animate-left navbg" :span="9" style="width: 27% ">
      <el-menu
        @select="handleSelect"
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="1">
          <i class="el-icon-s-custom"></i>
          <span slot="title">個人聊天室</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-search"></i>
          <span slot="title">搜尋聊天室</span>
        </el-menu-item>
      </el-menu>  
      <el-menu
        style="margin: 1vh;"
        @select="handleSelect"
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#543c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >

        <el-submenu  v-if="inChat"  index="3">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>聊天室成員</span>
          </template>
          <el-menu-item  v-for="(item, $index) in memberList" :key="$index">{{item}}</el-menu-item>
        </el-submenu>
        <el-submenu  v-if="isOwn"  index="3">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>點選加入其它用戶</span>
          </template>
          <el-menu-item @click="addOtherUser(item)"  v-for="(item, $index) in othersList" :key="$index">{{item}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>
<script>
import firebase from "firebase";
import { db } from "../firebase/db";
import { mapState } from "vuex";
import { mapFields } from "vuex-map-fields";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["allusers","username","isLogin"]),
    ...mapFields(["curRoom","inChat"]),
    roomRef(){
      return db.collection("rooms").doc(this.curRoom.room_id);
    },
    memberList(){
      return this.curRoom.members.concat(this.curRoom.owner)
    },
    othersList(){
      return this.allusers.filter(user=>!this.memberList.includes(user))
    },
    isOwn(){
      return this.inChat && this.curRoom.owner == this.username && this.isLogin
    },

  },
  mounted() {
    // console.log('NAV this.$route.name:',this.$route.name)
    // console.log('test curRoom:',this.curRoom)
    if(this.$route.name=='Login'){
      this.inChat = false
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log( keyPath);
      if (key == 1) {
        this.$router.push("/personal");
      } else if (key == 2) {
        this.$router.push("/search");
      } else {
        console.log("test");
      }
    },
    async addOtherUser(name){
      await this.roomRef.update({
        members: firebase.firestore.FieldValue.arrayUnion(name),
      });
      let doc = await this.roomRef.get();
      console.log("doc.data():", doc.data());
      this.curRoom = { ...doc.data(), room_id: this.curRoom.room_id };
    }
  },
};
</script>
<style>
.navbg{
  height: 100vh;
  background-color: rgb(8, 49, 49);
  background-image: url('../assets/images/nav.jpg');
  background-size:cover;
}
</style>