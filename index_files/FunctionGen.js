function goAction(sAction) {
	//-- Post Form to a specific page according to sAction
	if (sAction == null)
		return;
	var f = document.aspnetForm;

	switch (sAction) {
		case 'Email':
			f.action = '/email.aspx';
			break;
		default:
			f.action = '/index.aspx';
	}
	//-- Post form
	f.submit();
}

function highlight(elt, state) {
	var plus = '';
	if (navigator.appName == 'Netscape' || navigator.appVersion.indexOf('MSIE 7.0') >= 0) plus = '_Firefox';
	if (elt.tagName == 'INPUT') {
		etype = elt.type;
		if ((etype == 'text' || etype == 'password')) {
			if (state == 1)
				elt.className = "out" + plus;
			else
				elt.className = "on" + plus;
		}
	}
}

function addQtyProduct(sCtl, idSign) {

	var qt = document.getElementById(sCtl);
    var ptr = qt;
	if (ptr != null) {
        if ((qt = ptr.value) == '' || isNaN(qt) || qt < 1)
            ptr.value = 1;
        ptr.value = (qt = parseInt(ptr.value, 10) + idSign) < 1 ? -idSign : qt;
	}
}



//Show waiting message
function displayWait(display) {
	if (document.getElementById('_wait')) {
		disableBody();
		GoToTopOfPage();
		document.getElementById('_wait').style.zIndex = 3000;
		document.getElementById('_wait').style.display = display ? display : '';
	}
}

//Stop waiting message
function StopdisplayWait() {
	if (document.getElementById('_wait')) {
		enableBody();
		document.getElementById('_wait').style.display = 'none';
	}
}

function getKeyCode(e) {
	var chrCode
	if (e && e.which) {
		e = e
		chrCode = e.which
	} else {
		e = event
		chrCode = e.keyCode
	}
	return chrCode
}

function checkInvalidCharacters(e, invalidChars) {
	invalidChars = invalidChars.replace(/&quot;/ig, '"')
	var chrCode = getKeyCode(e)
	var character = String.fromCharCode(chrCode)
	var reg = new RegExp("[" + invalidChars + "]")
	if (character.match(reg))
		return false
	else
		return true
}

function checkValidCharacters(e, validChars) {
	validChars = validChars.replace(/&quot;/ig, '"')
	var chrCode = getKeyCode(e)
	if (chrCode == 8)
		return true
	var character = String.fromCharCode(chrCode)
	var reg = new RegExp("[" + validChars + "]")
	if (character.match(reg))
		return true
	else
		return false
}

function trim(s) {
	s = s.replace(/^\s*|\s*$/, "");
	return s;
}

var popbox = null
function checkPop() {
	if (popbox && popbox.close) popbox.close()
}

function goAlert(idProduct, lbManufacturer, lbRange) {
	window.open('/catalogue/catProductAlert.aspx?displayHeader=no&isPopup=y&idProduct=' + idProduct + '&lbManufacturer=' + lbManufacturer + '&lbRange=' + lbRange + '', '', 'toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=500,height=300,left=100,top=100')
}

function goContactInfo(idProduct, lbManufacturer, lbRange) {
	checkPop()
	var iWidth = 500, iHeight = 350
	if (idProduct == null || idProduct == '' || idProduct == 0)
		return
	else
		return
}

function goSupplierInfo(idSupplier) {
	checkPop()
	var iWidth = 500, iHeight = 220
	if (idSupplier == null || idSupplier == '' || idSupplier == 0)
		return
	else
		return
}

// Tracking insertion of hash tags
function goTrackingUsageInfo(mscssid, url) {
	var keyword = window.location.hash;
	var strUrl = window.location.href;

	if (url) {
		keyword = url
		strUrl = url;
	}

	if (keyword != '') {
		if ((keyword.indexOf('idBanner') != -1) || (keyword.indexOf('idWallpaper') != -1)) {
			if (strUrl.indexOf('produits/2') != -1) {
				PageMethods.set_path("/Catalogue/catProductList2sub.aspx");
			}
			else if (strUrl.indexOf('produits/1') != -1) {
				PageMethods.set_path("/Catalogue/catProductList.aspx");
			}
			else if (strUrl.indexOf('page') != -1) {
				PageMethods.set_path("/cmcPage.aspx");
			}
			else if (strUrl.indexOf('catProductNoResult') != -1) {
				PageMethods.set_path("/Catalogue/catProductNoResult.aspx");
			}
			else {
				PageMethods.set_path("/index.aspx");
			}
			PageMethods.TrackingUsageInfo(keyword, mscssid, OnThxTrackingUsageSuccess, OnTrackingUsageError);
		}
	}
}
function OnThxTrackingUsageSuccess(result) {

}
function OnTrackingUsageError(error) {
	alert(error.get_message());
}

