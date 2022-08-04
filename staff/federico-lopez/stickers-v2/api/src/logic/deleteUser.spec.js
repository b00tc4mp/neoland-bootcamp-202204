const { expect } = require('chai')
const { connect, disconnect, Types: { ObjectId } } = require('mongoose')
const { AuthError } = require('../errors')
const { User } = require('../models')
const deleteUser = require('./deleteUser')

describe('deleteUser', () => {
    before(() => connect('mongodb://localhost:27017/notes-db-test'))

    beforeEach(() => User.deleteMany())

    describe('on existing user', () => {
        let user

        beforeEach(() => {
            user = User({ name: 'perrito malvado', username: 'perri', password: '123456789' })
            return user.save()
        })

        it('succeeds on correct password and token', () => {
            return deleteUser(user.id, user.password)
                .then(() => {
                    return User.findById(user.id)
                })
                .then(result => {
                    expect(result).to.be.null
                })
        })

        it('fails on incorrect password and correct token', () => {
            return deleteUser(user.id, '321654987')
                .then(() => {
                    throw new Error('it should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(AuthError)
                    expect(error.message).to.equal('wrong credentials')
                })
        })

        it('fails on incorrect token and correct password', () => {
            return deleteUser(new ObjectId().toString(), user.password)
                .then(() => {
                    throw new Error('it should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(AuthError)
                    expect(error.message).to.equal('incorrect Id')
                })
        })
    })

    describe('on unexisting user', () => {
        it ('fails on incorrect token and password', () => {
            return deleteUser(new ObjectId().toString(), '15975364')
                .then(() => {
                    throw new Error('it should not reach this point')
                })
                .catch(error => {
                    expect(error).to.be.instanceOf(AuthError)
                    expect(error.message).to.equal('incorrect Id')
                })
        })
    })

    afterEach(() => User.deleteMany())

    after(() => disconnect())
})