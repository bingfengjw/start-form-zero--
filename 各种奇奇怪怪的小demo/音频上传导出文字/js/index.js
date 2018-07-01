var btnStartTxt = 'start';
var btnEndTxt = 'end';

// 上传预览音频
var oAudio = document.querySelector('audio');
var audioName = '';
var audioType = '';
document.querySelector('input[type=file]').onchange = function (v) {
  audioName = this.files[0].name;
  audioType = audioName.split('.');
  audioType = audioType[audioType.length - 1];
  if (audioType !== 'wav') {
    alert('音频格式错误，必须为.wav！');
    return false;
  }
  document.querySelector('#auT').innerHTML = audioName;
  oAudio.src = window.URL.createObjectURL(this.files[0]);
  $(".setTime").attr('disabled', false);
}

// 上传预览txt
var input = document.querySelector('#input');
var span = document.querySelector('#preview');
var fileName = '';
var fileType = '';
input.addEventListener('change', function (e) {
  fileName = this.files[0].name;
  fileType = fileName.split('.');
  fileType = fileType[fileType.length - 1];
  console.log(fileType);
  var reader = new FileReader();
  reader.onload = function (e) {
    txtIndex = 0;
    var content = this.result;
    // 区分格式，json格式则直接导入，txt格式则重排格式为json格式，带（起始时间）（结束时间）（内容）（是否为文字）四个属性
    switch (fileType) {
      case 'json':
        content = JSON.parse(content).data;
        break;
      case 'txt':
        content = content.split(/\n/g);
        var _con = [];
        for (var x in content) {
          _con.push({
            start: 0,
            end: 0,
            content: content[x],
            isText: true
          });
        }
        content = _con;
        break;
      default:
        alert('文件格式错误！');
        return false;
    }
    var contentHTML = '';
    console.log(content);
    for (var x in content) {
      var item = {
        start: (x == 0 ? "00:00" : content[x].start == '0' ? '' : content[x].start),
        end: (content[x].end === '0' ? '' : content[x].end),
        content: content[x].content,
        isText: content[x].isText
      }
      contentHTML +=
        '<div class="' + (eval(item.isText) ? "" : "no") + ' item">\
            <div class="replay fa fa-repeat"></div>\
            <div class="times">\
              <span currentTime="' + (x == 0 ? 0 : content[x].start == '0' ? '' : content[x].start) + '" class="timeStart time">' + (item.start == 0 ? "" : timeFn(x == 0 ? 0 : item.start)) + '</span>\
              -\
              <span currentTime="' + item.end + '" class="timeEnd time">' + (item.end == 0 ? "" : timeFn(item.end)) + '</span>\
            </div>\
            <span contenteditable="true" class="content">' +
        item.content + '</span>\
            <label><input type=checkbox ' +
        (eval(item.isText) ? "checked" : "") + '>是否为语音</label>\
          </div>';
    }
    span.innerHTML = contentHTML;
    span.style.border = '1px solid #999';
    $("#time").attr('disabled', false);
    $("#save").attr('disabled', false);
  };
  document.querySelector('#txT').innerHTML = this.files[0].name;
  reader.readAsText(this.files[0]);
});




// 点击添加时间戳
var txtIndex = 0;
var ctP = $("#preview");
var audTime = oAudio.currentTime;
$("#time").click(function () {
  audTime = oAudio.currentTime.toFixed();
  $("#preview div").removeClass('active');

  addEndTime();
  // switch ($(this).text()) {
  //   case btnStartTxt:
  //     $(this).text(btnEndTxt);
  //     addStartTime();
  //     break;
  //   case btnEndTxt:
  //     $(this).text(btnStartTxt);
  //     addEndTime();
  //     break;
  // }

});

function addStartTime() {
  ctP.find('.item').eq(txtIndex).find('.timeStart').text(timeFn(audTime));
  ctP.find('.item').eq(txtIndex).find('.timeStart').attr('currentTime', audTime);
}

function addEndTime() {
  ctP.find('.item').eq(txtIndex).find('.timeEnd').text(timeFn(audTime));
  ctP.find('.item').eq(txtIndex).find('.timeEnd').attr('currentTime', audTime);
  txtIndex++;
  ctP.find('.item').eq(txtIndex).find('.timeStart').text(timeFn(audTime));
  ctP.find('.item').eq(txtIndex).find('.timeStart').attr('currentTime', audTime);
}

function timeFn(oTime) {
  var min = Math.floor(oTime / 60) < 10 ? '0' + Math.floor(oTime / 60) : Math.floor(oTime / 60);
  var sec = (oTime % 60) < 10 ? '0' + (oTime % 60) : oTime % 60;
  var time = min + ' : ' + sec;
  return time;
}

