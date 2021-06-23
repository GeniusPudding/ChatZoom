<template>
  <div>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
// import {firebaseConfig} from '../firebase/firebaseConfig';
export default {
  name: "Login",
  mounted() {
    // console.log("firebase:", firebase);
    // console.log("firebaseui:", firebaseui);
    var uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    };

    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    // console.log("ui:", ui);
    ui.start("#firebaseui-auth-container", uiConfig);
  },
};
</script>

<style>
#firebaseui-auth-container{
  background-color: aliceblue;
  height: 100vh;
  background-size:cover;
  background-image: url('../assets/images/bg.jpg'), linear-gradient(to top, #0250c5 0%, #d43f8d 100%);
}
</style>