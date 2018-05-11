var btnStartTxt = 'start';
var btnEndTxt = 'end';

var wavesurfer = WaveSurfer.create({
  container: '#waveform',
});

// 上传预览音频
document.querySelector('input[type=file]').onchange = function (v) {
  wavesurfer.load(window.URL.createObjectURL(this.files[0]));
  $(".setTime").attr('disabled', false);
}
wavesurfer.on('ready', function () {
  wavesurfer.play(); //  音频播放
});

// 上传预览txt
var input = document.querySelector('#input');
var span = document.querySelector('#preview');
input.addEventListener('change', function (e) {
  var reader = new FileReader();
  reader.onload = function (e) {
    var content = this.result;
    content = content.split(/\n/g);
    var contentHTML = '';
    for (var x in content) {
      contentHTML +=
        '<div>\
          <span class="timeStart time"></span>\
          -\
          <span class="timeEnd time"></span>\
          <span class="content">' +
        content[x] + '</span>\
          <button>重置</button>\
          <button>删除</button>\
        </div>'
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
var audTime = wavesurfer.getCurrentTime();
var audAllTime = Math.floor(wavesurfer.getDuration());
$("#time").click(function () {
  audTime = wavesurfer.getCurrentTime().toFixed();
  console.log(audTime);
  $("#preview div").removeClass('active');
  switch ($(this).text()) {
    case btnStartTxt:
      $(this).text(btnEndTxt);
      addStartTime();
      break;
    case btnEndTxt:
      $(this).text(btnStartTxt);
      addEndTime();
      break;
  }
});

$(".audio_box button").click(function () {
  wavesurfer.playPause();
});
wavesurfer.on('audioprocess', function () {
  audTime = Math.floor(wavesurfer.getCurrentTime());
  $(".audio_box span").text(timeFn(audTime));
})

function addStartTime() {
  ctP.find('div').eq(txtIndex).find('.timeStart').text(timeFn(audTime));
  ctP.find('div').eq(txtIndex).find('.timeStart').attr('currentTime', audAllTime / audTime * 0.01);
}

function addEndTime() {
  ctP.find('div').eq(txtIndex).find('.timeEnd').text(timeFn(audTime));
  ctP.find('div').eq(txtIndex).find('.timeEnd').attr('currentTime', audAllTime / audTime * 0.01);
  txtIndex++;
}

function timeFn(oTime) {
  oTime = typeof oTime !== undefined ? oTime : audTime;
  var min = Math.floor(oTime / 60) < 10 ? '0' + Math.floor(oTime / 60) : Math.floor(oTime / 60);
  var sec = (oTime % 60) < 10 ? '0' + (oTime % 60) : oTime % 60;
  var time = min + ' : ' + sec;
  return time;
}

ctP.delegate('div', 'click', function () {
  txtIndex = $(this).index();
  ctP.find('div').removeClass('active');
  $(this).addClass('active');
  $("#time").text(btnStartTxt);
})
ctP.delegate('.time', 'click', function (event) {
  var time = audAllTime / audTime * 0.01;

  var name = $(this).hasClass('timeStart');
  var txt = name ? btnStartTxt : btnEndTxt;
  $("#time").text(txt);

  txtIndex = $(this).parent().index();
  ctP.find('div').removeClass('active');
  $(this).parent().addClass('active');

  event.stopPropagation();
})
ctP.delegate('div button:nth-of-type(1)', 'click', function (event) {
  $(this).parent().find('.time').text(' ');
  console.log($(this).parent());
  $("#time").text(btnStartTxt);
})
ctP.delegate('div button:nth-of-type(2)', 'click', function (event) {
  var _index = $(this).parent().index();
  $(this).parent().remove();
  if ($('.active').length === 1) {
    txtIndex = $('.active').index();
  } else if (txtIndex > _index) {
    console.log(txtIndex, _index);
    txtIndex--;
  }
  console.log(txtIndex);

  event.stopPropagation();
})

document.querySelectorAll(".setTime")[0].onclick = function () {
  wavesurfer.skip(-5);
}
document.querySelectorAll(".setTime")[1].onclick = function () {
  wavesurfer.skip(-10);
}
document.querySelectorAll(".setTime")[2].onclick = function () {
  wavesurfer.skip(10);
}
document.querySelectorAll(".setTime")[3].onclick = function () {
  wavesurfer.skip(5);
}








$("#save").click(function (event) {
  $("#preview button").remove();
  $("#preview").wordExport();
  $("#preview").find('div').append('<button>删除</button>');
});