import createCustomError from '../utils/createCustomError'

const FormatError = createCustomError('FormatError')
const AuthError = createCustomError('AuthError')

export {
    FormatError,
    AuthError
}