import { validateStringNotEmptyNoSpaces, validateStringNotEmptyOrBlank, validateString } from '../validators'
import Apicaller from '../vendor/Apicaller'


function updateActivity(activityId, title, text='', audience){
    validateStringNotEmptyNoSpaces(activityId, 'activity Id')
    validateStringNotEmptyOrBlank(title, 'title')
    validateString(text, 'text')


    const api = new Apicaller(process.env.REACT_APP_API_URL)

    return (async () => {
        
        const result = await api.patch(`/activities/${activityId}/save`, 
            {headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({ title, text, audience })})
             
        const { status, payload } = result
  
        if (status === 204) {
            return
        }
        else if (status >= 400 && status < 500) { 
            const data = JSON.parse(payload)  
            throw new Error(data.error) 
        }
        else { 
            throw new Error('server error')
        }

    })()
}

export default updateActivity