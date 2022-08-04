import './Feedback.sass'

function Feedback(props) {
    setTimeout(props.onTimeout, 2000)

    return <div className={`Feedback Feedback__${props.level}`} >
        <p className="Feedback__p">{props.message}</p>
    </div>
}

export default Feedback