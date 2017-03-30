var one=document.getElementById("pic_404");
var cat=document.getElementById("pic_man");
var cat_bg=document.getElementById("pic_manbg");
var bed=document.getElementById("pic_bed");
var bed_bg=document.getElementById("pic_bedbg");
var bighouse=document.getElementById("pic_bighouse");
var smallhouse=document.getElementById("pic_smallhouse");
var big_bg=document.getElementById("pic_bg");
function eve(e){
	if(e = e || window.event){

		var vertical = e.clientX;
		var horizontal = e.clientY;
		document.removeEventListener("mousemove",eve);
		function myMouse(e){
			if(e.pageX||e.pageY){
				return{x:e.pageX-vertical,y:e.pageY-horizontal};
			}
		}
		function tanchu(e){
			e = e || window.event;
			if(e.target != aa){
			var mouse = myMouse(e);
			var constant=mouse.y/60;
			// var xp = xx/32;
			one.style.left = 50+mouse.x/50+"px";
			one.style.top =60+constant+"px";
			cat.style.left = 340+mouse.x/80+"px";
			cat.style.top= 75+constant+"px";
			cat_bg.style.left = 355+mouse.x/80+"px";
			cat_bg.style.top= 280+constant+"px";
			bed.style.left = 420+mouse.x/80+"px";
			bed.style.top= 130+constant+"px";
			bed_bg.style.left = 430+mouse.x/80+"px";
			bed_bg.style.top = 240+constant+"px";
			bighouse.style.left = 470-mouse.x/50+"px";
			bighouse.style.top = 65-constant+"px";
			smallhouse.style.left = 780-mouse.x/30+"px";
			smallhouse.style.top = 110-mouse.y/30+"px";
			big_bg.style.top =-Math.abs(mouse.y/60)+"px";
		}
		}
	}
	document.onmousemove = tanchu;
}
document.addEventListener("mousemove",eve);
