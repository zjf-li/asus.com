require.config({
    paths: {
        jquery: "./jquery.min",
        index: "./lib/index",
        common: './lib/common'
    }
})
require(['index', 'common'], function(index, common) {

    index.render()
    index.banner()
    common.nav()
    index.menu()
})