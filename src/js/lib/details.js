let baseUrl = 'http://localhost/asus.com';
define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function(callback) {
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
                        <img src="${baseUrl}/src/${img.img[0]}" alt="">
                        <span></span>
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

                    $('.product-big-img').html(bigIMg);

                    $('.product-titles').html(productTitles);

                    console.log(res[0].id);

                    callback && callback(res[0].id, res[0].price)
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
            let movebox = $('.product-big-img>span'), //鼠标盒子
                bigpic = $('.big img'), //大图图片
                big = $('.big'), // 大图盒子
                smallpic = $('.product-album'), //
                lis = $('.product-min-img-list>ul>li'),
                samllImg = $('product-big-img>img')

            smallpic.on('mouseover', function() {
                // moverbox.addClass('show')  
                // big.addClass('show')
                console.log(smallpic.offset().width;)


                movebox.css({

                    'width': (smallpic.offset().width * big.offset().width) / bigpic.offset().width + 'px',
                    'height': (smallpic.offset().height * big.offset().height) / bigpic.offset().height + 'px'
                })

            })



        }

    }
})