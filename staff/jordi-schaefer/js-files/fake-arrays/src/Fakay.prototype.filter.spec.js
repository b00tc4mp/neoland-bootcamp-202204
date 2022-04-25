describe('Faaky.prototype.filter', function() {

    it('select numbers bigger than..', function() {
        const nums = new Fakay (8, 3, 6, 4, 12, 9, 2, 1 , 13, 3, 4)
        let n = 4

        // filter: crea un nuevo array con todos los elementos que cumplan la condicion deseada
        const result = nums.filter(function(elem){ // le enviamos el array y la funcion
            return elem > n        
        })
        expect(result).toBeInstanceOf(Fakay)
        expect(result[0]).toBe(8)
        expect(result[1]).toBe(6)
        expect(result[2]).toBe(12)
        expect(result[3]).toBe(9)
        expect(result[4]).toBe(13)
        expect(result.length).toBe(5)
    })

    it('select odd numbers', function() {
        const nums = new Fakay (8, 3, 6, 4, 12, 9, 2, 1 , 13, 3, 4)
        // filter: crea un nuevo array con todos los elementos que cumplan la condicion deseada
        const result = nums.filter (function(elem){ // le enviamos el array y la funcion
            return elem%2 === 0   
        })
        expect(result).toBeInstanceOf(Fakay)
        expect(result[0]).toBe(8)
        expect(result[1]).toBe(6)
        expect(result[2]).toBe(4)
        expect(result[3]).toBe(12)
        expect(result[4]).toBe(2)
        expect(result[5]).toBe(4)
        expect(result.length).toBe(6)
    })

})