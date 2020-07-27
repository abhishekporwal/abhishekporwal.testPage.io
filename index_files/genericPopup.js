
function GenericPopup() {
    this.render = function (GPopupWarningText, GPopupDialog, GPopupInvokedby, GPopupCancelText, GPopupConfirmText, GPopupContentSquareText) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        //var genericPopupOverlay = document.getElementById('genericPopupOverlay');
        //var genericPopup = document.getElementById('genericPopup');

        $("#genericPopupOverlay").css({ "display": "block", "height" : winH + "px"}); 
        //genericPopupOverlay.style.display = "block";
        //genericPopupOverlay.style.height = winH + "px";

        $("#genericPopup").css({ "display": "block", "top": "100px", "left": (winW / 2) - (550 * .5) + "px"}); 
        //genericPopup.style.left = (winW / 2) - (550 * .5) + "px";
        //genericPopup.style.top = "100px";
        //genericPopup.style.display = "block";


        var genericPopupbodyContentSquareScriptHtml = $("#genericPopupbodyContentSquareScript").html();

        var genericPopupbodyContentSquareScriptReplaced = "";
        if (GPopupContentSquareText && GPopupContentSquareText !== '') {
            genericPopupbodyContentSquareScriptReplaced = "<script type=\"text / javascript\"> window._uxa = window._uxa || []; window._uxa.push(['trackPageview', window.location.pathname + window.location.hash.replace('#', '? __') + '?cs-popin-" + GPopupContentSquareText + "']); </script >";
        }
        $("#genericPopupbodyContentSquareScript").html(genericPopupbodyContentSquareScriptReplaced);

        var GenericPopupheadHtml = $("#genericPopuphead").html();
        var GenericPopupheadReplaced = GenericPopupheadHtml.replace("[warningText]", GPopupWarningText);
        $("#genericPopuphead").html(GenericPopupheadReplaced);
        $("#genericPopupbody").html(GPopupDialog);
        var GenericPopupfootHtml = $("#genericPopupfoot").html();
        var GenericPopupfootReplaced = GenericPopupfootHtml.replace("[invokedby]", GPopupInvokedby).replace("[btnCancelText]", GPopupCancelText).replace("[btnConfirmText]", GPopupConfirmText);
        $("#genericPopupfoot").html(GenericPopupfootReplaced);

        //document.getElementById('genericPopuphead').innerHTML.replace("[warningText]", GPopupWarningText);
        //document.getElementById('genericPopupbody').innerHTML = GPopupDialog;
        //document.getElementById('genericPopupfoot').innerHTML.replace("[invokedby]", GPopupInvokedby).replace("[btnCancelText]", GPopupCancelText).replace("[btnConfirmText]", GPopupConfirmText);
    }
    this.no = function () {
        //document.getElementById('genericPopup').style.display = "none";
        //document.getElementById('genericPopupOverlay').style.display = "none";
        $("#genericPopup").css("display", "none"); 
        $("#genericPopupOverlay").css("display", "none"); 
        return false;
    }
    this.yes = function (GPopupInvokedby) {
        //document.getElementById('genericPopup').style.display = "none";
        //document.getElementById('genericPopupOverlay').style.display = "none";
        $("#genericPopup").css("display", "none"); 
        $("#genericPopupOverlay").css("display", "none"); 

        if (GPopupInvokedby === "undefined")
            eval(scriptbeforeadd);
        else
            document.getElementById(GPopupInvokedby).click();
    }
}
var GPopup = new GenericPopup();
