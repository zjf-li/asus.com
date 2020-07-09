let baseUrl = 'http://localhost/asus.com';

define(['jquery'], function($) {

    return {
        render: function() {
            $.ajax({
                type: 'get',
                url: `${baseUrl}/interface/getall.php`, //请求数据
                dataType: 'json',
                success: function(res) {
                    // 拿到返回数据渲染到页面上
                    let temp = '';
                    res.forEach(elm => {
                        var img = JSON.parse(elm.img);

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
            let bannerBox = $('.banner-img'), //轮播图盒子
                bannerImgBox = $('.banner-img>div'),
                bannerImgs = $('.banner-img>div>a'), //轮播图片
                len = bannerImgs.length, //图片数量 
                widLi = bannerImgs.eq(0).width(), //图片宽度
                page = $('.banner-page>li'), //小圆圈
                bannerBtnL = $('.banner-btn-l'), // left 
                bannerBtnR = $('.banner-btn-r'), //right
                timer = null, //定时器
                idx = 0;


            function goImg(transidx) {
                if (transidx == idx) { //如果传过来的数值是当前图片的数值，直接return
                    return
                }


                let outidx = idx; // 当前显示的图片
                idx = transidx; // 下一张要显示的图片

                // 边界处理

                if (idx > len - 1) {
                    idx = 0;
                } else if (idx < 0) {
                    idx = len - 1
                }

                bannerImgs.eq(outidx).animate({ //当前图片移出
                    "left": -widLi
                }, 300);
                bannerImgs.eq(idx).css({ // 下一张图片准备
                    "left": widLi
                });
                bannerImgs.eq(idx).animate({ //下一张图片移入
                    "left": 0
                }, 300);
                page.eq(outidx).css({ //小圈圈改变颜色
                    "background": "#fff"
                })
                page.eq(idx).css({
                    "background": "#00a8ff"
                })

            }

            function autoPlay() { // 自动轮播
                timer = setInterval(function() {
                    goImg(idx + 1)
                }, 2000)
            }

            function stopPaly() { // 消除定时器
                clearInterval(timer)
                timer = null;
            }

            page.click(function() { //点击小圆圈跳转
                stopPaly()
                goImg($(this).index())
            })

            bannerBox.hover(function() { //移入停止移出开始
                stopPaly()
            }, function() {
                autoPlay();
            })

            bannerBtnL.click(function() { //点击左边按钮切换
                stopPaly()
                goImg(idx - 1)
            })
            bannerBtnR.click(function() {
                stopPaly()
                goImg(idx + 1)
            })

            autoPlay();


        }



    }




})