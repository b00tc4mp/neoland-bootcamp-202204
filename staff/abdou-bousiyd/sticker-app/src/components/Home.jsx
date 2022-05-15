const { Component } = React

class Home extends Component {
    
    // state = {view: 'stickers', name: null, newNotes: []}
    state = { name: null, timestamp: null, username: null, view: 'list', error: null, alert: null }

    componentDidMount() {
        this.handleRetriveUser()
    }

    handleRetriveUser = () => {
        retrieveUser(sessionStorage.token, (error, user) => {
            if (error) {
                this.setState({ alert : <Alert error message={error.message} />})
                setTimeout( () => {
                    this.setState({alert: null})
                }, 4000 )
                return
            }
            this.setState({ name: user.name, username: user.username })
        })
    }

    handleAddClick = () => {
        saveNote(sessionStorage.token, null, null, error => {
            if (error) {
                this.setState({ alert : <Alert error message={error.message} />})
                setTimeout( () => {
                    this.setState({alert: null})
                }, 4000 )
                return
            }
            this.setState({ timestamp: Date.now() })
        })
    }

    handleLogoutClick = () => {
        delete sessionStorage.token
        this.props.onUserLoggedOut()
    }

    handleProfileNavigation = () => this.setState({ view: 'profile' })

    handleHomeClick = () => this.setState({ view: 'list' })

    render() {
        const {state: {alert}} = this

        return <div className="Home Container">
            {alert && alert}
            <header className="Home__header Container Container--row Container--spread-sides">
                <button className="Button Button--no-border Home__home" onClick={this.handleHomeClick}>📋</button>
                <div>
                    <button className="Button Button--no-border Home__profile" onClick={this.handleProfileNavigation}>{this.state.name}</button>
                    <button className="Button Button--no-border Home__logout" onClick={this.handleLogoutClick}>Logout</button>
                </div>
            </header>

            <main className="Home__body Container">
                { this.state.view === 'list' && this.state.username && <StickerList username={this.state.username} timestamp={this.state.timestamp} />}
                { this.state.view === 'profile' && <Profile handleRetriveUser={this.handleRetriveUser} username={sessionStorage.username} />}
            </main>

            <footer className="Home__footer Container">
                <button className="Home__addSticker" onClick={this.handleAddClick}>+</button>
            </footer>
        </div>
    }
}