define(['jquery'], function($) {
    return {
        moreScreening: function() {

            $('.filter-more').click(function() {

                if ($('.filter-more').attr('data-c') == 'true') {
                    $('.filter-more').attr('data-c', 'false')
                    $('.filter-list>dl').slice(-2).addClass('filter-item-none')

                } else {
                    $('.filter-list>dl').removeClass('filter-item-none')
                    $('.filter-more').attr('data-c', 'true')

                }



            })
        }
    }
})