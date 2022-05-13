const { useState, useEffect } = React

function Home(props) {
    const logger = new Logger('Home')

    logger.info('call')

    // state = { name: null, timestamp: null, view: null }
    const [name, setName] = useState(null)
    const [timestamp, setTimestamp] = useState(null)
    const [view, setView] = useState(null)

    const handleLogoutClick = () => {
        handleLogout()
    }

    const handleLogout = () => {
        delete sessionStorage.token

        props.onUserLoggedOut()
    }

    // componentDidMount() {
    //     logger.info('componentDidMount')

    //     retrieveUser(sessionStorage.token, (error, user) => {
    //         if (error) {
    //             alert(error.message)

    //             handleLogout()

    //             return
    //         }

    //         // setState({ name: user.name, view: 'list' })
    //         setName(user.name)
    //         setView('list')
    //     })
    // }

    useEffect(() => {
        logger.info('componentDidMount')

        retrieveUser(sessionStorage.token, (error, user) => {
            if (error) {
                alert(error.message)

                handleLogout()

                return
            }

            // setState({ name: user.name, view: 'list' })
            setName(user.name)
            setView('list')
        })
    }, [])

    const handleAddClick = () => {
        // TODO convert to api-connected logic
        saveNote(sessionStorage.token, null, null, error => {
            if (error) {
                alert(error.message)

                return
            }

            setTimestamp(Date.now())
        })
    }

    const handleProfileClick = () => setView('profile')

    const handleHomeClick = () => setView('list')

    logger.info('render')

    return <div className="Home Container">
        <header className="Home__header Container Container--row Container--spread-sides">
            <button className="Button Button--no-border Home__home" onClick={handleHomeClick}>📋</button>
            <div>
                <button className="Button Button--no-border Home__profile" onClick={handleProfileClick}>{name}</button>
                <button className="Button Button--no-border Home__logout" onClick={handleLogoutClick}>Logout</button>
            </div>
        </header>

        <main className="Home__body Container">
            {view === 'list' && <StickerList timestamp={timestamp} />}
            {view === 'profile' && <Profile />}
        </main>

        <footer className="Home__footer Container">
            <button className="Home__addSticker" onClick={handleAddClick}>+</button>
        </footer>
    </div>
}