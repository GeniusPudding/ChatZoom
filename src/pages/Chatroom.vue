<template>
  <div class="block bg">
    <el-header class="groupname"
      ><b>{{ groupname }}</b></el-header
    >
    <el-input
    ref="input" 
    style="width: 66%"
      type="textarea"
      :rows="4"
      placeholder="想說些什麼呢"
      v-model="textarea"
      @keyup.enter.native="onSubmit"
      
    >
    </el-input>
    <el-button 
      style="display: inline-block"
      @click.native="onSubmit"
      type="primary"
      icon="el-icon-s-promotion"
      >送出</el-button
    >

    <el-timeline>
      <el-timeline-item
        
        v-for="(msgItem, $index) in orderMsgList"
        :key="$index"
        :icon="last($index)"
        :type= "primary"
        placement="top"
      >
        <el-card style="height:15vh;width:30vw;left:30vw;position:relative" v-if="getFromYou(msgItem.From)" align="right">
          <strong style="font-family: monospace; font-size: 2vh">{{
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
        <el-card  style="height:15vh;width:30vw;left:0vw;position:relative" v-else align="left">
          <strong style="font-family: monospace; font-size: 2vh">{{
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
    groupname() {
      return this.curRoom.groupname;
    },
    roomRef() {
      return db.collection("rooms").doc(this.curRoom.room_id);
    },
  },
  mounted() {
    this.$refs.input.focus();
    this.msgObserver = this.roomRef.onSnapshot(
      (doc) => {
        // console.log(`Received doc snapshot: ${doc}`);
        // console.log("Received doc data:", doc.data());
        this.curRoom = { ...doc.data(), room_id: this.curRoom.room_id };
        // ...
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  },
  methods: {
    onSubmit(event) {
      // console.log("event:", event);
      // console.log("event.shiftKey:", event.shiftKey);
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
        // console.log("order msgs:", orderMsgs);
      } catch (error) {
        console.error(error);
      }

      return orderMsgs;
    },
    getMsgFromOwn(from) {
      if (this.curRoom.owner == from) {
        return from + " (管理員)";
      }
      return from;
    },

    async addMsg(msgObj) {
      // console.log("add msgObj,msgObj.From:", msgObj);
      // console.log("add msgObj.From:", msgObj.From);
      let msgPackStr =
        msgObj.Msg + "~!~#~%~&~" + msgObj.From + "~!~#~%~&~" + msgObj.Time;
      await this.roomRef.update({
        msgs: firebase.firestore.FieldValue.arrayUnion(msgPackStr),
      });
      this.roomRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            this.curRoom = { ...doc.data(), room_id: this.curRoom.room_id };
          } else {
            // doc.data() will be undefined in this case
            // console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
    last(index){
      if(index==0){
        return 'el-icon-more'
      }
    }
  },
};
</script>

<style>
.bg{
  background-color: aliceblue;
  background-size:cover;
  background-image: url('../assets/images/bg.jpg'), linear-gradient(to top, #0250c5 0%, #d43f8d 100%);
}
.groupname{
  color: black;
  font-size: 4vh;
  text-shadow: black 0.1em 0.1em 0.2em;
  background-color: #aabcd6;
  
}
</style>