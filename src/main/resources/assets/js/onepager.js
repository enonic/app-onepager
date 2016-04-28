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
        console.log('Parallax');
        console.log(parallax);
    };



	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 10000,
			pause: false
		});
	});

    $('.enonicarousel').enoniCarousel({
        slideNav: true,
        animate: true,
        startAnimated: false
    });

	// scroll menu
	$('.navbar-nav.site-home > li').click(function(e) {
		e.preventDefault();
		var target = $(this).find('>a').prop('hash');
		//var offset = (target == '#services')? 85 : 0;

		$('html, body').animate({
			scrollTop: $(target).offset().top //- offset
		}, 500);
		window.location.hash = target;
	});

    // Make the home link scroll to the top.
	$('.homeLink').click(function(e) {
	    e.preventDefault();
	    $('html, body').animate({
            scrollTop: 0 //- offset
        }, 500);
        window.location.hash = '';
	});


	//scrollspy
	/*$('[data-spy="scroll"]').each(function () {
		var $spy = $(this).scrollspy('refresh');
	});*/



	//PrettyPhoto
	$("a.preview").prettyPhoto({
		social_tools: false
	});

	//Isotope
	$(window).load(function(){
		$portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector : 'li',
			layoutMode : 'fitRows'
		});
		$portfolio_selectors = $('.portfolio-filter >li>a');
		$portfolio_selectors.on('click', function(){
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector }, function() {
			    //Only resize AFTER the animation
                $('[data-spy="scroll"]').each(function () {
                    var $spy = $(this).scrollspy('refresh');
                });
			});



			return false;
		});
	});
});