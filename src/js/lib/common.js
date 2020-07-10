define(['jquery', 'cookie'], function($, cookie) {
    let baseUrl = 'http://10.31.161.33/asus.com';
    return {
        nav: function() {
            $('.nav li').on('mouseover', function() { //鼠标移入触发事件

                // 判断当前移入的li的index 是不是指定的li
                if ($(this).index() == $(".nav-item-link").index()) {
                    $('.hot-show').css({ //显示对应的影藏模块
                        'display': 'block'
                    })
                }
                // 判断当前移入的li的index 是不是指定的li
                if ($(this).index() == $(".js-drop-show").index()) {
                    $('.nav-list-show').css({ //显示对应的影藏模块
                        'display': 'block'
                    })
                    $('.nav-list-show ul').animate({ //动画效果
                        'margin-left': 0
                    }, 300)

                    $('.nav-list-show ul li').css({ // 透明度效果
                        opacity: 1
                    }).on('mouseover', function() { //鼠标在元素上，当前元素透明度为1，其他为0.5
                        $(this).css({
                            opacity: 1
                        }).siblings().css({
                            opacity: 0.5
                        })
                    })
                } else {
                    $('.nav-list-show ul').css({ //
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
                $('.nav-list-show ul').css({ //
                    'margin-left': 70
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
                $('.nav-list-show ul').css({ //
                    'margin-left': 70
                })

            })



        },
        cart: function(callback) {
            let shop = cookie.get('shop'); //获取cookie
            let idlist
            if (shop) { //判断有没有cookie
                shop = JSON.parse(shop) //转成数组
                $('.shop-car').css({
                    'background': '#0092de',
                })
                $('.shop-car>a').css({
                    'color': '#fff',
                })

                $('.shop-car>i').css({
                    'color': '#fff',
                })


                idlist = shop.map(elm => elm.id).join(); // 把每个id取出来
            } else {

            }

            $.ajax({
                type: 'get',
                url: `${baseUrl}/interface/shop.php`,
                data: {
                    idlist: idlist
                },
                dataType: 'json',
                success: function(res) {
                    console.log(res);

                    let temp = '';
                    let temp2 = '';
                    let num = 0;
                    console.log(res);


                    res.forEach(elm => {
                        let img = JSON.parse(elm.img)
                        let arr = shop.filter(val => val.id == elm.id); //过滤id
                        temp +=
                            `<li>
                                <div class="goods-pic">
                                    <a href="">
                                        <img src="${baseUrl}/src/${img.img[0]}" alt="">
                                    </a>
                                </div>
                                <div class="goods-info">
                                    <h3 class="goods-name">
                                        <p>${elm.title}</p>
                                    </h3>
                                    <div class="goods-price">
                                        x <span>${arr[0].num}</span> <strong> X </strong> </div>
                                </div>
                            </li>
                        `
                        num += parseInt(elm.price)

                    });
                    $('.goods>ul').html(temp)

                    $('.minicart-info-l').html(
                        `
                        <p>共${res.length}件商品</p>
                        <p>￥${num}</p>
                        `
                    )
                    $('.shop-car>a').html(`购物车(${res.length})`)

                    callback && callback()

                }
            })
        },
        catrShow: function() {
            $('.shop-car').hover(function() {
                $('.shop-car .goods').css({
                    'display': 'block'
                }, 500)
            }, function() {
                $('.shop-car .goods').css({
                    'display': 'none'
                })
            })
        }
    }
})