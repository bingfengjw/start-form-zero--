let vm = new Vue({
  el: '#app',
  data: {
    data: {},
    tableData: [],
    dateNow: '',
    moneyResult: [],
    bgColor: '',
    billNum:0,
  },
  mounted() {
    const _this = this;

    const url = "http://api.tankwang.com:8080/modules/billorder/action/bizBillCurrentMsgMarketAction/billInfo.htm?billNo=230758400800520180509100267700";
    _this.billNum = url.split('billNo=')[1];
    $.ajax({
      url,
      success: function (response) {
        _this.data = response.data;
        _this.tableData = response.data.biList;

        _this.money();
      }
    });

    const date = new Date();
    const days = {
      year: date.getFullYear(),
      month: date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
      day: date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
    };
    _this.dateNow = `${days.year}-${days.month}-${days.day}`;

  },
  methods: {
    smalltoBIG(n) {
      var fraction = ['角', '分'];
      var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
      var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
      ];
      var head = n < 0 ? '欠' : '';
      n = Math.abs(n);

      var s = '';

      for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
      }
      s = s || '整';
      n = Math.floor(n);

      for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
      }
      return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    },
    money() {
      let result = [];
      let num = this.data.faceAmount.toFixed(2) + '';
      num = num.replace('.', '');
      for (const x of num) {
        result.push(x);
      }
      result.unshift('￥');
      if (result.length < 12) {
        let oResult = [];
        for (let x = 0; x < 12 - result.length; x++) {
          oResult.push('');
        }
        result = [...oResult, ...result];
      }
      this.moneyResult = result;
    },
    billStateJudge(billState) {
      if (billState == "E_02Z" || billState == "E_02S") {
        return "背书已签收"
      } else if (billState == "E_03Z" || billState == "E_03S") {
        return "背书已撤回"
      } else if (billState == "E_08Z" || billState == "E_08S") {
        return "背书待签收"
      } else if (billState == "E_26Z" || billState == "E_26S") {
        return "背书已拒绝"
      } else {
        return ""
      }
    },
  }
})