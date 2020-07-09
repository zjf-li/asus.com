require.config({
    paths: {
        jquery: "./jquery.min",
        details: "./lib/details",
        cookie: './lib/cookie',
        common: './lib/common'
    }
});

require(['details', 'common'], function(details, common) {
    common.nav()
    details.render(function(id, price) {
        $('.product-buy-cart>span').on('click', function() {
            details.addItem(id, price, $('.item-content>input').val());


        })

    }, function() {
        details.maxImg()
    });


    details.amount()
    details.timer()
        // details.choose()
})