<<<<<<< HEAD
# twitter
Proyecto Coder JS
=======
# Simulador de Twitter

**Live en: [https://criswr.github.io/twitter/](https://criswr.github.io/twitter/)**

### ⚡ Registro y login:
*   Si es la primera visita a la app, muestra primero la vista de registro, de otra forma muestra la vista de login.
*   Campos con validación de contenido. No pueden estar vacíos y el nombre de usuario no puede contener espacios ni estar registrado previamente.
*   Login de dos pasos.

### ⚡ Twitter:
*   Se cargan twits pre-creados automáticamente a intervalos, con verificación mediante ID para que no se repitan incluso si el usuario recarga la página.
*   Cada twit ingresado por el usuario se muestra al inicio de la cronología.
*   Validación de contendido, si se intenta twitear solamente espacios, se eliminan.
*   Si se presiona el botón Twittear sin contenido en el input, este queda con focus para empezar a escribir.

### ⚡ Búsqueda y hashtags
*   El campo de búsqueda filtra los twits de la cronología según lo ingresado.
*   Si en los twits hay palabras usadas como "#hashtags", se manejan como si fueran enlaces, al presionarlos se rellena automáticamente el campo de búsqueda y filtra la cronología.
*   A medida que nuevos hashtags se van ingresando en los twits, se va llenando la lista de hashtags en la barra lateral, sin repetirse.

### ⚡ Menú:
*   En el espacio de menú se muestra el nombre de usuario de la cuenta actualmente autenticada y su foto de perfil.
*   Si el usuario aún no ingresa una foto de perfil propia, se muestra una por defecto.
*   Al hacer click en la foto de perfil en el menú, se puede actualizar imagen ingresando la URL de la nueva a utilizar. En este campo se valida si el valor ingresado corresponde a una URL de una imagen, es decir, si empieza por HTTP/S y termina en JPG, GIF o PNG.
*   Debajo del nombre aparece el botón cerrar sesión, que desautentica y lleva de vuelta a la vista de login.

### ⚡ Características técnicas:
*   Datos de usuario y cronología generada se almacenan en Local Storage.
*   Twits automáticos y usuarios pre-creados obtenidos asincrónicamente desde un Json local.
*   Manejo de vistas por medio de JS + CSS, nunca se recarga la página.
*   Validación de campos para twitear, actualizar la imagen de perfil e identificación de hashtags se realizan a través de Regular Expressions.
*   Alertas y confirmaciones se muestran con Toastify JS.
*   Diseño responisve.


### 👤 Conectar:
[LinkedIn](https://www.linkedin.com/in/criswr)
>>>>>>> entregaFinal
