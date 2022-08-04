const { expect } = require('chai')
const { connect, Types: { ObjectId }, disconnect } = require('mongoose')
const { User, Note } = require('../models')
const listNotes = require('./listNotes')
const { NotFoundError } = require('../errors')

describe('listNotes', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => Promise.all([Note.deleteMany(), User.deleteMany()]))

    describe('on existing users and notes', () => {
        let arrayOfNotes = [], usersArray = []

        let textArray = [
            'soy la nota1',
            'soy la nota2',
            'soy la nota3'
        ]

        beforeEach(() => {
            usersArray = [
                { name: 'abdo', username: 'soyuser', password: '321321321' },
                { name: 'abdo12321', username: 'NUEVO', password: '321321321' }
            ]

            const usersPromises = usersArray.map(user => {
                return User.create(user)
            })
            return Promise.all(usersPromises)
                .then(users => {
                    usersArray = users
                    
                    const notesPromises = textArray.map(text => {
                        return Note.create({ user: usersArray[0].id, text: text })
                    })
                    return Promise.all(notesPromises)
                })
                .then(notes => {
                    notes.forEach(note => arrayOfNotes.push(note))
                })
        })

        it('succeeds on correct userid and existing notes', () =>
            listNotes(usersArray[0].id)
                .then(result => {
                    expect(result).to.be.instanceOf(Array)
                    expect(result.length).to.equal(3)

                    result.forEach(note => {
                        const found = arrayOfNotes.some(_note => {
                            return _note.text === note.text && note.id === _note.id
                        })

                        expect(found).to.be.true
                    })
                })
        )

        it('fails on wrong user id', () => {
            const wrongUserId = new ObjectId().toString()

            return listNotes(wrongUserId)
                .then(() => {
                    throw new Error('it should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(NotFoundError)
                    expect(error.message).to.equal(`user with id ${wrongUserId} dos not exist`)
                })
        })

        it('succeed on correct user id that has no notes', () => {
            return listNotes(usersArray[1].id)
                .then(result => {
                    expect(result).to.be.instanceOf(Array)
                    expect(result.length).to.equal(0)
                })
        })
    })

    afterEach(() => Promise.all([Note.deleteMany(), User.deleteMany()]))

    after(() => disconnect())
})