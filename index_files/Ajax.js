// Fichier JScript
var addadDiv;
var optSelected = null;
function CheckCompareValid(msg) {
	var inputs = document.getElementsByTagName('input');
	var cpt = 0;

	for (i = 0; i < inputs.length; ++i) {
		if ('checkbox' == inputs[i].type.toLowerCase() && inputs[i].checked == true) {
			cpt++;
		}
	}

	if (cpt > 1 && cpt < 5) {
		return true;
	}
	else {
		window.alert(msg)
		return false;
	}
}
function afterCallBack(div) {
	document.getElementById(div).innerHTML = "<img alt='' src='./images/loading.gif' />";
}
function OnCallBackEnd(Results, context) {

	var _resXml;
	var _isIeExplorer;
	var _isAddToCaddie = false;
	var _errorContent = '';

	if (window.ActiveXObject)   // Version Active
	{
		_resXml = new ActiveXObject("Microsoft.XMLDOM");    // Internet Explorer
		_resXml.loadXML(Results);
		_isIeExplorer = true;
	}
	else if (window.XMLHttpRequest)     // Objet de la fenêtre courant
	{
		_resXml = document.implementation.createDocument("", "", null);
		_resXml = (new DOMParser()).parseFromString(Results, "text/xml");
		_isIeExplorer = false;
	}
	var responses = _resXml.getElementsByTagName("RESPONSE");
	for (var i = 0; i < responses.length; i++) {
		var _divId = _isIeExplorer ? responses[i].getElementsByTagName("ID")[0].text : responses[i].getElementsByTagName("ID")[0].textContent;
		var _resultHtml = _isIeExplorer ? responses[i].getElementsByTagName("HTML")[0].text : responses[i].getElementsByTagName("HTML")[0].textContent;
		try {
			document.getElementById(_divId).innerHTML = _resultHtml;
			enableDivList(_divId);

			// execute javascript code which in contained into resultHtml
			$(_resultHtml).find('script').each(function (i, e) {
				// AT YOUR OWN RISK!!!
				eval($(e).html());
			});
		}
		catch (e) { }
	}

	responses = _resXml.getElementsByTagName("MESSAGE");
	if (responses.length == 1) {
		if (responses[0].getElementsByTagName("ID").length > 0) {
			var _idContent = _isIeExplorer ? responses[0].getElementsByTagName("ID")[0].text : responses[0].getElementsByTagName("ID")[0].textContent;
			_isAddToCaddie = _idContent == 'addtocaddie' ? true : _isAddToCaddie;
		}

		if (responses[0].getElementsByTagName("ERROR_MESSAGE").length > 0) {
			_errorContent = _isIeExplorer ? responses[0].getElementsByTagName("ERROR_MESSAGE")[0].text : responses[0].getElementsByTagName("ERROR_MESSAGE")[0].textContent;
		}

		if (responses[0].getElementsByTagName("HTML").length > 0) {
			var _innerHtml = _isIeExplorer ? responses[0].getElementsByTagName("HTML")[0].text : responses[0].getElementsByTagName("HTML")[0].textContent;
			
			if (_idContent == "resellerfinder") {
				DisplayMessageOver(_innerHtml, true, _isAddToCaddie, _errorContent);
				var ResellerPopupCloseButton = document.getElementById("resellerSearchPopupClose");
				if (ResellerPopupCloseButton && popup)
					ResellerPopupCloseButton.onclick = function () {
						removeDiv('over_msg');
						removeDiv("over_body");
						enableAllSelect(document.body)
					}
				document.getElementById('over_msg').onclick = function () { }
			}
			else
				DisplayMessageOver(_innerHtml, null, _isAddToCaddie, _errorContent);
		}
		else if (responses[0].getElementsByTagName("TEXT").length > 0) {
			var _msg = _isIeExplorer ? responses[0].getElementsByTagName("TEXT")[0].text : responses[0].getElementsByTagName("TEXT")[0].textContent;
			alert(_msg);
			removeDiv('over_body');
			enableAllSelect(document.body);
		}
		else if (responses[0].getElementsByTagName("LINK").length > 0) {
			var _url = _isIeExplorer ? responses[0].getElementsByTagName("LINK")[0].text : responses[0].getElementsByTagName("LINK")[0].textContent;
			if (_url != '') {
				window.location.href = _url;
			}
		}
	}
	__theFormPostData = '';
	WebForm_InitCallback();
	try {
		previewMiniBasket();
	} catch (e) {
	}
	if (typeof integrationFormat === "function")
		integrationFormat();
}

