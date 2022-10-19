const loginSiguiente = document.querySelector("#botonSiguiente"),
loginIniciar = document.querySelector("#botonIniciar"),
loginUsuario = document.querySelector("#loginUsuario"),
loginRegistrarse = document.querySelector("#loginRegistrarse"),
botonRegistrarse = document.querySelector("#botonRegistrarse"),
botonRegistrar = document.querySelector("#botonRegistrar"),
botonVolver = document.querySelector("#botonVolver"),
botonYaTengo = document.querySelector("#botonYaTengo"),
inputUsuarioRegistro = document.querySelector("#usuarioRegistro"),
inputPasswordRegistro = document.querySelector("#passwordRegistro"),
inputUsuarioInicio = document.querySelector("#usuarioInicio"),
inputPasswordInicio = document.querySelector("#passwordInicio"),
inputs = document.querySelectorAll("input"),
advertencia = document.querySelector("#advertencia"),
twitter = document.querySelector("#cajaTwitter"),
login = document.querySelector("#cajaLogin"),
inputTwit = document.querySelector("#inputTwit"),
botonTwit = document.querySelector("#botonTwit"),
timelineTwits = document.querySelector("#timelineTwits"),
inputBusqueda = document.querySelector("#inputBusqueda"),
cerrarSesion = document.querySelector("#cerrarSesion")


let usuarios = [],
timeline = [
    {
        "usuario": "elonmusk",
        "cuerpo": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum facilis, provident optio, accusantium alias tempore, laudantium aliquid unde similique quos! Nam quis totam explicabo impedit?",
        "fecha": "16 de octubre de 2022, 09:56:06"
    },

    {
        "usuario": "gabrielboric",
        "cuerpo": "Lorem ipsum dolor, quisquam optio maiores pariatur, iste praesentium totam assumenda  suscipit tenetur unde odio accusantium iusto deleniti!",
        "fecha": "15 de octubre de 2022, 01:56:06"
    },
    
    {
        "usuario": "betocuevas",
        "cuerpo": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et nemo delectus, molestiae consectetur atque eligendi iure impedit, necessitatibus quod voluptatum quibusdam.",
        "fecha": "14 de octubre de 2022, 14:56:06"
    },
    
    {
        "usuario": "alexissanchez",
        "cuerpo": "Lorem ipsum dolor. Eligendi temporibus minima eos, rerum unde magnam ipsum nesciunt officiis!",
        "fecha": "11 de octubre de 2022, 15:56:06"
    },   
]



// Login y registro
const mostrarIniciar = () => {
    const loginPassword = document.querySelector("#loginPassword")
    loginUsuario.classList.toggle("invisible");
    loginPassword.classList.toggle("invisible");
}

const mostrarRegistrarse = () => {
    loginUsuario.classList.toggle("invisible");
    loginRegistrarse.classList.toggle("invisible");
}

botonVolver.addEventListener("click", mostrarIniciar)
botonYaTengo.addEventListener("click", mostrarRegistrarse);
botonRegistrarse.addEventListener("click", mostrarRegistrarse);


// Si es la primera visita del usuario, muestra primero la vista de registro. Por defecto es la vista de inicio de sesión.
localStorage.length === 0 && mostrarRegistrarse();

//Prevent default de Enter en los inputs
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    })
}

// Validación visual de registro
let validRegistroUsuario = false;
inputUsuarioRegistro.addEventListener("input", () => {
    if (inputUsuarioRegistro.value === "" || inputUsuarioRegistro.value.includes(" ")) {
        inputUsuarioRegistro.classList.add("erroneo");
        validRegistroUsuario = false;
    }else{
        inputUsuarioRegistro.classList.remove("erroneo");
        validRegistroUsuario = true;
    }
})

let validRegistroPassword = false;
inputPasswordRegistro.addEventListener("input", () => {
    if (inputPasswordRegistro.value === "") {
        inputPasswordRegistro.classList.add("erroneo");
        validRegistroPassword = false;
    }else{
        inputPasswordRegistro.classList.remove("erroneo");
        validRegistroPassword = true;
    }
})

loginRegistrarse.addEventListener("input", () => { 
    if (validRegistroUsuario && validRegistroPassword){
        botonRegistrar.classList.remove("deshabilitado");
    }else{
        botonRegistrar.classList.add("deshabilitado");
    }
})

// Registro
const recuperarUsuarios = () => {
    const usuariosStored = JSON.parse(localStorage.getItem("usuarios"));
    if (usuariosStored) {
        usuarios = usuariosStored
    }
}
recuperarUsuarios()

const advertir = (texto, color) => {
    advertencia.classList.remove("invisible");
    advertencia.innerText = texto
    if (color === "rojo"){
        advertencia.style.backgroundColor = "#c51f5d"
    }else{
        advertencia.style.backgroundColor = "#243447"
    }
    setTimeout(() => advertencia.classList.add("invisible"), 3000);
}

const registrar = () => {
    const registro = {
        usuario: inputUsuarioRegistro.value.toLowerCase(),
        password: inputPasswordRegistro.value
    };

    const limpiar = () => {
        inputUsuarioRegistro.value = ""
        inputPasswordRegistro.value = ""
    };

    if (registro.usuario === "" || registro.password ===""){
        advertir("Ambos campos deben completarse", "rojo");
    }else if (registro.usuario.includes(" ")){
        advertir("El nombre de usuario no puede tener espacios", "rojo");
    }else if (usuarios.find((obj) => obj.usuario === registro.usuario.toLowerCase())){
        advertir("El nombre de usuario no está disponible", "rojo");
    }else{
        usuarios.push(registro);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrarRegistrarse();
        limpiar();
        advertir("Listo! Ya puedes inicar sesión");
    }
}

botonRegistrar.addEventListener("click", registrar);


