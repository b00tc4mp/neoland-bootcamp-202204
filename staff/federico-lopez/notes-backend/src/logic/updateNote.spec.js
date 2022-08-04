const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Note } = require('../models')
const { ConflictError, NotFoundError } = require('../errors')
const updateNote = require('./updateNote')
const { expect } = require('chai')

describe('updateNote', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    describe('when user already exists', () => {
        let user, note

        beforeEach(() => {
            user = new User({ name: 'Papa Gayo', username: 'papagayo', password: '123123123' })

            return user.save()
                .then(() => {
                    note = Note({ user: user.id, text: 'hola mundo' })

                    return note.save()
                })
        })

        it('succeeds on correct user data and existing note', () =>
            updateNote(note.id, user.id, 'byebye')
                .then(result => {
                    expect(result).to.be.undefined

                    return Note.findById(note.id)
                })
                .then(note => {
                    expect(note.user.toString()).to.equal(user.id)
                    expect(note.text).to.equal('byebye')
                    expect(note.date).to.be.instanceOf(Date)
                })
        )

        it('fails on incorrect user id', () => {
            const wrongId = new ObjectId().toString()
            return updateNote(note.id, wrongId, 'byebye')
                .then(() => {
                    throw new Error('should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(ConflictError)
                    expect(error.message).to.equal(`note with id ${note.id} does not belong to user with id ${wrongId}`)
                })
        })

        it('fails on unexisting note', () => {
            const unexistingNoteId = new ObjectId().toString()

            return updateNote(unexistingNoteId, user.id, 'byebye')
                .then(() => {throw Error('it should not reach this point')})
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`note with id ${unexistingNoteId} does not exist`)
                })
        })

        it('succeeds on existing note, existing user, without text changes', () => {
            updateNote(note.id, user.id, 'hola mundo')
            .then(result => {
                expect(result).to.be.undefined

                return Note.findById(note.id)
            })
            .then(note => {
                debugger
                expect(note.user.toString()).to.equal(user.id)
                expect(note.text).to.equal('hola mundo')
                expect(note.date).to.be.instanceOf(Date)
            })
        })
    })
    afterEach(() => User.deleteMany())

    after(() => disconnect())
})