function OnCallBackEndMessage(Results, context) {
	DisplayMessageOver(Results);
}
function DisplayMessageOver(innerHtml, flDisableClick, flAddToCaddie, errMsg) {

	var _isIeExplorer;
	var _ieversion;
	_isIeExplorer = window.ActiveXObject ? true : false;
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
		_ieversion = new Number(RegExp.$1) // capture x.x portion and store as a number
	}

	if (flAddToCaddie && _isIeExplorer && _ieversion < 7) {
		var mscssid = document.getElementById("mscssid") ? document.getElementById("mscssid").value : null,
			ttUrl = location.protocol + "//" + location.host + "/Sales/slsCommerceBasket.aspx",
			Qs = window.location.search;
		if (Qs.indexOf("mscssid") > 0)
			ttUrl += mscssid ? "?mscssid=" + escape(mscssid) : "";
		if (errMsg && errMsg != '')
			ttUrl += ((ttUrl.indexOf("?") > 0 ? "&" : "?") + "msgError=" + errMsg);
		window.location.href = ttUrl;
	}
	else {
		disableBody();
		addDiv('over_msg', 'message');
		document.getElementById('over_msg').innerHTML = innerHtml;
		var flPositionDefinedByCSS = ($('.PositionDefinedByCSS').length > 0);
		if (!flPositionDefinedByCSS || (_isIeExplorer && _ieversion < 9)) {
			document.getElementById('over_msg').style.top = (window.screen.availHeight - document.getElementById('over_msg').offsetHeight) / 2 - 50 + "px";
			document.getElementById('over_msg').style.left = (window.screen.availWidth - document.getElementById('over_msg').offsetWidth) / 2 + "px";
		}

		if (!flDisableClick) {
			if ($('#over_msg .carousel-inner').length > 0) {
				$("#spanClosePopup").click(function () {
					removeDiv('over_msg');
					removeDiv('over_body');
					removeIFrame('under_msg');
                    enableAllSelect(document.body);
                    if (flAddToCaddie) {
                        contentSquarePopupRemoved();
                    }
				});
				if ($('.AddtoBasket_Continue').length > 0) {
					$("#spanAddUpselltoBasketContinue").click(function () {
						removeDiv('over_msg');
						removeDiv('over_body');
						removeIFrame('under_msg');
                        enableAllSelect(document.body);
                        if (flAddToCaddie) {
                            contentSquarePopupRemoved();
                        }
					});
				}
			}
			else {
				$("#over_msg").click(function () {
					removeDiv('over_msg');
					removeDiv('over_body');
					removeIFrame('under_msg');
                    enableAllSelect(document.body);
                    if (flAddToCaddie) {
                        contentSquarePopupRemoved();
                    }
				});
			}
		}
	}
}

function contentSquarePopupRemoved() {
    if (typeof addScriptContentSquarePopupRemoved !== 'undefined' && $.isFunction(addScriptContentSquarePopupRemoved)) {
        addScriptContentSquarePopupRemoved();
    }
}

