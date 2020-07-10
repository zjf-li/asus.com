require.config({
    paths: {
        jquery: "./jquery.min",
        index: "./lib/index",
        common: './lib/common',
        cookie: './lib/cookie'
    }
})
require(['index', 'common'], function(index, common) {

    index.render()
    index.banner()
    common.nav()
    common.cart(function() {
        common.catrShow()
    })

})