const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Note, Comment } = require('../models')
const { NotFoundError, AuthError } = require('../errors')
const deleteCommentFromNote = require('./deleteCommentFromNote')
const { expect } = require('chai')
const { comment } = require('../models/schemas')

describe('deleteCommentFromNote', () => {
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
                    return Note.create({ user: user1.id, text: 'yo soy la nota', audience: Note.PUBLIC })
                })
                .then(_note => note = _note)
        })

        describe('on existing comment', () => {
            let comment

            beforeEach(() => {
                comment = new Comment({ user: user2.id, text: 'soy el comentario' })
                note.comments.push(comment)
                return note.save()
            })

            it('succeeds on correct user, note and comment data', () =>
                deleteCommentFromNote(user2.id, note.id, comment.id)
                    .then(result => {
                        expect(result).to.be.undefined

                        return Note.findById(note.id)
                    })
                    .then(note => {
                        const commentExists = note.comments.some(com => com._id === comment.id)
                        expect(commentExists).to.be.false
                    })
            )

            it('fails on wrong user', () => {
                return deleteCommentFromNote(user1.id, note.id, comment.id)
                    .then(() => { throw new Error('it should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.instanceof(AuthError)
                        expect(error.message).to.equal(`user with id ${user1.id} can delete a comment that not belong them`)
                    })
            })

            it('fail on unexisting comment', () => {
                const wrongId = new ObjectId().toString()
                return deleteCommentFromNote(user2.id, note.id, wrongId)
                    .then(() => { throw new Error('it should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.instanceof(NotFoundError)
                        expect(error.message).to.equal(`comment with id ${wrongId} not found`)
                    })
            })
        })
    })
    afterEach(() => User.deleteMany())

    after(() => disconnect())
})