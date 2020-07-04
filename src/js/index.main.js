require.config({
    paths: {
        jquery: "./jquery.min",
        index: "./lib/index"
    }
})
require(['index'], function(index) {
    // console.log(index);

    index.render()
    index.banner()
    index.nav()
    index.menu()
})