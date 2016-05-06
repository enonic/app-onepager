jQuery(function($) {

    // Parallax banner part
    var parallax = document.querySelectorAll(".parallax"),
        speed = 0.5;

    window.onscroll = function(){
        [].slice.call(parallax).forEach(function(el,i){

            var windowYOffset = window.pageYOffset,
                elPos = (windowYOffset * speed) + "px";

            el.style.top = elPos;

        });
    };

    // Enonic carousel for the banner part
    $('.enonicarousel').enoniCarousel({
        slideNav: true,
        animate: true,
        startAnimated: false
    });

	// scroll the menu
	$('.navbar-nav.site-home > li a').click(function(e) {
		e.preventDefault();
		var target = $(this).prop('hash');

		$('html, body').animate({
			scrollTop: $(target).offset().top //- offset
		}, 500, function() {
		    window.location.hash = target;
		});
	});

	//scrollspy
	/*$('[data-spy="scroll"]').each(function () {
		var $spy = $(this).scrollspy('refresh');
	});*/

	//PrettyPhoto for the gallery
	$("a.preview").prettyPhoto({
		social_tools: false
	});

	//Isotope
	$(window).load(function(){
		$gallery = $('.gallery-items');
		$gallery.isotope({
			itemSelector : 'li',
			layoutMode : 'fitRows'
		});
		$gallery_selectors = $('.gallery-filter > li > a');
		$gallery_selectors.on('click', function(){
			$gallery_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$gallery.isotope({ filter: selector }, function() {
			    // resize after the animation
                $('[data-spy="scroll"]').each(function () {
                    var $spy = $(this).scrollspy('refresh');
                });
			});

			return false;
		});
	});
});