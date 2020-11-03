<template>
  <div id="firstChild">
    <h2>firstChild组件</h2>
    <input type="text" @keyup="sendMsg" v-model="msg">{{msg}}
  </div>
</template>

<script>
  import bus from '../assets/eventBus.js';
  export default {
    data(){
      return{
        msg:''
      }
    },
    methods:{
      sendMsg:function () {
        bus.$emit('userDefinedEvent',this.msg)
      }
    }
  }
</script>

<style scoped>
  div{
    border:5px solid red;
    padding: 5px;
    margin-bottom: 3px;
  }
</style>
