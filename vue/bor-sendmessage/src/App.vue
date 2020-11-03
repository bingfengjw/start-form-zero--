<template>
  <div id="app">
    <firstChild></firstChild>
    <secondChild></secondChild>
  </div>
</template>

<script>
  import firstChild from './components/firstChild.vue';
  import secondChild from './components/secondChild.vue';
  export default {
    name: 'app',
    components:{
      firstChild,
      secondChild
    }
  }
</script>

<style>

</style>
