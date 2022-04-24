describe('map', function(){
    test ('map to UpperCase', function(){
    
    const array = ["hola", "que", "tal"]
    const result = map(array, function(element){
        return element.toUpperCase()
    })
    expect(result[0]).toBe('HOLA')
    expect(result[1]).toBe('QUE')
    expect(result[2]).toBe('TAL')

})
})






/*console.log("TEST map")



{
    console.log('CASE 1')
    const array = ["hola", "que", "tal"]
    const result = map(array, function(element){
         return result.toUpperCase()
    })
} 
console.assert(result) === ["HOLA", "QUE", "TAL"]*/


