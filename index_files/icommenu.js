$(function () {
    $.icomMegaMenu = function (element, options) {
        var settings = {
            menu_responsive: false,
            menu_responsive_min_width: 768
        }

        var plugin = this
        plugin.options = {}
        //var $element = $(element)
        //var megaMenu = $element.children('.mgmenu')

        plugin.init = function () {
            settings = $.extend(1, settings, options)

            megaMenuGen()
        }
        var megaMenuGen = function () {

            var $WidthLimit = settings.menu_responsive ? settings.menu_responsive_min_width : 0 // responsive

            /* fixed width to top items*/
            if ($(window).width() > $WidthLimit) {
                var itemCount = $('.icom-menu').children('li').length
                var itemWidth = ($('.icom-menu').width() / itemCount)

                $('.icom-menu > li').each(function () {
                    var borderLeft = $(this).css('borderleftStyle') == 'none' ? 0 : parseInt($(this).css('borderLeftWidth').slice(0, -2)); // ie 7 + above
                    var borderRight = $(this).css('borderRightStyle') == 'none' ? 0 : parseInt($(this).css('borderRightWidth').slice(0, -2))

                    $(this).css('width', itemWidth - (borderLeft + borderRight))
                })
            }
            /*-------------------------*/
            $('.icom-menu > li > div').each(function () {
                $(this).insertAfter($(this).parent('li').children('ul').children('li:last-child').children('a'))
            })

            $('.icom-menu > li:has( > ul)').addClass('icom-menu-dropdown-icon')
            $('.icom-menu > li > ul > li:has( > ul)').addClass('icom-menu-dropdown-inner-icon')
            $('.icom-menu ').before('<a href="#" class="icom-menu-mobile">Home</a>') // responsive
            $('.icom-menu > li > a:first-child').addClass('icom-menu-cat-link')

            var id_ = 0
            $('.icom-menu > li > ul > li').each(function () {
                id_ = id_ + 1
                $(this).children('a').attr('icom-menu-pp', 'icom-menu-pp' + (id_))
                $(this).children('ul').attr('icom-menu-pp', 'icom-menu-pp' + (id_))
                $(this).children('a').addClass('icom-menu-link')

            })
            if ($(window).width() > $WidthLimit) {
                $('.icom-menu > li > ul').each(function () {
                    $(this).children('li').children('a').wrapAll("<div class='div-icom-menu-links'></div>")
                    $(this).children('li').children('ul').wrapAll("<div class='div-icom-menu-items'></div>")
                })
            }
            $('.div-icom-menu-items').each(function () {
                $(this).insertAfter($(this).parent('li').parent('ul').children('li:first-child').children('div:last-child'))
            })

            $('.icom-menu > li').mouseover(function (e) {
                if ($(window).width() > $WidthLimit) {
                    if ($(e.target).hasClass('icom-menu-cat-link')) {
                        $(this).children('ul').stop(true, false).delay(500).fadeIn(800)
                        $(this).parent('ul').children('li').children('ul').children('li').find('.category-layout').css('display', 'block') // design
                        $(this).children('ul').children('li').find('.category-layout').css('display', 'block')
                        $(this).children('ul').children('li').find('.div-icom-menu-links').children('a').removeClass('active')
                        $(this).children('ul').children('li').children('div:last-child').children('ul').children('li').css('display', 'none')

                        //////////////////////
                        var line = $(this).children('ul').children('li').find('.div-icom-menu-links').children('a:first-child');
                        line.addClass('activeGrey'); //activating the secodlevel first menu when the topmost link is selected
                        var _target = line.attr('icom-menu-pp')
                        $(line).parent('div').parent('li').children('div:last-child').children('ul[icom-menu-pp=' + _target + ']').children('li').css('display', 'block')
                        /////////////////////
                    }
                    e.preventDefault()
                }
            })
              .mouseleave(function (e) {
                  if ($(window).width() > $WidthLimit) {
                      $(this).children('ul').stop(true, false).fadeOut(400)
                      e.preventDefault()
                  }
              })

            var __t, _this, _icom_menu_item = null
            $('.icom-menu > li > ul > li > div > a').mouseenter(function (e) {
                if ($(window).width() > $WidthLimit) {
                    _this = this
                    _icom_menu_item = $(e.target).attr('icom-menu-pp')
                    __t = setTimeout(function () {
                        $(_this).parent('div').parent('li').find('.category-layout').css('display', 'block') // hide design
                        $(_this).parent('div').children('a').removeClass('active')
                        $(_this).parent('div').children('a').removeClass('activeGrey')
                        $(_this).addClass('active')
                        $(_this).parent('div').parent('li').children('div:last-child').children('ul').children('li').css('display', 'none')
                        $(_this).parent('div').parent('li').children('div:last-child').children('ul[icom-menu-pp=' + _icom_menu_item + ']').children('li').css('display', 'block')
                    }, 100
                    )
                    e.preventDefault()
                }
            }).mouseleave(function (e) {
                clearTimeout(__t)
            })

            /* mobile */
            $('.icom-menu > li').click(function (e) {
                if ($(window).width() <= $WidthLimit) {
                    $(this).children('ul').fadeToggle(150)
                }
            })

            $('.icom-menu-dropdown-inner-icon').click(function (e) {
                if ($(window).width() <= $WidthLimit) {
                    $(this).children('ul').fadeToggle(150)
                    $(this).toggleClass('highlight')
                    e.stopPropagation()
                }
            })

            $('.icom-menu-mobile').click(function (e) {
                $('.icom-menu').toggleClass('show-on-mobile')
                e.preventDefault()
            })
        }

        plugin.init()
    }

    $.fn.icomMegaMenu = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('icomMegaMenu')) {
                $.icomMegaMenu(this, options)
                $(this).data('icomMegaMenu', plugin)
            }

        })
    }
})
