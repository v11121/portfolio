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
			var layer = $(this).find('.layer1');
			layer.attr({
				'data-aos' : 'fade-up',
				'data-aos-delay' : '50',
				'data-aos-duration' : '1000',
			});
		}
	});
}