function detectDoctype() {
	var re = /\s+(X?HTML)\s+([\d\.]+)\s*([^\/]+)*\//gi
	if (typeof document.namespaces != "undefined") {
		if (document.all[0].nodeType == 8)
			re.exec(document.all[0].nodeValue)
		else
			return false
	} else {
		if (document.doctype != null)
			re.exec(document.doctype.publicId)
		else
			return false
	}
	return true
}
function removeIFrameMessage() {
	removeDiv('over_msg');
	removeIFrame('under_msg');
}
function enableBody() {
	enableAllSelect(document.body);
	removeDiv('over_body');
}
function OnError(eror) {
	alert(eror);
	removeDiv("over_body");
	removeDiv(addadDiv);
	alert("Global.Error");
	alert(eror.get_message());
}
function context(id) {
	var me;
	var listselect = document.getElementsByTagName('input')
	for (var a = 0; a < listselect.length; ++a) {
		if (listselect[a].name.indexOf(id) > 0)
			me = listselect[a];
	}
	//return "$" + document.getElementsByName(id)[0].value;
	return "$" + me.value
}
function disableBody() {
	disableAllSelect(document.body);
	if (document.getElementsByName("over_body").length == 0) {
		addDiv("over_body", "disableBody");
		document.getElementsByName("over_body")[0].style.width = document.body.offsetWidth + "px";
		document.getElementsByName("over_body")[0].style.height = document.body.offsetHeight + "px";
		document.getElementsByName("over_body")[0].style.display = (document.getElementsByName('over_body')[0].style.display == 'block') ? 'none' : 'block';
	}    
}
function disableDivList(contentDiv) {
	var ctl = document.getElementsByName(contentDiv)[0];
	if (!ctl)
		ctl = document.getElementById(contentDiv);
	if (ctl) {
		disableAllSelect(ctl);
		addDiv('over_' + contentDiv, 'disableDataList');
		var overDiv = document.getElementsByName('over_' + contentDiv)[0];
		overDiv.style.width = ctl.offsetWidth + "px";
		overDiv.style.height = ctl.offsetHeight + "px";
		overDiv.style.top = getTop(ctl) + "px";
		overDiv.style.left = getLeft(ctl) + "px";
		overDiv.style.display = (overDiv.style.display == 'block') ? 'none' : 'block';
	}
}
function enableDivList(name) {
	removeDiv('over_' + name);
}
function disableAllSelect(elemt) {
	//corrige le bug ie qui empèche une balise select de passer en dessous d'une div
	if (elemt)
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var listselect = elemt.getElementsByTagName('select')
			for (var a = 0; a < listselect.length; ++a)
				listselect[a].disabled = true;
		}
}
function enableAllSelect(elemt) {
	//corrige le bug ie qui empèche une balise select de passer en dessous d'une div
	if (elemt)
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var listselect = elemt.getElementsByTagName('select')
			for (var a = 0; a < listselect.length; ++a)
				listselect[a].disabled = false;
		}
}
//Fonction permettant de connaître la position d'un objet
//par rapport au bord gauche de la page.
//Cet objet peut être à l'intérieur d'un autre objet.
function getLeft(MyObject) {
	if (MyObject.offsetParent)
		return (MyObject.offsetLeft + getLeft(MyObject.offsetParent));
	else
		return (MyObject.offsetLeft);
}
//Fonction permettant de connaître la position d'un objet
//par rapport au bord haut de la page.
//Cet objet peut être à l'intérieur d'un autre objet.
function getTop(MyObject) {
	if (MyObject.offsetParent)
		return (MyObject.offsetTop + getTop(MyObject.offsetParent));
	else
		return (MyObject.offsetTop);
}
function addDiv(name, style) {
	var bloOver;
	if (document.getElementsByName(name).length == 0) {
		bloOver = document.createElement("div");
		bloOver.className = style;
		bloOver.id = name;
		bloOver.name = name;
		bloOver.setAttribute("name", name);
		document.body.insertBefore(bloOver, document.body.firstChild);
		addadDiv = name;
	}
}
function removeDiv(name) {
	if (document.getElementsByName(name).length == 1) {
		document.getElementsByName(name)[0].parentNode.removeChild(document.getElementsByName(name)[0]);
		addadDiv = "";
	}
	document.body.style.cursor = "default";
}
function addIFrameUnder(name, divname) {
	var ifrUnder;
	var divOver;
	if (document.getElementsByName(name).length == 0 && document.getElementsByName(divname).length == 1) {
		ifrUnder = document.createElement('iframe');
		divOver = document.getElementsByName(divname)[0];
		ifrUnder.id = name;
		ifrUnder.name = name;
		ifrUnder.style.width = divOver.offsetWidth;
		ifrUnder.style.height = divOver.offsetHeight;
		ifrUnder.className = 'iframefixed_undermessage';
		ifrUnder.scrolling = 'no';
		document.body.insertBefore(ifrUnder, divOver);
	}
}
function removeIFrame(name) {
	if (document.getElementsByName(name).length == 1) {
		document.getElementsByName(name)[0].parentNode.removeChild(document.getElementsByName(name)[0]);
	}
}
function setProductUpSell(idProductUpSell) {
	if (document.getElementById("idProductUpSell"))
		document.getElementById("idProductUpSell").value = idProductUpSell;
}
function doAfterCallBack(Results, context) {
	var idProductUpSell = document.getElementById("idProductUpSell");
	var flProductPopupUpsellDisplay = document.getElementById("flProductPopupUpsellDisplay");
	if (Results.indexOf("ERROR_MESSAGE") > 0 || Results.indexOf("resellerfinder") > 0 || !idProductUpSell || idProductUpSell && idProductUpSell.value == "" || (flProductPopupUpsellDisplay && flProductPopupUpsellDisplay.value == "True"))
		OnCallBackEnd(Results, context);
	else {
		var mscssid = document.getElementById("mscssid") ? document.getElementById("mscssid").value : null,
			ttUrl = location.protocol + "//" + location.host + "/Catalogue/catProductUpSell.aspx",
			Qs = window.location.search;
		if (Qs.indexOf("mscssid") > 0)
			ttUrl += mscssid ? "?mscssid=" + escape(mscssid) : "";
		ttUrl += (ttUrl.indexOf("?") > 0 ? "&" : "?") + 'idProduct=' + idProductUpSell.value;
		if ($("#qtQuantity" + idProductUpSell.value).length > 0)
			ttUrl += "&qty=" + $("#qtQuantity" + idProductUpSell.value).val();
		var flCentralEnabled = getCookie('flCentralEnabled');
		if (flCentralEnabled != undefined && flCentralEnabled == '1')
			goAccount('', '');
		else
			window.location.href = ttUrl;
	}
}
function getCookie(coockieName) {
	var cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++) {
		var name = cookies[i].split('=')[0].toLowerCase();
		var value = cookies[i].split('=')[1].toLowerCase();
		if (name === coockieName) {
			return value;
		} else if (value === coockieName) {
			return name;
		}
	}
	return "";
};
function openIframeOnPopup(url, autoResize) {

	disableBody();

	var onload = "window.parent.setIframeOnPopupPosition();";

	if (autoResize == true)
		onload += "window.parent.setIframeOnPopupPosition('iframePopup');";

	var iframeHtml = '<iframe id="iframePopup" class="iframePopup" frameborder="0" scrolling="no" onload="' + onload + '" ></iframe>';

	jQuery('body').append('<div id="iframePopupContainer" style="display:none"><div class="iframePopupClose" onclick="javascript:CloseSendRequestPopup()"></div>' + iframeHtml + '</div>');

	var ifrUnder = document.getElementById('iframePopup');
	ifrUnder.setAttribute("src", url);
}

