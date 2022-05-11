class Home extends Component {
    constructor () {
        super ( `<div class="Home container">
        <header class="Home__header">
            <div>
                <button class="Home__profile">Profile</button>
                <button class="my">📒</button>
                <button class="edit">✍</button>
            </div>
            <button class="Home__logout">Logout</button>
        </header>

        <main class="Home__body"></main>

        <footer class="Home__footer Container">
            <button class="Home__addSticker Transparent">➕</button>
        </footer>
    </div>`)
    

    let profile = new Profile()
    let notelist
    let stickerlist = new StickerList()
    const addStickerButton = this.container.querySelector('.Home__addSticker')


    
    // cuando inicie home, si hay usuario logeado, haz lo siguiente:
    // - cambiar nombre de arriba
    // - montrar listas no editables --> como OBJETO list

    if (sessionStorage.username) {
        retrieveUser(sessionStorage.username, (error, user) => {
            if (error) {
                alert(error.message)
                return
            }
            this.setName(user.name)
        })

        this.container.querySelector('.Home__footer').removeChild(addStickerButton)
        notelist = new NoteList()
        this.addToBody(notelist)  // añado el objeto listas   
    }




    // boton     / profile /

    const profileButton = this.container.querySelector('.Home__profile')
    profileButton.addEventListener('click', () => {
        
        if(this.hasBody(stickerlist)) {
            this.removeFromBody(stickerlist)
            this.container.querySelector('.Home__footer').removeChild(addStickerButton)
        }

        if(this.hasBody(notelist)) 
            this.removeFromBody(notelist)

        if (!profile || !this.hasBody(profile))
            this.addToBody(profile)
    })
    
    

    // boton    /my notes/ 
    
    const myButton = this.container.querySelector('.my')
    myButton.addEventListener('click', () => {

        if(this.hasBody(profile))
            this.removeFromBody(profile)

        if(this.hasBody(stickerlist)) {
            this.removeFromBody(stickerlist)
            this.container.querySelector('.Home__footer').removeChild(addStickerButton)
        }

        if(!this.hasBody(notelist)) {           
            notelist = new NoteList() // creo objeto listas
            this.addToBody(notelist)  // y lo añado al home
        }
    })
    


    // boton    /edit/   

    const editButton = this.container.querySelector('.edit')
    editButton.addEventListener('click', () => {

        if(this.hasBody(profile))
            this.removeFromBody(profile)

        if(this.hasBody(notelist)) 
            this.removeFromBody(notelist)

        if (!this.hasBody(stickerlist)) {
            this.container.querySelector('.Home__footer').appendChild(addStickerButton)
            stickerlist = new StickerList()
            this.addToBody(stickerlist)
        }
    })


    
    // boton   /logout/

    const logoutButton = this.container.querySelector('.Home__logout')
    logoutButton.addEventListener('click', () => {
        delete sessionStorage.username
        
        app.remove(home)
        app.add(login)
    })


    
    // boton  / + /

    addStickerButton.addEventListener('click', () => {      // en caso de click crea un nuevo sticker
        
        const sticker = new Sticker
        // imporante que sea const, ya que sino se pierde entre los stickers y no sabe cual esta referenciando

        sticker.onClose(() => {  // ejecuto la funcion onclose de sticker que esta pendiente del boton close, y hace lo siguiente
            stickerlist.removeSticker(sticker)
        })
        
        stickerlist.addSticker(sticker)
    }) 
    }




    setName(name) {
        const title = this.container.querySelector('.Home__profile')
        title.innerText = `${name} 💻`
    }


    addToBody(component) {
        this.container.querySelector('.Home__body').appendChild(component.container)
    }

    removeFromBody(component) {
        this.container.querySelector('.Home__body').removeChild(component.container)
    }

    hasBody(component) {
        return this.container.querySelector('.Home__body').hasChild(component.container)
    }

}
