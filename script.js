const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Mensaje de Error en el input
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small');
    small.innerText = message;
}
// Messaje de Validado
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control succes';
}

// Validador de Email
function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email no es valido')
    }
}

// Validador de campos vacios
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} es requerido`)
        } else {
            showSuccess(input);
        }
    });
} 
// Validador de campos minimos y maximos
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, 
            `${getFieldName(input)} tiene que tener al menos ${min} caracteres`
        );
    } else if(input.value.length > max) {
        showError(
            input, `${getFieldName(input)} tiene que tener menos de ${max} caracteres`
        );
    } else {
        showSuccess(input);
    }
}

// Capitalizando la primera letra
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validando contrasenas coincidan

function checkPasswordMatch(input, input2) {
    if(input.value !== input2.value) {
        showError(input2, 'Contrasena no coincide');
    }
}

// Agregando los eventos 
form.addEventListener('submit', function (e) {
    e.preventDefault();

   checkRequired([username, email, password, password2]);
   checkLength(username, 3, 15);
   checkLength(password, 6, 25);
   checkEmail(email);
   checkPasswordMatch(password, password2);
}); 