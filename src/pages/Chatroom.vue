<template>
  <div class="block">
    <el-input
      type="textarea"
      :rows="2"
      placeholder=""
      v-model="textarea"
      @keyup.enter.native="onSubmit"
    >
    </el-input>
    <el-button
      @click.native="onSubmit"
      type="primary"
      icon="el-icon-s-promotion"
      >送出</el-button
    >

    <el-timeline>
      <el-timeline-item
        v-for="(msgItem, $index) in orderMsgList"
        :key="$index"
        placement="top"
      >
        <el-card v-if="getFromYou(msgItem.From)" align="right">
          <strong style="font-family: monospace; font-size: 4vh">{{
            msgItem.Msg
          }}</strong>
          <div>
            <p
              style="
                font-size: 1vh;
                color: #c0c0c0;
                text-shadow: black 0.1em 0.1em 0.1em;
              "
            >
              from <b>You</b>
            </p>
            <p
              style="
                font-size: 1vh;
                color: #000080;
                text-shadow: black 0.1em 0.1em 0.2em;
              "
            >
              提交于 {{ msgItem.Time }}
            </p>
          </div>
        </el-card>
        <el-card v-else align="left">
          <strong style="font-family: monospace; font-size: 4vh">{{
            msgItem.Msg
          }}</strong>
          <div>
            <p
              style="
                font-size: 1vh;
                color: #c0c0c0;
                text-shadow: black 0.1em 0.1em 0.1em;
              "
            >
              from <b>{{ msgItem.From }}</b>
            </p>
            <p
              style="
                font-size: 1vh;
                color: #000080;
                text-shadow: black 0.1em 0.1em 0.2em;
              "
            >
              提交于 {{ msgItem.Time }}
            </p>
          </div>
        </el-card>
      </el-timeline-item>
      <!-- <el-timeline-item timestamp="2018/4/3" placement="top">
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
    </el-timeline-item> -->
    </el-timeline>
  </div>
</template>
<script>
import { mapState } from "vuex";
import firebase from "firebase";
import { db } from "../firebase/db";
import { mapFields } from "vuex-map-fields";
export default {
  data() {
    return {
      textarea: "",
    };
  },
  computed: {
    ...mapState(["inChat",  "username"]),
    ...mapFields(["curRoom"]),
    msgList() {
      console.log("this.curRoom.msgs:", this.curRoom.msgs);
      return this.curRoom.msgs; //saved as triple-msginfo in DB
    },
    orderMsgList() {
      return this.getOrderedMsgs(this.msgList);
    },
  },
  methods: {
    onSubmit(event) {
      console.log("event:", event);
      console.log("event.shiftKey:", event.shiftKey);
      if (!event.shiftKey) {
        let msgObj = {
          Msg: this.textarea,
          Time: new Date().toString(),
          From: this.username,
        };
        this.textarea = "";
        this.addMsg(msgObj);
      } //else new line
      console.log("textarea:", this.textarea);
    },
    getFromYou(from) {
      console.log('get from:',from)
      if (from == this.username) {
        return true;
      } else {
        return false;
      }
    },
    getOrderedMsgs(tripleMsgs) {
      let orderMsgs = [];
      try {
        for (let i = 0; i < tripleMsgs.length; i++) {
          let splitStr = tripleMsgs[i].split("~!~#~%~&~");
          let msgObj = {
            Msg: splitStr[0],
            From: splitStr[1],
            Time: splitStr[2],
          };
          orderMsgs.push(msgObj);
        }

        orderMsgs = orderMsgs.sort((x, y) => {
          return Date.parse(y.Time) - Date.parse(x.Time);
        });
        console.log("order msgs:", orderMsgs);
      } catch (error) {
        console.error(error);
      }

      return orderMsgs;
    },
    async addMsg(msgObj) {
      console.log("add msgObj,msgObj.From:", msgObj);
      console.log("add msgObj.From:", msgObj.From);
      var roomRef = db.collection("rooms").doc(this.curRoom.room_id);
      let msgPackStr =
        msgObj.Msg + "~!~#~%~&~" + msgObj.From + "~!~#~%~&~" + msgObj.Time;
      await roomRef.update({
        msgs: firebase.firestore.FieldValue.arrayUnion(msgPackStr),
      });
      roomRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            this.curRoom = doc.data() 
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
  },
};
</script>

<style>
</style>