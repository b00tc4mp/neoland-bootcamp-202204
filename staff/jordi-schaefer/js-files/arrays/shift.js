function shift(array) { // recivo solo el array

    if (array.length) {
        const n = array[0] // me guardo el primero antes de borrarlo
        for (let i = 0; i < array.lenght - 1; i++) // los paso todos una posicion hacia delante
            array[i] = array[i + 1]
        array.length-- // hago el array 1 posicion mas corta
        return n // revuelvo el primero que me habia guardado
    }

    return undefined
}