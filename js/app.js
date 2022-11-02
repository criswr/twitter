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
cerrarSesion = document.querySelector("#cerrarSesion"),
cajaMenu = document.querySelector("#cajaMenu"),
cajaEditarImagen = document.querySelector("#cajaEditarImagen"),
hashtags = document.getElementsByClassName("hashtag"),
timelineStored = JSON.parse(localStorage.getItem("timeline"));


let usuarios = [],
timeline = timelineStored || [];


// Toastify JS
const toast = (texto, color) => {
    let classn = "";
    if (color === "info") {
        classn = "toastInfo";
    }else{
        classn = "toastAdvertencia";
    }
    Toastify({
        text: texto,
        className: classn,
        close: true,
      }).showToast();
}

// Login y registro
const mostrarIniciar = () => {
    const loginPassword = document.querySelector("#loginPassword");
    loginUsuario.classList.remove("invisible");
    loginRegistrarse.classList.add("invisible");
    loginPassword.classList.add("invisible");
}

const mostrarContrasena = () => {
    const loginPassword = document.querySelector("#loginPassword");
    loginUsuario.classList.add("invisible");
    loginRegistrarse.classList.add("invisible");
    loginPassword.classList.remove("invisible");
}

const mostrarRegistrarse = () => {
    loginUsuario.classList.add("invisible");
    loginRegistrarse.classList.remove("invisible");
}

botonVolver.addEventListener("click", mostrarIniciar);
botonYaTengo.addEventListener("click", mostrarIniciar);
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


// Usuarios guardados
const fetchUsuarios = async () => {
    const res = await fetch("./data/usuarios.json");
    const data = await res.json();
    localStorage.setItem("usuarios", JSON.stringify(data));
    usuarios = data;
}


// Registro
const recuperarUsuarios = () => {
    const usuariosStored = JSON.parse(localStorage.getItem("usuarios"));
    if (usuariosStored) {
        usuarios = usuariosStored;
    }else{
        fetchUsuarios();
    }
}
recuperarUsuarios();


// Agregar a localstorage
const registrar = () => {
    const registro = {
        usuario: inputUsuarioRegistro.value.toLowerCase(),
        password: inputPasswordRegistro.value,
        imagen: ""
    };

    const limpiar = () => {
        inputUsuarioRegistro.value = "";
        inputPasswordRegistro.value = "";
    };

    if (registro.usuario === "" || registro.password ===""){
        toast("Ambos campos deben completarse", "advertencia");
        inputPasswordRegistro.focus();
    }else if (registro.usuario.includes(" ")){
        toast("El nombre de usuario no puede tener espacios", "advertencia");
        inputUsuarioRegistro.focus();
    }else if (usuarios.find((obj) => obj.usuario === registro.usuario.toLowerCase())){
        toast("El nombre de usuario ya existe", "advertencia");
        inputUsuarioRegistro.focus();
    }else{
        usuarios.push(registro);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        mostrarIniciar();
        limpiar();
        toast("Listo! Ya puedes inicar sesión", "info");
        inputUsuarioInicio.focus();
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
        toast("Debes ingresar tu nombre de usuario", "advertencia");
        inputUsuarioInicio.focus();
    }else if (inputUsuarioInicio.value.includes(" ")){
        toast("El nombre de usuario no contiene espacios", "advertencia");
        inputUsuarioInicio.focus();
    }else if(usuarios.find((obj) => obj.usuario === inputUsuarioInicio.value.toLowerCase())){
        mostrarContrasena();
        inputPasswordInicio.focus();
    }else{
        toast("El usuario no existe", "advertencia");
        inputUsuarioInicio.focus();
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
        inputUsuarioInicio.value = "";
        inputPasswordInicio.value = "";
    }
    if (inputUsuarioInicio.value === ""){
        advertir("Debes ingresar tu contraseña", "rojo");
    }else if(usuarios.find(((obj) => obj.usuario === inputUsuarioInicio.value) && ((obj) => obj.password === inputPasswordInicio.value))){
        login.classList.add("invisible");
        twitter.classList.remove("invisible");
        localStorage.setItem("sesion", inputUsuarioInicio.value.toLowerCase());
        mostrarUsuario();
        limpiar();
    }else{
        toast("La contraseña no coincide", "advertencia");
    }
})


// Si ya se ha iniciado sesión, se evita la vista de inicio y registro
if (localStorage.getItem("sesion")){
    login.classList.add("invisible");
    twitter.classList.remove("invisible");
}


