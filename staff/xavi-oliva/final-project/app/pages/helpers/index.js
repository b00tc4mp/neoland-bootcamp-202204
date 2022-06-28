import Cookies from 'cookies'
import { validateJwt } from 'validators'
import Apium from 'apium'

export async function verifyTokenWithAPICall(req, res) {
    
    const cookies = new Cookies(req, res)

    const token = cookies.get('token')
    
    if (token) {
        validateJwt(token)
        const api = new Apium('http://localhost:8080/api')

        const { status, payload } = await api.get('users/auth', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (status === 200) {
            if (req.url.includes('/login') || req.url.includes('/register')) {
                res.writeHead(307, { Location: '/admin' })
                res.end()
            } else {
                return token
            }
        } else {
            cookies.set('token')

            if (req.url.includes('/admin') || req.url.includes('/flats') || req.url.includes('/profile'))  {
                
                res.writeHead(307, { Location: '/login' })
                res.end()
            }
        }
    }

    if (req.url === '/admin' || req.url.includes('/flats') || req.url.includes('/profile')) {
        res.writeHead(307, { Location: '/login' })
        res.end()
    }

    return
}