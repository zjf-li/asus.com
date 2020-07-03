require.config({
    paths: {
        jquery: './jquery.min',
        shopcart: './lib/shopcart',
        cookie: './lib/cookie'
    }
})

require(['shopcart'], function(shopcart) {


    shopcart.render(function() {
        shopcart.settlement()
    })

})