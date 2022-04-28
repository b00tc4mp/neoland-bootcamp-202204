function Login() {// constructor function Login with attributes
    Component.call(this, `<div class="Login">
        <form class="Login__form">
            <input type="text" name="username" placeholder="username">
            <input type="password" name="password" placeholder="password">
            <button>Login</button>
            <a href="#">Register</a>
        </form>
    <div>` )
}

chainPrototypes(Component, Login)//calling the chainprototype with parent(Component) and child(Login)

//calling the function (with callback) will macth the info previous saved on data file.
Login.prototype.onSubmit = function (callback) {
    const form = this.container.querySelector('form')
    
//The method addEventListener() works by adding a function, to the list of event listeners .
    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const username = form.username.value
        const password = form.password.value

        callback(username, password)
    })
}

Login.prototype.onRegisterClick = function (callback) {
    const anchor = this.container.querySelector('a')
    
    anchor.addEventListener('click', function (event) {
        event.preventDefault()

        callback()
    })

}
