<template>
  <header class="header">
        [header TBD]
        <logout v-if="$route.name !== 'Login' "></logout>
  </header>
</template>
<script>
import logout from './buttons/logout.vue'
export default {
    computed:{

    },
    components:{
        logout
    }
}
</script>

<style>

</style>