function pop(array) {
    let elementPopped = array[array.length - 1]
    array.length = array.length - 1 //quito el último elemento
    return elementPopped
}