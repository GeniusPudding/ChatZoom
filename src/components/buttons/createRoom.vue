<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-edit"
      @click="dialogFormVisible = true"
      >新聊天室!</el-button
    >

    <el-dialog title="創建聊天室" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="群聊名稱" :label-width="formLabelWidth">
          <el-input v-model="form.groupname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="類型" :label-width="formLabelWidth">
          <el-select v-model="form.prop" placeholder="請選擇類型">
            <el-option label="公開" value="public"></el-option>
            <el-option label="私人" value="private"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">送 出</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { db } from "../../firebase/db";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        groupname: "",
        prop: "public",
      },
    };
  },
  computed: {
    ...mapState(["username", "characters"]),
    roomInfo() {
      return {
        msgs: [],
        groupname: this.form.groupname,
        prop: this.form.prop,
        owner: this.username,
      };
    },
  },
  methods: {
    async create() {
      this.dialogFormVisible = false;
      let ran_id = this.generateString(19)
      const res = await db.collection("rooms").doc(ran_id).set(this.roomInfo);
      console.log("res:", res);
    },

    generateString(length) {
      let result = " ";
      const charactersLength = this.characters.length;
      for (let i = 0; i < length; i++) {
        result += this.characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      return result;
    },
  },
};
</script>
<style>
</style>