const { expect } = require('chai')
const { connect, disconnect } = require('mongoose')
const { User, Note } = require('../models')
const retrievePublicNotes = require('./retrievePublicNotes')

describe('retrievePublicNotes', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => Promise.all([Note.deleteMany(), User.deleteMany()]))

    describe('on existing users and notes', () => {
        debugger
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
            debugger

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
                .then(notes => {arrayOfNotes = notes})
                .then(() => {
                    arrayOfNotes[0].audience = Note.PUBLIC
                    
                    return arrayOfNotes[0].save()
                })
                .then(() => {
                    arrayOfNotes[1].audience = Note.PUBLIC
                    return arrayOfNotes[1].save()
                })
        })

        it('succeeds on correct userid and existing notes', () =>
            retrievePublicNotes(usersArray[0].id)
                .then(result => {
                    expect(result).to.be.instanceOf(Array)
                    expect(result.length).to.equal(2)

                    result.forEach(note => {
                        const found = arrayOfNotes.some(_note => {
                            return _note.text === note.text && note.id === _note.id
                        })

                        expect(found).to.be.true
                    })
                })
        )
        it('succeeds on not public notes', () => {
            arrayOfNotes[0].audience = Note.PRIVATE
            arrayOfNotes[1].audience = Note.PRIVATE

            return Promise.all([arrayOfNotes[0].save(), arrayOfNotes[1].save()])
                .then(() => retrievePublicNotes(usersArray[0].id))
                .then(result => {
                    expect(result).to.be.instanceof(Array)
                    expect(result).to.have.length(0)
                })
        })
    })

    afterEach(() => Promise.all([Note.deleteMany(), User.deleteMany()]))

    after(() => disconnect())
})