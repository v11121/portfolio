//buhee's onepage
var buttons = 'onePage_buttons';
var navigation = 'onePage_util';
var tmp = [];
	
$.fn.onePage = function(options) {

	//선택된 요소가 없을 때
	if (this.length < 1) {
		return false;
	}

	var settings = $.extend({ 
		button: false,
		keyboard: false,
		navi: false,
		scroll: false, // 스크롤 감추기
		naviName: []
	
	}, options );

	section = this;
	
	$.each(section, function (index) {	

		$(section).eq(index).addClass('page-'+index);
		tmp.push(parseInt($(section).eq(index).position().top));
		/*터치 이벤트*/
		var startX,startY, endX,endY;
		
		$(this).on('touchstart',function(event){
			startX = event.originalEvent.changedTouches[0].screenX;
			startY = event.originalEvent.changedTouches[0].screenY;
		});
		$(this).on('touchend',function(event){
			 endX=event.originalEvent.changedTouches[0].screenX;
			 endY=event.originalEvent.changedTouches[0].screenY;
			 
			 var i = $(section).index($(this)) +1 ;
			 var delta = 0;
			 if (event.detail){
				 delta = -event.detail / 3;
				}
			 
			 var moveTop = $(window).scrollTop();
			 var elmSelecter = $(section).eq(index);
			 
			if(startY-endY>2){
				if ($(elmSelecter).next() != undefined) {
				   moveTop = $(elmSelecter).next().offset().top;
				}
			 }else if(endY-startY>2){
				 if ($(elmSelecter).prev() != undefined) {
					 moveTop = $(elmSelecter).prev().offset().top;
				}
			 }

			moveScroll(moveTop);
		});
		
		// 개별적으로 Wheel 이벤트 적용
		$(this).on("mousewheel DOMMouseScroll", function (e) {
			e.preventDefault();
			var i = $(section).index($(this)) +1 ;
			var delta = 0;

			if (event.wheelDelta) {
				delta = event.wheelDelta / 120;
				if (window.opera) delta = -delta;
			}
			var moveTop = $(window).scrollTop();
			var elmSelecter = $(section).eq(index);


			// 마우스휠을 위에서 아래로
			if (delta < 0) {
				if ($(elmSelecter).next() != undefined) {

					moveTop = $(elmSelecter).next().offset().top;
					$('.'+buttons).find('li').removeClass('active');
					$('.'+buttons).find('li').eq(index+1).addClass('active');
					$('.'+navigation).find('li').removeClass('active');
					$('.'+navigation).find('li').eq(index+1).addClass('active');

					
					//$('.onepage_buttons ul li').removeClass('active');
					//$('.onepage_buttons ul li').eq(index+1).addClass('active');
				}
			// 마우스휠을 아래에서 위로
			} else {

			 if ($(elmSelecter).prev() != undefined) {
					 moveTop = $(elmSelecter).prev().offset().top;
					$('.'+buttons).find('li').removeClass('active');
					$('.'+buttons).find('li').eq(index-1).addClass('active');
					$('.'+navigation).find('li').removeClass('active');
					$('.'+navigation).find('li').eq(index-1).addClass('active');
					
					//$('.onepage_buttons ul li').removeClass('active');
					//$('.onepage_buttons ul li').eq(index-1).addClass('active');
				}
			}
			
			if( moveTop <= 0){
				moveTop == 0;

			}else if(moveTop >= 0){
				moveTop == $(section).eq(section.length-1).position().top;
			}

			moveScroll(moveTop);
		});
	});

	//버튼, 네비
	var util = $('<div>').addClass('util_on');
	var navi = $('<div>').addClass(navigation);
	var buttonDiv = $('<div>').addClass(buttons);
	var ulNavi = $('<ul>');
	var ulButton = $('<ul>');
	
	//네비 버튼 속성
	var util_btn = $('<a>').attr('href','#');
	util_btn.addClass('util_btn');
	util_btn.attr('title','메뉴 보기');
	var span1 =  $('<span>').addClass('line');
	var span2 =  $('<span>').addClass('line');
	var span3 =  $('<span>').addClass('line');
	span3.text('menu');
	util_btn.append(span1);
	util_btn.append(span2);
	util_btn.append(span3);
	
	$.each(section, function(i){
		var li1 = $('<li>');
		var a1 = $('<a>').attr('href','#');
		
		var li2 = $('<li>');
		var a2 = $('<a>').attr('href','#');
		
		a1.attr('title',i+1+'페이지 바로가기')
		a2.attr('title',settings.naviName[i]+'페이지 바로가기')
//		a2.text(settings.naviName[i]);
		
		li1.append(a1);
		li2.append(a2);
		
		ulButton.append(li1);
		ulNavi.append(li2);

	});

	//네비 추가
	if(settings.navi != false){
		util.append(ulNavi);
		navi.append(util_btn);
		navi.append(util);
		$('body').append(navi);
		navi.css('width','70px');
		util.css('left','-100px');
	}

	//버튼기능 on 일 때 버튼들 생성
	if(settings.button == true){
		buttonDiv.append(ulButton);
		$('body').append(buttonDiv);
		
	}
	
	clickPage(buttons);
	clickPage(navigation);
	
	util_btn.on('mouseover', function(e){
		e.preventDefault();
		navi.addClass('util_active');
		util.stop().animate({"left": '0'});
		util_btn.addClass('active_btn');
		util_btn.stop().animate({"left": '69'});
	});

	navi.on('mouseleave', function(e){
		e.preventDefault();
		navi.removeClass('util_active');
		util_btn.removeClass('active_btn');
		util_btn.stop().animate({"left": '10'});
		util.stop().animate({"left": '-100'});
	});
	
	//첫페이지 및 새로고침 시 active
	var curPos = parseInt($(document).scrollTop());
	
	$.each(tmp, function(i){
		console.log(tmp[i] +' : '+curPos);
		if(tmp[i] == curPos){
			$('.'+buttons).find('li').eq(i).addClass('active');
			$('.'+navigation).find('li').eq(i).addClass('active');
		}
	});
};

// 화면 이동 0.8초(800)
function moveScroll(moveTop){
	$("html,body").stop().animate({
		scrollTop: moveTop + 'px'
	}, {
		duration: 600, complete: function () {

		}
	});
}


function clickPage(target){
	$('.'+target).find('a').on('click', function(e){
		e.preventDefault();
		var index = $(this).parents('li').index();
		$('.'+buttons).find('li').removeClass('active');
		$('.'+navigation).find('li').removeClass('active');
		
//		$(this).parents('li').addClass('active');

		$('.'+buttons).find('li').eq(index).addClass('active');
		$('.'+navigation).find('li').eq(index).addClass('active');
		
		var moveTop = tmp[index];

		moveScroll(moveTop);
	});
}


$.fn.slideLeftHide = function(speed, callback) { 
	  this.animate({ 
	    width: "hide", 
	    paddingLeft: "hide", 
	    paddingRight: "hide", 
	    marginLeft: "hide", 
	    marginRight: "hide" 
	  }, speed, callback);
	}

$.fn.slideLeftShow = function(speed, callback) { 
	  this.animate({ 
	    width: "show", 
	    paddingLeft: "show", 
	    paddingRight: "show", 
	    marginLeft: "show", 
	    marginRight: "show" 
	  }, speed, callback);
	}