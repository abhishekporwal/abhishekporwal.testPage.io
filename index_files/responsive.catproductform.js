titleH1HeightFixed = 106;
var productInformationOffsetPosition;
var currentScroll;
var currentScrollBottom;
var titleOffsetPosition;
var productInformationFixed;
var carouselAccessories;
function deviceModeByPage(viewport) {
    $(".Product-form-left-column > .ProductImage_Container .item").attr('data-toggle', 'modal').attr('data-target', '#carousel-popup');


    if (viewport.is("<=xs")) {
        titleH1HeightFixed = 106;
        $('.ProductImage_Container .item').removeAttr("data-target data-toggle");
        carrouselAccessoriesMobile();

    }
    if (viewport.is("sm")) {
        titleH1HeightFixed = 118;
        $(".Product-form-left-column > .ProductImage_Container .item").attr('data-toggle', 'modal').attr('data-target', '#carousel-popup');
        carrouselAccessoriesTablet();

    }
    if (viewport.is(">=md")) {
        titleH1HeightFixed = 57;
        $(".Product-form-left-column > .ProductImage_Container .item").attr('data-toggle', 'modal').attr('data-target', '#carousel-popup');
        carrouselAccessories();


    }
}
$(document).ready(function () {
    carrouselAccessories();

    ///////////// If description is empty ////////////
    if ($('#ccs-inline-content').is(':empty') && $('#ccs_video').is(':empty') && $('#ccs-ksp-features').is(':empty') && $('#ttMarketingDescription').is(':empty') && $('#ccs-mkt-desc').is(':empty')) {
        $('#descriptionEmpty').addClass("active")
    }
    $('#carouselProductImg').find('.item').first().addClass('active');
    ////////// Sticky position //////////
    // Position bottom by default for the links description
    currentScrollBottom = $(window).scrollTop() + $(window).height();
    productInformationOffsetPosition = $('.cat-product-form-bottom-content').offset().top;
    if (currentScrollBottom <= productInformationOffsetPosition && !$('body').hasClass("modal-open")) { $('.cat-product-form-bottom-content').addClass("fixedPositionBottom"); }
    $(window).scroll(function () {
        currentScroll = $(window).scrollTop();
        currentScrollBottom = $(window).scrollTop() + $(window).height();
        //Position fixed for the H1
        titleOffsetPosition = $('.titleH1').offset().top + $('.titleH1').outerHeight();
        if (currentScroll >= titleOffsetPosition - titleH1HeightFixed) {
            $('.titleH1 > div').addClass("fixedPosition");
        } else { $('.titleH1 > div').removeClass("fixedPosition"); }
        //Position fixed for the button add to basket
        if (currentScroll >= $('.More-Info-product').offset().top + $('.More-Info-product').outerHeight() - titleH1HeightFixed) { $('.Caddie-product').addClass("fixedPosition"); } else { $('.Caddie-product').removeClass("fixedPosition"); }
        //Position fixed to the bottom for the links description
        productInformationOffsetPosition = $('#productInformation').offset().top;
        if (currentScrollBottom <= productInformationOffsetPosition) { $('.cat-product-form-bottom-content').addClass("fixedPositionBottom"); } else { $('.cat-product-form-bottom-content').removeClass("fixedPositionBottom"); }
        //Position fixed to the top for the links description
        if (currentScroll >= productInformationOffsetPosition - titleH1HeightFixed) { $('.cat-product-form-bottom-content').addClass("fixedPosition"); } else { $('.cat-product-form-bottom-content').removeClass("fixedPosition"); }
    });
    ////////// Smooth anchor //////////
    $(document).on('click', '#productInformation a[href^="#"]', function (event) {
        event.preventDefault();
        var targetTop = $('.cat-product-form-bottom-content').offset().top - titleH1HeightFixed;
        // if the title is not fixed
        if (!$('.titleH1 > div ').hasClass("fixedPosition") && !$('.cat-product-form-bottom-content').hasClass("fixedPositionBottom")) { targetTop = productInformationOffsetPosition - $('.titleH1 > div ').outerHeight() - titleH1HeightFixed; }
        // if the tab are fixed at the bottom
        if ($('.cat-product-form-bottom-content').hasClass("fixedPositionBottom")) { targetTop = productInformationOffsetPosition - $('.titleH1 > div ').outerHeight() - titleH1HeightFixed; }
        if (targetTop != null) {
            $('html, body').animate({
                scrollTop: targetTop
            }, 500);
        }
    });

    ////////// Smooth anchor on the static title to the head //////////
    $(document).on('click', '#Product-form .titleH1 > div.fixedPosition .container .productImageTitle,#Product-form .titleH1 > div.fixedPosition .container h1', function (event) {
        var targetTopOfPage = $('#top').offset().top;
        if (targetTopOfPage != null) {
            $('html, body').animate({
                scrollTop: targetTopOfPage
            }, 500);
        }
    });




    ////////// to solve the problem of the popup  ////////// 
    $(".navbar-toggle").click(function () {
        $('body').removeClass("fixedPositionProductInformation");
        $('body').removeClass("fixedPositiontitleOffsetPosition");
        $('.Caddie-product').removeClass("fixedPosition");
        $('.titleH1').removeClass("fixedPosition");
        $('.cat-product-form-bottom-content').removeClass("fixedPositionBottom");
    });

    ////////// to solve the problem of the popup  ////////// 
    //$("#btnSimilarProduct").click(function () {
    //    $('#btnSimilarProduct').toggleClass("closed open");
    //    $('#idSimilarProduct_list').toggleClass("closed open");

    //});
    /////////// PopUp Carousel //////////


    $(".stopClick .fa-search-plus,.Product-form-left-column > .ProductImage_Container .item").click(function () {
        $('.ProductImage_Container').addClass("fadeOut");
        setTimeout(function () {
            $(".ProductImage_Container").appendTo("#carousel-popup .modal-body");
            $('.ProductImage_Container').removeClass("fadeOut");
            $('.ProductImage_Container .item').removeAttr("data-target data-toggle");
        }, 200);
    });
    $(".Product-form-left-column > .ProductImage_Container .item").attr('data-toggle', 'modal').attr('data-target', '#carousel-popup');
    $(".modal.fade").click(function (e) {
        if ($(e.target).closest('.modal-dialog').length === 0 || $(e.target).hasClass("close")) {
            $(".ProductImage_Container").appendTo(".Product-form-left-column");
            $(".Product-form-left-column > .ProductImage_Container .item").attr('data-toggle', 'modal').attr('data-target', '#carousel-popup');
        }
    });





    /////////// thumbnails Carousel //////////
    $('#carouselProductImg').find('.item').first().addClass('active');
    $('#carouselProductImg').find('.carousel-indicators > li').first().addClass('active');
    var thumbnailUlHeight = $('#slider-thumbs .hide-bullets').outerHeight();
    var thumbnailContainerHeight = $('#slider-thumbs .thumbnailContainer').outerHeight() + 5;
    if ($('#carouselProductImg').length) {


        if ($('#slider-thumbs .hide-bullets').position().top < 0) {
            $("#slider-thumbs .stopClickTop").removeClass("unclickable");
        }
    }

    $("#slider-thumbs .fa-chevron-up").click(function () {
        $("#slider-thumbs .stopClickTop").addClass("unclickable");
        $("#slider-thumbs .stopClickBottom").removeClass("unclickable");
        $("#slider-thumbs .hide-bullets").animate({ "top": "+=" + thumbnailContainerHeight }, "slow");
        if ($('#slider-thumbs .hide-bullets').position().top + thumbnailContainerHeight < 0) {
            setTimeout(function () {
                $("#slider-thumbs .stopClickTop").removeClass("unclickable");
            }, 1000);
        }
    });

    if ($('#carouselProductImg').length) {
        if ($('.hide-bullets').position().top + thumbnailContainerHeight < thumbnailUlHeight) {
            $("#slider-thumbs .stopClickBottom").removeClass("unclickable");
        }
    }
    $("#slider-thumbs .fa-chevron-down").click(function () {
        $("#slider-thumbs .stopClickBottom").addClass("unclickable");
        $("#slider-thumbs .stopClickTop").removeClass("unclickable");
        $("#slider-thumbs .hide-bullets").animate({ "top": "-=" + thumbnailContainerHeight }, "slow");
        var positionGoBottom = Math.abs($('.hide-bullets').position().top - thumbnailContainerHeight) + thumbnailContainerHeight;
        if (positionGoBottom < thumbnailUlHeight) {
            setTimeout(function () {
                $("#slider-thumbs .stopClickBottom").removeClass("unclickable");
            }, 1000);
        }
    });
    /////////// btn Read more review //////////
    $(".ReviewList").each(function () {
        var lenghtReview = $(this).find(".totalReview").text().length;
        var btnReadMore = $(this).find(".btnReadMore");
        if (lenghtReview < 350) {
            $(btnReadMore).addClass("hidden");
        } else {
            var review = $(this).find(".totalReview");
            var firstCharacters = $(review).text().substring(0, 348);
            var lastCharacters = $(review).text().substring(348, $(review).text().length - 1);
            $(review).html(firstCharacters + '...<span class="hidden">' + lastCharacters + '</span>');
            $(btnReadMore).click(function () {

                $(this).parent().toggleClass("open");
                if ($(this).parent().hasClass("open")) {
                    $(review).html($(review).html().replace('...<span class="hidden">', '').replace('</span>', ''));
                }
                else {
                    $(review).html(firstCharacters + '...<span class="hidden">' + lastCharacters + '</span>')
                }
            });
        }
    });



    ///// Description CNet  /////////////
    //Hide empty description div and ccs-mkt-desc div if @Model.Product.ttMarketingDescription not empty
    if ($('#ttMarketingDescription').html().length > 0) {
        $('#ccs-mkt-desc').hide();
        $('#descriptionEmpty').hide();
    }

    //Hide empty description and ttMarketingDescription divs if description returned by Cnet script
    $("#ccs-inline-content").on('DOMSubtreeModified', function () {
        if ($('#ccs-inline-content').html().length > 0) {
            $('#ttMarketingDescription').hide();
            $('#ccs-mkt-desc').hide();
            $('#descriptionEmpty').hide();
        }
    });

    $("#ccs-mkt-desc").on('DOMSubtreeModified', function () {
        if ($('#ccs-mkt-desc').html().length > 0) {
            $('#descriptionEmpty').hide();
        }
    });

    $("#ccs-ksp-features").on('DOMSubtreeModified', function () {
        if ($('#ccs-ksp-features').html().length > 0) {
            $('#descriptionEmpty').hide();
        }
    });

    $('#idPushAndAssociatedProducts.carousel').carousel({ interval: false });
});



