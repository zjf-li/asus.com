let baseUrl = 'http://localhost/asus.com';

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function(callback) {
            let shop = cookie.get('shop'); //获取cookie

            if (shop) {

                console.log(shop);

                shop = JSON.parse(shop)

                console.log(shop);

                let idlist = shop.map(elm => elm.id).join();
                console.log(idlist);

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

                        res.forEach(elm => {
                            let img = JSON.parse(elm.img);

                            let arr = shop.filter(val => val.id == elm.id);
                            console.log(arr[0].num, arr[0].price);

                            temp += `
                            <div class="cart-item">
                            <ul class="clear">
                                <li class="check-all">
                                    <input type="checkbox" name="" id="">
                                </li>
                                <li class="cart-goods">
                                    <div>
                                        <a href=""><img src="${baseUrl}/src/${img.img[0]}" alt=""></a>
                                    </div>
                                    <p>${elm.title}</p>
                                </li>
                                <li class="cart-price">${elm.price}</li>
                                <li class="cart-num">
                                    <div>
                                        <a href="javascript:;"class="num-l">-</a>
                                        <input type="text" value="${arr[0].num}"class="num-show">
                                        <a href="javascript:;"class="num-r">+</a>
                                    </div>
                                </li>
                                <li class="cart-discount">0</li>
                                <li class="cart-point">${arr[0].num*arr[0].price}</li>
                                <li class="cart-subtotal">${arr[0].num*arr[0].price}</li>
                                <li class="cart-action">
                                    <a href="">X</a>
                                </li>
                            </ul>
                            <div class="cart-product-active">
                                <div class="cart-goods-gift">
                                    <p><span>[限时优惠]</span>乘风破浪的七月</p>
                                    <p><span>[赠品] </span>【意外保】第一年不限次(赠送专用，不单独出售) ￥199 x 1</p>
                                    <p><span>[赠品] </span>【赠品 单拍无效！！！】咨询客服有惊喜 ￥9999 x 1</p>
                                    <p><span>[赠品] </span>【赠品颜色随机】AE-01官方原装正品有线鼠标商品颜色:黑色 ￥99 x 1</p>
                                    <p><span>[赠品] </span>华硕原装笔记本电脑单肩包 ￥169 x 1</p>

                                </div>

                            </div>
                        </div>
                            `;
                        })
                        $('.cart-list').html(temp)
                        callback && callback()
                    }

                })
            }
        },
        settlement: function() {
            fn()

            function fn() {
                let num = 0;
                for (let i = 0; i < $('.cart-item .cart-subtotal').length; i++) {
                    num += parseInt($('.cart-item .cart-subtotal').eq(i).html())

                }
                $(".total-price>b").html(num);
                console.log(num);

            }








            $('.num-l').on('click', function() {
                let count = $(this).next().val();
                count--
                if (count < 1) {
                    count = 1
                    $(this).next().val(count);
                } else {
                    $(this).next().val(count);

                }
                let price = $(this).parent().parent().prev().html()
                $(this).parent().parent().nextAll("li").eq(2).html(price * count)
                $(this).parent().parent().nextAll("li").eq(1).html(price * count)


                let subtotal = $(this).parent().parent().nextAll("li").eq(2).html()


                fn()
            })
            $('.num-r').on('click', function() {
                let count = $(this).prev().val();
                count++
                if (count > 99) {
                    count = 99
                    $(this).prev().val(count)

                } else {
                    $(this).prev().val(count)

                }

                let price = $(this).parent().parent().prev().html()
                $(this).parent().parent().nextAll("li").eq(2).html(price * count)
                $(this).parent().parent().nextAll("li").eq(1).html(price * count)
                fn()
            })
        }


    }
})