// Verificación twits
inputTwit.addEventListener("input", () => {
    if (inputTwit.value === "") {
        botonTwit.classList.add("deshabilitadoTwit");
    }else{
        botonTwit.classList.remove("deshabilitadoTwit");
    }
})

// Constructor de Twits
function Twit(usuario, cuerpo, id) {
    const opcionesFecha = { year: "numeric", month: "long", day: "numeric"};
    this.usuario = usuario;
    this.cuerpo = cuerpo;
    this.fecha = new Date().toLocaleTimeString("es-ES", opcionesFecha);
    this.id = id;
}

const twitear = () => {
    const usuario = localStorage.getItem("sesion");
    const cuerpo = inputTwit.value;
    const id = "";
    timeline.unshift(new Twit(usuario, cuerpo, id));
    localStorage.setItem("timeline", JSON.stringify(timeline));
    timelineTwits.innerHTML = "";
    mostrarTimeline(timeline);
    animarTwit();
    botonTwit.classList.add("deshabilitadoTwit");
}


// Twits automáticos
const twitearAuto = (twit) => {
    const usuario = twit.usuario;
    const cuerpo = twit.cuerpo;
    const id = twit.id;
    timeline.unshift(new Twit(usuario, cuerpo, id));
    localStorage.setItem("timeline", JSON.stringify(timeline));
    timelineTwits.innerHTML = "";
    mostrarTimeline(timeline);
    animarTwit();
}

const animarTwit = () => {
    if (timelineTwits.firstChild){
        timelineTwits.firstChild.classList.add("nuevo");
        setTimeout(() => {
        timelineTwits.firstChild.classList.remove("nuevo");
            }, 2100);
    }
}


// Verificar que no esté vacío, que no contenga solamente espacios
botonTwit.addEventListener("click", () => {
    const soloEspacios = (str) => {
        const reEspacios = new RegExp(/^\s*$/);
        return reEspacios.test(str);
    }

    if (inputTwit.value === "") {
        inputTwit.focus();
        toast("El Twit no puede estar vacío", "advertencia");
    }else if (soloEspacios(inputTwit.value)) {
        inputTwit.value = "";
        inputTwit.focus();
        toast("El Twit no puede contener solamente espacios", "advertencia");
    }else{
        twitear();
        inputTwit.value = "";
    }
})


// Recuperar twits guardados
const fetchTwits = async () => {
    const res = await fetch("./data/twits.json");
    const data = await res.json();
    const dataMezcla = data.sort(() => Math.random() - 0.5);

    for (let i = 0; i < dataMezcla.length; i++) {
        setTimeout(() => {
            // Asegurarse de que no enviar el mismo twit dos veces
            if (!timeline.find((obj) => obj.id === dataMezcla[i].id)) {
                twitearAuto(dataMezcla[i]);
            }           
        }, 15000 * i);
    }
}
fetchTwits();


// Mostrar timeline
const findImagen = (nombre) => {
    const autor = usuarios.find((obj) => obj.usuario === nombre);
    if (autor.imagen === "") {
        return "./img/perfil/default.png";
    }else{
        return autor.imagen;
    }
}


