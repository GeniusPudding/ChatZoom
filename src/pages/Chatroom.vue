<template>
  <div class="block">
    <el-header
      ><b>{{ groupname }}</b></el-header
    >
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
              from <b>{{ getMsgFromOwn(msgItem.From) }}</b>
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
    </el-timeline>
    <el-backtop target=".block"></el-backtop>
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
      msgObserver: Object,
    };
  },
  computed: {
    ...mapState(["username"]),
    ...mapFields(["curRoom"]),
    msgList() {
      console.log("this.curRoom.msgs:", this.curRoom.msgs);
      return this.curRoom.msgs; //saved as triple-msginfo in DB
    },
    orderMsgList() {
      return this.getOrderedMsgs(this.msgList);
    },
    groupname(){
      return this.curRoom.groupname
    },
    roomRef(){
      return db.collection("rooms").doc(this.curRoom.room_id);
    },

  },
  mounted(){
    this.msgObserver = this.roomRef.onSnapshot(doc => {
    console.log(`Received doc snapshot: ${doc}`);
    console.log('Received doc data:',doc.data());
    this.curRoom = { ...doc.data(), room_id: this.curRoom.room_id }
    // ...
  }, err => {
    console.log(`Encountered error: ${err}`);
    })
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
    getMsgFromOwn(from){
      if(this.curRoom.owner == from){
        return from+" (管理員)"
      }
      return from
    },

    async addMsg(msgObj) {
      console.log("add msgObj,msgObj.From:", msgObj);
      console.log("add msgObj.From:", msgObj.From);
      let msgPackStr =
        msgObj.Msg + "~!~#~%~&~" + msgObj.From + "~!~#~%~&~" + msgObj.Time;
      await this.roomRef.update({
        msgs: firebase.firestore.FieldValue.arrayUnion(msgPackStr),
      });
      this.roomRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            this.curRoom = { ...doc.data(), room_id: this.curRoom.room_id }
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