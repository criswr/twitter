/*
Inicio de sesión:
- El nombre de usuario no puede estar vacío o contener espacios.
- La contraseña puede ser cualquiera, pero no estar vacía.
*/
let usuario;
let contrasena;

function login () {
    for (i=5; i>=0; i--){
        usuario = prompt("Ingresa tu nombre de usuario", "usuario");
        if (usuario.includes(" ")) {
            alert("El nombre de usuario no puede contener espacios.\n(" + i + " intentos restantes)");
        }else if(usuario === "") {
            alert("El nombre de usuario no puede estar vacío.\n(" + i + " intentos restantes)");
        }else{
            for (i=5; i>0; i--){
                contrasena = prompt("Ingresa tu constraseña", "******");
                if (contrasena === "") {
                    alert("Debes ingresar tu contraseña \n(" + i + " intentos restantes)");
                }else{
                    return contrasena;
                }
            }
            return usuario, contrasena;
        }
    }

}


/* 
Twitear:
- Checkear si el string tiene la cantidad de caracteres permitido
- Si tiene más de 240 caracteres pide escribir de nuevo sugeriendo el texto ya ingresado
 */
let entrada;
const llamada = "¿Qué está pasando?";


function imprimirTwit (user, twit) {
    console.log("@" + user + ": \n" + twit);
}

function twitear () {
    let valido = false;
    entrada = prompt(llamada);
    while (valido === false) {
        if (entrada.length > 240) {
            alert("Escribiste demasiados carácteres (" + entrada.length + ", máximo 240)");
            entrada = prompt (llamada, entrada);
        }else{
            valido=true;
            imprimirTwit(usuario, entrada)
        }
    }
}


/* Menú */

const opcionesMenu = "¿Qué quieres hacer ahora?\n1. Twitear de nuevo\n2. Ingresar con otro usuario\n\nPresiona la tecla ESC para salir."

function menu (){
    let opcion = prompt(opcionesMenu);
    while (opcion !== null) {
        switch (opcion) {
            case "1":
                twitear();
                break;
            case "2":
                login();
                break;
            default:
                alert("No elegiste una opción válida");
                break;
        }
        opcion = prompt(opcionesMenu);
    }
}


/* Llamadas  */

if (login()) {
    twitear()
    menu()
}else{
    alert("No se ha iniciado sesión.")
}