window.onload = function () {
	
    var deg = 0;
    setInterval(function () {
        $("#splash-bg").css({
            transform: "rotate("+deg+"deg)"
        });
        deg += 0.02;
        if (deg > 360) deg = 0;
    }, 30);

    if (window.scrollY > 0) {
		$("#datafest-nav").addClass("banner-colored");
    } else {
		$("#datafest-nav").removeClass("banner-colored");
    }
	
    $(window).on("scroll", function () {
    	
        if (window.scrollY > 0) {
            $("#datafest-nav").addClass("banner-colored");
        } else {
            $("#datafest-nav").removeClass("banner-colored");
        }
    });

	$(window).on('resize scroll', function() {
		var height = 0.666 * document.scrollingElement.scrollHeight;
		var scroll = window.scrollY;
		
		var percentage = scroll / height;
		
		console.log(percentage);

		$('a[href*="#"]').removeClass("nav-active");
		
		if (percentage >= 0.41 && percentage < 0.85) $("a[href='#about']").addClass("nav-active");
		else if (percentage >= 0.85) $("a[href='#sponsors']").addClass("nav-active");
		
	});


	$('a[href*="#"]')
    // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    isScrolling = true;
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 500, function() {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        }

                    });
                    //$('a[href*="#"]').removeClass("nav-active");
                    //$(event.target).addClass("nav-active");
					
                }
            }

        });
	

};
