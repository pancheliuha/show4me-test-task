module.exports = function () {

    /*slider variables*/
    var slider = $('.slider'),
        navPrev = slider.find('.slider__previous'),
        navNext = slider.find('.slider__next'),
        slideWidth = slider.find('.slider__item').outerWidth(),
        duration = 500,
        timerNext,
        timerPrevious;

    var lastVis = slider.find('.last__visible'),
        firstVis = slider.find('.first__visible');
        $(window).resize(function () {
            slideWidth = slider.find('.slider__item').outerWidth();
            if (window.innerWidth < 480) {
                lastVis.removeClass('last__visible');
                firstVis.next().next().addClass('last__visible');
            }
        });

        //slider settings for mobile

        if (window.innerWidth < 480) {
            lastVis.removeClass('last__visible');
            firstVis.next().next().addClass('last__visible');
        }


    navNext.on('click', navigate);
    navPrev.on('click', navigate);

    /*move slides function*/

    function navigate(e) {
        navNext.attr('disabled',true);
        navPrev.attr('disabled',true);

        //clear timers
        if(timerNext) {
            clearTimeout(timerNext);
        }

        if(timerPrevious) {
            clearTimeout(timerPrevious);
        }

        //nav items variables
        var visibleSlides = slider.find('.slider__visible'),
            allSlides = slider.find('.slider__item'),
            firstVisible = slider.find('.first__visible'),
            lastVisible = slider.find('.last__visible');

        var previousRequire = $(firstVisible).prev(),
            nextRequire = $(lastVisible).next();
        checkRequires();

        //move next anim
        if (e.currentTarget.dataset.navigation == 'right') {
            visibleSlides.addClass('moveRight');
            previousRequire.addClass('first__require moveRight');
            $(allSlides.eq(0)).before(allSlides.eq(allSlides.length-1));


            timerNext = setTimeout(function () {
                $(visibleSlides).each(function() {
                    $(this).removeClass('slider__visible');
                });

                $(visibleSlides).each(function() {
                    $(this).prev().addClass('slider__visible');
                });

                firstVisible.removeClass('first__visible');
                lastVisible.removeClass('last__visible');
                previousRequire.addClass('slider__visible first__visible').removeClass('first__require moveRight');

                var prevOfLast = (lastVisible.prev().length)? lastVisible.prev(): allSlides.eq(allSlides.length - 1);
                prevOfLast.addClass('last__visible');

                visibleSlides.removeClass('moveRight');
                navNext.attr('disabled',false);
                navPrev.attr('disabled',false);
            },duration);
        }

        //move previous anim
        if (e.currentTarget.dataset.navigation == 'left') {
            visibleSlides.addClass('moveLeft');
            nextRequire.addClass('last__require moveLeft');
            $(allSlides.eq(allSlides.length-1)).after(allSlides.eq(0));


            timerPrevious = setTimeout(function () {
                $(visibleSlides).each(function() {
                    $(this).removeClass('slider__visible');
                });

                $(visibleSlides).each(function() {
                    $(this).next().addClass('slider__visible');
                });

                lastVisible.removeClass('last__visible');
                firstVisible.removeClass('first__visible');
                nextRequire.addClass('slider__visible last__visible').removeClass('last__require moveLeft');

                var nextOfFirst = (firstVisible.next().length)? firstVisible.next(): allSlides.eq(0);
                nextOfFirst.addClass('first__visible');

                visibleSlides.removeClass('moveLeft');
                navNext.attr('disabled',false);
                navPrev.attr('disabled',false);
            },duration);
        }


        function checkRequires() {
            allSlides = slider.find('.slider__item');

            if (!(nextRequire).length) {
                nextRequire = allSlides.eq(0);
            }

            if (!(previousRequire).length) {
                previousRequire = allSlides.eq(allSlides.length - 1);
            }
        }

    }
}