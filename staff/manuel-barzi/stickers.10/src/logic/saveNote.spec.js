describe('saveNote', () => {
    it('succeeds when user and note already exist', () => {
        db.users.length = 0
        db.notes.length = 0

        db.users.push(new User('Le Chunga', 'lechunga', '123123123'))
        db.users.push(new User('Papa Gayo', 'papagayo', '123123123'))

        let note

        db.notes.push(new Note('lechunga', 'Hello, Note! (1)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (2)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (3)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (4)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (5)'))
        db.notes.push(note = new Note('papagayo', 'Hello, Note! (5)'))

        saveNote('papagayo', note.id, 'Hello, Note! (6)', (error, noteId) => {
            expect(error).toBeNull()
            expect(noteId).not.toBeNull()
            expect(noteId).toBe(note.id)

            const _note = db.notes.find(__note => __note.id === noteId)

            expect(_note.text).toBe('Hello, Note! (6)')
        })

        db.users.length = 0
        db.notes.length = 0
    })

    it('succeeds when user exists, but note not (but note id is provided)', () => {
        db.users.length = 0
        db.notes.length = 0

        db.users.push(new User('Le Chunga', 'lechunga', '123123123'))
        db.users.push(new User('Papa Gayo', 'papagayo', '123123123'))

        db.notes.push(new Note('lechunga', 'Hello, Note! (1)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (2)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (3)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (4)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (5)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (6)'))

        const _noteId = createId()

        saveNote('papagayo', _noteId, 'Hello, Note! (7)', (error, noteId) => {
            expect(error).toBeNull()
            expect(noteId).not.toBeNull()
            expect(noteId).toBe(_noteId)

            const _note = db.notes.find(__note => __note.id === noteId)

            expect(_note.text).toBe('Hello, Note! (7)')
        })

        db.users.length = 0
        db.notes.length = 0
    })

    it('succeeds when user exists, but note not (and note id is not provided)', () => {
        db.users.length = 0
        db.notes.length = 0

        db.users.push(new User('Le Chunga', 'lechunga', '123123123'))
        db.users.push(new User('Papa Gayo', 'papagayo', '123123123'))

        db.notes.push(new Note('lechunga', 'Hello, Note! (1)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (2)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (3)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (4)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (5)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (6)'))

        saveNote('papagayo', null, 'Hello, Note! (7)', (error, noteId) => {
            expect(error).toBeNull()
            expect(noteId).not.toBeNull()

            const _note = db.notes.find(__note => __note.id === noteId)

            expect(_note.text).toBe('Hello, Note! (7)')
        })

        db.users.length = 0
        db.notes.length = 0
    })

    it('fails when user does not exist', () => {
        db.users.length = 0
        db.notes.length = 0

        db.users.push(new User('Le Chunga', 'lechunga', '123123123'))
        db.users.push(new User('Papa Gayo', 'papagayo', '123123123'))

        let note

        db.notes.push(new Note('lechunga', 'Hello, Note! (1)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (2)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (3)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (4)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (5)'))
        db.notes.push(note = new Note('papagayo', 'Hello, Note! (5)'))

        saveNote('papagayo' + '-wrong', note.id, 'Hello, Note! (6)', error => {
            expect(error).not.toBeNull()

            expect(error.message).toBe(`username "${'papagayo' + '-wrong'}" does not exist`)
        })

        db.users.length = 0
        db.notes.length = 0
    })

    it('fails when user is not the owner of the note', () => {
        db.users.length = 0
        db.notes.length = 0

        db.users.push(new User('Le Chunga', 'lechunga', '123123123'))
        db.users.push(new User('Papa Gayo', 'papagayo', '123123123'))

        let note

        db.notes.push(new Note('lechunga', 'Hello, Note! (1)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (2)'))
        db.notes.push(new Note('lechunga', 'Hello, Note! (3)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (4)'))
        db.notes.push(new Note('papagayo', 'Hello, Note! (5)'))
        db.notes.push(note = new Note('papagayo', 'Hello, Note! (5)'))

        saveNote('lechunga', note.id, 'Hello, Note! (6)', error => {
            expect(error).not.toBeNull()

            expect(error.message).toBe(`user "lechunga" does not own note with id "${note.id}"`)
        })

        db.users.length = 0
        db.notes.length = 0
    })
})