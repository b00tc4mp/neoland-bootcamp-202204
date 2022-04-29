function createNote(username, text, callback) {

    const userExists = users.some(user => user.username === username)
    
    if (!userExists) {
        callback(new Error(`username "${username}" does not exist`))
        return
    }
    // luego, si existe el usuario, creo la nota

    const note = new Note(username, text)

    notes.push(note)

    callback(null)
}

// he llegado mas o menos hasta las 13:06 de la sesión del jueves 29