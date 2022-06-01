const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { User, Note, Reaction } = require('../models')
const { NotFoundError } = require('../errors')
const toggleReactionOnNote = require('./toggleReactionOnNote')
const { expect } = require('chai')


describe('toggleReactionOnNote', () => {
    before(() => connect('mongodb://127.0.0.1:27017/notes-db-test'))

    beforeEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))
    afterEach(() => Promise.all([User.deleteMany(), Note.deleteMany()]))

    describe('when user already exists', () => {
        let user, user2

        beforeEach(() => {
            user = new User({ name: 'Paula', username: 'cardonatr', password: '199804PCT' })
            user2 = new User({ name: 'Jordi', username: 'Jschaefer', password: '12341234' })

            Promise.all(user.save(), user2.save())
        })
        afterEach(() => User.deleteMany())

        describe('When note already exists', () => {
            let note

            beforeEach(() => {
                note = new Note({ user: user.id, text: 'ver el partido futbol sala' })
                return note.save()
            })
            afterEach(() => Note.deleteMany())


            it('succeeds on corret data', () => {
                return toggleReactionOnNote(user2.id, note.id, Reaction.LOVE)
                    .then(result => {
                        expect(result).to.be.undefined

                        return Note.findById(note.id)
                        .then(note => {
                            const reaction= note.reactions.find(react => react.user.toString() === user2.id)
                            
                                expect(reaction.user.toString()).to.be.equal(user2.id)
                                expect(reaction.type).to.be.equal(1)
                            })
                    })
            })
            
        })
/*
        describe('When note does not exists', () => { 

            it('fails without note', () => {
                const wrongId = new ObjectId().toString()
                
                return addCommentToNote(user2.id, wrongId, 'Pasalo muy bien!')
                    .then(() => {
                        throw new Error('should not reach this point')
                    })
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal(`note with id ${wrongId} does not exist`)
                    })
            })
        })
*/
    })

    
    after(() => disconnect())
})