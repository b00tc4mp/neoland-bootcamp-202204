const { expect } = require('chai')
const { connect, Types: { ObjectId }, disconnect } = require('mongoose')
const { User, Note } = require('../models')
const deleteNote = require('./deleteNote')
const { NotFoundError, ConflictError } = require('../errors')

describe('deleteNote', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => Promise.all([Note.deleteMany(), User.deleteMany()]))

    describe('on existing user', () => {
        let usersArray = []

        beforeEach(() => {
            usersArray = [
                { name: 'abdo', username: 'soyuser', password: '321321321' },
                { name: 'abdo12321', username: 'NUEVO', password: '321321321' }
            ]

            const usersPromises = usersArray.map(user => {
                return User.create(user)
            })
            return Promise.all(usersPromises)
                .then(users => usersArray = users)
        })

        describe('on existing notes', () => {
            let arrayOfNotes = []

            let textArray = [
                'soy la nota1',
                'soy la nota2',
                'soy la nota3'
            ]

            beforeEach(() => {
                const notesPromises = textArray.map(text => Note.create({ user: usersArray[0], text }))
                return Promise.all(notesPromises)
                    .then(notes => arrayOfNotes = notes)
            })

            it('succeeds on correct user id an note id', () => {
                return deleteNote(arrayOfNotes[0].id, usersArray[0].id)
                    .then(result => {
                        expect(result).to.be.undefined

                        return Note.findById(arrayOfNotes[0].id)
                    })
                    .then(result => {
                        expect(result).to.be.null

                        return Note.findById(arrayOfNotes[1].id)
                    })
                    .then(result => expect(result).not.to.be.null)
            })

            it('fails on note that does not belong to the user', () => {
                deleteNote(arrayOfNotes[0].id, usersArray[1].id)
                    .then(() => { throw new Error('it should not reach this point')})
                    .catch(error => {
                        expect(error).to.be.instanceOf(ConflictError)
                        expect(error.message).to.equal(`note with id ${arrayOfNotes[0].id} does not belong to user with id ${usersArray[0].id}`)
                    })
            })
        })
        
        it('fails on note that does not exist', () => {
            const wrongNoteId = new ObjectId().toString()

            deleteNote(wrongNoteId, usersArray[1].id)
                    .then(() => { throw new Error('it should not reach this point')})
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal(`note with id ${wrongNoteId} not found}`)
                    })
        })
    })

    afterEach(() => Promise.all([Note.deleteMany(), User.deleteMany()]))

    after(() => disconnect())
})