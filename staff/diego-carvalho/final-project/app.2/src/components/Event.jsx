import { useContext } from 'react'
import Logger from 'vendor/Loggy'
import Context from './Context'
import deleteEvent from '../logic/deleteEvent'
import saveEvent from '../logic/saveEvent'
import './Event.sass'
import{useNavigate} from 'react-router-dom'

function Event(props) {
    const logger = new Logger('Event')
 console.log(props)
    logger.info('call')

    const { handleFeedback } = useContext(Context)
    const navigate = useNavigate()
    const { event, onRemove } = props

    const handleRemoveClick = () => {
        if (event.id)
            deleteEvent(sessionStorage.token, event.id, error => {
                if (error) {
                    handleFeedback({ level: 'error', message: error.message })

                    return
                }

                onRemove(event.id)
            })
    }

    const handleSaveSubmit = event => {
        event.preventDefault()

        const { eventId } = props
        const { target: { title: { value: title } } } = event
        const { target: { text: { value: description } } } = event

        saveEvent(sessionStorage.token, eventId, title, description, error => {
            if (error) {
                handleFeedback({ level: 'error', message: error.message })

                return
            }
            navigate('/')

            handleFeedback({ level: 'success', message: 'event saved' })
        })
    }

    logger.info('render')

    return <div className="Event">
        <form className="Event__form" onSubmit={handleSaveSubmit}>

            <textarea className='Input Input--light Event--title' type='text' name="title" placeholder="Title" defaultValue={event.title}></textarea>
            {/* <textarea className="Input Input--light Event--description" type='text' name="text" placeholder="Description" defaultValue={props.description}></textarea> */}
            <h2 className="Input Input--light Event--description" > {event.description} </h2>

            <button className="button-event" onClick={handleRemoveClick}>cancelar</button>
            <button className="button-event">Save</button>

        </form>
    </div>
}

export default Event



{/* <select name='select'>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
</select> */}

{/* <figure className=''>
                <img src="hola" alt="" />
            </figure> */}
