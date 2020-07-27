
function CustomConfirm() {
    this.render = function (dialog,invokedby) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH + "px";
        dialogbox.style.left = (winW / 2) - (550 * .5) + "px";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";

        document.getElementById('dialogboxhead').innerHTML = coWarningText + '<a class="close" href="#" onclick="Confirm.no();return false;" >×</a>';
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<a class="Cancel" href="#" onclick="Confirm.no();return false;" >' + btnCancelText + '</a>' + '<a class="Confirm" href="#" onclick="Confirm.yes(' + '\'' + invokedby + '\'' +');return false;" >' + btnConfirmText + '</a> ';
    }
    this.no = function () {
        contentSquarePopupRemoved();
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
        return false;
    }
    this.yes = function (invokedby) {
        contentSquarePopupRemoved();
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
        if (priceChangeChecked !== "undefined")
            priceChangeChecked = true;
        if (invokedby === "undefined")
            eval(scriptbeforeadd);
        else 
            document.getElementById(invokedby).click();
    }
}
var Confirm = new CustomConfirm();
