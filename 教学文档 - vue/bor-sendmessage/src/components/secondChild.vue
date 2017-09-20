<template>
  <div id="secondChild">
    <h2>secondChild组件</h2>
    <p>从firstChild组件接收到的字符串参数: {{msg}}</p>
  </div>
</template>

<script>
  import bus from '../assets/eventBus.js';
  export default {
    data(){
      return {
        msg:'默认值'
      }
    },
    mounted(){
      const _this = this;
      bus.$on('userDefinedEvent',function (msg) {
        _this.msg = msg;
      })
    }
  }
</script>

<style scoped>
  div{
    border:5px solid skyblue;
    padding: 3px;
  }
</style>
