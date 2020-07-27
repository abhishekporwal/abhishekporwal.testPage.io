var result = {};
function RazorPostGetFields() {
	var postData = "";
	//var postCollection = new Array();
	var callbackTextTypes = /^(text|password|hidden|search|tel|url|email|number|range|color|datetime|date|month|week|time|datetime-local)$/i;
	var formElements = theForm.elements,
		count = formElements.length,
		element;
	for (var i = 0; i < count; i++) {
		element = formElements[i];
		var tagName = element.tagName.toLowerCase();
		if (tagName == "input") {
			var type = element.type;
			if ((__callbackTextTypes.test(type) || ((type == "checkbox" || type == "radio") && element.checked))
				&& (!element.id.startsWith("__VIEWSTATE")) && (!element.id.startsWith("__EVENT"))) {
				postData += RazorPostEncode(element.name) + "=" + RazorPostEncode(element.value) + "&";
			}
		}
		else if (tagName == "select") {
			var selectCount = element.options.length;
			for (var j = 0; j < selectCount; j++) {
				var selectChild = element.options[j];
				if (selectChild.selected == true) {
					postData += RazorPostEncode(element.name) + "=" + RazorPostEncode(element.value) + "&";
				}
			}
		}
		else if (tagName == "textarea") {
			postData += RazorPostEncode(element.name) + "=" + RazorPostEncode(element.value) + "&";
		}
	}
	postData = postData.replace('&=&', '&').slice(0, -1);
	var pairs = postData.split('&');
	result = {};
	pairs.forEach(function (pair) {
		pair = pair.split('=');
		result[pair[0]] = decodeURIComponent(pair[1] || '');
	});
	return result;
}
function RazorPostEncode(parameter) {
	if (encodeURIComponent) {
		return encodeURIComponent(parameter);
	}
	else {
		return escape(parameter);
	}
}
function RazorCallBack() {
    $('[onclickserveraction]').not('select').each(function () {
		DoOnEvent('click', $(this));
	});
	$('input[onmouseoverserveraction]').not(':input[type=submit]').each(function () {
		DoOnEvent('mouseover', $(this));
    });
	$('select[onchangeserveraction]').each(function () {
		DoOnEvent('change', $(this));
    });
    $('input[onchangeserveraction]').each(function () {
        DoOnEvent('change', $(this));
    });
}
function DoOnEvent(event, $this)
{
	var handler = $this.prop('on' + event);
    $this.removeAttr('on' + event);    
    $this.on(event, function (e) {
        if ($(this).attr('type') == 'href')
            e.preventDefault();
		var before = $this.attr('dobeforeserveraction');
		if (before != '')
			eval(before);
		$('#serverAction').val($this.attr('id') + '|' + $this.attr('on' + event + 'serveraction'));
		if ($(this).attr('type') != 'submit') {
			$('#serverAction').val('1|' + $('#serverAction').val());
			var posting = $.post('', RazorPostGetFields());
			var after = $this.attr('doafterserveraction');
			posting.done(function (data) {
				$("#PostReturn").html("");
				$("#PostReturn").append(data);
				RazorCallBack();
				if (after != '')
					eval(after);
				if (typeof DoAfterServerAction === "function") {
					DoAfterServerAction();
				}
			});
		}
		else {
			$('#serverAction').val('0|' + $('#serverAction').val());
		}
	});
	$this.on(event, handler);
}
$(function () {
	$('#serverAction').appendTo('form');
	RazorCallBack();

})
