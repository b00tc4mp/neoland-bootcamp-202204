{
    console.log('TEST lastIndexOf')

    const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];
    
    console.assert(lastIndexOf(animals, 'Penguin' -1) === 2)
    console.assert(lastIndexOf(animals, 'Dodo') === 3)
    console.assert(lastIndexOf(animals, 'Dodo', 0) === 0)

}

