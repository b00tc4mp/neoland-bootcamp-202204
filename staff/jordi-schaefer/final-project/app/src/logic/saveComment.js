import { validateJwt, validateStringNotEmptyOrBlank, validateStringNotEmptyNoSpaces } from 'validators'
import Apicaller from 'apicaller'


function saveComment(token, activityId, text){
    validateJwt(token)
    validateStringNotEmptyNoSpaces(activityId, 'activity Id')
    validateStringNotEmptyOrBlank(text, 'text')

    const api = new Apicaller(process.env.REACT_APP_API_URL)

    return (async () => {
        
        const result = await api.patch(`/activities/${activityId}/comment`, 
            {headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}, 
            body: JSON.stringify({ text })})
             
        const { status, payload } = result
  
        if (status === 201) {
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

export default saveComment