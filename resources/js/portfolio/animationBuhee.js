//buhee's animation for text
var mainTitle = '.mainTitle_type2';
var section = '.section';
function titleAnimation(curPage){
	$.each($(mainTitle), function(i) {
		var text = $(mainTitle).eq(i).text();
		$(this).attr('data-title',text);
	});
}

function curPageTitle(curPage){
	$(section).find($(mainTitle)).removeClass('active');
	$(section).eq(curPage).find($(mainTitle)).addClass('active');
	
}

function progressBarAnimation(){
	$.each($('.part_skill_bar'), function(i) {
		var span = $('<span>');
		var skills = $(this).find('div').data('width');
		$(this).find('div').css({'width' : skills + '%'});
		$(this).find('div').append(span);
		span.text(skills+'%');
	});
}

function layerAnimation(){
	$.each($('.section'), function(i) {
		if(i > 0){
			var layer1 = $(this).find('.layer1').eq(0);
			layer1.attr({
				'data-aos' : 'fade-up',
				'data-aos-delay' : '50',
				'data-aos-duration' : '1000',
			});
			
			var layer2 = $(this).find('.layer1').last();
			layer2.attr({
				'data-aos' : 'fade-up',
				'data-aos-delay' : '100',
				'data-aos-duration' : '1000',
			});
		}
	});
}

function reponsiveSlider(target){
	if($(window).width() < 960) {
		$(target).addClass('mobile_silder');
	}else{
		$(target).removeClass('mobile_silder');
	}

	$(window).resize(function() { 
		if($(window).width() < 960) { 
			$(target).addClass('mobile_silder');
		}else{
			$(target).removeClass('mobile_silder');
		} 
	});
	

	$('.section_portfolio.mobile_silder .part_siteLink').slick({
			
		infinite: true , /* 맨끝이미지에서 끝나지 않고 다시 맨앞으로 이동 */         
		slidesToShow: 2, /* 화면에 보여질 이미지 갯수*/        
		slidesToScroll: 1,  /* 스크롤시 이동할 이미지 갯수 */         
		autoplay: true, /* 자동으로 다음이미지 보여주기 */         
		arrows: true, /* 화살표 */        
		dots:true, /* 아래점 */         
		autoplaySpeed:200000,/* 다음이미지로 넘어갈 시간 */         
		speed:1000 , /* 다음이미지로 넘겨질때 걸리는 시간 */         
		pauseOnHover:true, /* 마우스 호버시 슬라이드 이동 멈춤 */        
		//vertical:true,/* 세로방향으로 슬라이드를 원하면 추가하기// 기본값 가로방향 슬라이드*/        
		 responsive: [{ /* 반응형웹*/ breakpoint: 680, /* 기준화면사이즈 */ settings: {slidesToShow:1 } /* 사이즈에 적용될 설정 */ } ]

	});
}
