jQuery(function($) {

	$(function(){
		$('#main-slider.carousel').carousel({
			interval: 10000,
			pause: false
		});
	});

	//Ajax contact
	var form = $('.contact-form');
	form.submit(function () {
		$this = $(this);

		$.ajax({
			type: 'POST',
			url: $(this).attr('action'),
			data: $(this).serialize(),
			dataType: 'json',
			encode: true
		}).done(function(data) {
			$this.prev().text(data.message).fadeIn().delay(2500).fadeOut();
		});
		return false;
	});


	// scroll
	$('.navbar-nav.site-home > li.view-mode').click(function(e) {
		e.preventDefault();
		var target = $(this).find('>a').prop('hash');
		//var offset = (target == '#services')? 85 : 0;

		$('html, body').animate({
			scrollTop: $(target).offset().top //- offset
		}, 500);
		window.location.hash = target;
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