import { useState } from 'react'
import { updateUserName } from '../logic/'
import Alert from "./Alert"


function ChangeName(props) {

    const [alert, setAlert] = useState(null)

    const handleFormSubmit = e => {
        e.preventDefault()
        const name = e.target.name.value

        try{
            updateUserName(sessionStorage.token, name, error => {
                if (error) {
                    setAlert(<Alert error message={error.message} />)
                    setTimeout( () => {
                        setAlert(null)
                    }, 4000 )
                    return
                } 
                props.handleRetriveUser()
            })

        }catch(error){
            if (error) {
                setAlert(<Alert error message={error.message} />)
                setTimeout( () => {
                    setAlert(null)
                }, 4000 )
                return
            }   
        }
    }

    return <div className="ChangeName">
        {alert && alert}
        <form className="Container"  onSubmit={handleFormSubmit}>
            <input type="text" name="name" placeholder='name'/>
            <button>Save</button>
        </form>
    </div>
}

export default ChangeName;