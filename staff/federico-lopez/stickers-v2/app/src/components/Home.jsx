import { useState, useEffect, useContext } from 'react'
import { retrieveUser } from '../logic/'
import Profile from './Profile'
import List from './List'
import Context from './Context'
import './Home.sass'
import { useNavigate } from 'react-router-dom'
import { isValidJWT } from '../validators'

function Home(props) {
    const { handleFeedback } = useContext(Context)

    const [view, setView] = useState('stickers')
    const [newStickers, setNewStickers] = useState(null)
    const [name, setName] = useState(null)

    const navigate = useNavigate()

    const onLogoutButtonClick = () => {
        delete sessionStorage.token

        props.onLoggedOut()
    }

    const handleNewNoteCreated = () => {
        setNewStickers(false)
    }

    const handleOnProfileButton = () => {
        setView('profile')
    }

    const handleOnStickersButton = event => {
        event.preventDefault()

        setView('stickers')
    }

    const handleAddNoteClick = event => {
        event.preventDefault()

        newStickers === true || newStickers === null ? setNewStickers(false) : setNewStickers(true)
    }

    useEffect(() => {
        if (isValidJWT(sessionStorage.token))
            try {
                retrieveUser(sessionStorage.token, (error, user) => {
                    if (error) {
                        handleFeedback(error.message)

                        return
                    }
                    setName(user.name)
                })
            } catch (error) {
                handleFeedback(error.message)
            }
        else {
            props.onLoggedOut()
        }
    }, [])


    const handleOnChangedName = (newName) => {
        setName(newName)
    }

    return isValidJWT(sessionStorage.token) ? <div className="Home">
        <header className="header">
            <a className="viewStickersButton" onClick={handleOnStickersButton} >Stickers</a>
            <a className="profileButton" onClick={handleOnProfileButton} >{name}</a>
            <a className="logout" onClick={onLogoutButtonClick}>Log Out</a>
        </header>

        <main>
            {view === 'profile' && <Profile onChangedName={handleOnChangedName} onDeletedUser={props.onDeletedUser} name={name} />}
            {view === 'stickers' && <List newStickers={newStickers} onNewNoteCreated={handleNewNoteCreated} />}
        </main>

        <footer className="footer">
            <a className="addNote" onClick={handleAddNoteClick} >+</a>
        </footer>
    </div>
    : <></>
}

export default Home