describe('Human', () => {
    it('should construct a human', () => {
        const h = new Human

        expect(h instanceof Human).toBe(true)
        expect(h.gender !== undefined).toBe(true)
        expect(h.gender === 'intersex' || h.gender === 'female' || h.gender === 'male').toBe(true)
    })

    it('should eat', () => {
        const h = new Human

        h.stomach = ['🥤']

        h.eat('🍔')

        expect(h.stomach[0]).toBe('🍔')
        expect(h.stomach[1]).toBe('🥤')


        h.eat('🥗')

        expect(h.stomach[0]).toBe('🥗')
        expect(h.stomach[1]).toBe('🍔')
        expect(h.stomach[2]).toBe('🥤')

        h.eat('🌭')

        expect(h.stomach[0]).toBe('🌭')
        expect(h.stomach[1]).toBe('🥗')
        expect(h.stomach[2]).toBe('🍔')
        expect(h.stomach[3]).toBe('🥤')

        console.log(h.stomach)

    })

    it('should drink', () => {
        const h = new Human

        h.stomach = ['🍔']

        h.drink('🥤')

        expect(h.stomach[0]).toBe('🥤')
        expect(h.stomach[1]).toBe('🍔')

        h.drink('🍼')

        expect(h.stomach[0]).toBe('🍼')
        expect(h.stomach[1]).toBe('🥤')
        expect(h.stomach[2]).toBe('🍔')
    })

    it('should poo', () => {
        const h = new Human

        h.stomach = ['🥤', '🥗', '🌭', '🍔']

        expect(h.poo()).toBe('💩')
        expect(h.stomach.length).toBe(1)
        expect(h.stomach[0]).toBe('🥤')
    })

    it('should pee', () => {
        const h = new Human

        h.stomach = ['🥤', '🥗', '🌭', '🍔']

        expect(h.pee()).toBe('💦')
        expect(h.stomach.length).toBe(3)
        expect(h.stomach[0]).toBe('🥗')
        expect(h.stomach[1]).toBe('🌭')
        expect(h.stomach[2]).toBe('🍔')
    })
})