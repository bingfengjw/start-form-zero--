<template>
  <div>
    <h2>child子组件部分</h2>
    <p>{{message}}</p>
    <input type="text" @keyup="sendMsgToParent" v-model="msg">
  </div>
</template>

<script>
  export default {
    props:['message'],
    data(){
      return{
        msg:''
      }
    },
    methods:{
      sendMsgToParent:function () {
        this.$emit("listenToChildEvent",this.msg)
      }
    }
  }
</script>

<style scoped>
  div{
    border:3px solid red;
    padding: 5px;
  }
</style>
