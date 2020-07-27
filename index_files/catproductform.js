
$(function () {
/*$(document).ready(function () {*/
	$('#slider-thumbs a[href^="#"], #popup-slider-thumbs a[href^="#"]').on('click', function (event) {
		var target = $(this.getAttribute('href'));
		if (target.length) {
			event.preventDefault();
			$('#hide-bullets, #popup-hide-bullets').stop().animate({
				scrollTop: target.offset().top
			}, 1000);
		}
	});

	if ($('.shortdescription > p').height() < 130) {
		$('.shortdescription > .more-btn, .shortdescription > input').hide();
	}

	$('.topArrow > a').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});

	$('#myCarousel, #popup-myCarousel').carousel({
		interval: 5000
	});
	//Handles the carousel thumbnails          
	$('[id^=carousel-selector-],[id^=popup-carousel-selector-]').click(function () {
		var id_selector = $(this).attr("id");
		try {
			var id = /-(\d+)$/.exec(id_selector)[1];
			console.log(id_selector, id);
			jQuery('#myCarousel, #popup-myCarousel').carousel(parseInt(id));
		} catch (e) {
			console.log('Regex failed!', e);
		}
	});            // When the carousel slides, auto update the text          
	$('#myCarousel, #popup-myCarousel').on('slid.bs.carousel', function (e) {
		var id = $('.item.active').data('slide-number');
		$('#carousel-text, #popup-carousel-text').html($('#slide-content-' + id).html());
	});

	$('.carousel').find('.item').first().addClass('active');
	$('.popup-carousel').find('.popup-item').first().addClass('active');

	$('.cat-product-form-menu li:first-child').addClass('active');
	$('.tab-content .tab-pane:first-child').addClass('active');

	$('#btnSimilarProduct').click(function () {
		$(this).toggleClass('PushProductBTN_Limited');
		$('#idSimilarProduct_list').toggleClass('listMaxHeight');
    });


    // Get the modal
    var modal = document.getElementById('popup-myCarousel');

    if (modal != null) {

        // Get the button that opens the modal
        var btn = document.getElementById("EnlargeModalWindow");

        // Get the <span> element that closes the modal
        var spanClose = document.getElementsByClassName("closeModal")[0];

        // When the user clicks on the button, open the modal 
        if (typeof (btn) != 'undefined' && btn != null) {
            btn.onclick = function () {
                if (typeof (modal) != 'undefined' && modal != null) {
                    modal.style.display = "block";
                }
            }
        }

        // When the user clicks on <span> (x), close the modal
        if (typeof (spanClose) != 'undefined' && spanClose != null) {
            spanClose.onclick = function () {
                if (typeof (modal) != 'undefined' && modal != null) {
                    modal.style.display = "none";
                }
            }
        }
       
    }

});
