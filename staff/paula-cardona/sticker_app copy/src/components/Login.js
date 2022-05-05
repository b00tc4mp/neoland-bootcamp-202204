function Login() {//EMPEZAMOS CON DIV YA QUE EN APP TENEMOS PUESTO MAIN Y TODOS LOS COMPONENTS SON DIV
    Component.call(this, `<div> 
    <h1 class= h1> STICKER CREATOR </h1>
    <form class="Container">
        <input type="text" name="username" placeholder="username">
        <input type="password" name="password" placeholder="password">
        <button>Login</button>
        <a href="#">Register</a>
        </form>
    </div>`)
} //con el que construimos todos los componentes y le pasamos el string que es mi plantilla a través de la call de el mismo

chainPrototypes(Component, Login) //encadenamos el login (que es el child), con el component para que lo herede

Login.prototype.onUserLoggedIn = function(callback) { //ya ha pasado el logged
    const form = this.container.querySelector('form')

    form.addEventListener('submit', function(event) {
        event.preventDefault()  //prevenir el comportamiento de luego

        const username = form.username.value  //coge los valores del form i abajo llama a la funcion del login
        const password = form.password.value

        //callback(username, password)
        authenticateUser(username, password, function (error) {
            if (error) {
                alert(error.message)

                return
            }

            sessionStorage.username = username

            callback() //este callback le da permiso a que el indice cambie las vistas
        })
    })
}

Login.prototype.onRegisterClick = function(callback) {
    const anchor = this.container.querySelector('a')

    anchor.addEventListener('click', function(event) {
        event.preventDefault()

        callback()
    })
}


