function Sticker() {
    Component.call(this, `<div class="Sticker">
        <button>x</button>
        <form class="Sticker__form">
            <textarea name="text"></textarea>
            <button type="submit" class="save-button">Save</button>
        </form>
    </div>`)

    this.id=null

    // este solo funciona en los stickers editables, pero no en los nuevos
    const form = this.container.querySelector('form')


    form.addEventListener('submit', event => {
        event.preventDefault()
        
        const text = form.text.value


        // CREAR NOTA
        if (!this.id)
            createNote(sessionStorage.username, text, (error, noteId) => {
                if (error) {
                    alert(error.message)
                    return
                }

                //this.id = noteId
                this.setId(noteId) // ya tenemos una funcion que lo hace

                alert('Sticker saved!')
            })
        else
        // ACTUALIZAR NOTA
            updateNote(sessionStorage.username, this.id, text, error => {
                if (error) {
                    alert(error.message)
                    return
                }

                alert('Sticker updated!')
            })
    })


        // BORRAR NOTA
    const close = this.container.querySelector('button')

    close.addEventListener('click', () => {
        if (this.id) {
            deleteNote(sessionStorage.username, this.id, error => {
                if (error) {
                    alert(error.message)

                    return
                }
            })
        }
    })

}



chainPrototypes(Component, Sticker)




Sticker.prototype.onClose = function(callback) {
    const close = this.container.querySelector('button')

    close.addEventListener('click', function() {
        callback()
    })
}



Sticker.prototype.setText = function(text) {
    this.container.querySelector('textarea').innerText = text
}



Sticker.prototype.setId = function(id) {
    this.id = id
}