// Login
inputUsuarioInicio.addEventListener("input", () => {
    if (inputUsuarioInicio.value === "" || inputUsuarioInicio.value.includes(" ")) {
        inputUsuarioInicio.classList.add("erroneo");
        loginSiguiente.classList.add("deshabilitado");
    }else{
        inputUsuarioInicio.classList.remove("erroneo");
        loginSiguiente.classList.remove("deshabilitado");
    }
})

loginSiguiente.addEventListener("click", () => {
    if (inputUsuarioInicio.value === ""){
        advertir("Debes ingresar tu nombre de usuario", "rojo");
    }else if (inputUsuarioInicio.value.includes(" ")){
        advertir("El nombre de usuario no contiene espacios", "rojo");
    }else if(usuarios.find((obj) => obj.usuario === inputUsuarioInicio.value.toLowerCase())){
        mostrarIniciar();
    }else{
        advertir("El usuario no existe", "rojo");
    }
})

inputPasswordInicio.addEventListener("input", () => {
    if (inputPasswordInicio.value === "") {
        inputPasswordInicio.classList.add("erroneo");
        loginIniciar.classList.add("deshabilitado");
    }else{
        inputPasswordInicio.classList.remove("erroneo");
        loginIniciar.classList.remove("deshabilitado");
    }
})

loginIniciar.addEventListener("click", () => {
    const limpiar = () => {
        inputUsuarioInicio.value = ""
        inputPasswordInicio.value = ""
    }
    if (inputUsuarioInicio.value === ""){
        advertir("Debes ingresar tu contraseña", "rojo")
    }else if(usuarios.find(((obj) => obj.usuario === inputUsuarioInicio.value) && ((obj) => obj.password === inputPasswordInicio.value))){
        login.classList.add("invisible");
        twitter.classList.remove("invisible");
        localStorage.setItem("sesion", inputUsuarioInicio.value.toLowerCase());
        mostrarUsuario();
        limpiar();
    }else{
        advertir("La contraseña no coincide", "rojo");
    }
})


// Si ya se ha iniciado sesión, se evita la vista de inicio y registro
if (localStorage.getItem("sesion")){
    login.classList.add("invisible");
    twitter.classList.remove("invisible");
}


// Twitter

// Reconocimiento de hashtags (sin funcionar aún, implementar más tarde)
/* inputTwit.addEventListener("input", () => {
    const hashtagRe = new RegExp(/\#(\w+)/g);
    const str = inputTwit.value.match(hashtagRe)
    console.log(inputTwit.value.replace(hashtagRe, "hola"));
}) */


// Verificación twits
inputTwit.addEventListener("input", () => {
    if (inputTwit.value === "") {
        botonTwit.classList.add("deshabilitadoTwit");
    }else{
        botonTwit.classList.remove("deshabilitadoTwit");
    }
})

inputTwit.placeholder = "Qué está pasando?";

// Constructor de Twits
function Twit(usuario, cuerpo) {
    const opcionesFecha = { year: "numeric", month: "long", day: "numeric"}
    this.usuario = usuario;
    this.cuerpo = cuerpo;
    this.fecha = new Date().toLocaleTimeString("es-ES", opcionesFecha);
}

const twitear = () => {
    const usuario = localStorage.getItem("sesion");
    const cuerpo = inputTwit.value;
    timeline.unshift(new Twit(usuario, cuerpo));
    localStorage.setItem("timeline", JSON.stringify(timeline));
    timelineTwits.innerHTML = ""
    mostrarTimeline(timeline);
    botonTwit.classList.add("deshabilitadoTwit");
}


// Verificar que no esté vacío, que no contenga solamente espacios
botonTwit.addEventListener("click", () => {
    const soloEspacios = (str) => {
        return /^\s*$/.test(str);
    }

    if (inputTwit.value === "") {
        inputTwit.focus();
    }else if (soloEspacios(inputTwit.value)) {
        inputTwit.value = "";
        inputTwit.focus();
    }else{
        twitear()
        inputTwit.value = "";
    }
})


// Recuperar twits guardados
const recuperarTimeline = () => {
    const timelineStored = JSON.parse(localStorage.getItem("timeline"));
    if (timelineStored) {
        timeline = timelineStored;
    }
}
recuperarTimeline();


// Mostrar timeline
const twits = (contenido) => {
    const twit = document.createElement("div");
    twit.classList.add("twit");
    twit.innerHTML += `<p class="twitUsuario">@${contenido.usuario}<span class="twitFecha"> ${contenido.fecha}</span></p>`;
    twit.innerHTML += `<p class="twitCuerpo">${contenido.cuerpo}</p>`;
    return twit
}

const mostrarTimeline = (arr) => {arr.forEach(
    (param) => {
        (timelineTwits.appendChild(twits(param)));
    }
)}
mostrarTimeline(timeline);


// Usuario actual
const mostrarUsuario = () => {
    const usuarioActual = document.querySelector("#usuarioActual")
    if (localStorage.getItem("sesion")){
        usuarioActual.innerHTML = "@" + localStorage.getItem("sesion");
    }
}
mostrarUsuario();

cerrarSesion.addEventListener("click", () => {
    localStorage.setItem("sesion", "");
    login.classList.remove("invisible");
    twitter.classList.add("invisible");
})

// Búsqueda
const buscar = (param) => {
    const busqueda = timeline.filter((twit) => {
        return twit["cuerpo"].includes(param);
    })

    if (busqueda.length > 0) {
        timelineTwits.innerHTML = "";
        mostrarTimeline(busqueda);
    }else{
        timelineTwits.innerHTML = `<p class="sinResultados">No hay resultados</p>`;
    }
}

inputBusqueda.addEventListener("input", () => {
    buscar(inputBusqueda.value);
})