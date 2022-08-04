const { model } = require('mongoose')
const { user, note, comment, reaction } = require('./schemas')

const User = model('User', user)
const Note = model('Note', note)

Note.PRIVATE = 0
Note.PUBLIC = 1
Note.FRIENDS = 2

const Reaction = model('Reaction', reaction)

Reaction.LIKE = 0
Reaction.LOVE = 1
Reaction.HAHA = 2
Reaction.SAD = 3
Reaction.ANGRY = 4
Reaction.WOW = 5

const Comment = model('Comment', comment)

module.exports = {
    User,
    Note,
    Comment,
    Reaction
}
