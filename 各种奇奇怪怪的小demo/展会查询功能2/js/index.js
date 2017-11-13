$(function () {
  var oMenu = $(".menu-list");
  var initData = '';

  // 页面初始后生成选框
  $.ajax({
    url: "http://10.2.6.31/cse/web/index.php?r=image/select",
    success: function (response) {
      var data = JSON.parse(response);
      initdata = data;
      var content = '';
      for (x in data) {
        var item = data[x];
        content += '<label><input type="checkbox" class="choose-item" p_name=' + item.p_name + ' p_x=' +
          item.p_x + ' p_y=' + item.p_y + ' p_id=' + item.p_id + '>' + item.p_name + '</label>'
      }
      content +=
        '<label style="margin-left=50px;"><input type="checkbox" class="choose-all">全选</label>'
      oMenu.html(content);
    }
  });

  // 全选、全不选
  $('.menu-list').on('click', '.choose-all', function () {
    $.each($(".choose-item"), function (indexInArray, valueOfElement) {
      $(valueOfElement).prop('checked', $(".choose-all").prop("checked"));
    });
  });

  // 点击复选框查询
  $(".send-point").click(function () {
    var sendList = [];

    $.each($(".choose-item:checked"), function (indexInArray, valueOfElement) {
      var _name = $(valueOfElement).attr('p_name');
      var _id = $(valueOfElement).attr('p_id');
      var _x = $(valueOfElement).attr('p_x');
      var _y = $(valueOfElement).attr('p_y');
      sendList.push({
        id: _id,
        x: _x,
        y: _y
      })
    });
    console.log(sendList);
    if (sendList.length === 0) {
      $(".map-img").attr('src', './map2.jpg');
    } else {
      $.ajax({
        url: "http://10.2.6.31/cse/web/index.php?r=image/index",
        type: 'POST',
        data: {
          place: sendList
        },
        success: function (response) {
          console.log(response);
          var data = JSON.parse(response);
          $(".map-img").attr('src', 'http://10.2.6.31' + data.url);
        }
      });
    }
  });

  // 输入展厅名查询
  $(".search button").click(function () {
    var text = $(".search input").val();
    var searchName = [{}];
    $.each(initdata, function (indexInArray, valueOfElement) {
      if (valueOfElement.p_name === text) {
        searchName[0].id = valueOfElement.p_id;
        searchName[0].x = valueOfElement.p_x;
        searchName[0].y = valueOfElement.p_y;
      }
    });
    if(searchName[0].id === undefined){
      alert('请输入正确的展台名称')
    }else{
      $.ajax({
        type: "POST",
        url: "http://10.2.6.31/cse/web/index.php?r=image/index",
        data: {
          place:searchName
        },
        success: function (response) {
          console.log(response);
          var data = JSON.parse(response);
          $(".map-img").attr('src', 'http://10.2.6.31' + data.url);
        }
      });
    }
  });

  // 打印
  $(".print").click(function(){
    $("#print-box").jqprint();
  })

})
