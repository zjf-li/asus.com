let baseUrl = 'http://localhost/asus.com';

define(['jquery'], function($) {

    return {
        render: function() {
            $.ajax({
                type: 'get',
                url: `${baseUrl}/interface/getall.php`,
                dataType: 'json',
                success: function(res) {
                    console.log(res);
                    let temp = '';
                    res.forEach(elm => {
                        var img = JSON.parse(elm.img);
                        // console.log(img);
                        // console.log(img.img[0]);
                        temp += `
                            <li class="li-bottom">
                                <a href="${baseUrl}/src/html/details.html?id=${elm.id}"><img src="${baseUrl}/src/${img.img[0]}" alt=""></a>
                                <p class="product-title">
                                    <a href="${baseUrl}/src/html/details.html?id=${elm.id}">${img.title}</a>
                                    <br>
                                    <a href="${baseUrl}/src/html/details.html?id=${elm.id}">${elm.title}</a>
                                </p>
                                <p class="product-price">
                                    <span>${elm.price}</span>
                                    <del>￥6299</del>
                                </p>
                            </li>`

                    })
                    $('.product-r').html(temp);



                }

            })
        },
        banner: function() {
            let bannerBox = $('.banner-img'),
                bannerImgBox = $('.banner-img>div'),
                bannerImgs = $('.banner-img>div>a'),
                len = bannerImgs.length,
                widLi = bannerImgs.eq(0).width(),
                page = $('.banner-page>li'),
                bannerBtnL = $('.banner-btn-l'),
                bannerBtnR = $('.banner-btn-r'),
                timer = null,
                idx = 0;


            function doSlider() {
                page.removeClass('page-color').eq(idx % (len - 1)).addClass('page-color');


                bannerImgBox.stop().animate({
                    left: -(idx) * widLi
                }, 1000, function() {
                    if (idx == len - 1) {
                        idx = 0;
                        bannerImgBox.css('left', -(idx) * widLi + 'px');
                    }

                    if (idx == -1) {
                        idx = len - 2;

                        bannerImgBox.css('left', -(idx) * widLi + 'px');
                    }


                })
            }

            $('.banner').hover(function() {
                clearInterval(timer);
            }, function() {
                timer = setInterval(slider, 3000);
            });

            function slider() {
                idx++;
                doSlider();
            }

            timer = setInterval(slider, 3000);
            // 点击上一张按钮切换图片
            bannerBtnL.click(function() {
                idx--;
                doSlider();
            });
            // 点击下一张按钮切换图片	
            bannerBtnR.click(function() {
                idx++;
                doSlider();
            });
            // 点击圆点切换图片
            page.click(function() {
                idx = $(this).index();
                doSlider();
            });




        },
        nav: function() {
            $('.nav li').on('mouseover', function() {

                // 判断当前移入的li的index 是不是指定的li
                if ($(this).index() == $(".nav-item-link").index()) {
                    $('.hot-show').css({
                        'display': 'block'
                    })
                }

                if ($(this).index() == $(".js-drop-show").index()) {
                    $('.nav-list-show').css({
                        'display': 'block'
                    })
                    $('.nav-list-show ul').animate({
                        'margin-left': 0
                    }, 300)
                    $('.nav-list-show ul li').css({
                        opacity: 1
                    }).on('mouseover', function() {
                        $(this).css({
                            opacity: 1
                        }).siblings().css({
                            opacity: 0.5
                        })
                    })
                } else {
                    $('.nav-list-show ul').css({
                        'margin-left': 70
                    })
                }

            })

            // 鼠标移出li 隐藏
            $('.nav-item-link').on('mouseout', function() {
                $('.hot-show').css({
                    'display': 'none'
                })
            })

            $('.js-drop-show').on('mouseout', function() {
                $('.nav-list-show').css({
                    'display': 'none'
                })
            })


            // 鼠标移动到li的内容 内容不隐藏  
            $('.hot-show').hover(function() {
                $('.hot-show').css({
                    'display': 'block'
                })
            }, function() {
                $('.hot-show').css({
                    'display': 'none'
                })

            })

            $('.nav-list-show').hover(function() {
                $('.nav-list-show').css({
                    'display': 'block'
                })
            }, function() {
                $('.nav-list-show').css({
                    'display': 'none'
                })

            })



        },
        menu: function() {
            $('.menu li').on('mouseover', function() {
                let index = $(this).index();
                $('.menu-con>.sub-box').eq(index).removeClass('menu-hide').siblings().addClass('menu-hide')
            })
            $('.menu').on(('mouseout'), function() {
                $('.menu-con>.sub-box').addClass('menu-hide')
            })



        }



    }




})