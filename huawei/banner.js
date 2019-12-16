/* define(["jquery"], function($){
    function banner(){
        $.ajax({
			url: "data/banner.json",
			success: function(data){
				var bannerArr = data.banner;
			    for(var i = 0; i < bannerArr.length; i++){
					$(`<a href="#">
                	    <img src = 'images/banner/${bannerArr[i].jpg}' alt=""/>
                	</a>`).appendTo(".banner-slider .slider-item");

					var node = $(`<a href="#" class = 'slider-nav'></a>`);
					if(i == 0){
						node.addClass("slider-nav-active");
					}
					node.appendTo(".banner-slider .slider-middle");
				}
			},
			error: function(msg){
				console.log(msg);
			}
		})
    }

    function banner(){
        var iNow = 0;
        var aImgs = null;
        var aBtns = null;
        var timer = setInterval(function(){
            iNow++;
            tab();
        },2500);
    

        function tab(){
            if(!aImgs){
                aImgs = $(".banner-slider .slider-item").find("a");
            }
            if(!aBtns){
                aBtns = $(".banner-slider .slider-middle").find("a");
            }
            if(iNow == 8){
                iNow = 0;
            }

            aImgs.hide().css("opacity", 0.2).eq(iNow).show().animate({opacity: 1}, 500);

            aBtns.removeClass("slider-nav-active").eq(iNow).addClass("slider-nav-active");
        }

        $(".banner-slider, .slider-item").mouseenter(function(){
            clearInterval(timer);
        });
        $(".banner-slider, .slider-item").mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            }, 2500)
        });

        $(".banner-slider .slider-nav").on("click", "a", function(){
            iNow = $(this).index();
            tab();
            return false;
        })
    }
    return{banner: banner};
})


	
 */

 define(["jquery"], function($){
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
