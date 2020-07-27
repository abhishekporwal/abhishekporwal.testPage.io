function drilldownmenu2(setting) {
	this.sublevelarrow = { src: '/ImagesPortal/images/Webparts/icon_arrow_grey_left.png', width: '8px', top: '3px', left: '6px' } //full URL to image used to indicate there's a sub level
	this.sublevelarrowdown = { src: '/ImagesPortal/images/Webparts/icon_arrow_grey_down.png', width: '8px', top: '3px', left: '6px' } //full URL to image used to indicate there's a sub level
	this.loadingimage = 'loader.gif' //full URL to 'loading' image, if menu is loaded via Ajax
	this.homecrumbtext = setting.title //Top level crumb text
	this.titlelength = 35 //length of parent LI text to extract from to use as crumb titles
	this.menuid = setting.menuid
	this.$uls = null
	this.navdivs = {}
	this.menuheight = setting.menuheight || 'auto'
	this.selectedul = setting.selectedul || null
	this.speed = setting.speed || 1000
	this.persist = setting.persist || { enable: false, overrideselectedurl: false }
	this.currentul = 0
	this.filesetting = setting.filesetting || { url: null, targetElement: null }
	var thisdrill = this
	jQuery(document).ready(function ($) {
		if (thisdrill.filesetting.url && thisdrill.filesetting.url.length > 0) { //menu defined inside external file (use Ajax)?
			var $dest = (typeof thisdrill.filesetting.targetElement == "string") ? $('#' + thisdrill.filesetting.targetElement) : null
			if (!$dest || $dest.length != 1) { //if target element isn't defined or multiple targets found
				alert("Error: The target element \"" + thisdrill.filesetting.targetElement + "\" to add the menu into doesn't exist or is incorrectly specified.")
				return
			}
			$dest.html('<img src="' + thisdrill.loadingimage + '" style="vertical-align:middle" /> <b>Loading Drill Down Menu...</b>')
			$.ajax({
				url: thisdrill.filesetting.url,
				error: function (ajaxrequest) {
					alert('Error fetching Ajax content.\nServer Response: ' + ajaxrequest.responseText)
				}, //end error
				success: function (content) {
					$dest.html(content)
					thisdrill.init($, setting)
				} //end success
			}) //end ajax
		}
		else { //if inline menu
			thisdrill.init($, setting)
		}
	}) //end document.ready
}

drilldownmenu2.prototype.init = function ($, setting) {
	var thisdrill = this
	var $maindiv = $('#' + setting.menuid).css({ position: 'relative' }) //relative position main DIV
	var $uls = $maindiv.find('ul')
	$uls.hide();
	this.$maindiv = $maindiv
	this.$uls = $uls
	this.navdivs.$crumb = $('#' + setting.breadcrumbid)
	this.navdivs.$crumb.append(this.homecrumbtext)

	this.buildmenu($)
	$(window).bind('unload', function () {
		thisdrill.uninit()
	})
	setting = null
}

drilldownmenu2.prototype.buildmenu = function ($) {
	var thisdrill = this
	this.$uls.each(function (i) { //loop through each UL
	    var $thisul = $(this)
	    if (i == 0) { //if topmost UL
			$thisul.show();
	    }
		else { //if this isn't the topmost UL
			var $parentul = $thisul.parents('ul:eq(0)')
			var $parentli = $thisul.parents('li:eq(0)')
			var $anchorlink = $parentli.children('a:eq(0)').css({ outline: 'none' }).data('control', { order: i }) //remove outline from anchor links
			var $arrowimg = $('<img class="arrowclass" />').attr('src', thisdrill.sublevelarrow.src).css({ position: 'absolute', borderWidth: 0, paddingTop: thisdrill.sublevelarrow.top, left: $parentli.width() - parseInt(thisdrill.sublevelarrow.width) - parseInt(thisdrill.sublevelarrow.left) }).prependTo($anchorlink)
			var $arrowimgdown = $('<img class="arrowdownclass" />').attr('src', thisdrill.sublevelarrowdown.src).css({ display : 'none', position: 'absolute', borderWidth: 0, paddingTop: thisdrill.sublevelarrow.top, left: $parentli.width() - parseInt(thisdrill.sublevelarrow.width) - parseInt(thisdrill.sublevelarrow.left) }).prependTo($anchorlink)            
			$anchorlink.click(function (e) { //assign click behavior to anchor link
				thisdrill.slidemenu(jQuery(this).data('control').order)
				e.preventDefault()
			})
	    }
		$thisul.data('specs', { order: i, parentorder: (i == 0) ? -1 : $anchorlink.parents('ul:eq(0)').data('specs').order, title: (i == 0) ? thisdrill.homecrumbtext : $parentli.find('a:eq(0)').text().substring(0, thisdrill.titlelength) })
	}) //end UL loop
	var $selectUL = document.getElementById(this.selectedul)
	var selectedulcheck = this.selectedul && $selectUL //check if "selectedul" defined, plus if actual element exists
	if (this.persist.enable && (this.persist.overrideselectedul || !this.persist.overrideselectedul && !selectedulcheck) && drilldownmenu.routines.getCookie(this.menuid)) { //go to last persisted UL?
		var ulorder = parseInt(drilldownmenu2.routines.getCookie(this.menuid))
		this.slidemenu(ulorder, true)
	}
	else 
	if (selectedulcheck) { //if "selectedul" setting defined, slide to that UL by default
		var ulorder = $('#' + this.selectedul).data('specs').order
		this.slidemenu(ulorder, true)
	}
}

drilldownmenu2.prototype.slidemenu = function (order, disableanimate) {
	var order = isNaN(order) ? 0 : order
	var $targetul = this.$uls.eq(order)
	var $othersul = this.$uls.eq(0).find('ul')
	var flTargetUlVisible = ($targetul.css('display') == 'none')
	var $parentli = $targetul.parents('li:eq(0)')
	var $imgArrow = $parentli.find('img.arrowclass').eq(0)
	var $imgArrowDown = $parentli.find('img.arrowdownclass').eq(0)

	this.currentul = order
	this.$uls.find('img.arrowclass').css({ display: 'block' })
	this.$uls.find('img.arrowdownclass').css({ display: 'none' })

	if (flTargetUlVisible)
	{
		$othersul.filterIfVisible = function (val){
		return this.filter(
			function() { return $(this).css('display') != val; }
			);
		}
		$othersul.filterIfVisible('none').hide(this.speed);

		$targetul.show(this.speed);
		$targetul.parents().show(this.speed);
		$targetul.children('li').css({ background: '#ddd none repeat scroll 0 0' })
		$imgArrow.css({ display: 'none' })
		$imgArrowDown.css({ display: 'block' })
	}
	else
	{
		$targetul.hide(this.speed);
		$imgArrow.css({ display: 'block' })
		$imgArrowDown.css({ display: 'none' })
	}
}


drilldownmenu2.prototype.uninit = function () {
	if (this.persist.enable)
		drilldownmenu2.routines.setCookie(this.menuid, this.currentul)
}

drilldownmenu2.routines = {

	getCookie: function (Name) {
		var re = new RegExp(Name + "=[^;]*", "i"); //construct RE to search for target name/value pair
		if (document.cookie.match(re)) //if cookie found
			return document.cookie.match(re)[0].split("=")[1] //return its value
		return null
	},

	setCookie: function (name, value) {
		document.cookie = name + "=" + value + "; path=/"
	}

}