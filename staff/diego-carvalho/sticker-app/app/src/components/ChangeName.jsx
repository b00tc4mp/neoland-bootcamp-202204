import {useContext} from 'react'
import React from 'react'
import Logger from '../vendor/Loggy'
import Context from './Context'
import updateUserName from '../logic/updateUserName'

function ChangeName(props) {
    const logger = new Logger('ChangeName')

    logger.info('call')

    const { handleFeedback } = useContext(Context)

    const handleFormSubmit = event => {
        event.preventDefault()

        const newName = event.target.name.value

        try {
            updateUserName(sessionStorage.token, newName, error => {
                if (error) {
                    handleFeedback({ level: 'error', message: error.message })

                    return
                }
                handleFeedback({ level: 'success', message: 'name has been changed'})
                props.onUserNameChanged()
            
            })
        } catch (error) {
            handleFeedback({ level: 'error', message: error.message })
        }
    } 

    logger.info('render')

    return <div className="ChangeName">
        <form className="Container" onSubmit={handleFormSubmit}>
            <input type="text" name="name" placeholder="name" />
            <button className="Button">Save</button>
        </form>
    </div>
}
export default ChangeName



















/*function ChangeName() {
    Component.call(this, `<div class="ChangeName">
        <form class="Container">

            <input type="text" name="name" placeholder="Name">
            <input type="text" name="newName" placeholder="New name">

            <button>Save</button>
        </form>
    </div>`)

    this.container.querySelector('form').addEventListener('submit', event => {
        event.preventDefault()

        const name = event.target.name.value
        const newName = event.target.newName.value

        updateUserName(sessionStorage.username, name, newName, error => {
            if (error) {
                alert(error.message)

                return
            }

            alert('New name saved!')
        })
    })
}

chainPrototypes(Component, ChangeName) */