function AcceptGDPR(mscssid)
{

	PageMethods.set_path("/index.aspx");
			 
	PageMethods.AcceptGDPR(mscssid, OnAcceptGDPRSuccess, OnAcceptGDPRError);
		 
}
function OnAcceptGDPRSuccess(result) {
	if (result) {
		hidePopupGDPR();
	}

}
function OnAcceptGDPRError(error) {
	alert(error.get_message());
}
$(function () {
	jQuery('a[isTracked=true]').bind('click', function (event) {
		var coTracking;
		if (this.hostname == document.domain) {
			coTracking = 'QuickTrack';
		}
		else {
			coTracking = 'QuickTrackExternal';
			$(this).attr('target', '_blank');
		}
		PageMethods.set_path("/" + PageMethods.get_path());
		PageMethods.LinkTracker($('#mscssid').val(), coTracking, $(this).prop('href'), function (result) { }, function (error) { });

	});

	/*jQuery('#divMarketingOffer a').click(function () {
		var url = $(this).attr('href');
		var hashValue = url.substring(url.toLowerCase().indexOf('#idoffer=') + 9);
		if (hashValue != '' && parseInt(hashValue) > 0) {
			PageMethods.UpdWPMarketingOfferClick($('#mscssid').val(), hashValue, function (result) { }, function (error) { });
		}
	});*/
});


// promotion time remaining display
var ids = [];
var intervals = [];
function PromoTimer(type, date, text, id, basket) {
	if (type == 6 || type == 8) {
		ids.push(id);
		intervals.push(setInterval(function () { displayPromoTimer(date, text, id, basket) }, 1000));
	}
}


function displayPromoTimer(date, text, id, basket) {
	// var target_date = new Date(date).getTime();
	var target_date = date - 62135596800000; //Subtract 01/01/1970 milliseconds because C# ticks is based on 01/01/0001 and getTime() is based on 01/01/1970
	var days, hours, minutes, seconds;
	var current_date = new Date().getTime();
	var seconds_left = (target_date - current_date) / 1000;

	// do some time calculations
	days = parseInt(seconds_left / 86400);
	seconds_left = seconds_left % 86400;
	hours = parseInt(seconds_left / 3600);
	seconds_left = seconds_left % 3600;
	minutes = parseInt(seconds_left / 60);
	seconds = parseInt(seconds_left % 60);
	if ((days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0)) {
		if (id && basket == 0) { // mutli timers with independant notifications (ex:vitrine)
			$.each(ids, function (i, v) {
				if (v == id)
					clearTimeout(intervals[i]);
			});
			$('div[id^=promocountdown' + id + ']').text('Terminé');
		}
		else {  //unique timer(ex:product form) or  mutli timers with dependant notifications(ex:basket)
			if (basket == 1) {
				$.each(ids, function (i, v) {
					if (v == id)
						clearTimeout(intervals[i])
				});
				$('div[id^=promocountdown' + id + ']').text('Terminé');
				setTimeout(function () { $(".gblboutComput1").click(); }, 3000);
			}
			else {
				$.each(intervals, function (i, v) {
					clearTimeout(v)
				});
				$('#promocountdown').text('Terminé');
				setTimeout(function () { location.reload(true); }, 3000);
			}

		}
	}
	else {
		var timeLeft = (days == 0 ? "" : days + "j");

		if (timeLeft == "") {
			if (hours > 0)
				timeLeft = hours + "h";
		}
		else {
			if (hours < 10)
				hours = "0" + hours;
			timeLeft += hours + "h";
		}

		if (timeLeft == "") {
			if (minutes > 0)
				timeLeft = minutes + "m";
		}
		else {
			if (minutes < 10)
				minutes = "0" + minutes;
			timeLeft += minutes + "m";
		}

		if (timeLeft == "") {
			timeLeft = seconds + "s";
		}
		else {
			if (seconds < 10)
				seconds = "0" + seconds;
			timeLeft += seconds + "s";
		}

		if (id) {
			//$("#promocountdown" + id).html(text + ' &nbsp;' + timeLeft);
			$('div[id^=promocountdown' + id + ']').each(function () { $(this).html(text + ' &nbsp;' + timeLeft) });
		}
		else
			$("#promocountdown").html(text + ' &nbsp;' + timeLeft);
	}
}

