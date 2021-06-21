<template>
  <div>
    <el-col :span="9" style="width: 27%">
      <el-menu
        @select="handleSelect"
        default-active="2"
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
        <el-submenu  v-if="inChat"  index="3">
          <template slot="title">
            <i class="el-icon-user"></i>
            <span>成員列表</span>
          </template>
          <el-menu-item  v-for="(item, $index) in memberList" :key="$index">{{item}}</el-menu-item>

        </el-submenu>

      </el-menu>
    </el-col>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["inChat", "curRoom"]),
    memberList(){
      return this.curRoom.members.concat(this.curRoom.owner)
    }
  },
  mounted() {
    console.log('test inChat:',this.inChat)
    console.log('test curRoom:',this.curRoom)
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == 1) {
        this.$router.push("/personal");
      } else if (key == 2) {
        this.$router.push("/search");
      } else {
        console.log("test");
      }
    },
  },
};
</script>