function closeIFramePopup() {

	var ifrUnder = document.getElementById("iframePopupContainer");
	if (ifrUnder) {
		document.body.removeChild(ifrUnder);
	}

	enableBody();

}

function autoIframe(frameId) {
	try {

		frame = document.getElementById(frameId);
		innerDoc = (frame.contentDocument) ? frame.contentDocument : frame.contentWindow.document;

		if (innerDoc == null) {
			// Google Chrome
			frame.height = document.all[frameId].clientHeight + document.all[frameId].offsetHeight + document.all[frameId].offsetTop;
			frame.width = document.all[frameId].clientWidth + document.all[frameId].offsetWidth + document.all[frameId].offsetLeft;
		}
		else {
			objToResize = (frame.style) ? frame.style : frame;

			if (jQuery.browser.mozilla) {
				objToResize.height = innerDoc.documentElement.scrollHeight + 1 + "px";
				objToResize.width = innerDoc.documentElement.scrollWidth + 1 + "px";
			}
			else {

				objToResize.height = innerDoc.body.scrollHeight + 1 + "px";
				objToResize.width = innerDoc.body.scrollWidth + 1 + "px";
			}
		}
	}
	catch (err) {
		alert('Err: ' + err.message);
		window.status = err.message;
	}
}

function setIframeOnPopupPosition() {

	try {

		var iframePopupContainer = document.getElementById('iframePopupContainer');

		if (iframePopupContainer) {
			iframePopupContainer.style.display = '';

			//            var _isIeExplorer;
			//            _isIeExplorer = window.ActiveXObject ? true : false;
			//            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
			//                var ieversion = new Number(RegExp.$1) // capture x.x portion and store as a number
			//            }

			//            if (!_isIeExplorer || (_isIeExplorer && ieversion <= 9)) //// ????????????
			iframePopupContainer.style.top = (window.screen.availHeight - iframePopupContainer.offsetHeight) / 2 - 50 + "px";

			iframePopupContainer.style.left = (window.screen.availWidth - iframePopupContainer.offsetWidth) / 2 + "px";
		}
	}
	catch (err) {
		alert('Err: ' + err.message);
		window.status = err.message;
	}
}

