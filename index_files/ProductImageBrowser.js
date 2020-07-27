var last_id;

performEnlargement = false;

// Called when the customer hovers over a thumbnail
function next_image(largeImageURL, mediumImageURL, enlargeImageURL) {
    jQuery(".IComZoom").attr('href', largeImageURL);
    jQuery("#IComSmallZoom").attr('src', mediumImageURL);
    jQuery("#EnlargeImageLink").attr('href', enlargeImageURL);
    jQuery(".IComZoom").unbind();
    jqZoom();
}

function ready() {
    jQuery("#IComSmallZoom").css("cursor", "default");
    jQuery("#EnlargeImagePlusMinusTr").css("visibility", "visible");
    jQuery("#EnlargeImagePlusMinusTr").css("display", "");
    jQuery("#ProductImageBrowser_MyCarousel").css("visibility", "visible");
    jQuery("#ProductImageBrowser_MyCarousel").css("display", "");

    jQuery("#ProductImageBrowser_MyCarousel").jcarousel();

    jQuery("#EnlargeImageLink").click(
        function (e) {
            e.preventDefault();
            window.open(jQuery("#EnlargeImageLink").attr("href"), "LargeImage", "scrollbars=no,toolbar=no,menubar=no,width=450,height=450,status=no,resizable=no,directories =no")
            // + "?imagePath=" + $("#MiscoSmallZoom").attr("src")
        }
    );

    jqZoom();
}

//$(document).ready(function() {
//          
//    $("#MiscoSmallZoom").css("cursor", "default");
//    $("#EnlargeImagePlusMinusTr").css("visibility", "visible");
//    $("#EnlargeImagePlusMinusTr").css("display", "");
//    $("#ProductImageBrowser_MyCarousel").css("visibility", "visible");
//    $("#ProductImageBrowser_MyCarousel").css("display", "");
//    
//    $("#ProductImageBrowser_MyCarousel").jcarousel();

//    $("#EnlargeImageLink").click(
//        function(e) {
//            e.preventDefault();
//            window.open($("#EnlargeImageLink").attr("href") + "?imagePath=" + $("#MiscoSmallZoom").attr("src"), "LargeImage", "scrollbars=no,toolbar=no,menubar=no,width=450,height=450,status=no,resizable=no,directories =no")
//        }
//    );

//   jqZoom();  
//});

function ClickCallback() {

    jQuery(".IComZoom").setClickCallback(null);
    jQuery("#IComSmallZoom").css("cursor", "default");
    performEnlargement = false;
}

function jqZoom() {

    var icomZoom = jQuery(".IComZoom");
    icomZoom.each(function (i, e) {
        if (jQuery(e).attr('title') == '') {
            jQuery(e).removeAttr('title')
        }
    });

    if (jQuery.browser.msie) {
        icomZoom.jqzoom({ zoomType: 'standard' });
    }
    else {
        if (jQuery.browser.safari) {
            icomZoom.jqzoom({ zoomType: 'reverse' });
        }
        else {
            icomZoom.jqzoom({zoomType: 'reverse' });
        }
    }

}

jQuery(document).ready(function () {
    // Initialise the first and second carousel by class selector.
    // Note that they use both the same configuration options (none in this case).
    if (jQuery("#PushProducts").length > 0)
        jQuery("#PushProducts").jcarousel({ scroll: 1, visible: 3 });
});