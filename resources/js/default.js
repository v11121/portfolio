function move_onePage(section){
	
		section = '.'+section;

	    $(section).each(function (index) {
        	
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
    		    
    		    $("html,body").stop().animate({
                    scrollTop: moveTop + 'px'
                }, {
                    duration: 800, complete: function () {

                    }
                });
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
                        
                        $('.section_quck_menu ul li').removeClass('active');
						$('.section_quck_menu ul li').eq(index+1).addClass('active');
                    }
                // 마우스휠을 아래에서 위로
                } else {
               	 if ($(elmSelecter).prev() != undefined) {
                      	 moveTop = $(elmSelecter).prev().offset().top;
                      	$('.section_quck_menu ul li').removeClass('active');
						$('.section_quck_menu ul li').eq(index-1).addClass('active');
                    }

                }
                
                // 화면 이동 0.8초(800)
                $("html,body").stop().animate({
                    scrollTop: moveTop + 'px'
                }, {
                    duration: 600, complete: function () {

                    }
                });

            });
        });

}