import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../Context'
import Map from './Map'
import createActivity from '../../logic/createActivity'
import addPointToActivity from '../../logic/addPointToActivity'
import '../../styles/Activity.sass'

function ActivityStart(props) {

    const [sport, setSport] = useState(null)
    const [position, setPosition] = useState(null)
    const { handleFeedback } = useContext(Context)
    const navigate = useNavigate()
    let watchId

    useEffect(() => {
        setSport('Cycling')

        getPosition()
    }, [])
    
    
    const getPosition = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setPosition([position.coords.latitude, position.coords.longitude, position.coords.altitude])
            console.log('set first position')
            watchPosition()
        }, function(error){
            handleFeedback({ type: 'error', message: 'Position error' })
        }, { maximumAge: 400_000 })
    }

    const watchPosition = () => {
        watchId = navigator.geolocation.watchPosition(function(position) {
            setPosition([position.coords.latitude, position.coords.longitude, position.coords.altitude])
            console.log('set position')
        }, function(error){
            handleFeedback({ type: 'error', message: 'Position error' })
        }, { enableHighAccuracy: true, distanceFilter: 10,  maximumAge: 400_000 })    
    }    
    


    const handleCloseClick = () => navigate('/dashboard')
    
    const handleBikeClick = () => {
        setSport('Cycling') 
        document.getElementById("bike").classList.add('Button__selected') 
        document.getElementById("hike").classList.remove('Button__selected')
        document.getElementById("sky").classList.remove('Button__selected')
        document.getElementById("snow").classList.remove('Button__selected') }
    const handleHikingClick = () => {
        setSport('Hiking')
        document.getElementById("hike").classList.add('Button__selected') 
        document.getElementById("sky").classList.remove('Button__selected')
        document.getElementById("snow").classList.remove('Button__selected')
        document.getElementById("bike").classList.remove('Button__selected') }
    const handleSkiClick = () => {
        setSport('Skiing')
        document.getElementById("sky").classList.add('Button__selected') 
        document.getElementById("snow").classList.remove('Button__selected')
        document.getElementById("hike").classList.remove('Button__selected')
        document.getElementById("bike").classList.remove('Button__selected') }
    const handleSnowClick = () => {
        setSport('Snowshoeing')
        document.getElementById("snow").classList.add('Button__selected') 
        document.getElementById("hike").classList.remove('Button__selected')
        document.getElementById("sky").classList.remove('Button__selected')
        document.getElementById("bike").classList.remove('Button__selected') }
    

    const handleStartClick = async() => {
        try {
            const token = sessionStorage.token
            const activityId = await createActivity(token, sport)
            await addPointToActivity(activityId, position)
            props.onStartClicked(activityId, position)
            navigator.geolocation.clearWatch(watchId)
        } catch (error) {
            handleFeedback({ type: 'error', message: error.message })
        }   
    }
    

    return  <div className="Container overflow mw mh">
        <header className="Activity__header">
            <button className="Activity__button--back" onClick={handleCloseClick}>Close</button>
            <h1 className="center">{sport}</h1>
        </header>


        <main className="Activity__body mw mh">
            { position && <Map position={[position[0], position[1]]} center={false}/> } 
        </main>

        
        <footer className="Activity__footer mw">
            <div className="Activity__footerContainer__selector">
                <button id="bike" className="Button__selected Activity__footer--icon material-symbols-outlined" onClick={handleBikeClick}>directions_bike</button>
                <button id="hike" className="Activity__footer--icon material-symbols-outlined" onClick={handleHikingClick}>hiking</button>
                <button id="sky" className="Activity__footer--icon material-symbols-outlined" onClick={handleSkiClick}>downhill_skiing</button>
                <button id="snow" className="Activity__footer--icon material-symbols-outlined" onClick={handleSnowClick}>snowshoeing</button>
            </div>
            <div className="Activity__footerContainer__buttons">
                <button className="Activity__button--start" onClick={handleStartClick}>Start</button>         
            </div>
        </footer>

    </div> 
}

export default ActivityStart