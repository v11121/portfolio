//buhee's onepage
var buttons = 'onePage_slideButtons';
var navigation = 'onePage_util';
var scrollbtn = 'onePage_scrollbutton';
var tmp = [];
var section_class = 'section';
$.fn.onePage = function(options) {

	//No select
	if (this.length < 1) {
		return false;
	}

	var settings = $.extend({ 
		slideButton: false, //Show down slide button
		scrollButton: false, //Show page scroll button
		keyboard: false, //Use the keyboard scroll 
		navi: false, //Use the menu hamburger  
		scroll: false, //Show window scroll 
		naviName: []
	
	}, options );

	section = this;
	
	$.each(section, function (index) {	
//		$(section).eq(index).addClass('page-'+index);
		tmp.push(parseInt($(section).eq(index).position().top));
		
		/*Touch event*/
		var startX,startY, endX,endY;
		
		$(this).on('touchstart',function(event){
			startX = event.originalEvent.changedTouches[0].screenX;
			startY = event.originalEvent.changedTouches[0].screenY;
		});
		
		$(this).on('touchend',function(event){
			 endX=event.originalEvent.changedTouches[0].screenX;
			 endY=event.originalEvent.changedTouches[0].screenY;
			 
			 var delta = 0;
			 if (event.detail){
				 delta = -event.detail / 3;
				}
			 
			 var moveTop = $(window).scrollTop();
			 var elmSelecter = $(section).eq(index);
			 
			if(startY-endY>2){
				if ($(elmSelecter).next() != undefined) {
					activeLiClass(buttons, $(elmSelecter).next().index());
					activeLiClass(navigation, $(elmSelecter).next().index());
					activeDivClass(section_class, $(elmSelecter).next().index());
					moveTop = $(elmSelecter).next().offset().top;
				}
			 }else if(endY-startY>2){
				 if ($(elmSelecter).prev() != undefined) {
					 activeLiClass(buttons, $(elmSelecter).prev().index());
					 activeLiClass(navigation, $(elmSelecter).prev().index());
					 activeDivClass(section_class, $(elmSelecter).prev().index());
					 moveTop = $(elmSelecter).prev().offset().top;
				}
			 }
			moveScroll(moveTop);
		});
		
		// Mouse wheel event
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


			// up > down
			if (delta < 0) {
				if ($(elmSelecter).next() != undefined) {
					moveTop = $(elmSelecter).next().offset().top;
					activeLiClass(buttons, index+1);
					activeLiClass(navigation, index+1);
					activeDivClass(section_class, index+1);
				}
				
			// down > up
			} else {
			 if ($(elmSelecter).prev() != undefined) {
					moveTop = $(elmSelecter).prev().offset().top;
					activeLiClass(buttons, index-1);
					activeLiClass(navigation, index-1);
					activeDivClass(section_class, index-1);
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

	// Slide button and navi
	var util = $('<div>').addClass('util_on');
//	util.hide();

	var navi = $('<div>').addClass(navigation);
	var buttonDiv = $('<div>').addClass(buttons);
	var ulNavi = $('<ul>');
	var ulButton = $('<ul>');
	
	var util_btn = $('<div>');
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
		a2.text(settings.naviName[i]);
		
		li1.append(a1);
		li2.append(a2);
		
		ulButton.append(li1);
		ulNavi.append(li2);

	});

	//Show navi
	if(settings.navi != false){
		util.append(ulNavi);
		navi.append(util_btn);
		navi.append(util);
		$('body').append(navi);
	}

	//Show slide button
	if(settings.slideButton == true){
		buttonDiv.append(ulButton);
		$('body').append(buttonDiv);
		
	}
	
	//Use down scroll
	var scrollbutton = $('<div>').addClass(scrollbtn);
	var scroll_target = $('<a>').attr('href','#');
	
	if(settings.scrollButton == true){
		$(scrollbutton).append(scroll_target);
		$('body').append(scrollbutton);
		$(section).css('padding','20px');
	}
	
	scroll_target.on('click', function(e){
		e.preventDefault();
		i = $('.'+section_class+'.active').index()+1;
		if(i >= 0){
			if(i > $('.'+section_class).length-1){
				activeLiClass(buttons, 0);
				activeLiClass(navigation, 0);
				activeDivClass(section_class, 0);
				scrollbutton.removeClass('last');
				moveScroll($('.'+section_class).eq(0).position().top);
			}else{
				moveScroll($('.'+section_class).eq(i).position().top);
				activeLiClass(buttons, i);
				activeLiClass(navigation, i);
				activeDivClass(section_class, i);
			}
		}
	});
	
	clickPage(buttons);
	clickPage(navigation);
	
	//navi slide + css
	util_btn.on('click', function(e){
		e.preventDefault();
		if(!$('.'+navigation).hasClass('active')){
			$('.'+navigation).addClass('active');
			util.addClass('active');
		}else{
			$('.'+navigation).removeClass('active');
			util.removeClass('active');
		}
	});

	
	//Stop scrolling function in navi
	$('.'+navigation).on("mousewheel DOMMouseScroll", function (e) {
		event.preventDefault();
		event.stopPropagation();
		return false;
	});
	
	//Class of li add active when refresh page
	var curPos = parseInt($(document).scrollTop());
	
	$.each(tmp, function(i){
		if(tmp[i] == curPos){
			activeLiClass(buttons, i);
			activeLiClass(navigation, i);
			activeDivClass(section_class, i);
		}
	});
//	
};

// Move scroll .5s
function moveScroll(moveTop){
	$("html,body").stop().animate({
		scrollTop: moveTop + 'px'
	}, {
		duration: 500, complete: function () {

		}
	});
}


// when navi, slide button click
function clickPage(target){
	$('.'+target).find('a').on('click', function(e){
		e.preventDefault();
		var index = $(this).parents('li').index();
		
		activeLiClass(buttons, index);
		activeLiClass(navigation, index);
		activeDivClass(section_class, index);
		var moveTop = tmp[index];

		moveScroll(moveTop);
	});
}

// Add li class
function activeLiClass(target, i){
	if(i >= 0){
		$('.'+target).find('li').removeClass('active');
		$('.'+target).find('li').eq(i).addClass('active');
		
		if(i == $('.'+section_class).length-1){
			$('.'+scrollbtn).addClass('last');
		}else{
			$('.'+scrollbtn).removeClass('last');
		}
	}
}

//Add div class
function activeDivClass(target, i){
	if(i >= 0){
		$('.'+target).removeClass('active');
		$('.'+target).eq(i).addClass('active');
		
		if(i == $('.'+section_class).length-1){
			$('.'+scrollbtn).addClass('last');
		}else{
			$('.'+scrollbtn).removeClass('last');
		}
		
	}
}

