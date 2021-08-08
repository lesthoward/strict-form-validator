const registerForm = document.querySelector('.register');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

function showError (input, message) {
    const inputParent = input.parentElement
    inputParent.classList.remove('register__field--success')
    inputParent.classList.add('register__field--error')
    const errorWrapper = inputParent.querySelector('.register__error')
    errorWrapper.innerHTML = message
    
}

function showSucess (input) {
    input.parentElement.classList.remove('register__field--error')
    input.parentElement.classList.add('register__field--success')
}

function getInputField (input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}
function checkRequired (inputArr) {
    let isValid = false
    inputArr.forEach(input => {
        if (input.value == '') {
            showError (input, ` ${getInputField(input)} is required`)
            
        } else {
            showSucess(input)
            isValid = true
        }
    })
    return isValid
}

function checkLength (input, min, max) {
    let isValid = false
    if (input.value.length < min) {
        showError (input, `${getInputField(input)} must be at least ${min} characters`)
        
    } else if (input.value.length > max) {
        showError (input, `${getInputField(input)} must be less than ${max} characters`)
        
    } else {
        showSucess(input)
        isValid = true
    }
    return isValid
}


function checkEmail (input) {
    let isValid = false
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    if (re.test(input.value.trim())) {
       showSucess(input)
       isValid = true
    } else {
        showError (input, `${getInputField(input)} is not a valid email`)
    }
    return isValid
}

function checkPasswordMath (password, password2) {
    isValid = false
    if(password.value !== password2.value) {
        showError (password2, 'Passwords do not match')
    } else {
        showSucess(password2)
       isValid = true
    }
    return isValid
}

// En el momento de enviar toda la info comprobar que sea correcto si es de ese modo continuar con los siguientes pasos... si existierán
registerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    checkRequired ([username, email, password, password2]) &&
    checkLength (username, 6, 12) &&
    checkLength (password, 6, 18) &&
    checkPasswordMath (password, password2) && 
    checkEmail(email) ? alert('Passed') : alert('No valid')

  
})

// También para dar una respuesta UI al usuario si una información es incorrecta.
registerForm.addEventListener('input', debounce((e) => {
    caseSwitcher(e)
}))

// La función es para que exista un delay a la hora de realizar una acción, por ejemplo. En el momento de un usuario realizar múltiples clicks en un botón de comprar, eso mandaría demasiados peticiones al servidor y por lo tanto, hasta más vulnerable para caer el sistema.

// Técnicamente funciona de modo que recibe el parámetro "e" del input y lo reporna para la función que se llama dentro de la "debounce", de este modo se puede hacer uso del e.target que arroja el addEventListener. Luego funciona de la siguiente manera... 

// Defino una variable timeoutId que va registrar si existe algo guardado en esa variable. Por cada vez que el usuario realice una acción (input), si existe el timeoutId lo va a borrar para detener ejecuciones ilimitadas, de otro modo si se deja de presionar va a permitir que la ejecución continue y por lo tanto se envía una petición. EJ: a un servidor para obtener la informacion de registro
function debounce (fn, delay=500) {
    let timeoutId
    return function (...args) {
        if(timeoutId) {
            clearTimeout (timeoutId)
        }

        timeoutId = setTimeout(function() {
            fn(...args)
        }, delay);
    }
}

// Registrar eventos dependiendo de cual input se está escribiendo
const caseSwitcher = (e) => {
    switch (e.target.id) {
        case 'username':
            checkLength (username, 6, 12)
            break
        case 'email':
            checkEmail(email)
            break
        case 'password':
            checkLength (password, 6, 18)
            break
        case 'password2':
            checkPasswordMath (password, password2)
            break
        default:
            break
}}