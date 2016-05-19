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

	//PrettyPhoto for the gallery
	$("a.preview").prettyPhoto({
		social_tools: false,
		allow_resize: true
	});


});

//For the gallery
$(window).load(function() {
    var Shuffle = window.shuffle;

    var S = function(element) {
        this.element = element;

        this.shuffle = new Shuffle(element, {
            itemSelector: '.gallery-item'
        });

        this.addFilterButtons();
    }

    S.prototype.toArray = function (arrayLike) {
        return Array.prototype.slice.call(arrayLike);
    };

    S.prototype.addFilterButtons = function () {
        var options = document.querySelector('.gallery-filter');

        if (!options) {
            return;
        }

        var filterButtons = this.toArray(
            options.children
        );

        filterButtons.forEach(function (button) {
            button.addEventListener('click', this._handleFilterClick.bind(this), false);
        }, this);
    };

    S.prototype._handleFilterClick = function (evt) {
        var btn = evt.currentTarget;
        var isActive = btn.classList.contains('active');
        var btnGroup = btn.getAttribute('data-group');

        this._removeActiveClassFromChildren(btn.parentNode);

        var filterGroup;
        if (isActive) {
            btn.classList.remove('active');
            filterGroup = Shuffle.ALL_ITEMS;
            this.shuffle.filter(filterGroup);
        } else {
            btn.classList.add('active');
            filterGroup = btnGroup;
        }
        this.shuffle.filter(filterGroup);
    };

    S.prototype._removeActiveClassFromChildren = function (parent) {
        var children = parent.children;
        for (var i = children.length - 1; i >= 0; i--) {
            children[i].classList.remove('active');
        }
    }

    window.demo = new S(document.getElementById('p-gallery'));
});