const twits = (contenido) => {
    const hashtagRe = new RegExp(/\#(\w+)/g);
    const twit = document.createElement("div");
    const imagen = document.createElement("div");
    const texto = document.createElement("div");
    const destacado = "<span class='hashtag' data-frasehashtag='$1'>#$1</span>";

    twit.classList.add("twit");
    imagen.classList.add("twitImagen");
    twit.appendChild(imagen);
    twit.appendChild(texto);
    imagen.innerHTML = `<img src="${findImagen(contenido.usuario)}" alt="${contenido.usuario}">`;
    texto.innerHTML = `<p class="twitUsuario">@${contenido.usuario}<span class="twitFecha"> ${contenido.fecha}</span></p>`;
    texto.innerHTML += `<p class="twitCuerpo">${contenido.cuerpo.replace(hashtagRe, destacado)}</p>`;
    return twit;
}


// Hashtags interactivos
const hashtagLinks = () => {
    const cajaHashtags = document.querySelector("#cajaHashtags");
    const listaHashtags = document.getElementsByClassName("listaHashtags");
    const listaCompleta = [];
    const titulo = "<h3>Hashtags:</h3>";
    for (const hashtag of hashtags) {
        hashtag.addEventListener("click", () => {
            const frase= "#" + hashtag.dataset.frasehashtag;
            inputBusqueda.value = frase;
            buscar(frase);
            inputBusqueda.focus();
        })
        listaCompleta.push(hashtag.dataset.frasehashtag);
    }
    const lista = new Set(listaCompleta);

    cajaHashtags.innerHTML = titulo;
    for (const hashtag of lista) {
        cajaHashtags.innerHTML += `<p class="listaHashtags">#${hashtag.toLowerCase()}</p>`;
    }

    for (const hashtag of listaHashtags) {
        hashtag.addEventListener("click", () => {
            const frase = hashtag.innerText;
            inputBusqueda.value = frase;
            buscar(frase);
            inputBusqueda.focus();
        })
    }
}


// Imprimir timeline
const mostrarTimeline = (arr) => {
    arr.forEach((param) => {
        (timelineTwits.appendChild(twits(param)));
    })

    hashtagLinks();
}
mostrarTimeline(timeline);


// Usuario actual y editar imagen de perfil
const mostrarUsuario = () => {
    const usuarioActual = document.querySelector("#usuarioActual");
    const usuarioAutenticado = localStorage.getItem("sesion");
    const guardarImagenPefil = document.querySelector("#guardarImagenPefil");

    if (usuarioAutenticado){
        usuarioActual.innerHTML = `<img src="${findImagen(usuarioAutenticado)}" alt="@${usuarioAutenticado}">`;
        usuarioActual.innerHTML += `<img src="./img/editar.svg" id="imagenPerfilEditar">`;
        usuarioActual.innerHTML += "@" + usuarioAutenticado;
        
        
        // Editar imagen
        const imagenPerfilEditar = document.querySelector("#imagenPerfilEditar");
        const cancelarImagenPefil = document.querySelector("#cancelarImagenPefil");
        const urlImagenPefil = document.querySelector("#urlImagenPefil");
        const verificarUrl = new RegExp("((http|https)://)?\.(?:jpg|gif|png)");

        imagenPerfilEditar.addEventListener("click", () => {
            cajaEditarImagen.classList.remove("invisible");
        })

        cancelarImagenPefil.addEventListener("click", () => {
            cajaEditarImagen.classList.add("invisible");
            urlImagenPefil.value = "";
        })


        // Verificación de url de imagen
        urlImagenPefil.addEventListener("input", () => {
            
            if (verificarUrl.test(urlImagenPefil.value)) {
                guardarImagenPefil.classList.remove("deshabilitado");
                urlImagenPefil.classList.remove("erroneo");
            }else{
                guardarImagenPefil.classList.add("deshabilitado");
                urlImagenPefil.classList.add("erroneo");
            }
        })


        //Guardar nueva imagen
        const editarImagen = (nombre) => {
            const usuario = usuarios.find((obj) => obj.usuario === nombre);
            usuario.imagen = urlImagenPefil.value;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }

        guardarImagenPefil.addEventListener("click", () => {
            if (verificarUrl.test(urlImagenPefil.value)) {
                editarImagen(usuarioAutenticado);
                urlImagenPefil.value = "";
                cajaEditarImagen.classList.add("invisible");
                mostrarUsuario();
                timelineTwits.innerHTML = "";
                mostrarTimeline(timeline);
            }else{
                toast("Debes ingresar el enlace a una imagen", "advertencia");
            }
        })
    }
}
mostrarUsuario();


cerrarSesion.addEventListener("click", () => {
    localStorage.setItem("sesion", "");
    login.classList.remove("invisible");
    twitter.classList.add("invisible");
    mostrarIniciar();
})


// Búsqueda
const buscar = (param) => {
    const timelineBusqueda = document.querySelector("#timelineBusqueda");
    const busqueda = timeline.filter((twit) => {
        return twit["cuerpo"].toLowerCase().includes(param.toLowerCase());
    })
    const mostrarBusqueda = (arr) => {
        arr.forEach((param) => {
            (timelineBusqueda.appendChild(twits(param)));
        })
    }

    if (busqueda.length > 0) {
        timelineTwits.classList.add("invisible");
        timelineBusqueda.classList.remove("invisible");
        timelineBusqueda.innerHTML = "";
        mostrarBusqueda(busqueda);
    }else{
        timelineTwits.classList.add("invisible");
        timelineBusqueda.classList.remove("invisible");
        timelineBusqueda.innerHTML = `<p class="sinResultados">No hay resultados</p>`;
    }
}

inputBusqueda.addEventListener("input", () => {
    if (inputBusqueda.value.length === 0){
        timelineTwits.classList.remove("invisible");
        document.querySelector("#timelineBusqueda").classList.add("invisible"); 
    }else{
        buscar(inputBusqueda.value);
        hashtagLinks();
    }
})