function CloseSendRequestPopup() {
	closeIFramePopup();
}

function ValidateControl(control) {
	try {
		for (i = 0; i < Page_Validators.length; i++) {

			if (Page_Validators[i].controltovalidate == control.id) {
				var focusOnError = Page_Validators[i].focusOnError;
				Page_Validators[i].focusOnError = null;
				ValidatorValidate(Page_Validators[i], null, null);
				Page_Validators[i].focusOnError = focusOnError;
			}
		}
	}
	catch (ex) {
	}
}

function GoToTopOfPage() {
	$('html, body').animate({ scrollTop: 0 }, 'slow');
}


function OnCallBackEndProductForm(Results, context) {
	OnCallBackEnd(Results, context);
	$('html, body').animate({ scrollTop: 0 }, 'slow');
	if ($('.btnNetotiate').length > 0) {
		$('.btnNetotiate').html('');
	}
}

function OnCallBackEndProductUpsell(Results, context) {
	OnCallBackEnd(Results, context);
}

function OnCallBackEndProdList(Results, context) {
	OnCallBackEnd(Results, context);
	$('html, body').animate({ scrollTop: 0 }, 'slow');
}

function onError(error) { alert(error.get_message()); }

var urlNextPage = ''

function goAccount(url, pageUrl) {
	try {
		//window.location.href = "../Customer/cstResellerB2BRedirect.aspx";
		urlNextPage = pageUrl;
		if (url == "") {
			var popup = document.getElementById("resellerSearchPopup");            
			if (popup) {
				disableBody();
				popup.style.display = "block";                
				document.getElementById("txtResellerFinderPostCode").focus();
				document.getElementById("over_body").onclick = function () {
					popup.style.display = "none"
					removeDiv("over_body");
					enableAllSelect(document.body);                    
				}
				var resellerSearchPopupClose = document.getElementById("resellerSearchPopupClose");
				if (resellerSearchPopupClose != null) {
					resellerSearchPopupClose.onclick = function () {
						popup.style.display = "none"
						removeDiv("over_body");
						enableAllSelect(document.body)
					}
				}
				var cmcwebusercustomerresellerfinder = document.getElementById("cmcwebusercustomerresellerfinder");
				if (cmcwebusercustomerresellerfinder != null) 
					cmcwebusercustomerresellerfinder.style.display = "block";
				$('.searchZoneElement2').css({ "display": "block" });
			}
		} else {
			window.location.href = url + pageUrl;
		}
	}
	catch (err) {
		console.log(err.message);
	}
}

function loadGeolocation() {
	goAccount("", "customer/cstlogin.aspx");

}

function goLocalizeReseller(rootPath, errorText) {
	try {
		var url = window.location.href;
		if (url && !url.match(/^http([s]?):\/\/.*/)) {
			// get current position
			var gpslatlng = "";
			if (gpslatlng == "") {
				navigator.geolocation.getCurrentPosition(
					function (position) {
						window.location.href = rootPath + "&gpslatlng=" + position.coords.latitude + "|" + position.coords.longitude;
					}, function (error) {
						showDefaultLocation(error);
					});
			} else {
				window.location.href = rootPath + "&gpslatlng=" + gpslatlng;
			}
		}
		else {
			$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
			if ($.browser.chrome) {
				showDefaultLocation(''); //http - chrome
			}
			else {
				// get current position
				var gpslatlng = "";
				if (gpslatlng == "") {
					navigator.geolocation.getCurrentPosition(
						function (position) {
							window.location.href = rootPath + "&gpslatlng=" + position.coords.latitude + "|" + position.coords.longitude;
						}, function (error) {
							showDefaultLocation(error);
						});
				} else {
					window.location.href = rootPath + "&gpslatlng=" + gpslatlng;
				}
			}
		}
	}
	catch (err) {
		console.log(err.message);
	}
}

function showDefaultLocation(error) {
	try {
		$.get("http://ipinfo.io", function (response) {
			var arr = response.loc.split(',');
			var Latitude = arr[0];
			var Longitude = arr[1];
			//GetLocations(Latitude, Longitude, 0, false, 8, true);
			var objPara = {
				idCorporateLocal: 0,
				idCorporateAttachTo: 0,
				Latitude: Latitude,
				Longitude: Longitude,
				adPostCode: null,
				ttKeyWord: null,
				flDefault: true
			};
			FindResellerAndRedirectSub(objPara, '', '');
		}, "jsonp");
	}
	catch (err) {
		console.log(err.message);
	} 
}

