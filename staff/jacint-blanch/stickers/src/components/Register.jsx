function Register(props){
    const logger = new Logger('Register')

    logger.info('call')

    const handleFormSubmit = event => {
        event.preventDefault()

        const name = event.target.name.value
        const username = event.target.username.value
        const password = event.target.password.value

        registerUser(name, username, password, error => {
            if (error) {
                alert(error.message)

                return
            }

            props.onUserRegistered()
        })
    }

    const handleLoginLinkClick = event => {
        event.preventDefault()

        props.onLoginLinkClicked()
    }

    logger.info('render')

    return <div>
        <form className="Container" onSubmit={handleFormSubmit}>
            <input className="Input Input--light" type="text" name="name" placeholder="name" />
            <input className="Input Input--light" type="text" name="username" placeholder="username" />
            <input className="Input Input--light" type="password" name="password" placeholder="password" />
            <button className="Button Button--light">Register</button>
            <a href="#" onClick={handleLoginLinkClick}>Login</a>
        </form>
    </div>
}