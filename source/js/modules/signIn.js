module.exports = function () {
    var submitSign = $('.signIn__form').find('.submit'),
        emailSign = $('.signIn__form').find('.email'),
        errorBlock = $('.signIn__form').find('.error-block'),
        regEmail = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;



    $('form.signIn__form').submit(function(e) {
       e.preventDefault();

        var emailVal = $('input.email').val();

        if (emailVal != '' && regEmail.test(emailVal)) {
            $('.error-block').removeClass('visible');
            $(this).addClass('valid')
        } else {
            $(this).removeClass('valid')
            $('.error-block').addClass('visible');
        }


        if($(this).hasClass('valid')) {

            $.ajax({
                url: "",
                type: "POST",
                data: $(this).serialize(),

                success: function (response) {
                    console.log('Спасибо');
                },

                error: function (response) {
                    console.log('Ошибка');
                    submitSign.css('visibility', 'hidden');
                    emailSign.css('visibility', 'hidden');
                    $('.success__send').css('visibility', 'visible');
                }
            });

        } else {
            errorBlock.addClass('visible');
        }

    });

//search form
    var searchInput = $('.search__input'),
        searchButton = $('.fa-search');

    searchButton.on('click', function () {
       searchInput.toggleClass('visible');
    });




    //grid loading

}