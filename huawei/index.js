define(['jquery'], function($){
	function index(){
		$(function(){
			
            //插入naver-mian导航数据
            $.ajax({
                url: 'data/naver-main.json',
                success: function(arr){
                    for(var i = 0; i < arr.length; i++){
                        var navArr = arr[i].body;//二级导航数组
                        var navArrLen = navArr.length;
                        var $li = $('<li>');//新建一级li标签
                        $li.attr({
                            class: 'category-item',
                            id: `nav_${i}`
                        });
                        $li.appendTo('.category-list');
                        $(`<div class = "category-title">
                                <div class = "category-info">
                                    <div class = "title">
                                        <a href="">${arr[i].title}</a>
                                    </div>
                                    <div class = "sub-title">
                                    </div>
                                </div>
                            </div>
                            <div class = "category-panel"></d>`).appendTo($li);
                        for(var key in arr[i].subTitle){
                            var $a = $(`<a href='#'>${arr[i].subTitle[key]}</a>`);
                            $li.find('.sub-title').append($a);
                        }
                        //插入二级导航
                        ulNum = navArrLen % 4 ? parseInt(navArrLen / 4) + 1 : navArrLen / 4;
                        $li.find('.category-panel').addClass(`category-panel-${ulNum}`);
                        for(let i = 0; i < ulNum; i++){
                            $subUl = $('<ul>');
                            $subUl.attr('class', 'subcate-list clear');
                            $li.find('.category-panel').append($subUl);
                            for(var j = 0; i * 4 + j < navArrLen && j < 4; j++){
                                $(`<li class="subcate-item">
                                        <a href="">
                                            <img src='${navArr[i * 4 + j].img}' alt="">
                                            <span>${navArr[i * 4 + j].name}</span>
                                        </a>
                                    </li>`).appendTo($subUl);
                            }
                        }
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            });
            $('.category-list').on('mouseenter', '.category-item', function(){
                //$('.category-panel').removeClass('active');
                $(this).addClass('active');
                $('.category-list').addClass('list-active');
                //$(this).find('.category-panel').addClass('active');
            });
            $('.category-list').on('mouseleave', '.category-item', function(){
                $(this).removeClass('active');
                $('.category-list').removeClass('list-active');
            });



            //插入热销单品数据
			$.ajax({
				type: 'get',
				url: 'data/hotProducts.json',
				success: function(arr){
					for(var i = 0; i< arr.length; i++){
						$(`<li class="grid-item">
								<a href="#" class="thumb">
									<div class="grid-img">
										<img src='${arr[i].url}' alt="">
									</div>
									<h2 class="grid-name">${arr[i].name}</h2>
									<p class="grid-desc">${arr[i].discount}</p>
									<p class="grid-price">${arr[i].price}</p>
								</a>
							</li>`).appendTo('.channel-menu .hot-goods .grid-list');
						if(arr[i].topTip){
							$(`<div class="grid-tip">
										<span class="tip">${arr[i].topTip}</span>
									</div>`).appendTo($('.channel-menu .hot-goods .grid-list .grid-item').eq(i).find('.thumb'));
						}
					}
				},
				error: function(msg){
					console.log(msg);
				}
            });
            


            //插入滚动数据函数
			function insertRollingGoods($node, dataUrl){
				$.ajax({
					type: 'get',
					url: dataUrl,
					success: function(arr){
						for(var i = 0; i < arr.length; i++){
							$(`<li class="grid-item">
										<a href="#" class="thumb">
											<div class="grid-img">
												<img src="${arr[i].imgUrl}" alt="">
												<p class="grid-desc">${arr[i].desc}</p>
											</div>
											<div class="grid-name">${arr[i].title}</div>
											<div class="grid-price">${arr[i].price}</div>
											<div class="grid-tip">
												<div class="tip">${arr[i].topTip}</div>
											</div>
										</a>
									</li>`).appendTo($node.find('.grid-list'));
						}
						var itemWidth = $node.find('.grid-list .grid-item').width();
						$node.find('.grid-list').css('width', arr.length*itemWidth);
					},
					error: function(msg){
						console.log(msg);
					}
				});
			}
			//插入精品推荐滚动数据
			insertRollingGoods($('#goodsRecommend'), 'data/reco.json');
			//rolling的两只耳朵hover变背景色
			$('.grid-btn .iconfont').hover(function(){
				$(this).css('background', 'rgba(180,180,180,0.7)');
			},function(){
				$(this).css('background', 'rgba(180,180,180,0.3)');
			});
			//goodsRolling的prev和next
			function goodsRolling($node, len){
				$node.find('.swiper-prev').on('click', function(){
					var left = $node.find('.grid-list').position().left;
					$node.find('.swiper-next').css('display', 'block');
					//if(left%len) return;//不能用于不整的
					if(left + len >= 0){
						left = 0;
						$(this).css('display', 'none');
					}else{
						left = left + len;
					}
					$node.find('.grid-list').stop(true,true).animate({left: left}, 400);
				});
				$node.find('.swiper-next').on('click', function(){
					var left = $node.find('.grid-list').position().left;
					$node.find('.swiper-prev').css('display', 'block');
					//if(left%len) return;//不能用于不整的
					if(left-len*2<=-$node.find('.grid-list').width()){
						left = -$node.find('.grid-list').width() + len;
						$(this).css('display', 'none');
					}else{
						left = left - len;
					}
					$node.find('.grid-list').stop(true,true).animate({left: left}, 400);
				});
			}
			//精品推荐   滚动
			goodsRolling($('#goodsRecommend'), 1210);
			//channel-floor-banner
			var channelIndex = 0;
			var channelTimer = 0;
			function channelBanner(){
				var $imgs = $('.channel-floor').find('.slider-item');
				var length = $imgs.size();
				$imgs.eq(channelIndex).fadeOut(400);
				channelIndex = (++channelIndex)%length;
				$imgs.eq(channelIndex).fadeIn(400);
				$('.channel-floor .slider-nav span').removeClass('current');
				$('.channel-floor .slider-nav span').eq(channelIndex).addClass('current');
			}
			channelTimer = setInterval(channelBanner, 2000);
			$('.channel-floor .slider-list').on('mouseenter', function(){
				clearInterval(channelTimer);
			});
			$('.channel-floor .slider-list').on('mouseleave', function(){
				channelTimer = setInterval(channelBanner, 2000);
			});
			$('.channel-floor .slider-nav').on('mouseenter', 'span', function(){
				clearInterval(channelTimer);
				$('.channel-floor .slider-item').eq(channelIndex).fadeOut(400);
				channelIndex = $(this).index()-1;
				channelBanner();
			});
			$('.channel-floor .slider-nav').on('mouseleave', 'span', function(){
				channelTimer = setInterval(channelBanner, 2000);
			});



			//插入channel数据函数
			function insertData($node, dataUrl){
				$.ajax({
					type: 'get',
					url: dataUrl,
					success: function(arr){
						for(let i = 0; i < arr.length; i++){
							$(`<li class="grid-item">
									<a href="#" class="thumb">
										<div class="grid-img">
											<img src='${arr[i].imgUrl}' alt="">
										</div>
										<h2 class="grid-name">${arr[i].title}</h2>
										<p class="grid-desc">${arr[i].desc}</p>
										<p class="grid-price">${arr[i].price}</p>
									</a>
								</li>`).appendTo($node.find('.goods-list .grid-list'));
							if(arr[i].topTip){
								$(`<div class="grid-tip">
											<span class="tip">${arr[i].topTip}</span>
										</div>`).appendTo($node.find('.goods-list .grid-item').eq(i+1).find('.thumb'));
							}
						}
					},
					error: function(msg){
						console.log(msg);
					}
				});
			}

			//手机频道
			var phoneArr = ['荣耀', 'HUAWEI P系列', '荣耀畅玩系列', 'HUAWEI Mate系列', 'HUAWEI nova系列', '华为畅享系列', 'HUAWEI 麦芒系列', '移动4G+专区'];
			for(var i = 0; i < phoneArr.length; i++){
				$('#phoneChannel .channel-nav').append(`<li><a href="">${phoneArr[i]}</a></li>`);
			}
			insertData($('#phoneChannel'), 'data/phoneChannel.json');
			//grid-item加移入移出事件
			$('.layout .grid-item-g').on('mouseenter', 'li.grid-item', function(){
				$('.grid-item-g li.grid-item').removeClass('current');
				$(this).addClass('current');
			});
			$('.layout .grid-item-g').on('mouseleave', 'li.grid-item', function(){
				$(this).removeClass('current');
			});
			//智能家居频道
			var smartArr = ['路由器', '子母/分布式路由', '电力猫','随行wifi', '电视盒子', '照明', '清洁', '节能', '环境', '安防', '健康', '厨电', '影音', '卫浴', '其他'];
			for(var i = 0; i < smartArr.length; i++){
				$('#smartChannel .channel-nav').append(`<li><a href="">${smartArr[i]}</a></li>`);
			}
			insertData($('#smartChannel'), 'data/smartChannel.json');

			//智能家居频道插入滚动数据
			insertRollingGoods($('#goodsContent'), 'data/smartRolling.json');
			
			//智能家居频道滚动翻页
			goodsRolling($('#goodsContent'), 1212);
            

			function download(){
				//数据下载
				$.ajax({
					url: "../data/nav.json",
					success: function(data){
						//第一部分，实现轮播图效果
						var bannerArr = data.banner;
						for(var i = 0; i < bannerArr.length; i++){
							$(`<a class="banner_a" href="#">
								<img class = 'banner_img' src = '../images/banner/${bannerArr[i].img}' alt=""/>
							</a>`).appendTo(".banner-con .swiper-container");
						}
					},
					error: function(msg){
						console.log(msg);
					}
				})
			}

			//banner图效果
			function banner(){
				var iNow = 0;
				var aImgs = null;
				var aBtns = null;
				var timer = setInterval(function(){
					iNow++;
					tab();

				}, 3000);

				function tab(){
					if(!aImgs){
						aImgs = $(".banner-con").find(".swiper-container").find("img");
					}
					if(!aBtns){
						aBtns = $(".banner-con").find(".clicktable").find("a");
					}
					if(iNow == 4){
						iNow = 0;
					}
					//图片切换
					aImgs.hide().css("opacity", 0.2).eq(iNow).show().animate({opacity: 1}, 500);
					//对应的小圆圈指定当前是哪张图片显示
					aBtns.removeClass("click-active").eq(iNow).addClass("click-active");
				}
				//添加移入移出
				$(".banner-con .swiper-container").mouseenter(function(){
					clearInterval(timer);
				});
				$(".banner-con .swiper-container").mouseleave(function(){
					timer = setInterval(function(){
						iNow++;
						tab();
			
					}, 3000);
				});

				$(".banner-con .clicktable").on("click", "a", function(){
					iNow = $(this).index();
					tab();
					return false;
				})
			}

        });
	}
	return {index: index}

})