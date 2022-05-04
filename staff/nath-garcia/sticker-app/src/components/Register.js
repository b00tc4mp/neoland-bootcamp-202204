function Register() {
    Component.call(this, `<div class="Register">
    <form class="Register__form Container">
        <input type="text" name="name" placeholder="name">
        <input type="text" name="username" placeholder="username">
        <input type="password" name="password" placeholder="password">
        <button>Register</button>
        <a href="#">Login</a>
    </form>
</div>`)
}

chainPrototypes(Component, Register)

Register.prototype.onUserRegistered = function (callback) {
    const form = this.container.querySelector('form')

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const name = form.name.value
        const username = form.username.value
        const password = form.password.value

       // callback(name, username, password)
       registerUser(name, username, password, function(error) {
           if(error) {
               alert(error.message)

               return
           }

           callback()
       })
    })

}


Register.prototype.onLoginClick = function (callback) {
    const anchor = this.container.querySelector('a')

    anchor.addEventListener('click', function (event) {
        event.preventDefault()

        callback()
    })
}