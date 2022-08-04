require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { connect, disconnect } = require('mongoose')
const { 
    handleAuthenticateUser,
    handleUpdateUser,
    handleRetrieveUser,
    handleRegisterUser,
    handleCreateNote,
    handleRetrieveNotes,
    handleUpdateNote,
    handleDeleteNote,
    handleAddCommentToNote,
    handleDeleteUser,
    handleDeleteComment,
    handleToggleReactionToNote
    } = require('./handlers')
const handleRetrievePublicNotes = require('./handlers/handleRetrievePublicNotes')


connect('mongodb://localhost:27017/notes-db')
    .then(() => {
        console.log('DB connected')

        const api = express()

        const jsonBodyParser = bodyParser.json()

        /* CRUD USERS */
        api.post('/api/users', jsonBodyParser, handleRegisterUser)
        api.post('/api/users/auth', jsonBodyParser, handleAuthenticateUser)
        api.get('/api/users', handleRetrieveUser)
        api.patch('/api/users', jsonBodyParser, handleUpdateUser)
        api.delete('/api/users', jsonBodyParser, handleDeleteUser)

        /* CRUD NOTES */
        api.post('/api/notes', jsonBodyParser, handleCreateNote)
        api.get('/api/notes', handleRetrieveNotes)
        api.patch('/api/notes', jsonBodyParser, handleUpdateNote)
        api.delete('/api/notes/:noteId', handleDeleteNote)
        api.get('/api/notes/public', handleRetrievePublicNotes)

        /* CRUD COMMENTS */
        api.post('/api/notes/:noteId', jsonBodyParser, handleAddCommentToNote)
        api.delete('/api/notes/:noteId/:commentId', handleDeleteComment)

        /* REACTIONS */
        api.post('/api/notes/:noteId/reactions/:type', jsonBodyParser, handleToggleReactionToNote)


        api.listen(8080, () => console.log('API running'))

        process.on('SIGINT', async () => 
            disconnect()
                .then(() => {
                    console.log('\nDB disconnected')
                    
                    process.exit(0)
                })
        )
    })