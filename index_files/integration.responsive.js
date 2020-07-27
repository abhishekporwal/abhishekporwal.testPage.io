/******************************************OLD JS V NO RESPONSIVE***************************************************/
/*WebpartCookie*/
function hideCookieLegalEffect() {
    $(".cookie_container").fadeOut("normal", function () {
        $(this).remove();
    });
}
/******************************************END OLD JS V NO RESPONSIVE***************************************************/




/*!* Responsive Bootstrap Toolkit * Author:    Maciej Gurban * License:   MIT * Origin:    https://github.com/maciej-gurban/responsive-bootstrap-toolkit */
var ResponsiveBootstrapToolkit = function (i) { var e = { detectionDivs: { bootstrap: { xs: i('<div class="device-xs visible-xs visible-xs-block"></div>'), sm: i('<div class="device-sm visible-sm visible-sm-block"></div>'), md: i('<div class="device-md visible-md visible-md-block"></div>'), lg: i('<div class="device-lg visible-lg visible-lg-block"></div>') }, foundation: { small: i('<div class="device-xs show-for-small-only"></div>'), medium: i('<div class="device-sm show-for-medium-only"></div>'), large: i('<div class="device-md show-for-large-only"></div>'), xlarge: i('<div class="device-lg show-for-xlarge-only"></div>') } }, applyDetectionDivs: function () { i(document).ready(function () { i.each(o.breakpoints, function (i) { o.breakpoints[i].appendTo(".responsive-bootstrap-toolkit") }) }) }, isAnExpression: function (i) { return "<" == i.charAt(0) || ">" == i.charAt(0) }, splitExpression: function (i) { var e = i.charAt(0), o = "=" == i.charAt(1), s = 1 + (o ? 1 : 0), n = i.slice(s); return { operator: e, orEqual: o, breakpointName: n } }, isAnyActive: function (e) { var s = !1; return i.each(e, function (i, e) { return o.breakpoints[e].is(":visible") ? (s = !0, !1) : void 0 }), s }, isMatchingExpression: function (i) { var s = e.splitExpression(i), n = Object.keys(o.breakpoints), r = n.indexOf(s.breakpointName); if (-1 !== r) { var t = 0, a = 0; "<" == s.operator && (t = 0, a = s.orEqual ? ++r : r), ">" == s.operator && (t = s.orEqual ? r : ++r, a = void 0); var l = n.slice(t, a); return e.isAnyActive(l) } } }, o = { interval: 300, framework: null, breakpoints: null, is: function (i) { return e.isAnExpression(i) ? e.isMatchingExpression(i) : o.breakpoints[i] && o.breakpoints[i].is(":visible") }, use: function (i, s) { o.framework = i.toLowerCase(), "bootstrap" === o.framework || "foundation" === o.framework ? o.breakpoints = e.detectionDivs[o.framework] : o.breakpoints = s, e.applyDetectionDivs() }, current: function () { var e = "unrecognized"; return i.each(o.breakpoints, function (i) { o.is(i) && (e = i) }), e }, changed: function (i, e) { var s; return function () { clearTimeout(s), s = setTimeout(function () { i() }, e || o.interval) } } }; return i(document).ready(function () { i('<div class="responsive-bootstrap-toolkit"></div>').appendTo("body") }), null === o.framework && o.use("bootstrap"), o }(jQuery); "undefined" != typeof module && module.exports && (module.exports = ResponsiveBootstrapToolkit);

/**** PARAMETER TO ACTIVATE THE RESPONSIVE ****/
var flResizeEnabled = true; /******************/
/**** PARAMETER TO ACTIVATE THE RESPONSIVE ****/

