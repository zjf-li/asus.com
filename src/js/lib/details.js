let baseUrl = 'http://localhost/asus.com';
define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function(callback, callback2) {
            let shopId = location.search.split('=')[1];
            $.ajax({
                type: 'get',
                url: `${baseUrl}/interface/getshop.php`,
                data: { id: shopId },
                dataType: 'json',
                success: function(res) {
                    let temp = '';
                    let bigIMg = '';
                    let productTitles = '';
                    res.forEach(elm => {
                        let img = JSON.parse(elm.img)

                        temp += `
                            <ul class="clear">
                            <li>
                                <img src="${baseUrl}/src/${img.img[0]}" alt="">
                            </li>
                            <li>
                                <img src="${baseUrl}/src/${img.img[1]}" alt="">
                            </li>
                            <li>
                                <img src="${baseUrl}/src/${img.img[2]}" alt="">
                            </li>
                            <li>
                                <img src="${baseUrl}/src/${img.img[3]}" alt="">
                            </li>
                            <li>
                                <img src="../img/details/product/23474852525710.jpg" alt="">
                            </li>
                            <li>
                                <img src="../img/details/product/23474852525710.jpg" alt="">
                            </li>
                        </ul>
                        
                        `;


                        bigIMg = `
                        <a href="" class="product-big-img">
                                <img src="${baseUrl}/src/${img.img[0]}" alt="">
                                <span class="movebox"></span>
                            </a>
                            <div class="big">
                                <img src="${baseUrl}/src/${img.img[0]}" alt="">
                            </div>
                        `;
                        productTitles = `
                        <h2>${elm.title}</h2>
                            <h3>${elm.intr}</h3>
                            <a href="">
                                <p>7月1日至9日，下单即赠玩机必备价值498元包鼠套装，另赠一年意外险，更加贴心的服务，只为共同呵护您的爱机~ </p>
                            </a>
                        `;

                        $('.action-price').html(elm.price)

                    })
                    $('.product-min-img-list').html(temp);

                    $('.product-album').html(bigIMg);

                    $('.product-titles').html(productTitles);

                    console.log(res[0].id);

                    callback && callback(res[0].id, res[0].price)
                    callback && callback2()

                }


            })


        },
        addItem: function(id, price, num) {
            let shop = cookie.get('shop');

            let product = {
                id: id,
                price: price,
                num: num
            }
            if (shop) {
                shop = JSON.parse(shop);
                if (shop.some(elm => elm.id == id)) {
                    shop.forEach(elm => {
                        elm.id == id ? elm.num = num : null;
                    });
                } else {
                    shop.push(product)
                }
            } else {
                shop = [];
                shop.push(product);
            }
            cookie.set('shop', JSON.stringify(shop), 1);
        },
        amount: function() {

            $('.btn-decrease').on('click', function() {
                let count = $(this).next().val();
                count--
                if (count < 1) {
                    count = 1
                    $(this).next().val(count);
                } else {
                    $(this).next().val(count);

                }
            })
            $('.btn-increase').on('click', function() {
                let count = $(this).prev().val();
                count++
                if (count > 99) {
                    count = 99
                    $(this).prev().val(count)

                } else {
                    $(this).prev().val(count)

                }
            })
        },
        maxImg: function() {
            let movebox = $('.product-big-img span'), //鼠标盒子
                bigpic = $('.big img'), //内容放大图片
                big = $('.big'), // 内容放大图片盒子
                smallpic = $('.product-album'), //展示盒子
                ulBox = $('.product-min-img-list>ul'), //列表图片盒子
                lis = $('.product-min-img-list>ul>li>img'), //列表图片
                samllImg = $('.product-big-img>img') //内容图片

            smallpic.on('mouseover', function() {
                movebox.css({
                    'display': 'block'
                })
                big.css({
                    'display': 'block'
                })

                movebox.css({
                    'width': (smallpic.width() * big.width()) / bigpic.width() + 'px',
                    'height': (smallpic.height() * big.height()) / bigpic.height() + 'px'
                });


                smallpic.on('mousemove', function(ev) {
                    let top = ev.pageY - smallpic.offset().top - movebox.height() / 2;
                    let left = ev.pageX - smallpic.offset().left - movebox.width() / 2;

                    // 比例计算

                    let ratio = bigpic.width() / smallpic.width();
                    // 边界管理

                    if (top <= 0) {
                        top = 0
                    } else if (top >= smallpic.height() - movebox.height()) {
                        top = smallpic.height() - movebox.height()
                    }

                    if (left <= 0) {
                        left = 0;
                    } else if (left >= smallpic.width() - movebox.width()) {
                        left = smallpic.width() - movebox.width()
                    }

                    movebox.css({

                        top: top + "px",
                        left: left + 'px'
                    })


                    bigpic.css({

                        top: -top * ratio + 'px',
                        left: -left * ratio + 'px'
                    })

                })

            })
            smallpic.on('mouseout', function() {
                movebox.css({
                    'display': 'none'
                })
                big.css({
                    'display': 'none'
                })
            })


            lis.on('click', function() {
                let url = $(this).attr('src')
                samllImg.attr('src', url);
                bigpic.attr('src', url);
            })

            $('.product-min-img-l').on('click', function() {
                //获取当前ul的left值
                let left = parseFloat(ulBox.css('left'))
                left += 100
                    // 边界处理
                if (left >= 0) {
                    left = 0
                }
                // 过渡动画
                ulBox.animate({
                    left: left + 'px'
                }, 500)
            })
            $('.product-min-img-r').on('click', function() {
                let left = parseFloat(ulBox.css('left'))
                left -= 100
                    //计算隐藏图片
                if (left <= -(lis.length - 4) * 100) {
                    left = -(lis.length - 4) * 100
                }
                ulBox.animate({
                    left: left
                }, 500)
            })

        },
        timer: function() {
            let starttime = new Date("2021/1/1");
            setInterval(function() {
                let nowtime = new Date();
                let time = starttime - nowtime;
                let day = parseInt(time / 1000 / 60 / 60 / 24);
                let hour = parseInt(time / 1000 / 60 / 60 % 24);
                let minute = parseInt(time / 1000 / 60 % 60);
                let seconds = parseInt(time / 1000 % 60);
                $('.timer').html(day + "天" + hour + "小时" + minute + "分钟" + seconds + "秒");
            }, 1000);
        },
        choose: function() {
            $('.display-card li').on('click', function() {
                $(this).addClass('selected').siblings().removeClass('selected');

            })
            $('.deploy li').on('click', function() {
                $(this).addClass('selected').siblings().removeClass('selected');

            })
        }


    }
})