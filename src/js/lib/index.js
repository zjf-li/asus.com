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
                                <a href=""><img src="${baseUrl}/src/${img.img[0]}" alt=""></a>
                                <p class="product-title">
                                    <a href="">${img.title}</a>
                                    <br>
                                    <a href="">${elm.title}</a>
                                </p>
                                <p class="product-price">
                                    <span>￥5899</span>
                                    <del>￥6299</del>
                                </p>
                            </li>`

                    })
                    $('.product-r').html(temp);



                }
            })
        }

    }


})