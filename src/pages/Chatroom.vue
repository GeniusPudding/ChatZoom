<template>
<div class="block" >
  <el-input
    type="textarea"
    :rows="2"
    placeholder=""
    v-model="textarea"
    @keyup.enter="submit">
  </el-input>
  <el-timeline>
    <el-timeline-item timestamp="2018/4/12" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/12 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/3" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</div>

</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      textarea: ''
    }
  },
  computed: {
    ...mapState(["inChat", "curRoom"]),
    msgList(){
      return this.curRoom.msgs
    }
  },
  methods:{
    submit(){
      console.log("textarea:",this.textarea)
    }
    
  },

}
</script>

<style>



</style>