function carrouselAccessories() {
    var carouselAccessories = $("#idPushAndAssociatedProducts div.elem");
    if (carouselAccessories.parent().is("div.item")) {
        carouselAccessories.removeClass("active").unwrap();
    }
    for (var i = 0; i < carouselAccessories.length; i += 4) {
        carouselAccessories.slice(i, i + 4).wrapAll("<div class='item col-lg-24'></div>");
    }
    $("#idPushAndAssociatedProducts .carousel-inner .item:first-child").addClass("active");

}
function carrouselAccessoriesMobile() {

    var carouselAccessories = $("#idPushAndAssociatedProducts div div.elem");
    if (carouselAccessories.parent().is("div.item")) {
        carouselAccessories.removeClass("active").unwrap();
    }
    for (var i = 0; i < carouselAccessories.length; i += 1) {
        carouselAccessories.slice(i, i + 1).wrapAll("<div class='item col-lg-24'></div>");
    }
    $("#idPushAndAssociatedProducts .carousel-inner .item:first-child").addClass("active");
}

function carrouselAccessoriesTablet() {

    var carouselAccessories = $("#idPushAndAssociatedProducts div div.elem");
    if (carouselAccessories.parent().is("div.item")) {
        carouselAccessories.removeClass("active").unwrap();
    }
    for (var i = 0; i < carouselAccessories.length; i += 2) {
        carouselAccessories.slice(i, i + 2).wrapAll("<div class='item col-lg-24'></div>");
    }
    $("#idPushAndAssociatedProducts .carousel-inner .item:first-child").addClass("active");
}

