// li轮播
	var i = 0;
	var len = $('.myswiper ul li').length;
	var timer;
	var w = $('.myswiper ul li').width();

	// 鼠标移入移除的时候
	$('.myswiper').mouseenter(function(){
		clearInterval(timer)
	}).mouseleave(function(){
		run();
	})
	// 点击小球的时候
	$('.smab span').click(function(){
		i = $(this).index();
		console.log(i);
		moveLi();
	})
	// 点击往左
	$('.next').click(function(){
		i--;
		moveLi();
	})
	// 点击往右
	$('.prev').click(function(){
		i++;
		moveLi();
	})
	// li的移动 
	function moveLi(){
		// 当移动到最后一个的时候
		if(i==len){
			$('.myswiper ul').css({left:0});
			i = 1;
		}
		// 
		if(i < 0){
			$('.myswiper ul').css({left:-4080});
			i = len-2;
		}
		// 判断小球的状态
		if(i==len-1){
			$('.smab span').eq(0).addClass('active1').siblings().removeClass('active1');
		}else{
			$('.smab span').eq(i).addClass('active1').siblings().removeClass('active1');
		}
		// 移动li
		$('.myswiper ul').stop().animate({left:(-i*1360)},500)			
	}
	// 开始轮播
	function run(){
		timer = setInterval(function(){
			i++;
			moveLi();
		},2000)
	}

	// 鼠标移入移除下面的input
	$('.footer-three input').mouseenter(function(){
		$(this).css('border','1px solid #f30d60')
		$('.footer-three input').eq(1).css({'background':'#f30d60','color':'#fff','border':'1px solid #f30d60'})
	}).mouseleave(function(){
		$(this).css('border','1px solid #999')
		$('.footer-three input').eq(1).css({'background':'#fff','color':'#999','border':'1px solid #999'})
	})
