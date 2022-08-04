import createId from "../utils/createId"

function Note(username, text, date, id) {
    if (username != null && typeof username !== 'string') throw new TypeError('username is not a string')
    if (id != null && typeof id !== 'string') throw new TypeError('id is not a string')
    if (text != null && typeof text !== 'string') throw new TypeError('text is not a string')
    if (date != null && !(date instanceof Date)) throw new TypeError('date is not a Date')
    
    this.username = username
    this.text = text
    this.date = date || new Date
    this.id = id || createId()
}

export default Note