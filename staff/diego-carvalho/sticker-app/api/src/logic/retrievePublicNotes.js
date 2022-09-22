const { NotFoundError } = require("../errors")
const { Note, User } = require("../models")
const { validateObjectId } = require("../validators")

function retrievePublicNotes(userId) {//funcción para recuperar la notas pucblicas de un usuário
    validateObjectId(userId)//validación

    return User.findById({ _id: userId })//busco un user por su id
        .then(userId => {
            if (userId === null) throw new NotFoundError(`user with id ${userId} dos not exist`)//si el user id for null, imprimirá un error en la pantalla.
        })
        .then(() => {//si el user es encontrado, busco su nota con su id y la audiencia
            return Note.find({ user: userId, audience: 'public'}).lean()
        })
        .then(notes => {//con el resultado(notes), hago un forEach para transformar el id de la note en string...
            notes.forEach(note => {
                note.id = note._id.toString()
            //quito las informaciones que no me apetece
                delete note._id
                delete note.user
                delete note.__v
                return note
            })
            return notes//returno las notas que son publicas
        })
}

module.exports = retrievePublicNotes