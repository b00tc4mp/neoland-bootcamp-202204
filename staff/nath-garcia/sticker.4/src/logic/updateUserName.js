function updateUserName(username, newName, callback) {

    const user = db.users.find(user => user.username === username)

    if (!user) {
        callback(new Error(`user with username "${username}" does not exist`))
        return
    }

    user.name = newName
        
    callback(null)
}