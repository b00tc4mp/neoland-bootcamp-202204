const { expect } = require('chai')
const { connect, disconnect } = require('mongoose')
const { User, Note } = require('../models')
const retrievePublicNotes = require('./retrievePublicNotes')

describe('retrievePublicNotes', () => {
    before(() => connect('mongodb://127.0.0.1:27017/notes-db-test'))

    beforeEach(() => Promise.all([Note.deleteMany(), User.deleteMany()]))

    describe('on existing users and notes', () => {

        let notesArray = [], usersArray = []

        let textArray = [
            'soy la nota1',
            'soy la nota2',
            'soy la nota3'
        ]

        beforeEach(() => {
            usersArray = [
                { name: 'Diego', username: 'diego', password: '1234' },
                { name: 'Paula', username: 'paula', password: '1234' }
            ]

            const usersPromises = usersArray.map(user => {//uso el metódo  map para crear un usuário para cada elemento de usersArray
                return User.create(user)
            })
            return Promise.all(usersPromises)//promesa de crear los usuários
                .then(users => {
                    usersArray = users//userArray ya es los usuários creados con name,username y password

                    const notesPromises = textArray.map(text => {//uso el metódo map para crear la notas con user y el texto
                        return Note.create({ user: usersArray[0].id, text: text })//creo una notes con el id del user del la posición 0 y un text del array de text
                    })
                    return Promise.all(notesPromises)
                })
                .then(notes => {notesArray = notes})//el resultado (notes) ahora será un array de notas
                .then(() => {
                    notesArray[0].audience = 'public'//la nota de la posición 0 tendrá la audiencia 'public'
                    
                    return notesArray[0].save()//la salvo
                })
                .then(() => {
                    notesArray[1].audience = 'public'//la nota de la posición 1 tendrá la audiencia 'public'
                    return notesArray[1].save()//la salvo
                })
        })

        it('succeeds on correct userid and existing notes', () =>
            retrievePublicNotes(usersArray[0].id)//uso la función 
                .then(result => {
                    expect(result).to.be.instanceOf(Array)//hago los expect
                    expect(result.length).to.equal(2)

                    result.forEach(note => {
                        const found = notesArray.some(_note => {//para verificar si la función funciona, uso el metódo some para ver si lo texto y el user.id cumplen con lo que pasamos a la función.
                            return _note.text === note.text && note.id === _note.id
                        })

                        expect(found).to.be.true//esperamos que sí.
                    })
                })
        )
   
    })

    afterEach(() => Promise.all([Note.deleteMany(), User.deleteMany()]))

    after(() => disconnect())
})