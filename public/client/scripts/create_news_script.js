$(document).ready(function(){

    $('input[type=file]').change(function (e) {
        $('.filename').val(e.target.files[0].name);
        $('.filename').css("display", "inline");
    });

    $('.button_bold').click(function() {
        var x = $('textarea');
        if (x.css("font-weight") !== "700") {
            x.css("font-weight", "bold");
        } else if (x.css("font-weight") == "700") {
            x.css("font-weight", "normal");
        }
    });

    $('.button_underline').click(function() {
        var x = $('textarea');
        var prueba =x.css("text-decoration");
        if (x.css("text-decoration") !== "underline solid rgb(136, 136, 136)") {
            x.css("text-decoration", "underline");
            prueba =x.css("text-decoration");
        } else if (x.css("text-decoration") == "underline solid rgb(136, 136, 136)") {
            x.css("text-decoration", "none");
            prueba =x.css("text-decoration");
        }
    });


    $('.button_cursive').click(function() {
        var x = $('textarea');
        if (x.css("font-style") !== "italic") {
            x.css("font-style", "italic");
        } else if (x.css("font-style") == "italic") {
            x.css("font-style", "normal");
        }
    });

    $('.button_size').change(function() {
        var txt = $('textarea');
        var btn = $('.button_size').val();
        if (btn >= 8 & btn <= 13) {
            txt.css("font-size", "small");
        } else if (btn >= 14 & btn <= 17) {
            txt.css("font-size", "medium");
        } else if (btn >= 18 & btn <= 32){
            txt.css("font-size", "large");
        }
    });
});