const { connect, disconnect, Types: { ObjectId }, isValidObjectId } = require('mongoose')
const { User, Note, Reaction } = require('../models')
const { NotFoundError, AuthError } = require('../errors')
const toggleReactionToNote = require('./toggleReactionToNote')
const { expect } = require('chai')

describe('toggleReactionToNote', () => {
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
                toggleReactionToNote(user2.id, note.id, Reaction.LOVE)
                    .then(reactionId => {
                        expect(reactionId.toString()).to.be.a('string')
                        expect(isValidObjectId(reactionId)).to.be.true

                        return Note.findById(note.id)
                    })
                    .then(note => {
                        expect(note.reactions).to.have.length(1)
                        expect(note.reactions[0].type).to.equal(Reaction.LOVE)
                        expect(note.reactions[0].date).to.be.instanceof(Date)
                    })
            )

            it('fails on nonexisting user and correct note data', () => {
                const wrongId = new ObjectId().toString()

                return toggleReactionToNote(wrongId, note.id, Reaction.LIKE)
                    .then(() => { throw new Error('it should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.instanceof(NotFoundError)
                        expect(error.message).to.equal(`user with id ${wrongId} not found`)
                    })
            })

            describe('on reaction previous reaction "love"', () => {
                let reaction

                beforeEach(() => {
                    reaction = new Reaction({ user: user2.id, type: Reaction.LOVE })

                    note.reactions.push(reaction)
                    return note.save()
                })

                it('succeeds on correct user, note data and same reaction. It deletes previous reaction', () =>{
                    debugger 
                    toggleReactionToNote(user2.id, note.id, Reaction.LOVE)
                        .then(result => {
                            expect(result).to.be.undefined

                            return Note.findById(note.id)
                        })
                        .then(note => {
                            expect(note.reactions).to.have.length(0)
                        })
                })

                it('succeeds on correct user, note data and different reaction. It changes the reaction', () =>
                    toggleReactionToNote(user2.id, note.id, Reaction.LIKE)
                    .then(reactionId => {
                        expect(reactionId.toString()).to.be.a('string')
                        expect(isValidObjectId(reactionId)).to.be.true

                        return Note.findById(note.id)
                    })
                    .then(note => {
                        expect(note.reactions).to.have.length(1)
                        expect(note.reactions[0].type).to.equal(Reaction.LIKE)
                        expect(note.reactions[0].date).to.be.instanceof(Date)
                    })
                )
            })
        })

        describe('on private note', () => {
            it('fails on existing user and correct note data', () =>
                toggleReactionToNote(user2.id, note.id, Reaction.LIKE)
                    .then(() => { throw new Error('it should not reach this point') })
                    .catch(error => {
                        expect(error).to.be.instanceof(AuthError)
                        expect(error.message).to.equal(`note with id ${note.id} is private`)
                    })
            )

            it('fails on nonexisting user and correct note data', () => {
                const wrongId = new ObjectId().toString()

                return toggleReactionToNote(wrongId, note.id, Reaction.LIKE)
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