<template>
  <div class="hello">
    <ul>
      <li v-for="doc in documents" :key="doc.id">
        {{doc}} / {{doc}} 
      </li>
    </ul>
    
  </div>
</template>

<script>
import {db} from '../firebase/db'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      documents: [],
    }
  },
  firestore: {
    documents: db.collection('rooms'),
  },
  watch:{
    "this.documents": function() {
      console.log('documents:',this.documents)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
  
