var suggesturl = "";

function actb(id, ca, url, idbtn, surl, lbCat, lbManf, lbRange, copartnb, lbWarn, lbQuickAccess) {
    this.actb_suggesturl = url || (ca ? "" : suggesturl);
    this.actb_timeOut = -1;
    this.actb_response = 200;
    this.actb_lim = 20;
    this.actb_firstText = false;
    this.actb_firstMatch = false;
    this.actb_fullRefresh = false;
    this.actb_useIFrame = true;
    this.actb_useScroll = false;
    this.actb_mouse = true;
    this.actb_noDefault = true;
    this.actb_startcheck = 0;
    this.ajax_delimiter = "|";
    this.item_delimiter = ",";

    this.actb_categoryurl = surl != 0 ? surl == 3 ? "/Catalogue/catProductList4.aspx?idcategory=" : "/Catalogue/catProductList2.aspx?idcategory=" : "/Catalogue/catProductList.aspx?idcategory=";
    this.actb_manufurl = surl != 0 ? surl == 3 ? "/Catalogue/catProductList4.aspx?idmanufacturer=" : "/Catalogue/catProductList2.aspx?idmanufacturer=" : "/Catalogue/catProductList.aspx?idmanufacturer=";
    this.actb_rangeurl = surl != 0 ? surl == 3 ? "/Catalogue/catProductList4.aspx?idrange=" : "/Catalogue/catProductList2.aspx?idrange=" : "/Catalogue/catProductList.aspx?idrange=";
    this.actb_searchurl = surl != 0 ? surl == 3 ? "/Catalogue/catProductList4.aspx?txtRecherche=" : "/Catalogue/catProductList2.aspx?txtRecherche=" : "/Catalogue/catProductSearch.aspx?txtRecherche=";
    this.actb_cmcCategoryurl = surl != 0 ? surl == 3 ? "/Catalogue/catProductList4.aspx?idCmcCategory=" : "/Catalogue/catProductList2.aspx?idCmcCategory=" : "/Catalogue/catProductList.aspx?idCmcCategory=";
    this.actb_partnburl = "/Catalogue/catProductForm.aspx?idproduct=";

    this.actb_useProductCount = true;
    this.actb_categorytoken = lbCat;
    this.actb_manuftoken = lbManf;
    this.actb_rangetoken = lbRange;
    this.actb_partnbtoken = copartnb;
    this.actb_producttoken = copartnb;
    this.actb_refinetoken = lbWarn;
    this.actb_quicksearchtoken = actb_quicksearchtoken2 = actb_quicksearchtoken3 = lbQuickAccess;

/*
    this.actb_categorytoken = "Catégories";
    this.actb_manuftoken = "Fabricants";
    this.actb_rangetoken = "Gammes";
    this.actb_refinetoken = "Veuillez préciser votre recherche";
    this.actb_quicksearchtoken = "Recherche rapide";
    this.actb_quicksearchtoken2 = "Recherche";
    this.actb_quicksearchtoken3 = "Tapez votre recherche";
    this.actb_producttoken = copartnb;
*/

    this.actb_arrowSize = "7px";
    this.actb_fSize = "10px";
    this.actb_delimwords = [];
    this.actb_cdelimword = 0;
    this.actb_delimchar = [];
    this.actb_display = false;
    this.actb_pos = 0;
    this.actb_total = 0;
    this.actb_rangeu = 0;
    this.actb_ranged = 0;
    this.actb_bool = [];
    this.actb_pre = 0;
    this.actb_toid = 0;
    this.actb_tomake = false;
    this.cur_x = 0;
    this.cur_y = 0;
    this.cur_w = 0;
    this.cur_h = 0;
    this.actb_mouse_on_list = 0;
    this.actb_caretmove = false;
    this.actb_base_id = id;
    this.actb_curr = document.getElementById(id);
    this.actb_button = document.getElementById(idbtn);
    this.actb_prevterm = this.actb_curr.value;
    this.actb_initterm = this.actb_curr.value;
    this.actb_keywords = [];
    this.actb_values = [];
    this.actb_count = [];
    this.actb_type = [];
    this.actb_keywords_init = [];
    this.actb_values_init = [];
    this.actb_count_init = [];
    this.actb_type_init = [];
    ca = ca || [];
    for (var i = 0, cl = ca.length; i < cl; i++) {
        if (String(typeof (ca[i])).toLowerCase() == "string") {
        	this.actb_keywords[i] = this.actb_keywords_init[i] = ca[i]; this.actb_values[i] = this.actb_values_init[i] = ""; this.actb_count[i] = this.actb_count_init[i] = "";
        	this.actb_type[i] = this.actb_type_init[i] = ""; 
		} else {
            this.actb_keywords[i] = this.actb_keywords_init[i] = ca[i][0]; this.actb_values[i] = this.actb_values_init[i] = ca[i][1]; if (this.actb_useProductCount)
            { this.actb_count[i] = this.actb_count_init[i] = ca[i][2]; }
            else
            { this.actb_count[i] = this.actb_count_init[i] = ""; }
            this.actb_type[i] = this.actb_type_init[i] = ca[i][3];
        }
    }
    if (!this.actb_button)
        return this.construct(); else
        this.actb_button.onClick = this.actb_bclick();
}; actb.prototype = { callLater: function (func, obj)
{ return function () { func.call(obj) }; },

    construct: function () {
        this.actb_curr.actb = this;
        this.funcClick = this.actb_mouseclick;
        this.funcCheck = this.actb_checkkey;
        this.funcHighlight = this.actb_table_highlight;
        this.funcClear = this.callLater(this.actb_clear, this);
        this.funcPress = this.callLater(this.actb_keypress, this);
        this.funcUp = this.callLater(this.actb_goup, this);
        this.funcDown = this.callLater(this.actb_godown, this);
        this.funcFocus = this.callLater(this.actb_table_focus, this);
        this.funcUnfocus = this.callLater(this.actb_table_unfocus, this);
        addEvent(this.actb_curr, "focus", this.callLater(this.actb_setup, this));
        return this;
    },
    actb_setup: function () {
        if (this.actb_curr.value == this.actb_quicksearchtoken || this.actb_curr.value == this.actb_quicksearchtoken2 || this.actb_curr.value == this.actb_quicksearchtoken3 || this.actb_curr.value == this.actb_initterm)
        { this.actb_curr.value = "" }
        addEvent(document, "keydown", this.funcCheck);
        addEvent(this.actb_curr, "blur", this.funcClear);
        addEvent(document, "keypress", this.funcPress);
    },
    actb_clear: function () {
        var msie = (document.all && !window.opera) ? true : false; var event = window.event; if (this.actb_curr.value == "")
        { this.actb_curr.value = this.actb_initterm }
        if (msie && event && this.cur_h) {
            var x = event.clientX, y = event.clientY; y += document.body.scrollTop; x += document.body.scrollLeft; if (((x > this.cur_x) && (x < (this.cur_x + this.cur_w))) && ((y > this.cur_y) && (y < (this.cur_y + this.cur_h))))
            { this.actb_curr.focus(); return; }
        }
        removeEvent(document, "keydown", this.funcCheck);
        removeEvent(this.actb_curr, "blur", this.funcClear);
        removeEvent(document, "keypress", this.funcPress);
        this.actb_removedisp();
    },
    actb_parse: function (n)
    { if (!n || !n.length) return n; var t, plen; t = this.actb_curr.value.addslashes().trimaccent(); plen = this.actb_curr.value.length; if (!plen) return n; var tobuild = []; var c = 0; var re = this.actb_firstText ? new RegExp("^" + t, "i") : new RegExp(t, "i"); var p = n.trimaccent().search(re); tobuild[c++] = n.substr(0, p); tobuild[c++] = "<u><font class='tat_tr_ttKeyword_td_txt'>"; tobuild[c++] = n.substring(p, plen + p); tobuild[c++] = "</font></u>"; tobuild[c++] = n.substring(plen + p, n.length); return tobuild.join(""); }, actb_generate: function () {
        var body = document.getElementById("tat_table_" + this.actb_base_id); if (body) {
            this.actb_display = false; document.body.removeChild(body); var helper = document.getElementById("tat_helper_" + this.actb_base_id); if (helper)
                document.body.removeChild(helper);
        }
        if (this.actb_total == 0)
        { this.actb_display = false; return; }
        var msie = (document.all && !window.opera) ? true : false; var bb = document.createElement("div"); bb.id = "tat_table_" + this.actb_base_id; bb.className = "tat_table_div"; this.cur_y = curTop(this.actb_curr) + this.actb_curr.offsetHeight; bb.style.top = this.cur_y + "px"; this.cur_x = bb.style.left = curLeft(this.actb_curr); bb.style.left = this.cur_x + "px"; this.cur_w = this.actb_curr.offsetWidth - (msie ? 0 : 2); bb.style.width = this.cur_w + "px"; this.cur_h = 1; bb.style.height = "1px"
        var cc = null; if (msie && this.actb_useIFrame)
        { var cc = document.createElement("iframe"); cc.id = "tat_helper_" + this.actb_base_id; cc.src = "javascript:'<html></html>';"; cc.scrolling = "no"; cc.frameBorder = "no"; cc.className = "tat_helper_iframe"; cc.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=0)"; }
        var actb_str = []; var cn = 0; actb_str[cn++] = "<table cellspacing='0px' cellpadding='2px' class='tat_table2' id='tat_table2_" + this.actb_base_id + "'>"; if (this.actb_useScroll && (this.actb_total > this.actb_lim))
        { this.cur_h = this.actb_lim * parseInt(this.actb_fSize); bb.style.height = this.cur_h + "px"; bb.style.overflow = "auto"; bb.style.overflowX = "hidden"; }
        if (cc)
        { document.body.appendChild(cc); cc.style.top = this.cur_y + "px"; cc.style.left = this.cur_x + "px"; cc.style.width = bb.offsetWidth + 2; }
        document.body.appendChild(bb); var counter = 0, first = true, j = 1, type = null, token = null; for (var i = 0; i < this.actb_keywords.length; i++) {
            if (type != this.actb_type[i] && this.actb_type[i] && this.actb_bool[i]) {
                type = this.actb_type[i];
                if (type == "ec")
                { token = this.actb_categorytoken; }
                if (type == "c")
                { token = this.actb_categorytoken; }
                else if (type == "m")
                { token = this.actb_manuftoken; }
                else if (type == "r")
                { token = this.actb_rangetoken; }
                else if (type == "p")
                { token = this.actb_producttoken; }
                actb_str[cn++] = "<tr class='tr_token' id='tr_token'><td colspan='2' class='tr_token_td'>" + token + "</td></tr>";
            }
            if (this.actb_bool[i] && (this.actb_useScroll || (counter < this.actb_lim))) {
                counter++; actb_str[cn++] = "<tr class='"; if ((first && !this.actb_noDefault && !this.actb_tomake) || (this.actb_pre == i))
                { actb_str[cn++] = "tat_tr_ttKeyword_bkg2"; first = false; }
                else
                { actb_str[cn++] = "tat_tr_ttKeyword_bkg"; }
                actb_str[cn++] = "' id='tat_tr_" + this.actb_base_id + String(j) + "'>"; actb_str[cn++] = "<td class='tat_tr_ttKeyword_td'>" + this.actb_parse(this.actb_keywords[i]) + "</td>"; if (this.actb_useProductCount) {
                    if (this.actb_values[i] != "0")
                        actb_str[cn++] = "<td class='tat_tr_ttKeyword_td' id='tat_td_" + this.actb_base_id + String(j) + "' align='right'>(" + this.actb_count[i] + ")</td>"
                    else
                        actb_str[cn++] = "<td class='tat_tr_ttKeyword_td' id='tat_td_" + this.actb_base_id + String(j) + "' align='right'> </td>"
                }
                actb_str[cn++] = "</tr>"; j++;
            }
        }
        actb_str[cn++] = "</table>"; bb.innerHTML = actb_str.join(""); var table = bb.firstChild, row_num = table.rows.length, counter = 0, j = 1, real_height = 0, real_width = 0, type = null; if (this.actb_mouse)
        { table.onmouseout = this.funcUnfocus; table.onmouseover = this.funcFocus; }
        for (i = 0; i < row_num; i++) {
            var row = table.rows[i]; var cell = row.cells[0]; if (row.id == 'tr_token') { real_height += row.offsetHeight; }
            else {
                counter++; cell.actb = this; cell.setAttribute("pos", j); if (counter <= this.actb_lim)
                    real_height += row.offsetHeight; if (real_width < row.offsetWidth)
                    real_width = row.offsetWidth; if (this.actb_mouse)
                { cell.style.cursor = msie ? "hand" : "pointer"; addEvent(cell, "click", this.funcClick); cell.onmouseover = this.funcHighlight; }
                if (this.actb_useProductCount) {
                    var countcell = row.cells[1]; countcell.actb = this; countcell.setAttribute("pos", j); if (this.actb_mouse)
                    { countcell.style.cursor = "pointer"; addEvent(countcell, "click", this.funcClick); countcell.onmouseover = this.funcHighlight }
                }
                j++;
            }
        }
        real_height += (msie ? -10 : 0); this.cur_h = real_height; bb.style.height = real_height + "px"; this.cur_w = (real_width > bb.offsetWidth ? real_width : bb.offsetWidth) + 2; bb.style.width = this.cur_w + "px"; if (cc)
        { this.cur_h = real_height; cc.style.height = bb.style.height = this.cur_h + "px"; cc.style.width = this.cur_w + "px"; }
        this.actb_pos = this.actb_noDefault ? 0 : 1; this.actb_rangeu = 1; this.actb_ranged = j - 1; this.actb_display = true;
    },
    actb_remake: function () {
        var msie = (document.all && !window.opera) ? true : false; var a = document.getElementById("tat_table2_" + this.actb_base_id); if (this.actb_mouse)
        { a.onmouseout = this.funcUnfocus; a.onmouseover = this.funcFocus; }
        var i, k = 0; var first = true; var j = 1; k++; for (var i = 0; i < this.actb_keywords.length; i++) {
            if (this.actb_bool[i]) {
                if (j >= this.actb_rangeu && j <= this.actb_ranged) {
                    var r = a.rows[k++]; r.className = "tat_tr_ttKeyword_bkg"; r.id = "tat_tr_" + this.actb_base_id + String(j); var c = r.firstChild; c.className = "tat_tr_ttKeyword_td"; c.innerHTML = this.actb_parse(this.actb_keywords[i]); c.setAttribute("pos", j); if (this.actb_useProductCount)
                    { var countc = r.childNodes[1]; countc.className = "tat_tr_ttKeyword_td"; countc.innerHTML = this.actb_count[i]; countc.id = "tat_td_" + this.actb_base_id + String(j); countc.setAttribute("pos", j) }
                }
                j++;
            }
            if (j > this.actb_ranged) break;
        }
        if ((document.all && !window.opera)) {
            var helper = document.getElementById("tat_helper_" + this.actb_base_id); if (helper)
                helper.style.width = a.parentNode.offsetWidth + 2;
        }
    },
    actb_goup: function () {
        this.actb_curr.focus(); if (!this.actb_display) return; if (this.actb_pos <= 1) return; var t = document.getElementById("tat_tr_" + this.actb_base_id + String(this.actb_pos)); if (t && t.style)
        { t.className = "tat_tr_ttKeyword_bkg"; t.firstChild.className = "tat_tr_ttKeyword_td"; }
        this.actb_pos--; t = document.getElementById("tat_tr_" + this.actb_base_id + String(this.actb_pos)); if (this.actb_useScroll && t)
        { var base = document.getElementById("tat_table_" + this.actb_base_id); base.scrollTop = t.offsetTop; }
        else {
            if (this.actb_pos < this.actb_rangeu)
            { this.actb_rangeu--; this.actb_ranged--; this.actb_remake(); }
            t = document.getElementById("tat_tr_" + this.actb_base_id + String(this.actb_pos));
        }
        if (t && t.style)
        { t.className = "tat_tr_ttKeyword_bkg2"; t.firstChild.className = "tat_tr_ttKeyword_td"; }
        if (this.actb_toid)
        { clearTimeout(this.actb_toid); this.actb_toid = 0; }
        if (this.actb_timeOut > 0)
            this.actb_toid = setTimeout(function () { this.actb_mouse_on_list = 1; this.actb_removedisp(); }, this.actb_timeOut); this.actb_curr.focus();
    },
    actb_godown: function () {
        this.actb_curr.focus(); if (!this.actb_display) return; if (this.actb_pos == this.actb_total) return; if (this.actb_pos >= 1) {
            var t = document.getElementById("tat_tr_" + this.actb_base_id + String(this.actb_pos)); if (t && t.style)
            { t.className = "tat_tr_ttKeyword_bkg"; t.firstChild.className = "tat_tr_ttKeyword_td"; }
        }
        else this.actb_pos = 0; this.actb_pos++; t = document.getElementById("tat_tr_" + this.actb_base_id + String(this.actb_pos)); if (this.actb_useScroll && t)
        { var base = document.getElementById("tat_table_" + this.actb_base_id); base.scrollTop = t.offsetTop; }
        else {
            if (this.actb_pos > this.actb_ranged)
            { this.actb_rangeu++; this.actb_ranged++; this.actb_remake(); }
            t = document.getElementById("tat_tr_" + this.actb_base_id + String(this.actb_pos));
        }
        if (t && t.style)
        { t.className = "tat_tr_ttKeyword_bkg2"; t.firstChild.className = "tat_tr_ttKeyword_td"; }
        if (this.actb_toid)
        { clearTimeout(this.actb_toid); this.actb_toid = 0; }
        if (this.actb_timeOut > 0)
            this.actb_toid = setTimeout(function () { this.actb_mouse_on_list = 1; this.actb_removedisp(); }, this.actb_timeOut); this.actb_curr.focus();
    },
    actb_mouseclick: function (event) {
        var elem = getTargetElement(event); if (!elem.id) elem = elem.parentNode; var obj = elem.actb; if (!obj)
        { var tag = elem.tagName.toLowerCase(); elem = (tag == "tr") ? elem.firstChild : elem.parentNode; obj = elem.actb; }
        if (!obj || !obj.actb_display) return; obj.actb_mouse_on_list = 0; obj.actb_pos = elem.getAttribute("pos"); obj.actb_penter(null);
    },
    actb_table_focus: function ()
    { this.actb_mouse_on_list = 1; }, actb_table_unfocus: function () {
        this.actb_mouse_on_list = 0; if (this.actb_toid)
        { clearTimeout(this.actb_toid); this.actb_toid = 0; }
        if (this.actb_timeOut > 0)
            this.actb_toid = setTimeout(function () { obj.actb_mouse_on_list = 0; this.actb_removedisp(); }, this.actb_timeOut);
    },
    actb_table_highlight: function (event) {
        var elem = getTargetElement(event); var obj = elem.actb; if (!obj) return; obj.actb_mouse_on_list = 1; var row = document.getElementById("tat_tr_" + obj.actb_base_id + obj.actb_pos); if (row && row.style)
        { row.className = "tat_tr_ttKeyword_bkg"; row.firstChild.className = "tat_tr_ttKeyword_td"; }
        obj.actb_pos = elem.getAttribute("pos"); row = document.getElementById("tat_tr_" + obj.actb_base_id + obj.actb_pos); if (row && row.style)
        { row.className = "tat_tr_ttKeyword_bkg2"; row.firstChild.className = "tat_tr_ttKeyword_td"; }
        if (obj.actb_toid)
        { clearTimeout(obj.actb_toid); obj.actb_toid = 0; }
        if (obj.actb_timeOut > 0)
            obj.actb_toid = setTimeout(function () { obj.actb_mouse_on_list = 0; obj.actb_removedisp(); }, obj.actb_timeOut);
    },
    actb_penter: function (disponly) {
        if (!this.actb_display) return; if (this.actb_pos < 1) return; if (!disponly) { this.actb_display = false; }
        var word = "", c = 0, id = "", link = ""; for (var i = 0; i < this.actb_keywords.length; i++) {
            if (this.actb_bool[i]) c++; if (c == this.actb_pos) {
                word = this.actb_keywords[i]; id = this.actb_values[i]; if (!disponly) {
                    switch (this.actb_type[i]) {
                        case "ec": link = this.actb_cmcCategoryurl + id + '&txtRecherche='; break;
                        case "c": link = this.actb_categoryurl + id + '&txtRecherche='; break;
                        case "m": link = this.actb_manufurl + id + '&txtRecherche='; break;
                        case "r": link = this.actb_rangeurl + id; break;
                        case "p": link = this.actb_partnburl + id + '&txtRecherche='; break; default: break;
                        
                    }
                }
                break;
            }
        }
        if (!disponly)
        { window.location.href = link; }
        this.actb_insertword(word, disponly);
    },
    actb_bclick: function () {
        ot = this.actb_curr.value; if (ot != this.actb_quicksearchtoken && ot != this.actb_quicksearchtoken2 && ot != this.actb_quicksearchtoken3 && ot.trim() != "") {
            t = this.actb_curr.value.addslashes(); ot = ot.trimaccent(); var http = null; if (typeof XMLHttpRequest != "undefined") {
                try
{ http = new XMLHttpRequest(); }
                catch (e) { http = null; }
            }
            else {
                try
{ http = new ActiveXObject("Msxml2.XMLHTTP"); }
                catch (e) {
                    try
{ http = new ActiveXObject("Microsoft.XMLHTTP"); }
                    catch (e) { http = null; }
                }
            }
            if (http) {
                if (http.overrideMimeType)
                    http.overrideMimeType("text/xml"); http.open("GET", this.actb_suggesturl + ot, true); var obj = this; http.onreadystatechange = function (n) {
                        if (http.readyState == 4) {
                            if ((http.status == 200) || (http.status == 0)) {
                                var text = http.responseText; var index1 = text.indexOf("<listdata>"); var index2 = (index1 == -1) ? text.length : text.indexOf("</listdata", index1 + 10); if (index1 == -1)
                                    index1 = 0; else
                                    index1 += 10; var tmpinfo = text.substring(index1, index2); tmpinfo = tmpinfo.substring(1, tmpinfo.length - 1); if (tmpinfo) {
                                    obj.actb_keywords = tmpinfo.split(obj.ajax_delimiter); if (obj.item_delimiter && obj.item_delimiter.length) {
                                        var keyword_number = obj.actb_keywords.length; for (var i = 0; i < keyword_number; i++) {
                                            var ca = obj.actb_keywords[i], comma = ca.indexOf(obj.item_delimiter); if (comma != -1) {
                                                var ci = ca.split(","); obj.actb_keywords[i] = obj.actb_keywords_init[i] = ci[0]; obj.actb_values[i] = obj.actb_values_init[i] = ci[1]; if (obj.actb_useProductCount)
                                                { obj.actb_count[i] = obj.actb_count_init[i] = ci[2]; }
                                                else
                                                { obj.actb_count[i] = obj.actb_count_init[i] = ""; }
                                                obj.actb_type[i] = ci[3];
                                            }
                                            else
                                            { obj.actb_values[i] = obj.actb_values_init[i] = ""; obj.actb_count[i] = obj.actb_count_init[i] = ""; obj.actb_type[i] = obj.actb_type_init[i] = ""; }
                                        }
                                    }
                                    var link = ""; if (obj.actb_keywords.length >= 1 && obj.actb_keywords[0].trimaccent().toLowerCase() == ot.toLowerCase()) {
                                        switch (obj.actb_type[0]) {
                                            case "ec": link = obj.actb_cmcCategoryurl + obj.actb_values[0] + '&txtRecherche='; break;
                                            case "c": link = obj.actb_categoryurl + obj.actb_values[0] + '&txtRecherche='; break;
                                            case "m": link = obj.actb_manufurl + obj.actb_values[0] + '&txtRecherche='; break;
                                            case "r": link = obj.actb_rangeurl + obj.actb_values[0]; break;
                                            case "p": link = obj.actb_partnburl + obj.actb_values[0] + '&txtRecherche='; break; default: break;
                                        }
                                        window.location.href = link;
                                    }
                                    else

                                    { window.location.href = obj.actb_searchurl + ot; }
                                }
                            }
                        }
                    }
                http.send(null);
            }
            return;
        }
        else
        { StopdisplayWait(); window.alert(this.actb_refinetoken); }
    },
    actb_insertword: function (a, disponly) {
        this.actb_curr.value = a; if (!disponly)
        { this.actb_mouse_on_list = 0; this.actb_removedisp(); }
    },
    actb_removedisp: function () {
        if (this.actb_mouse_on_list == 0) {
            this.actb_display = 0; var base = document.getElementById("tat_table_" + this.actb_base_id); if (base) {
                var helper = document.getElementById("tat_helper_" + this.actb_base_id); if (helper)
                    document.body.removeChild(helper); document.body.removeChild(base);
            }
            if (this.actb_toid)
            { clearTimeout(this.actb_toid); this.actb_toid = 0; }
            this.cur_x = 0; this.cur_y = 0; this.cur_w = 0; this.cur_h = 0;
        }
    },
    actb_keypress: function (event)
    { if (this.actb_caretmove) stopEvent(event); return !this.actb_caretmove; }, actb_checkkey: function (event) {
        event = event || window.event; var code = event.keyCode; var obj = getTargetElement(event).actb; obj.actb_caretmove = 0; var term = ""; if (obj.actb_toid)
        { clearTimeout(obj.actb_toid); obj.actb_toid = 0; }
        switch (code) {
            case 38: obj.actb_goup(); obj.actb_caretmove = 1; obj.actb_penter(1); return false; break; case 40: if (!obj.actb_display) {
                    obj.actb_toid = setTimeout(function ()
                    { obj.actb_tocomplete.call(obj, -1); }, 25);
                }
                else
                { obj.actb_godown(); obj.actb_caretmove = 1; }
                obj.actb_penter(1); return false; break; case 33: for (var c = 0; c < obj.actb_lim; c++)
                    obj.actb_goup(); obj.actb_caretmove = 1; break; case 34: for (var c = 0; c < obj.actb_lim; c++)
                    obj.actb_godown(); obj.actb_caretmove = 1; break; case 27: term = obj.actb_curr.value; obj.actb_mouse_on_list = 0; obj.actb_removedisp(); break; case 13: if (obj.actb_display)
                { obj.actb_caretmove = 1; obj.actb_penter(null); obj.actb_removedisp(); }
                return false; break; case 9: if ((obj.actb_display && obj.actb_pos) || obj.actb_toid)
                { obj.actb_caretmove = 1; obj.actb_penter(null); setTimeout(function () { obj.actb_curr.focus(); }, 25); return false; }
                break; default: obj.actb_caretmove = 0; obj.actb_toid = setTimeout(function ()
                { obj.actb_tocomplete.call(obj, code); }, (obj.actb_response < 10 ? 10 : obj.actb_response)); break;
        }
        if (term.length) setTimeout(function () { obj.actb_curr.value = term; }, 25); return true;
    },
    actb_tocomplete: function (kc) {
        if (this.actb_toid)
        { clearTimeout(this.actb_toid); this.actb_toid = 0; }
        else
        { return; }
        if (this.actb_display && (this.actb_prevterm == this.actb_curr.value)) return; this.actb_prevterm = this.actb_curr.value; if (kc == 38 || kc == 40 || kc == 13) return; if (this.actb_display) {
            var word = 0; var c = 0; for (var i = 0; i <= this.actb_keywords.length; i++) {
                if (this.actb_bool[i]) c++; if (c == this.actb_pos)
                { word = i; break; }
            }
            this.actb_pre = word;
        }
        else
        { this.actb_pre = -1; }
        if (!this.actb_curr.value.length && (kc != -1))
        { this.actb_mouse_on_list = 0; this.actb_removedisp(); }
        var ot, t; ot = this.actb_curr.value; t = this.actb_curr.value.addslashes(); ot = ot.trimaccent(); if (ot.length == 0 && (kc != -1))
        { this.actb_mouse_on_list = 0; this.actb_removedisp(); }
        else if ((ot.length == 1) || this.actb_fullRefresh || this.actb_keywords != null || ((ot.length > 1) && !this.actb_keywords.length) || ((ot.length > 1) && (this.actb_keywords[0].substr(0, 1).toLowerCase() != ot.substr(0, 1).toLowerCase()))) {
            if (this.actb_suggesturl.length) {
                var http = null; if (typeof XMLHttpRequest != "undefined") {
                    try
{ http = new XMLHttpRequest(); }
                    catch (e) { http = null; }
                }
                else {
                    try
{ http = new ActiveXObject("Msxml2.XMLHTTP"); }
                    catch (e) {
                        try
{ http = new ActiveXObject("Microsoft.XMLHTTP"); }
                        catch (e) { http = null; }
                    }
                }
                if (http) {
                    if (http.overrideMimeType)
                        http.overrideMimeType("text/xml"); http.open("GET", this.actb_suggesturl + ot, true); var obj = this; http.onreadystatechange = function (n) {
                            if (http.readyState == 4) {
                                if ((http.status == 200) || (http.status == 0)) {
                                    var text = http.responseText; var index1 = text.indexOf("<listdata>"); var index2 = (index1 == -1) ? text.length : text.indexOf("</listdata", index1 + 10); if (index1 == -1)
                                        index1 = 0; else
                                        index1 += 10; var tmpinfo = text.substring(index1, index2); if (tmpinfo) {
                                        obj.actb_keywords = tmpinfo.split(obj.ajax_delimiter); if (obj.item_delimiter && obj.item_delimiter.length) {
                                            var keyword_number = obj.actb_keywords.length; for (var i = 0; i < keyword_number; i++) {
                                                var ca = obj.actb_keywords[i], comma = ca.indexOf(obj.item_delimiter); if (comma != -1) {
                                                    var ci = ca.split(","); obj.actb_keywords[i] = obj.actb_keywords_init[i] = ci[0]; obj.actb_values[i] = obj.actb_values_init[i] = ci[1]; if (obj.actb_useProductCount)
                                                    { obj.actb_count[i] = obj.actb_count_init[i] = ci[2]; }
                                                    else
                                                    { obj.actb_count[i] = obj.actb_count_init[i] = ""; }
                                                    obj.actb_type[i] = ci[3];
                                                }
                                                else
                                                { obj.actb_values[i] = obj.actb_values_init[i] = ""; obj.actb_count[i] = obj.actb_count_init[i] = ""; obj.actb_type[i] = obj.actb_type_init[i] = ""; }
                                            }
                                        }
                                        obj.done.call(obj, ot, t);
                                    }
                                }
                            }
                        }
                    http.send(null);
                }
                return;
            }
            else
            { this.done(ot, t); }
        }
        else
        { this.done(ot, t); }
    },
    done: function (ot, t) {
        if (ot.length < this.actb_startcheck) return; var re = new RegExp(((!this.actb_firstText && !this.actb_firstMatch) ? "" : "^") + t.trimaccent(), "i"); this.actb_total = 0; this.actb_tomake = false; var al = this.actb_keywords.length; for (var i = 0; i < al; i++) {
            this.actb_bool[i] = false; if (re.test(this.actb_keywords[i].trimaccent()) && this.actb_total < this.actb_lim)
            { this.actb_total++; this.actb_bool[i] = true; if (this.actb_pre == i) this.actb_tomake = true; }
        }
        if (!this.actb_curr.value.length) {
            for (i = 0; i < al; i++) {
                this.actb_keywords[i] = this.actb_keywords_init[i]; this.actb_values[i] = this.actb_values_init[i]; if (this.actb_useProductCount)
                { this.actb_count[i] = this.actb_count_init[i] }
                this.actb_bool[i] = true; this.actb_type[i] = this.actb_type_init[i]
            }
        }
        else if (!this.actb_firstText && this.actb_firstMatch) {
            var tmp = [], tmpv = []; for (i = 0; i < al; i++) {
                if (this.actb_bool[i])
                { tmp[tmp.length] = this.actb_keywords[i]; tmpv[tmpv.length] = this.actb_values[i]; }
            }
            re = new RegExp(t, "i"); for (i = 0; i < al; i++) {
                if (re.test(this.actb_keywords[i]) && !this.actb_bool[i])
                { this.actb_total++; this.actb_bool[i] = true; if (this.actb_pre == i) this.actb_tomake = true; tmp[tmp.length] = this.actb_keywords[i]; tmpv[tmpv.length] = this.actb_values[i]; }
            }
            for (i = 0; i < al; i++) {
                if (!this.actb_bool[i])
                { tmp[tmp.length] = this.actb_keywords[i]; tmpv[tmpv.length] = this.actb_values[i]; }
            }
            for (i = 0; i < al; i++)
            { this.actb_keywords[i] = tmp[i]; this.actb_values[i] = tmpv[i]; }
            for (i = 0; i < al; i++)
                this.actb_bool[i] = (i < this.actb_total) ? true : false;
        }
        if (this.actb_timeOut > 0)
            this.actb_toid = setTimeout(function () { this.actb_mouse_on_list = 0; this.actb_removedisp(); }, this.actb_timeOut); this.actb_generate();
    }
}
function addEvent(obj, event_name, func_ref) {
    if (obj.addEventListener && !window.opera)
    { obj.addEventListener(event_name, func_ref, true); }
    else
    { obj["on" + event_name] = func_ref; }
}
function removeEvent(obj, event_name, func_ref) {
    if (obj.removeEventListener && !window.opera)
    { obj.removeEventListener(event_name, func_ref, true); }
    else
    { obj["on" + event_name] = null; }
}
function stopEvent(event) {
    event = event || window.event; if (event) {
        if (event.stopPropagation) event.stopPropagation(); if (event.preventDefault) event.preventDefault(); if (typeof event.cancelBubble != "undefined")
        { event.cancelBubble = true; event.returnValue = false; }
    }
    return false;
}
function getTargetElement(event)
{ event = event || window.event; return event.srcElement || event.target; }
function setCaret(obj, l) {
    obj.focus(); if (obj.setSelectionRange)
    { obj.setSelectionRange(l, l); }
    else if (obj.createTextRange)
    { m = obj.createTextRange(); m.moveStart("character", l); m.collapse(); m.select(); }
}
String.prototype.addslashes = function () { return this.replace(/(["\\\.\|\[\]\^\*\+\?\$\(\)])/g, "\\$1"); }
String.prototype.trim = function () { return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"); }; String.prototype.trimaccent = function () { return this.replace(new RegExp("[ÈÉÊËéèêë]+", "gi"), "e").replace(new RegExp("[ÀÁÂÃÄÅàáâãäå]+", "gi"), "a").replace(new RegExp("[ÒÓÔÕÖØòóöõôø]+", "gi"), "o").replace(new RegExp("[Çç]+", "gi"), "c").replace(new RegExp("[ÌÍÎÏìíîï]+", "gi"), "i").replace(new RegExp("[Ññ]+", "gi"), "n").replace(new RegExp("[ÙÚÛÜùúûü]+", "gi"), "u").replace(new RegExp("[ÝŸýÿ]+", "gi"), "y").replace(new RegExp("[¿]+", "gi"), "?").replace(new RegExp("[ß]+", "gi"), "ss").replace(new RegExp("[Ææ]+", "gi"), "ae").replace(new RegExp("[Œœ]+", "gi"), "oe").replace(new RegExp("[Šš]+", "gi"), "s").replace(new RegExp("[Žž]+", "gi"), "z"); }; function curTop(obj) {
    var toreturn = 0; while (obj)
    { toreturn += obj.offsetTop; obj = obj.offsetParent; }
    return toreturn;
}
function curLeft(obj) {
    var toreturn = 0; while (obj)
    { toreturn += obj.offsetLeft; obj = obj.offsetParent; }
    return toreturn;
}