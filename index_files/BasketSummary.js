function previewMiniBasket(){
    jQuery(document).ready(function() {
        var leaveOpen = false;
        var basketSummary = jQuery("#BasketSummary");
        var basketHover = jQuery("#BasketHover");
        var basketId = basketSummary.attr("basket");
       /* $("#BasketContents", basketSummary).load("/Basket/ItemSummary/".concat(basketId)); */
       if(basketHover.length)
       {
        basketHover
            .css("visibility", "visible")
        // This stops overlap
            .css("width", basketHover.width() - 2)
            .css("border-width", 1)
            .hide();
       }
       if(basketSummary.length)
       {
            basketSummary.each(function(i) {
                jQuery(this).mouseenter(function () {
                    basketHover.show("fast");
                    leaveOpen = true;
                },
                    null);
            });

            basketSummary.mouseleave(function() {
                leaveOpen = false;
                setTimeout(function() {
                    if (!leaveOpen) {
                        basketHover.hide("fast");
                    }
                }, 1000);

            });
       }

    });
}

