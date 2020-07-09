define(['jquery'], function($) {
    let baseUrl = 'http://localhost/asus.com';
    return {
        nav: function() {
            $('.nav li').on('mouseover', function() { //鼠标移入触发事件

                // 判断当前移入的li的index 是不是指定的li
                if ($(this).index() == $(".nav-item-link").index()) {
                    $('.hot-show').css({ //显示对应的影藏模块
                        'display': 'block'
                    })
                }
                // 判断当前移入的li的index 是不是指定的li
                if ($(this).index() == $(".js-drop-show").index()) {
                    $('.nav-list-show').css({ //显示对应的影藏模块
                        'display': 'block'
                    })
                    $('.nav-list-show ul').animate({ //动画效果
                        'margin-left': 0
                    }, 300)

                    $('.nav-list-show ul li').css({ // 透明度效果
                        opacity: 1
                    }).on('mouseover', function() { //鼠标在元素上，当前元素透明度为1，其他为0.5
                        $(this).css({
                            opacity: 1
                        }).siblings().css({
                            opacity: 0.5
                        })
                    })
                } else {
                    $('.nav-list-show ul').css({ //
                        'margin-left': 70
                    })
                }

            })

            // 鼠标移出li 隐藏
            $('.nav-item-link').on('mouseout', function() {
                $('.hot-show').css({
                    'display': 'none'
                })
            })

            $('.js-drop-show').on('mouseout', function() {
                $('.nav-list-show').css({
                    'display': 'none'
                })
            })


            // 鼠标移动到li的内容 内容不隐藏  
            $('.hot-show').hover(function() {
                $('.hot-show').css({
                    'display': 'block'
                })
            }, function() {
                $('.hot-show').css({
                    'display': 'none'
                })

            })

            $('.nav-list-show').hover(function() {
                $('.nav-list-show').css({
                    'display': 'block'
                })
            }, function() {
                $('.nav-list-show').css({
                    'display': 'none'
                })

            })



        },
    }
})