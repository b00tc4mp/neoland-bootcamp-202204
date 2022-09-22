/**
 * Constructs instances of User
 * 
 * @param {string} name The name of the user
 * @param {string} email The user email
 */
 function User(name, email) {
    if (typeof name !== 'string') throw new TypeError('name is not string')
    if (typeof email !== 'string') throw new TypeError('email is not string')

    this.name = name
    this.email = email
}
export default User