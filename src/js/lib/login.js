let baseUrl = 'http://localhost/asus.com';

define(['jquery', 'cookie'], function ($, cookie) {
    return {
        verify: function () {
            console.log(1);
            
            let n1 = '';
            $('.get-code').on('click', function () {

               
                
                
                if (/^1[3456789]\d{9}$/.test($('.account .js-x-input').val())) {
                    console.log(222);
                    
                    $('.hint span').css({
                        display: 'none'
                    }).html('手机号码验证成功')
                    
                    fn()

                
                    $('.code').css({
                        'display': 'block'
                    })
                    $('.code>p').html(n1)

                } else {
                    $('.hint span').css({
                        display: 'block'
                    })
                }
            });

            $('.login-btn').click(function () {

                // 判断 手机  验证码  条款协议
               
                if (n1 == $('.verify .js-x-input').val()) {
                    if ($('.clause>p>input').prop('checked')) {
                        if (/^1[3456789]\d{9}$/.test($('.account .js-x-input').val())) {
                            window.location.href = `${baseUrl}/src/html/index.html`
                        } else {
                            $('.hint span').css({
                                display: 'block'
                            }).html('手机号格式错误')
                        }
                    } else {
                        $('.hint span').css({
                            display: 'block'
                        }).html('请确定同意条款')
                    }
                } else {
                    $('.hint span').css({
                        display: 'block'
                    }).html('验证码错误')
                }





            })

            $('.code>span').click(function () {
                $('.code').css({
                    'display': 'none'
                })
            })

            function fn() {
                for (var i = 0; i < 4; i++) {
                    n1 += parseInt(Math.random() * 10);
                }


            }
        },
        toLogin:function(){
        console.log(2);
        
            $('.login-phone-btn>span').click(function(){
                let uName = $('.account>input').val();
                let uPass = $('.verify>input').val();
     
                console.log(uName,uPass);
                
                if(!(uName=='')){
                    if(!(uPass=='')){
                        $.ajax({
                            type:'get',
                            url:`${baseUrl}/interface/getlogin.php`,
                            data:{
                                'name':uName,
                                'pass':uPass
                            },
                            dataType:'json',
                            success:function(res){
                                if(res){
                                   $('.hint span').css({
                                       display: 'none'
                                   })
                                   window.location.href = `${baseUrl}/src/html/index.html`
                                }else{
                                   $('.hint span').css({
                                       display: 'block'
                                   }).html('用户名或密码错误')
                                }
                                
                            }
                       })
                    }else[
                        $('.hint span').css({
                            display: 'block'
                        }).html('密码不能为空')
                    ]
                }else{
                    $('.hint span').css({
                        display: 'block'
                    }).html('用户名不能为空')
                    
                }


                
            })
          
        },
        loginMethod:function(callback){
         
            $('.login-title>p> a').click(function(){
                $(this).addClass('active').siblings().removeClass('active')
                
             if($(this).index()==0){
                $('.login-con').addClass('login-con-hide').eq(1).removeClass('login-con-hide')  
             }
             if($(this).index()==2){
              
                $('.login-con').addClass('login-con-hide').eq(0).removeClass('login-con-hide')


                $('.hint span').css({
                    display: 'none'
                })

                callback&&callback()
              
                

            }

               

            })


          

            
        }

    }
})