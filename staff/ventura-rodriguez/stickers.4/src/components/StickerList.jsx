const { Component } = React

class StickerList extends Component {
    constructor() {
        super()

        this.state = { notes: null }

        this.logger = new Logger('StickerList')

        this.logger.info('constructor')
    }
    //state = { notes: null }

    componentDidMount() {
        this.logger.info('componentDidMount')

        this.loadNotes()
    }

    loadNotes = () =>
        retrieveNotes(sessionStorage.token, (error, notes) => {
            if (error) {
                alert(error.message)

                return
            }

            this.setState({ notes })
        })

    componentWillReceiveProps(newProps) {
        this.logger.info('componentWillReceiveProps')

        if (this.props.timestamp !== newProps.timestamp)
            this.loadNotes()
    }

    handleRemoveSticker = stickerId => {
        const notes = this.state.notes.filter(note => note.id !== stickerId)

        this.setState({ notes })
    }

    render() {
        this.logger.info('render')

        const { state: { notes } } = this

        return notes && notes.length ?
            <ul className="StickerList__list Container">
                {notes.map(note => <li key={note.id}>
                    <Sticker stickerId={note.id} text={note.text} onRemove={this.handleRemoveSticker} />
                </li>)}
            </ul>
            :
            <p>no stickers yet</p>
    }
}