function goFindReseller(rootPath) {
	try {
		var adPostCode = document.getElementById("txtResellerFinderPostCode");
		if (adPostCode)
			window.location.href = rootPath + "&adpostcode=" + adPostCode.value;
		else
			window.location.href = rootPath + "&adpostcode=";
	}
	catch (err) {
		console.log(err.message);
	}
}

function FindResellerAndRedirect(idCorporateLocal, idCorporateAttachTo, flLocalize, resellerUrl, urlNextPage) {
	try {
		if ($("#resellerSearchPopup").length > 0) {
			var reseller;
			var objPara = {
				idCorporateLocal: idCorporateLocal,
				idCorporateAttachTo: idCorporateAttachTo,
				Latitude: 0,
				Longitude: 0,
				adPostCode: null,
				ttKeyWord:null,
				flDefault: true
			};
			if (flLocalize != 1) {
				var adPostCode = $("#txtResellerFinderPostCode").val();
				if (adPostCode.trim() != "") {
					/*				if (adPostCode.length == 2 && !isNaN(adPostCode) && adPostCode < 96) {
										if (adPostCode == '75')
											adPostCode = '75001';
										else
											adPostCode += '000';
									}*/
					//if (adPostCode.length == 5 && !isNaN(adPostCode)) {
					if (adPostCode.length >= 2) {
						objPara.adPostCode = adPostCode;
						objPara.ttKeyWord = adPostCode;
						FindResellerAndRedirectSub(objPara, resellerUrl, urlNextPage);
					}
				}
			}
			else {
				var url = window.location.href;
				if (url && !url.match(/^http([s]?):\/\/.*/)) {
					// get current position
					navigator.geolocation.getCurrentPosition(
						function (position) {
							objPara.Latitude = position.coords.latitude;
							objPara.Longitude = position.coords.longitude;
							FindResellerAndRedirectSub(objPara, resellerUrl, urlNextPage);

						}, function (error) {
							showDefaultLocation(error);
						});
				}
				else {
					$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
					if ($.browser.chrome) {
						showDefaultLocation(''); //http - chrome
					}
					else {
						// get current position
						navigator.geolocation.getCurrentPosition(
							function (position) {
								objPara.Latitude = position.coords.latitude;
								objPara.Longitude = position.coords.longitude;
								FindResellerAndRedirectSub(objPara, resellerUrl, urlNextPage);

							}, function (error) {
								showDefaultLocation(error);
							});
					}

				}
			}
		}
	}
	catch (err) {
		console.log(err.message);
	}
}

function FindResellerAndRedirectSub(LocationParams, resellerUrl, urlNextPage) {
	try {
		if (LocationParams.adPostCode != null || (LocationParams.Latitude != 0 || LocationParams.Longitude != 0)) {
			var reseller = [];
			var ttUrl = location.protocol + "//";
			var Qs = window.location.search;
			if (Qs.indexOf("mscssid") > 0)
				ttUrl += mscssid ? "?mscssid=" + escape(mscssid) : "";
			$.ajax({
				type: "POST",
				url: "/customer/cstCorporateLocation.aspx/GetLocations",
				data: JSON.stringify(LocationParams),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (msg) {
					var ret = JSON.parse(msg.d)
					if (ret.length > 0)
						for (var i = 0; i < ret.length; i++) {
							if (ret[i].flPositionCompliant)
								reseller.push(ret[i]);
						}
					if (reseller.length == 1 && reseller[0].lbDomain != "") {
						ttUrl += reseller[0].lbDomain + resellerUrl;
						if (urlNextPage && urlNextPage != "")
							ttUrl += "?" + urlNextPage;
					}
					else {
						var mscssid = document.getElementById("mscssid") ? document.getElementById("mscssid").value : null;
						ttUrl += location.host + "/customer/cstCorporateLocation.aspx";
						if (LocationParams.adPostCode != null)
							ttUrl += (ttUrl.indexOf("?") > 0 ? "&" : "?") + 'adpostcode=' + LocationParams.adPostCode;
						else
							ttUrl += (ttUrl.indexOf("?") > 0 ? "&" : "?") + 'flLocalize=1&gpslatlng=' + LocationParams.Latitude + '|' + LocationParams.Longitude;
						if (urlNextPage && urlNextPage != "")
							ttUrl += "&" + urlNextPage;
					}
					window.location.href = ttUrl;
				},
				error: function (err) {
					// alert(err.responseText);
				}
			});
		}
	}
	catch (err) {
		console.log(err.message);
	}
}



