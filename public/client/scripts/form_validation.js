
/*HTML Attributes that are added:
    -pattern="[A-Za-z&aacute;&eacute;&iacute;&oacute;&uacute;&Aacute;&Eacute;&Iacute;&Oacute;&Uacute;&ntilde;&Ntilde;\s]{1,}" (Auto Validation)
    -required
    -size=60
    -size=90
*/

/*Create news form validation*/
function check_create_news_form() {
    /*Validation of Title input*/
    document.getElementById('input_title').setCustomValidity('');
    if(document.getElementById('input_title').value.length > document.getElementById('input_title').getAttribute("size")) {
        document.getElementById('input_title').setCustomValidity('Error: El máximo de caracteres es 60');
    }

    /*Validation of Subtitle input*/
    document.getElementById('input_subtitle').setCustomValidity('');
    if(document.getElementById('input_subtitle').value.length > document.getElementById('input_subtitle').getAttribute("size")) {
        document.getElementById('input_subtitle').setCustomValidity('Error: El máximo de caracteres es 90');
    }
}


/*Sign Up form validation*/
function check_signup_form() {
    /*Validation of Password and Repeat Password inputs*/
    document.getElementById('input_repeat_password').setCustomValidity('');
    if(document.getElementById('input_password').value != document.getElementById('input_repeat_password').value) {
        document.getElementById('input_repeat_password').setCustomValidity('Error: Las contraseñas deben coincidir');
    }
}


