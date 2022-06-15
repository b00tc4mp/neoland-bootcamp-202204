import Cookies from 'cookies'
import { isValidJWT } from 'validators'

async function verifyTokenWithAPICall(req, res) {
    
    const cookies = new Cookies(req, res)

    const token = cookies.get('token')

    try {
        isValidJWT(token)
        const response = await fetch('http://localhost:8081/api/users/auth', {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${token}`
            }
        })

        if (response.status !== 200) {
            cookies.set('token')

            if (req.url === '/profile' || req.url === '/flats' || req.url === '/') {
                res.writeHead(307, { Location: '/login' })
                res.end()
            }

            return {
                props: {}
            }

        } else if (req.url === '/login' || req.url === '/register') {
            res.writeHead(307, { Location: '/' })
            res.end()
        }
    } catch (error) {
        if(req.url === 'profile' || req.url === '/') {
            res.writeHead(307, { Location: '/login' })
            res.end()
        }
    }
    if(token) {
        return {
            props: { token }
        }
    } else {
        return {
            props: {}
        }
    }
}

module.exports = {
    verifyTokenWithAPICall
}