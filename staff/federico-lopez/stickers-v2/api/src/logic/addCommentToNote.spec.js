const { connect, disconnect, Types: { ObjectId }, isValidObjectId } = require('mongoose')
const { User, Note } = require('../models')
const { NotFoundError, AuthError, FormatError } = require('../errors')
const addCommentToNote = require('./addCommentToNote')
const { expect } = require('chai')

describe('addCommentToNote', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    describe('on existing users and note', () => {
        let user1, user2, note

        beforeEach(() => {
            return User.create({ name: 'Papa Gayo', username: 'papagayo', password: '123123123' })
                .then(_user => {
                    user1 = _user
                    return User.create({ name: 'Pedro', username: 'pedrito', password: '123123123' })
                })
                .then(_user => {
                    user2 = _user
                    return Note.create({ user: user1.id, text: 'yo soy la nota' })
                })
                .then(_note => { 
                    note = _note
                })
        })

        describe('on public note', () => {
            beforeEach(() => {
                note.audience = Note.PUBLIC
                return note.save()
            })

            it('succeeds on correct user and note data', () =>
                addCommentToNote(user2.id, note.id, 'tirando hate')
                    .then(commentId => {
                        expect(commentId).to.be.a('string')
                        expect(isValidObjectId(commentId)).to.be.true

                        return Note.findById(note.id)
                    })
                    .then(note => {
                        expect(note.comments).to.have.length(1)
                    })
            )

            it('fails on nonexisting user and correct note data', () => {
                const wrongId = new ObjectId().toString()

                return addCommentToNote(wrongId, note.id, 'tirando hate 2')
                    .then(() => { throw new Error('it should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.instanceof(NotFoundError)
                        expect(error.message).to.equal(`user with id ${wrongId} not found`)
                    })
            })

            it('fails existing user and correct note data, but empty or blank text', () => {
                try {
                addCommentToNote(user2.id, note.id, ' ')
                
                } catch(error) {
                    expect(error).to.be.instanceof(FormatError)
                    expect(error.message).to.equal(`text is blank`)
                }
            })
        })

        describe('on private note', () => {
            it('fails on existing user and correct note data', () => 
                addCommentToNote(user2.id, note.id, 'tirando hate 3')
                    .then(() => { throw new Error('it should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.instanceof(AuthError)
                        expect(error.message).to.equal(`note with id ${note.id} is private`)
                    })
            )

            it('fails on nonexisting user and correct note data', () => {
                const wrongId = new ObjectId().toString()

                return addCommentToNote(wrongId, note.id, 'tirando hate 2')
                    .then(() => { throw new Error('it should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.instanceof(NotFoundError)
                        expect(error.message).to.equal(`user with id ${wrongId} not found`)
                    })
            })
        })
    })
    afterEach(() => User.deleteMany())

    after(() => disconnect())
})