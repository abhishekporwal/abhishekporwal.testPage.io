function deviceModeWpExtranet(viewport) {
$(".extranetHeader .dropdown").removeClass("open");
$(".extranetResponsive #extranetCollapseMobile").addClass("in").attr("aria-expanded","true").attr("style","auto");	
    if (viewport.is("<=xs")) {
$(".extranetResponsive #extranetCollapseMobile").removeClass("in").attr("aria-expanded","false").attr("style","0");
$(".extranetResponsive .collapse-link").addClass("collapsed").attr("aria-expanded","false").attr("aria-controls","extranetCollapse");	
	}
    if (viewport.is("sm")) {
$(".extranetHeader .dropdown").removeClass("open");
$(".extranetResponsive #extranetCollapseMobile").addClass("in").attr("aria-expanded","true").attr("style","auto");
    }
    if (viewport.is(">=md")) {
$(".extranetHeader .dropdown").removeClass("open");
$(".extranetResponsive #extranetCollapseMobile").addClass("in").attr("aria-expanded","true").attr("style","auto");
    }
}

$(document).ready(function () {
$(".extranetHeader .dropdown").removeClass("open");
$(".extranetResponsive #extranetCollapseMobile").addClass("in").attr("aria-expanded","true").attr("style","auto");	
    var subCata = $("div.subCata");
    subCata.css("display", "none");

    var subsubCata = $("div.subsubCata");
    if (subsubCata.length) {
        subsubCata.css("display", "none");
    }
    $("div.Catalogue").click(function () {
        var elt = $(this).closest('.MenuCatalogue').children('.subCata');
        if ($(elt).is(":visible"))
            elt.hide();
        else if ($(elt).is(":hidden"))
            elt.show();

    });
    $("div.Cataloguesub").click(function () {
        var eltsub = $(this).closest('.subCata').children('.subsubCata');
        if ($(eltsub).is(":visible"))
            eltsub.hide();
        else if ($(eltsub).is(":hidden"))
            eltsub.show();
    });
	$(".cat-product .dropdown-toggle").on("click",function(e){
			e.stopPropagation();
			$(this).parent().toggleClass("open");
			$(this).parent().parent("li").siblings().toggleClass("close-li");
			$(this).parent().parent().parent().siblings().toggleClass("hidden");
	});
    $("#btnExtranetHeaderLogoff").click(function () {
        PageMethods.Logout($("#mscssid").val(), function (result) {
            window.location = result;
        },
            function (error) {
                alert(error.get_message());
            });
    });
	
		
});