function NewsletterEmailSend() {
	var mscssid = document.getElementById("mscssid") ? document.getElementById("mscssid").value : null
	var newsLetterEmail = document.getElementById("idTxtNewsletterEmail");
	var DivNewsletterEmailEmptyKO = document.getElementById("idDivNewsletterEmailEmptyKO");
	var DivNewsletterEmailFormatKO = document.getElementById("idDivNewsletterEmailFormatKO");
	var DivNewsletterSuccess = document.getElementById("idDivNewsletterSuccess");
	if (newsLetterEmail)
		PageMethods.NewsletterEmailSend(mscssid, newsLetterEmail.value,
			function (ret) {
				if (ret == "ok") {
					if (newsLetterEmail)
						newsLetterEmail.value = "";
					if (DivNewsletterSuccess)
						DivNewsletterSuccess.style.display = "";
					if (DivNewsletterEmailEmptyKO)
						DivNewsletterEmailEmptyKO.style.display = "none";
					if (DivNewsletterEmailFormatKO)
						DivNewsletterEmailFormatKO.style.display = "none";
				}
				else if (ret == "EmptyEmail") {
					if (DivNewsletterSuccess)
						DivNewsletterSuccess.style.display = "none";
					if (DivNewsletterEmailEmptyKO)
						DivNewsletterEmailEmptyKO.style.display = "";
					if (DivNewsletterEmailFormatKO)
						DivNewsletterEmailFormatKO.style.display = "none";
				}
				else if (ret == "EmailFormatError") {
					if (DivNewsletterSuccess)
						DivNewsletterSuccess.style.display = "none";
					if (DivNewsletterEmailEmptyKO)
						DivNewsletterEmailEmptyKO.style.display = "none";
					if (DivNewsletterEmailFormatKO)
						DivNewsletterEmailFormatKO.style.display = "";
				}
				else {
					DivNewsletterEmailFormatKO.innerHTML = ret;
					if (DivNewsletterSuccess)
						DivNewsletterSuccess.style.display = "none";
					if (DivNewsletterEmailEmptyKO)
						DivNewsletterEmailEmptyKO.style.display = "none";
					if (DivNewsletterEmailFormatKO)
						DivNewsletterEmailFormatKO.style.display = "";
				}
			},
			function (error) {
				DivNewsletterEmailFormatKO.innerHTML = error;
				if (DivNewsletterSuccess)
					DivNewsletterSuccess.style.display = "none";
				if (DivNewsletterEmailEmptyKO)
					DivNewsletterEmailEmptyKO.style.display = "none";
				if (DivNewsletterEmailFormatKO)
					DivNewsletterEmailFormatKO.style.display = "";
			}
			);
}

function NewsletterRedirect() {
	var newsLetterEmail = document.getElementById("idTxtNewsletterEmail");
	var DivNewsletterEmailEmptyKO = document.getElementById("idDivNewsletterEmailEmptyKO");
	var DivNewsletterEmailFormatKO = document.getElementById("idDivNewsletterEmailFormatKO");
	var DivNewsletterSuccess = document.getElementById("idDivNewsletterSuccess");
	var reg = new RegExp(/<%=Icom.Global.IcomConstants.VALIDDICT.EmailPat%>/);
	if (newsLetterEmail) {
		if (newsLetterEmail.value == "") {
			if (DivNewsletterSuccess)
				DivNewsletterSuccess.style.display = "none";
			if (DivNewsletterEmailEmptyKO)
				DivNewsletterEmailEmptyKO.style.display = "";
			if (DivNewsletterEmailFormatKO)
				DivNewsletterEmailFormatKO.style.display = "none";
		}
		else if (reg.exec(trim(newsLetterEmail.value)) != null) {
			if (DivNewsletterSuccess)
				DivNewsletterSuccess.style.display = "none";
			if (DivNewsletterEmailEmptyKO)
				DivNewsletterEmailEmptyKO.style.display = "none";
			if (DivNewsletterEmailFormatKO)
				DivNewsletterEmailFormatKO.style.display = "";
		}
		else {
			var mscssid = document.getElementById("mscssid") ? document.getElementById("mscssid").value : null,
			ttUrl = location.protocol + "//" + location.host + "/Customer/cstAccountNewsLetter.aspx",
			Qs = window.location.search;
			if (Qs.indexOf("mscssid") > 0)
				ttUrl += mscssid ? "?mscssid=" + escape(mscssid) : "";
			ttUrl += (ttUrl.indexOf("?") > 0 ? "&" : "?") + 'newsLetterEmail=' + newsLetterEmail.value;
			window.location.href = ttUrl;
		}
	}
	else {
		var mscssid = document.getElementById("mscssid") ? document.getElementById("mscssid").value : null,
			ttUrl = location.protocol + "//" + location.host + "/Customer/cstAccountNewsLetter.aspx",
			Qs = window.location.search;
		if (Qs.indexOf("mscssid") > 0)
			ttUrl += mscssid ? "?mscssid=" + escape(mscssid) : "";
		window.location.href = ttUrl;
	}
}

