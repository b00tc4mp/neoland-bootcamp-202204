const registerUser = require('./registerUser')
const authenticateUser = require('./authenticateUser')
const retrieveUser = require('./retrieveUser')
const updateUser = require('./updateUser')
const unregisterUser = require('./unregisterUser')
const createFlat = require('./createFlat')
const retrieveFlats = require('./retrieveFlats')
const retrieveFlat = require('./retrieveFlat')
const updateFlat = require('./updateFlat')
const deleteFlat = require('./deleteFlat')
const addBookingToFlat = require('./addBookingToFlat')
const deleteBookingFromFlat = require('./deleteBookingFromFlat')

module.exports = {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    unregisterUser,
    createFlat,
    retrieveFlats,
    retrieveFlat,
    updateFlat,
    deleteFlat,
    addBookingToFlat,
    deleteBookingFromFlat
}