function checkValidCharactersWithUnicodes(e, ttValidUnicodeRange) {
	if (!e) var e = window.event;
	var chrCode = getKeyCode(e)
	var ttValidUniCodes = getValidUniCodes(ttValidUnicodeRange);
	if (ttValidUniCodes.search(',' + chrCode + ',') >= 0)
		return true;
	else
		return false;
}

function validateUnicodeRange(ttText, ttValidUnicodeRange) { // abcd# , 65-90
	var ttValidUniCodes = getValidUniCodes(ttValidUnicodeRange);

	for (i = 0; i < ttText.length; i++) {
		if (ttValidUniCodes.search(',' + ttText.charCodeAt(i) + ',') === -1)
			return false;
	}
	return true;
}

function getValidUniCodes(ttValidUnicodeRange) { //65-90, 125 

	var ttValidCodes = ",";
	var lbGroups = ttValidUnicodeRange.split(',');
	for (var range in lbGroups) {

		var rangeVals = lbGroups[range].split("-");

		if (typeof rangeVals[1] == 'undefined') {
			ttValidCodes += (rangeVals[0] | 0) + ',';
		}
		if ((rangeVals[1] | 0) < (rangeVals[0] | 0)) {
			rangeVals.reverse();
		}
		var f = rangeVals[0] | 0, n = rangeVals[1] | 0;
		while (f <= n) {
			ttValidCodes += f++ + ',';
		}
	}
	return ttValidCodes;
}

function popup(anURL, aName, W, H, features){
	checkPop()
	popbox = window.open(anURL, aName, features + ',width=' + W + ',height=' + H + ',left=' + Math.round((window.screen.width - W) / 2) + ',top=' + Math.round((window.screen.height - H) / 2))
	return false
}

function ProductAutocomplete(elem) {
	var id = 0;
	$(elem).autocomplete({
		source: function (request, response) {
			PageMethods.GetProductAutocomplete(request.term, idCorporateLocal, idCorporateSubsidiary, idCorporate, idPerson, idCorporateGroup, idCostAccount, flRestrictedCatalogueOnly, coLanguage, true,
				function (data) {
					//var test = data[0].idProduct;
					response(
						$.map(data, function (p) {
							return ProductAutocompleteResponse(p);
						})
					);
				},
				function (response) {
					alert(response.responseText);
				});
		},
		change: function (event, ui) {
		},
		select: function (event, ui) {
			setTimeout(
				function () {
					ProductAutocompleteSelect()
				}, 400);
		},
		minLength: 2
	});
}

function closeCCCancel() {
	$(".popup-credit-card").hide();
}

function goToOrder(idOrder) {
	window.location.href = "/sales/slscommerceorderdetail.aspx?idorder=" + idOrder;
}

function isEmailAddress(str) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(str);  
}

function sendNewsletter() {
    var email = $("#nwsMail").val();
    var mscssid = $("#mscssid").val();
    if (isEmailAddress(email)) {
         PageMethods.sendNewsletter(mscssid, email, OnsendNewsletterSuccess, OnsendNewsletterError);
    }
}

function OnsendNewsletterSuccess(result) {
    var NewsLetterStatus;
    if (result && result.indexOf(".aspx") > -1) {
        window.location.href = result;
    }
    else if (result && result.trim().indexOf("NewsletterSubscriptionSuccess") > -1 ) {

        NewsLetterStatus = result.split("|")[1];
        document.getElementById("newsletter").innerHTML = "<span class=\"NewsletterSubscriptionSuccess\"  id=\"NewsletterSubscriptionSuccess\">"+ NewsLetterStatus+"</span>";

    }
    else if (result && result.trim() === "NewsletterSubscriptionFail") {
        alert(result);
    }

}

function OnsendNewsletterError(error) {
    alert(error.get_message());

}

function CancelCaddie(mscssid) {
     PageMethods.CancelCaddie(mscssid, OnCancelCaddieSuccess, OnCancelCaddieError);

     //$("#genericPopupOverlay").css("display", "none");
}

function OnCancelCaddieSuccess(result) {

    window.location.href = "/sales/slsCommerceBasket.aspx";

}
function OnCancelCaddieError(error) {
    alert(error.get_message());
}

function ConfirmCaddie(mscssid) {
 
    PageMethods.ConfirmCaddie(mscssid, OnConfirmCaddieSuccess, OnConfirmCaddieError);
}
function OnConfirmCaddieSuccess(result) {
     
    window.location.href = "/sales/slsCommerceBasket.aspx";

}
function OnConfirmCaddieError(error) {
    alert(error.get_message());
}
