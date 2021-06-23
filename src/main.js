import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { DatePicker } from 'ant-design-vue'
import { firestorePlugin} from 'vuefire'
import firebase from 'firebase'
import {firebaseConfig} from './firebase/firebaseConfig';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from "vue-cookies";
Vue.use(VueCookies)
Vue.use(ElementUI);
Vue.use(firestorePlugin)
Vue.use(DatePicker)

Vue.config.productionTip = false

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

router.beforeEach((to, from, next) => {
  console.log("router.to:", to.name)
  console.log("router.from:", from.name)
  const cookie = Vue.$cookies.get("chatzoom") || {
    uid: '',
    token: '',
    isLogin: false,
    username: '',
    email: ''
  }
  console.log("before router cookie:", cookie)

  if (!cookie.isLogin && to.name!='Login'){
    console.log("Redirect to login")
    next('login')
    return
  }else if (cookie.isLogin && to.name=='Login'){
    next('personal')
    return
  }
  if(to.name == 'Chatroom'){
    if(from.name != 'Search' && from.name != 'Personal'){
      return 
    }
  }

  next()
})



new Vue({
  store,
  router,
  created(){
    firebase.auth().onAuthStateChanged((user) => {
      console.log('auth user:',user)
      if(user) {
        console.log('auth to personal')
        
        Vue.$cookies.set("chatzoom", {
          uid: user.uid,
          isLogin: true,
          token: user.refreshToken,
          username: user.displayName,
          email: user.email
        })
        console.log('this.$cookies:',Vue.$cookies)
        // Vue.$router.push('/personal')
      } else {
        Vue.$cookies.remove("chatzoom");
        console.log('auth to login')
        this.$router.push('/login')
      }
     });
  },
  render: h => h(App)
}).$mount('#app')
