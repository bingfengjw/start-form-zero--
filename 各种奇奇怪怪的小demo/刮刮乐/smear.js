function SMEAR() {
	function init() {
		//		 let wWidth

		if(window.innerWidth) {
			wWidth = window.innerWidth;
		} else if(document.body && document.body.clientWidth) {
			wWidth = document.body.clientWidth;
		}
      let  _self = this
      
	}

	function render(oDiv) {
		console.log(oDiv);
		let oGgl = oDiv; //子盒子

		let bodyStyle = oGgl.parentNode; //父盒子
		//      console.log(bodyStyle)
		bodyStyle.style.position = "relative"
		oGgl.style.position = "absolute"
		oGgl.style.zIndex = "-1"
		oGgl.style.left = "0"
		oGgl.style.top = "0"

		//       oGgl.style.textAlign="center"
		let oTouchsmear = oGgl.getAttribute('data-interactive-type'); //子盒子data
		let w = oGgl.clientWidth; //获取子盒子宽高
		let h = oGgl.clientHeight;
		/*	console.log(w)
			console.log(h)*/
			
		if(w < 200 && h < 30) {
			w = 400;
			h = 100;
			console.log(oGgl)
			oGgl.style.width = "400px"
			oGgl.style.height = "100px"
			oGgl.style.textAlign = "center"
			oGgl.style.fontSize = "40px"
			oGgl.style.lineHeight = "100px"
		}
		
		bodyStyle.mozUserSelect = 'none'; //屏蔽
		bodyStyle.webkitUserSelect = 'none';
		//70%
		//创建画布
		let canvas = document.createElement('canvas');
		oGgl.parentNode.appendChild(canvas); //子盒子下面
		console.log(bodyStyle)
		let ctx = canvas.getContext('2d');
		canvas.width = w;
		canvas.height = h;
		ctx.beginPath();
		//			ctx.fillStyle = 'grey'
		ctx.fillStyle = "rgba(149,163,171,0.95)"
		//			console.log(canvas.width)
		ctx.fillRect(0, 0, w, h);
		//判断手势抬起固定位置		
		let mousedown = false;
		canvas.addEventListener('touchstart', function(e) {
			e.preventDefault();
			mousedown = true;
		});
		canvas.addEventListener('touchend', function(e) {
			e.preventDefault();
			console.log(mousedown)
			mousedown = false;

		});
		canvas.addEventListener('touchmove', function(e) {
			e.preventDefault();
			e = e || event
			//涂抹百分70清空
			let data = ctx.getImageData(0, 0, w, h).data,
				scrapeNum = 0,
				area = w * h;
			for(let i = 3, len = data.length; i < len; i += 4) {
				if(data[i] === 0) {
					scrapeNum++;
				}
			}
			if(scrapeNum > area * 0.1) {
				console.log(">70%");
				ctx.clearRect(0, 0, w, h);
				/*		canvas.removeEventListener('touchmove', moveFunc, false);
						canvas.removeEventListener('touchend', endFunc, false);*/
			}
			let offsetX = bodyStyle.offsetLeft //获取
			offsetY = bodyStyle.offsetTop;

			if(mousedown) {
				if(e.changedTouches) {
					e = e.changedTouches[e.changedTouches.length - 1];
				}

				console.log(offsetX)
				let x = e.pageX - offsetX,
					y = e.pageY - offsetY;
				//				console.log(y)
				//				console.log(x)
				ctx.globalCompositeOperation = "destination-out";
				ctx.beginPath();
				ctx.arc(x, y, 30, 0, Math.PI * 4);
				ctx.fill();
			}
		});
	}

	function run() {
		init();
		let alloDiv = document.querySelectorAll('.otouchsmear');
		for(let i = 0; i < alloDiv.length; i++) {
			alloDiv[i]
			render(alloDiv[i]);
		}
	}
	return {
		run
	}
}