<template>
  <div id="app">
    <div class="father">
      <input type="text" v-model="parentMsg">
      <span>金额数为 {{num}}</span>
    </div>
    <child :message='parentMsg'@listenToChildEvent="showMsgFromChild"></child>
  </div>
</template>

<script>
import child from "./components/Child.vue";
export default {
  name: "app",
  data() {
    return {
      parentMsg: "这是使用动态绑定父组件传入子组件的值",
      num: 0
    };
  },
  methods: {
    showMsgFromChild: function(data) {
      this.num = data;
    }
  },
  components: {
    child
  }
};
</script>

<style scoped>
.father {
  border: 3px solid skyblue;
  padding: 5px;
  margin-bottom: 3px;
}
</style>