// 标注不为语音部分
ctP.delegate('label', 'click', function (event) {
  event.stopPropagation();
})
ctP.delegate('input', 'change', function (event) {
  var _thisCheckType = $(this).prop('checked');
  if (!_thisCheckType) {
    $(this).parent().parent().addClass('no');
  } else {
    $(this).parent().parent().removeClass('no');
  }
})

// 点击选中当前行
ctP.delegate('.item', 'click', function () {
  txtIndex = $(this).index();
  ctP.find('div').removeClass('active');
  $(this).addClass('active');
})

// 点击时间跳转音频
ctP.delegate('.time', 'click', function (event) {
  oAudio.currentTime = $(this).attr('currentTime');

  txtIndex = $(this).parents('.item').index();
  ctP.find('.item').removeClass('active');
  $(this).parents('.item').addClass('active');

  event.stopPropagation();
})

var itemTimeInit = '';
var itemTimeCurr = '';
ctP.delegate('.time', 'dblclick', function (event) {
  itemTimeInit = $(this).text();
  $(this).prop('contenteditable', true);
  $(this).focus();
  event.stopPropagation();
})
ctP.delegate('.time', 'blur', function (event) {
  itemTimeCurr = $(this).text();
  if(!changeTimeToSec(itemTimeCurr)){
    alert('请输入正确时间格式！');
    $(this).text(itemTimeInit);
    return;
  }
  $(this).prop('contenteditable', false);
  $(this).attr('currentTime', changeTimeToSec(itemTimeCurr));
  event.stopPropagation();
});

function changeTimeToSec(time) {
  console.log(time);
  time = time.split(':');
  console.log(Number(time[0]));
  if(isNaN(Number(time[0])) || isNaN(Number(time[1]))){
    return false;
  }else if(Number(time[1]>=60)){
    return false;
  }
  var result = Number(time[0] * 60) + Number(time[1]);
  return result;
}

// 重播当前行
ctP.delegate('.replay', 'click', function (event) {
  var time = {
    start: Number($(this).parent().find('.timeStart').attr('currentTime')),
    end: Number($(this).parent().find('.timeEnd').attr('currentTime'))
  };
  console.log(time);
  oAudio.currentTime = time.start;
  oAudio.play();
  var timer = setInterval(function () {
    if (oAudio.currentTime > time.end) {
      clearInterval(timer);
      oAudio.pause();
    }
  }, 500);
  event.stopPropagation();
})


// ctP.delegate('div button:nth-of-type(1)', 'click', function (event) {
//   $(this).parent().find('.time').text(' ');
//   console.log($(this).parent());
//   $("#time").text(btnStartTxt);
// })
// ctP.delegate('div button:nth-of-type(2)', 'click', function (event) {
//   var _index = $(this).parent().index();
//   $(this).parent().remove();
//   if ($('.active').length === 1) {
//     txtIndex = $('.active').index();
//   } else if (txtIndex > _index) {
//     console.log(txtIndex, _index);
//     txtIndex--;
//   }
//   console.log(txtIndex);

//   event.stopPropagation();
// })

document.querySelectorAll(".setTime")[0].onclick = function () {
  oAudio.currentTime = oAudio.currentTime - 5;
}
document.querySelectorAll(".setTime")[1].onclick = function () {
  oAudio.currentTime = oAudio.currentTime - 10;
}
document.querySelectorAll(".setTime")[2].onclick = function () {
  oAudio.currentTime = oAudio.currentTime + 10;
}
document.querySelectorAll(".setTime")[3].onclick = function () {
  oAudio.currentTime = oAudio.currentTime + 5;
}








$("#save").click(function (event) {
  oAudio.pause();
  var items = ctP.find('.item');
  var _json = {
    data: []
  };
  $.each(items, function (indexInArray, valueOfElement) {
    var item = $(valueOfElement);
    var times = {
      start: item.find('.timeStart').attr('currentTime'),
      end: item.find('.timeEnd').attr('currentTime'),
    }
    _json.data.push({
      start: times.start ? times.start : 0,
      end: times.end ? times.end : 0,
      content: item.find('.content').text(),
      isText: item.find('input').prop('checked')
    })
  });
  console.log(_json);

  // 导出生成json文件
  // function downloadJson(data) {
  var blob = new Blob([JSON.stringify(_json)], {
    type: ""
  });
  saveAs(blob, audioName.replace('.wav', '.json'));
  // }
});