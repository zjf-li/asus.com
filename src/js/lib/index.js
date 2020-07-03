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
                console.log(idx);

                bannerImgBox.stop().animate({
                    left: -(idx) * widLi
                }, 1000, function() {
                    if (idx == len - 1) {
                        idx = 0;
                        bannerImgBox.css('left', -(idx) * widLi + 'px');
                    }

                    if (idx == -1) {
                        idx = len - 2;
                        console.log(idx);
                        console.log(len);
                        bannerImgBox.css('left', -(idx) * widLi + 'px');
                    }
                    console.log(idx);

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




        }


    }


})