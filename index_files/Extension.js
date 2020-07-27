Array.prototype.remove = function (x) {
	var i;
	for (i in this) {
		if (this[i].toString() == x.toString()) {
			this.splice(i, 1);
			return i;
		}
	}
}
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (obj, start) {
		for (var i = (start || 0), j = this.length; i < j; i++) {
			if (this[i] === obj) { return i; }
		}
		return -1;
	}
}
$.fn.extend({
	val2: function (value) {
		var isRadioContainer = false;
		if ($(this).attr('isRadioContainer') == 'true')
			isRadioContainer = true;
		if (value) {
			if (isRadioContainer == true)
				$('input[type="radio"][value="' + value + '"]', this).attr('checked', true);
			else
				this.val(value);
		}
		else {
			if (isRadioContainer == true)
				return $('input[type="radio"]:checked', this).val();
			else
				return this.val();
		}
	}
});