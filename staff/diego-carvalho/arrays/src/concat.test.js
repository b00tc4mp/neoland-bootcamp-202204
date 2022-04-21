describe('concat', function() {
    const array1 = ['a', 'b', 'c']
    const array2 = ['d', 'e', 'f']


    test('concating arrays', function () {
        const result = concat(array1, array2)

        expect(result.length).toBe(6)
        expect(result[0]).toBe('a')
        expect(result[1]).toBe('b')
        expect(result[2]).toBe('c')
        expect(result[3]).toBe('d')
        expect(result[4]).toBe('e')
        expect(result[5]).toBe('f')

    })

    const array3 = ['g', 'h', '1']

    test('contating multiples arrays', function(){
        const result = concat(array1, array2, array3)

        expect(result.length).toBe(9)
        expect(result[0]).toBe('a')
        expect(result[1]).toBe('b')
        expect(result[2]).toBe('c')
        expect(result[3]).toBe('d')
        expect(result[4]).toBe('e')
        expect(result[5]).toBe('f')
        expect(result[6]).toBe('g')
        expect(result[7]).toBe('h')
        expect(result[8]).toBe('1')

    })

})





