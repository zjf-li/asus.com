require.config({
    paths: {
        jquery: "./jquery.min",
        details: "./lib/details",
        cookie: './lib/cookie'
    }
});

require(['details'], function(details) {
    details.render(function(id, price) {
        $('.product-buy-cart>span').on('click', function() {
            details.addItem(id, price, $('.item-content>input').val());
        })
    });
    details.amount()
    details.maxImg()

})