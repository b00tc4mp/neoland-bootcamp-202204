import { validateInterpretationContent, validateJWT } from 'validators'
import Apium from '../vendor/Apium'
import { context } from './context'

export async function addInterpretationToSong(token, songId, content) {
    validateJWT(token)
    //TODO VALIDATE SONG ID
    validateInterpretationContent(content)    
    
    const api = new Apium(context.API_URL)

    const { status, payload } = await api.post(
        `songs/${songId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        })
        
    const data = JSON.parse(payload)
    
    if (status === 201){
        return data.interpretationId   

    } else if (status >= 400 && status < 500) {
        const data = JSON.parse(payload)

        throw new Error(data.error)

    } else
        throw new Error('server error')
}