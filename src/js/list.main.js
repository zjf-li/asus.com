require.config({
    paths: {
        jquery: './jquery.min',
        common: './lib/common',
        list: './lib/list',
        cookie: './lib/cookie'
    }
});

require(['list', 'common'], function(list, common) {

    common.nav();
    list.moreScreening();
    common.cart(function() {
        common.catrShow()
    })
})