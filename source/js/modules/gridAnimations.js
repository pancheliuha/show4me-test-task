module.exports = function () {

    var gridItems = $('.product__item'),
        products = $('.products'),
        counter = 0,
        timerGrid,
        duration = 200;

    $(window).scroll(function () {
        var wScroll = $(window).scrollTop();

        if (wScroll > (products.offset().top - products.innerHeight()/2)) {
            if (counter == 0) {
                animateGrid();
            }

        }
    });

    function animateGrid() {

        var currentGridItem = gridItems.eq(counter);

        currentGridItem.addClass('scaleIn');

        counter++;
        if (gridItems.length == counter) {
            return;
        }

        if (typeof timerGrid != 'undefined') {
            clearTimeout(timerGrid);
        }

        timerGrid = setTimeout(animateGrid, duration);
    }




}