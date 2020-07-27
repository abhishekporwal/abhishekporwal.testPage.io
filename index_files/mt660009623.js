if(document.createElement) {
    var protocol = 'http'+((document.location.protocol == 'https:')?'s':'')+'://';
    var effi_660009623_idp = '';
    var effi_660009623_catid = '';
    var effi_660009623_catwording = '';
    var effi_660009623_ref = '';
	var effi_660009623_ref2 = '';
	var effi_660009623_ref3 = '';
	var effi_660009623_ref4 = '';
	var effi_660009623_ref5 = '';
	var effi_660009623_ref6 = '';
	var effi_660009623_ref7 = '';
	var effi_660009623_ref8 = '';
	var effi_660009623_ref9 = '';
	var effi_660009623_ref10 = '';
	var effi_660009623_ref11 = '';
	var effi_660009623_ref12 = '';
	var effi_660009623_ref13 = '';
	var effi_660009623_ref14 = '';
	var effi_660009623_ref15 = '';
	var effi_660009623_ref16 = '';
	var effi_660009623_ref17 = '';
	var effi_660009623_ref18 = '';
	var effi_660009623_ref19 = '';
	var effi_660009623_ref20 = '';
    var effi_660009623_mnt = '';
    var effi_660009623_email = '';
    var effi_660009623_insession = '';
    var effi_660009623_newcustomer = '';
    var effi_660009623_voucher = '';
    var effi_660009623_attrib = '';
    var effi_660009623_currency = '';
    var effi_660009623_payment = '';
    var effi_660009623_prix = '';
    var effi_660009623_storeid = '';
    var effi_660009623_q = '';
    var effi_660009623_quantity = '';
    var effi_660009623_params = new Array();
    var effi_660009623_mastertag = new Object();

    function fn_effi_660009623_parseurl(url) {
	var effi_660009623_result = new Array();
	var effi_660009623_params1 = url.split('&');
	for(var i=0; i<effi_660009623_params1.length; i++) {
	    var t = effi_660009623_params1[i].split('=');
	    effi_660009623_result[t[0]] = t[1];
	}
	return  effi_660009623_result;
    }
    
    var effi_660009623_str_src_js = "effiliation.com";
    var effi_660009623_allScripts = document.getElementsByTagName('script');
    for(var i=0; i<effi_660009623_allScripts.length;i++) {
    	var currentScript = effi_660009623_allScripts.item(i);
    	var reg_src_js = new RegExp(effi_660009623_str_src_js,'g');
    	if(currentScript.src && reg_src_js.test(currentScript.src)) {
            var param = currentScript.src.lastIndexOf('?');
            if(param !== -1){
                effi_660009623_params = fn_effi_660009623_parseurl(currentScript.src.substring(param+1));
            } else {
                if(typeof effiDataLayer !== "undefined"){
                    effi_660009623_params = effiDataLayer;
                } else {
                    console.log('No parameters found for mastertag');
                }
            }            
    	    break;
    	}
    }
    
    if(typeof effi_660009623_params.insession != 'undefined') effi_660009623_insession = effi_660009623_params.insession;
    if(typeof effi_660009623_params.newcustomer != 'undefined') effi_660009623_newcustomer = effi_660009623_params.newcustomer;
    if(typeof effi_660009623_params.attrib != 'undefined') effi_660009623_attrib = effi_660009623_params.attrib;
    if(typeof effi_660009623_params.voucher != 'undefined') effi_660009623_voucher = effi_660009623_params.voucher;
    if(typeof effi_660009623_params.currency != 'undefined') effi_660009623_currency = effi_660009623_params.currency;
    if(typeof effi_660009623_params.payment != 'undefined') effi_660009623_payment = effi_660009623_params.payment;
    if(typeof effi_660009623_params.storeid != 'undefined') effi_660009623_storeid = effi_660009623_params.storeid;
    if(typeof effi_660009623_params.q != 'undefined') effi_660009623_q = effi_660009623_params.q;
    if(typeof effi_660009623_params.idp != 'undefined') effi_660009623_idp = effi_660009623_params.idp.replace(/%2C/g, ',');
    if(typeof effi_660009623_params.idcat != 'undefined') effi_660009623_catid = effi_660009623_params.idcat;
    if(typeof effi_660009623_params.wordingcat != 'undefined') effi_660009623_catwording = effi_660009623_params.wordingcat;
    if(typeof effi_660009623_params.prix != 'undefined') effi_660009623_prix = effi_660009623_params.prix.replace(/%2C/g, ',');
    if(typeof effi_660009623_params.montant != 'undefined') effi_660009623_mnt = effi_660009623_params.montant;
    if(typeof effi_660009623_params.ref != 'undefined') effi_660009623_ref = effi_660009623_params.ref;
	if(typeof effi_660009623_params.ref2 != 'undefined') effi_660009623_ref2 = effi_660009623_params.ref2;
	if(typeof effi_660009623_params.ref3 != 'undefined') effi_660009623_ref3 = effi_660009623_params.ref3;
	if(typeof effi_660009623_params.ref4 != 'undefined') effi_660009623_ref4 = effi_660009623_params.ref4;
	if(typeof effi_660009623_params.ref5 != 'undefined') effi_660009623_ref5 = effi_660009623_params.ref5;
	if(typeof effi_660009623_params.ref6 != 'undefined') effi_660009623_ref6 = effi_660009623_params.ref6;
	if(typeof effi_660009623_params.ref7 != 'undefined') effi_660009623_ref7 = effi_660009623_params.ref7;
	if(typeof effi_660009623_params.ref8 != 'undefined') effi_660009623_ref8 = effi_660009623_params.ref8;
	if(typeof effi_660009623_params.ref9 != 'undefined') effi_660009623_ref9 = effi_660009623_params.ref9;
	if(typeof effi_660009623_params.ref10 != 'undefined') effi_660009623_ref10 = effi_660009623_params.ref10;
	if(typeof effi_660009623_params.ref11 != 'undefined') effi_660009623_ref11 = effi_660009623_params.ref11;
	if(typeof effi_660009623_params.ref12 != 'undefined') effi_660009623_ref12 = effi_660009623_params.ref12;
	if(typeof effi_660009623_params.ref13 != 'undefined') effi_660009623_ref13 = effi_660009623_params.ref13;
	if(typeof effi_660009623_params.ref14 != 'undefined') effi_660009623_ref14 = effi_660009623_params.ref14;
	if(typeof effi_660009623_params.ref15 != 'undefined') effi_660009623_ref15 = effi_660009623_params.ref15;
	if(typeof effi_660009623_params.ref16 != 'undefined') effi_660009623_ref16 = effi_660009623_params.ref16;
	if(typeof effi_660009623_params.ref17 != 'undefined') effi_660009623_ref17 = effi_660009623_params.ref17;
	if(typeof effi_660009623_params.ref18 != 'undefined') effi_660009623_ref18 = effi_660009623_params.ref18;
	if(typeof effi_660009623_params.ref19 != 'undefined') effi_660009623_ref19 = effi_660009623_params.ref19;
	if(typeof effi_660009623_params.ref20 != 'undefined') effi_660009623_ref20 = effi_660009623_params.ref20;
    if(typeof effi_660009623_params.email != 'undefined') effi_660009623_email = effi_660009623_params.email;
    if(typeof effi_660009623_params.quantity != 'undefined') effi_660009623_quantity = effi_660009623_params.quantity.replace(/%2C/g, ',');
    if(typeof effi_660009623_params.ref2 != 'undefined') effi_660009623_ref2 = effi_660009623_params.ref2;

    


    
    
    // TAG SCREEN VIEW RETARGETING
var __cdn3_to = __cdn3_to || [];
__cdn3_to.push({
    a: "315004667",
    type: "product",
    cId: effi_660009623_catid,
    pId: effi_660009623_idp,
    am: effi_660009623_prix
});
(function() {
    try {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = "https://a.cdn3.net/to/e/315004667.js?cb=" + (new Date).getMonth();
        var b = document.getElementsByTagName("script")[0];
        b.parentNode.insertBefore(a, b)
    } catch (c) {
        (new Image).src = "https://a.cdn3.net/to/report?time=" + (new Date).getTime() + "p=" + encodeURIComponent(window.location) + "&r=" + encodeURIComponent(document.referrer) + "&e=" + encodeURIComponent(c)
    }
})();

    
    
    
    
    
    
    



}

