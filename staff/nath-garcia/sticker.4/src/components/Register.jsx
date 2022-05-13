const { Component } = React

class Register extends Component {
    handleFormSubmit = event => {
        event.preventDefault()

        const name = event.target.name.value
        const username = event.target.username.value
        const password = event.target.password.value

        registerUser(name, username, password, function (error) {
            if (error) {
                alert(error.message)

                return
            }
            this.props.onUserRegistered()
        })
    }

    handleLoginLinkClick = event => {
        event.preventDefault()

        this.props.onLoginLinkClicked()
    }

    render() {
        return <div>
            <form className="Container" onSubmit={this.handleFormSubmit}>
                <input className="Input Input--light" type="text" name="name" placeholder="name" />
                <input className="Input Input--light" type="text" name="username" placeholder="username" />
                <input className="Input Input--light" type="password" name="pasword" placeholder="password" />
                <button className="Button Button--light">Register</button>
                <a href="#" onClick={this.handleLoginLinkClick}>Login</a>
            </form>
        </div>
    }
}