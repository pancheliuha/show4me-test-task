(function($) {
    "use strict";

    var slider = require('./modules/slider'),
        signIn = require('./modules/signIn'),
        gridAnim = require('./modules/gridAnimations');


    gridAnim();
    slider();
    signIn();
})(jQuery);