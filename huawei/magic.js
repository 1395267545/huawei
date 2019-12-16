define(['jquery'], function($){
	function magic(){
		//导航缩略图数组
		var imgNavArr = ['b1.png', 'b2.png', 'b3.png', 'b4.png', 'b5.png', 'b6.png', 'b7.png'];
		//移入缩略图
		$('#pro-thumbs').on('mouseenter', 'li', function(){
			$('#pro-thumbs').find('li').removeClass('current');
			$(this).addClass('current');
			var index = $(this).index();
			$('#pro-pic').find('img').attr('src', `images/${imgNavArr[index]}`);
		});
		//放大镜效果
		var [cloudX, cloudY] = [null, null];
		$('#pro-pic').on('mouseenter', function(ev){
			cloudMove(ev);
			$('#cloud-zoom').fadeIn(200);
			$('#cloud-zoom-big img').attr('src', $(this).find('img').attr('src'));
			$('#cloud-zoom-big').css('display', 'block');
		});
		$('#pro-pic').on('mousemove', function(ev){
			cloudMove(ev);
		});
		$('#pro-pic').on('mouseleave', function(ev){
			$('#cloud-zoom').css('display', 'none');
			$('#cloud-zoom-big').css('display', 'none');
		});
		$('#cloud-zoom').on('mousemove', function(ev){
			cloudMove(ev);
			ev.stopPropagation();
			$('#cloud-zoom-big img').css({
				left: -cloudX*2/(450/400),
				top: -cloudY*2/(450/400)
			});
		});
		function cloudMove(ev){
			cloudX = ev.clientX - $('#pro-pic').offset().left - $('#cloud-zoom').width()/2;
			cloudY = ev.pageY - $('#pro-pic').offset().top - $('#cloud-zoom').height()/2;
			if(cloudX<=0) cloudX = 0;
			if(cloudX>=$('#pro-pic').width()/2) cloudX = $('#pro-pic').width()/2;
			if(cloudY<=0) cloudY = 0;
			if(cloudY>=$('#pro-pic').height()/2) cloudY = $('#pro-pic').height()/2;
			$('#cloud-zoom').css({left: cloudX, top: cloudY});
		}
		//显示选择的配置信息
		function showCon(){
			var str = '';
			var str1 = $('#pro-skus').find('.selected').eq(0).find('a span').html();
			var str2 = $('#pro-skus').find('.selected').eq(1).find('a span').html();
			var str3 = $('#pro-skus').find('.selected').eq(2).find('a span').html();
			str = str1+'&ensp;/&ensp;'+str2+'&ensp;/&ensp;'+str3+'&ensp;/&ensp;'+'单品';
			$('#pro-select-sku').html(str);
		}
		$('#pro-skus .pro-choose-detail').on('click', 'li', function(){
			$(this).parent().find('li').removeClass('selected');
			$(this).addClass('selected');
			showCon();
		});
		/*$('#pro-skus .color-choose').on('click', 'li', function(){
			$('#pro-skus .color-choose').find('li').removeClass('selected');
			$(this).addClass('selected');
			showCon();
		});
		$('#pro-skus .version-choose').on('click', 'li', function(){
			$('#pro-skus .version-choose').find('li').removeClass('selected');
			$(this).addClass('selected');
			showCon();
		});
		$('#pro-skus .package-choose').on('click', 'li', function(){
			$('#pro-skus .package-choose').find('li').removeClass('selected');
			$(this).addClass('selected');
			showCon();
		});*/
		//商品数量的操作
		$('#pro-quantity-plus').on('click', function(){
			if(parseInt($('#pro-quantity').val())==999){
				return;
			}
			$('#pro-quantity').val(parseInt($('#pro-quantity').val())+1);
			$('#pro-quantity-minus').removeClass('disabled');
		});
		$('#pro-quantity-minus').on('click', function(){
			$('#pro-quantity').val(parseInt($('#pro-quantity').val())-1);
			if(parseInt($('#pro-quantity').val())<=1){
				$('#pro-quantity-minus').addClass('disabled');
			}
		});
		$('#pro-quantity').on('keydown', function(ev){
			console.log(ev.which);
			if((ev.which<96||ev.which>105)&&(ev.which!=8)){
				return false;
			}
		});
		$('#pro-quantity').on('keyup', function(ev){
			if($(this).val()=='' || $(this).val()==0){
				$(this).val(1);
			}else if($(this).val()>=999){
				$(this).val(999);
			}
		});
		//加入购物车
	}
	return {magic: magic};
})