function readMoreLessToggle(showChar, ellipsestext, moretext, lesstext) {
	//var showChar = 200;  // How many characters are shown by default
	//var ellipsestext = "...";
	//var moretext = "Lire la suite >";
	//var lesstext = "Masquer";

	$('.more').each(function () {
		var content = $(this).html();

		if (content.length > showChar) {

			var c = content.substr(0, showChar);
			var h = content.substr(showChar, content.length - showChar);

			var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

			$(this).html(html);
		}

	});

	$(".morelink").click(function () {
		if ($(this).hasClass("less")) {
			$(this).removeClass("less");
			$(this).html(moretext);
		} else {
			$(this).addClass("less");
			$(this).html(lesstext);
		}
		$(this).parent().prev().toggle();
		$(this).prev().toggle();
		return false;
	});
}

$(document).ready(function () {
	if ($.browser != undefined && $.browser.msie && $.browser.version <= 9) {
		$("[placeholder]").each(function () {
			var ctl = $(this);
			var pht = ctl.attr("placeholder");
			if (pht != "") {
				if (ctl.val() == "")
					ctl.val(pht).toggleClass("dummyPlaceholder");
				ctl.focusout(function () {
					if (ctl.val() == "") {
						ctl.val(pht).toggleClass("dummyPlaceholder");
					}
				}).focusin(function () {
					if (ctl.val() == pht)
						ctl.val("").toggleClass("dummyPlaceholder");
				});
			}
		});
		$(document).submit(function () {
			$("[placeholder]").each(function () {
				var ctl = $(this);
				var pht = ctl.attr("placeholder");
				if (pht != "") {
					if (ctl.val() == pht)
						ctl.val("").toggleClass("dummyPlaceholder");
				}
			});
		});
	}
	linkEnterPressKeyToClick();
});

function linkEnterPressKeyToClick() {
	$("[EnterKeyPressLinkedId]").each(function () {
		var ctl = $(this);
		if (ctl.attr("EnterKeyPressLinkedId") != "")
			ctl.keypress(function (e) {
				var keynum;
				if (window.event)
					keynum = e.keyCode;
				else if (e.which)
					keynum = e.which;

				if (keynum == 13) {
					var LinkedCtl = $("#" + $(this).attr("EnterKeyPressLinkedId"));
					if (LinkedCtl.length == 1 && LinkedCtl.attr("click") != "")
						LinkedCtl.click();
				}
			});
	});
}

function getCookieValue(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

function createCookie(name, value, days) {
	var expires;
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	else {
		expires = "";
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

function Logout() {
	PageMethods.Logout($("#mscssid").val(), function (result) {
		window.location = result;
	},
		function (error) {
			alert(error.get_message());
		});
}

function AddToQuotation(mscssid, idProduct, quantity) {
	disableBody();
	PageMethods.AddToQuotation(mscssid, idProduct, quantity,
		function (result) {
			var tab = result.split('|');
			$('#over_body').html(tab[0]);
			$('#wpQuotationAmount').html(tab[1]);
			$('#wpQuotationCount').html(tab[2]);
		},
		function (error) {
			alert(error.get_message());
			enableBody();
		});
}
function RemoveQuotationPopup()
{
	$('#AddedToQuotation').remove();
	enableBody();
}

