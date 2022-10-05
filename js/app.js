let usuario;
let contrasena;
let entrada;
const llamada = "¿Qué está pasando?";
const timeline = [];
const opcionesMenu = "(Presiona la tecla ESC para salir)\n\n¿Qué quieres hacer ahora?\n1. Twitear de nuevo\n2. Ingresar con otro usuario\n\nO bien escribe una palabra para buscar:"


/*
Inicio de sesión:
- El nombre de usuario no puede estar vacío o contener espacios.
- La contraseña puede ser cualquiera, pero no estar vacía.
*/

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


/* Constructor de Twits */

function Twit(usuario, cuerpo) {
    this.usuario = usuario;
    this.cuerpo = cuerpo;
    this.fecha = new Date();
}


/* 
Twitear:
- Checkear si el string tiene la cantidad de caracteres permitido.
- Si tiene más de 240 caracteres pide escribir de nuevo sugeriendo el texto ya ingresado.
- Si es válido, agrega el twit al array "timeline", y luego imprime el twit buscándolo como el último elemento del array.
 */

function imprimirTwit () {
    const ultimoTwit = timeline[timeline.length - 1]
    const opciones = { 
        year: "numeric", 
        month: "long", 
        day: "numeric"
    };
    console.log("@" + ultimoTwit.usuario + ": \n" + ultimoTwit.cuerpo + "\nEl " + ultimoTwit.fecha.toLocaleDateString("es-ES", opciones))
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
            timeline.push(new Twit(usuario, entrada));
            imprimirTwit();
        }
    }
}

/* Búsqueda por palabra */

function buscar (opcion){
    const busqueda = timeline.filter((twit)=>{
        return twit["cuerpo"].includes(opcion);
    });
    if (busqueda.length > 0){
        console.log(`Resultados de la búsqueda "${opcion}":`);
    }else{
        console.log(`No hay resultados al buscar "${opcion}".`);
    }
    
    for (const elem of busqueda) {
        console.log("@" + elem.usuario + ": \n" + elem.cuerpo);
    }
}


/* Menú */

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
                buscar(opcion);
                break;
        }
        opcion = prompt(opcionesMenu);
    }
}


/* Llamadas  */

if (login()) {
    twitear();
    menu();
}else{
    alert("No se ha iniciado sesión.");
}