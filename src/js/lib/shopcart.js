let baseUrl = 'http://10.31.161.33/asus.com';

define(['jquery', 'cookie'], function($, cookie) {
    return {
        render: function(callback) {
            let shop = cookie.get('shop'); //获取cookie

            if (shop) { //判断有没有cookie

                shop = JSON.parse(shop) //转成数组

                let idlist = shop.map(elm => elm.id).join(); // 把每个id取出来

                $.ajax({
                    type: 'get',
                    url: `${baseUrl}/interface/shop.php`,
                    data: {
                        idlist: idlist
                    },
                    dataType: 'json',
                    success: function(res) {

                        let temp = '';

                        res.forEach(elm => {
                            let img = JSON.parse(elm.img);

                            let arr = shop.filter(val => val.id == elm.id); //过滤id

                            temp += `
                            <div class="cart-item" >
                            <ul class="clear">
                                <li class="check-all">
                                    <input type="checkbox" name="" id="" data-a="false">
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
                                    <a href="javascript:;" data-id="${elm.id}">X</a>
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
            let shop = cookie.get('shop');
            shop = JSON.parse(shop)
            console.log(shop);
            $('.cart-action').click(function() { //当点击删除按钮删除对应的商品
                $.each(shop, function(i, elm) {
                    if (elm.id == $(this).attr("data-id")) {
                        shop.split(i, 1)
                    }
                })
                $(this).parent().parent().remove();

                cookie.set('shop', JSON.stringify(shop))

            })

            $('.cart-header input').click(function() { //点击全选按钮 判断状态

                //点击全选按钮， 把所有的复选框状态 改变为全选按钮的状态
                $('.cart-item input:checkbox').prop('checked', $('.cart-header input').prop('checked'))

                // 判断全选框状态  
                if ($('.cart-header input').prop('checked')) {
                    let n1 = 0;
                    // 当全选为选中状态 循环所有的产品价格 累加
                    $.each($('.cart-item .cart-subtotal'), function(i) {
                        n1 += parseInt($('.cart-item .cart-subtotal').eq(i).html())
                    })
                    $(".total-price>b").html(n1) //累加的值赋给总价格
                } else {
                    $(".total-price>b").html(0)

                }

            })

            $('.cart-item input:checkbox').click(function() { //给商品每个选择框添加点击事件
                fn()

            })


            function fn() {
                let temp = 0; // 计数
                let num = 0;
                $.each($('.cart-item input:checkbox'), function(i, elm) { // 选择框循环判断所有选择框的状态
                    if ($('.cart-item input:checkbox').eq(i).prop('checked')) { //判断全部复选框状态
                        temp++
                        // 当全部选择框被选择后，全选框状态改变为true
                        if (temp == $('.cart-item input:checkbox').length) {
                            $('.cart-header input').prop('checked', true)

                        } else {
                            // 否则 为false
                            $('.cart-header input').prop('checked', false)
                        }
                        // 把复选框为true的 商品价格累加
                        num += parseInt($('.cart-item .cart-subtotal').eq(i).html())

                    }

                })
                $(".total-price>b").html(num);
            }


            $('.num-l').on('click', function() { //商品数量点击事件
                let count = $(this).next().val(); // 当前点击按钮 获取 商品数量
                count--
                if (count < 1) { //最少数量为1
                    count = 1
                    $(this).next().val(count);
                } else {
                    $(this).next().val(count);

                }
                let price = $(this).parent().parent().prev().html() //套娃 
                $(this).parent().parent().nextAll("li").eq(2).html(price * count) //计算价格 he x
                $(this).parent().parent().nextAll("li").eq(1).html(price * count)



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