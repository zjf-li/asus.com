require.config({
    paths: {
        jquery: './jquery.min',
        cookie: './lib/cookie',
        login: './lib/login'
    }
});

require(['login'], function(login) {
    login.verify()
    login.loginMethod(function() {
        login.toLogin()
    })
})