var oldWidth = 0;
var addModalSearchForm = function () { $("body.mobileDevice #cmcwebusercataloguesearch").wrap("<div class='modal fade' id='searchBar' tabindex='-1' role='dialog' aria-labelledby='myModalLabel'><div class='modal-dialog' role='document'><div class='modal-content'></div></div></div>"); }
var removeModalSearchForm = function () {
    var cmcwebusercataloguesearchphone = $("body #cmcwebusercataloguesearch");
    while (cmcwebusercataloguesearchphone.parentsUntil().is("div#searchBar")) {
        cmcwebusercataloguesearchphone.unwrap();
        $("body").removeClass("modal-open");
        $(".modal-backdrop").remove();
    }
}
internetExlorerVersion();


/*VERY IMPORTANT TO BE ABLE TO ADD A DIFFERENT JS BY DEVICE TYPE************************************************/
/***************************************************************************************************************/
(function ($, document, window, viewport) {
    var deviceMode = function () {
        $('body').removeClass('mobileDevice tabletDevice desktopDevice tabMobDevice');
        if ($("#navBar").hasClass("in")) {
            $('#navBar').modal('hide');
        }
        if (viewport.is("<=xs")) {
            $('body').addClass('mobileDevice tabMobDevice');
            addModalSearchForm();
        }
        if (viewport.is("sm")) {
            $('body').addClass('tabletDevice tabMobDevice');
            removeModalSearchForm();
        }
        if (viewport.is(">=md")) {
            $('body').addClass('desktopDevice');
            removeModalSearchForm();
        }
    }

    $(document).ready(function () {
        if (flResizeEnabled) {
            deviceMode();
            if (typeof deviceModeByPage == "function")
                deviceModeByPage(viewport);
            if (typeof deviceModeWPTopSellerVert == "function")
                deviceModeWPTopSellerVert(viewport);
			 if (typeof deviceModeWpExtranet == "function")
                deviceModeWpExtranet(viewport);


        }
        if (!flResizeEnabled) {
            $('body').addClass('responsiveLocked');
        }
        integrationFormat();
        backToTop();
        burgerMenu();
        bannerSwipe();
        productCellWrapper();
        inputTxtAnimate();
        scrollStickyHeader();
        integrationFormat();
    });
    $(window).resize(
        viewport.changed(function () {
            if ($(window).width() != oldWidth) {
                oldWidth = $(window).width();
                if (flResizeEnabled) {
                    deviceMode();
                    if (typeof deviceModeByPage == "function")
                        deviceModeByPage(viewport);
                    if (typeof deviceModeWPTopSellerVert == "function")
                        deviceModeWPTopSellerVert(viewport);
                   	if (typeof deviceModeWpExtranet == "function")
                deviceModeWpExtranet(viewport);
                }
            }
            integrationFormat();
        })
    );
})(jQuery, document, window, ResponsiveBootstrapToolkit);
/*TO WRAP 4 PRODUCTS CELLS *************************************************************************************/
/***************************************************************************************************************/
function productCellWrapper() {
    $(".productCellx4").wrapAll("<div class='container containerWrapAll' />");
    $(".containerWrapAll").wrap("<div class='col-lg-24 col-md-24 col-sm-24 col-xs-24 ContainerProductCell' />");
}
/*TO FIXED THE POSITION OF THE HEADER ***************************************************************************/
/***************************************************************************************************************/
function scrollStickyHeader() {
    $(window).scroll(function () {
        var sticky = $("body"),
            scroll = $(window).scrollTop();
        if (scroll >= 34 && !$("body").hasClass("modal-open")) {
            sticky.addClass('fixedPosition');
        }
        else { sticky.removeClass('fixedPosition'); }
    });
    oldWidth = $(window).width();
}
/*ANIMATION FOR ALL INPUT TXT WITH A CONTAINER FORM-GROUP********************************************************/
/***************************************************************************************************************/
function inputTxtAnimate() {
    if ($("input[type='text'],input[type='password']").length) {
        $("input[type='text'],input[type='password']").focus(function () {
            $(this).parent().addClass('filled');
            $(this).addClass('filled');
        }).blur(function () {
            if ($(this).val().length == 0) {
                $(this).parent().removeClass('filled');
                $(this).removeClass('filled');
            }
        });

    }
}
/*SWIPE FOR ANDROID AND WINDOWS PHONE***************************************************************************/
/***************************************************************************************************************/
function bannerSwipe() {
    $('#CMCBanner .carousel').carousel({ interval: 5000 });
    $('.carousel.slide').on("swiperight", function () { $(this).carousel('prev'); });
    $('.carousel.slide').on("swipeleft", function () { $(this).carousel('next'); });
}
/*NAV BAR TAB AND MOBILE*****************************************************************************************/
/***************************************************************************************************************/
function burgerMenu() {
    $('#navBar').on('shown.bs.modal', function () { $("html,body").addClass("modal-open-navBar"); });
    $('#navBar').on('hidden.bs.modal', function () { $("html,body").removeClass("modal-open-navBar"); });
}
/*TO ADDED A CLASS IE IN THE BODY*******************************************************************************/
/***************************************************************************************************************/
function internetExlorerVersion() {
    var browser = {
        isIe: function () {
            return navigator.appVersion.indexOf("MSIE") != -1;
        },
        navigator: navigator.appVersion,
        getVersion: function () {
            var version = 999;
            if (navigator.appVersion.indexOf("MSIE") != -1)
                version = parseFloat(navigator.appVersion.split("MSIE")[1]);
            return version;
        }
    };
    if (browser.isIe()) {
        $("body").addClass("internetExplorer" + browser.getVersion());
    }
}
/*BUTTON HAUT DE PAGE VISILBLE ONLY ON THE TABLET AND MOBILE VERSION********************************************/
/***************************************************************************************************************/
function backToTop() {
    $('a[href^="#"].back-to-top').click(function (event) {
        event.preventDefault();
        var targetTop = $('body').offset().top;
        if (targetTop != null) {
            $('html, body').animate({
                scrollTop: targetTop
            }, 500);
        }
    });
}
/*POP UP ADD TO BASKET UPSELL***********************************************************************************/
/***************************************************************************************************************/
function carrouselPopUpResize() {
    var carrouselPopUpMobile = $("#carousel-UpsellProduct .basicProductCell");
    if ($("body").hasClass("mobileDevice")) {
        if (carrouselPopUpMobile.parent().is("div.item")) {
            carrouselPopUpMobile.removeClass("active").unwrap();
        }
        for (var i = 0; i < carrouselPopUpMobile.length; i += 1) {
            carrouselPopUpMobile.slice(i, i + 1).wrapAll("<div class='item'></div>");
        }
        $("#carousel-UpsellProduct .carousel-inner .item:first-child").addClass("active");
    }
    if ($("body").hasClass("desktopDevice")) {
        if (carrouselPopUpMobile.parent().is("div.item")) {
            carrouselPopUpMobile.removeClass("active").unwrap();
        }
        for (var i = 0; i < carrouselPopUpMobile.length; i += 4) {
            carrouselPopUpMobile.slice(i, i + 4).wrapAll("<div class='item'></div>");
        }
        $("#carousel-UpsellProduct .carousel-inner .item:first-child").addClass("active");
    }
    if ($("body").hasClass("tabletDevice")) {
        if (carrouselPopUpMobile.parent().is("div.item")) {
            carrouselPopUpMobile.removeClass("active").unwrap();
        }
        for (var i = 0; i < carrouselPopUpMobile.length; i += 2) {
            carrouselPopUpMobile.slice(i, i + 2).wrapAll("<div class='item'></div>");
        }
        $("#carousel-UpsellProduct .carousel-inner .item:first-child").addClass("active");
    }
}
function integrationFormat() {
    if ($(".popup-panierUpsell").length > 0 && typeof carrouselPopUpResize === 'function') {
        carrouselPopUpResize();
    }
}

function addScriptContentSquarePopupRemoved() {
    window._uxa = window._uxa || [];
    window._uxa.push(['trackPageview', window.location.pathname + window.location.hash.replace('#', '?__')]);
}
