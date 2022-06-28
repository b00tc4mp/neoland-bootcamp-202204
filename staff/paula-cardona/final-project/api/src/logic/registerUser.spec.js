require('dotenv').config()

const { connect, disconnect } = require('mongoose')
const { User } = require('../models')
const { ConflictError } = require('../errors')
const registerUser = require('./registerUser')
const { expect } = require('chai')

describe ('registerUser', () => { 

    before(() => connect (process.env.TEST_MONGODB_URL)) 

    beforeEach(() => User.deleteMany()) 

    it('succeeds on correct credentials', () => {
        return registerUser('Peter', 'peterpan', 'peterpan@gmail.com', '123123123', 'Calle Madrid') 
            .then(result => { 
                expect(result).to.be.undefined 
                
                return User.findOne({ username: 'peterpan' }) 
                
            })
            
            .then(user => { 
                expect(user.name).to.equal('Peter') 
                expect(user.username).to.equal('peterpan') 
                expect(user.email).to.equal('peterpan@gmail.com')
                expect(user.password).to.equal('123123123')
                expect(user.address).to.be.instanceOf(Array)
            })
    })

    it('fails when user already exists', () => { 
        return User.create({ name: 'Wendy', username: 'wendypan', email:'wendypan@gmail.com', password: '123123123', address: 'Calle Barcelona' }) 
            .then(() => registerUser('Wendy', 'wendypan', 'wendypan@gmail.com', '123123123', 'Calle Barcelona')) 
            .catch(error => { 
                expect(error).to.be.instanceOf(ConflictError) 
                expect(error.message).to.equal(`user with username wendypan already exists`)
            })
    })

    afterEach(() => User.deleteMany())

    after(() => disconnect())
})



    