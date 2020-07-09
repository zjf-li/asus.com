require.config({
    paths: {
        jquery: './jquery.min',
        common: './lib/common',
        list: './lib/list',
        cookie: './lib/cookie'
    }
});

require(['list', 'common'], function(list, common) {
    console.log(1);

    common.nav()
    list.moreScreening()
})