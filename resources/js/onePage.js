//buhee's onepage

$.fn.onePage = function(options) {

	//선택된 요소가 없을 때
	if (this.length < 1) {
		return false;
	}

	var settings = $.extend({ 
		button: false,
		keyboard: false,
		navi: false,
	}, options );


	section = this;
	
	var buttons = 'onepage_buttons';
	var tmp = [];
	
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

					
					//$('.onepage_buttons ul li').removeClass('active');
					//$('.onepage_buttons ul li').eq(index+1).addClass('active');
				}
			// 마우스휠을 아래에서 위로
			} else {

			 if ($(elmSelecter).prev() != undefined) {
					 moveTop = $(elmSelecter).prev().offset().top;
					$('.'+buttons).find('li').removeClass('active');
					$('.'+buttons).find('li').eq(index-1).addClass('active');

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


	var navi = $('<div>').addClass('navigation');
	var buttonDiv = $('<div>').addClass(buttons);
	var ul = $('<ul>');
	$.each(section, function(i){
		var li = $('<li>');
		var a = $('<a>').attr('href','#');
		a.attr('title',i+1+'페이지 바로가기')

		li.append(a);
		ul.append(li);

	});

	//네비 추가
	if(settings.navi.length != false){

		if(settings.navi == 'left'){
			navi.css('left','0px');
		}else if(settings.navi == 'top'){
			navi.css('top','0px');	
		}else if(settings.navi == 'right'){
			navi.css('right','0px');
		}else if(settings.navi == 'bottom'){
			navi.css('bottom','0px');
		}else{
			navi.css('display','none');
		}
		
		//navi.append(ul);
		$('body').append(navi);
		navi.css('width','20%');
		$('.wrap').css('width','80%');
		$('.wrap').css('margin-left','20%');
	}


	//버튼기능 on 일 때 버튼들 생성
	if(settings.button == true){
		buttonDiv.append(ul);
		$('body').append(buttonDiv);
		
		//첫페이지 및 새로고침 시 active
		var curPos = parseInt($(document).scrollTop());
		
		$.each(tmp, function(i){
			if(tmp[i] == curPos){
				$('.'+buttons).find('li').eq(i).addClass('active');
			}
		});

		$('.'+buttons).find('a').on('click', function(e){
			e.preventDefault();
			$('.'+buttons).find('li').removeClass('active');
			$(this).parents('li').addClass('active');
			var index = $(this).parents('li').index();
			var moveTop = tmp[index];

			moveScroll(moveTop);
		});
	}

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
