require.config({
    paths: {
        jquery: './jquery.min',
        shopcart: './lib/shopcart',
        cookie: './lib/cookie',
        common: './lib/common'
    }
})

require(['shopcart', 'common'], function(shopcart, common) {

    shopcart.render(function() {
        shopcart.settlement()
    });
    common.nav();
    common.cart(function() {
        common.catrShow()
    })

})