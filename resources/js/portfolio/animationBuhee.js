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
		$(target).addClass('mobile');
	}else{
		$(target).removeClass('mobile');
	}

	$(window).resize(function() { 
		if($(window).width() < 960) { 
			$(target).addClass('mobile');
		}else{
			$(target).removeClass('mobile');
		} 
	});
	

	/*$('.section_portfolio.mobile .part_siteLink li').slick({
	  centerMode: true,
	  centerPadding: '60px',
	  slidesToShow: 3,
	  responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '40px',
	        slidesToShow: 3
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        arrows: false,
	        centerMode: true,
	        centerPadding: '40px',
	        slidesToShow: 1
	      }
	    }
	  ]
	});*/
}
