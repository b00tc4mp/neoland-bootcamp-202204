describe('updateUserName', () => {
    it('succeeds when user exists and name is correct', () => {
        db.users.length = 0

        db.users.push(new User('Choco Later', 'chocolater', '123123123'))

        updateUserName('Choco Later', 'chocolater', 'tupac', error => {
            expect(error).toBeNull()

            const user = db.users.find(user => user.username === 'chocolater')

            expect(user.name).toBe('tupac')
        })

        db.users.length = 0
    })

    it('fails when user exists and name is incorrect', () => {
        db.users.length = 0

        db.users.push(new User('Choco Later', 'chocolater', '123123123'))

        updateUserName('Choco Later', 'chocolaterrrr',  error => {
            expect(error).not.toBeNull()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('wrong name')
        })

        db.users.length = 0
    })

    it('fails when user exists and name is same as new name', () => {
        db.users.length = 0

        db.users.push(new User('Choco Later', 'chocolater', '123123123'))

        updateUserName('Choco Later', 'chocolater', 'chocolater', error => {
            expect(error).not.toBeNull()
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('current name and new name are the same')
        })

        db.users.length = 0
    })

    
})