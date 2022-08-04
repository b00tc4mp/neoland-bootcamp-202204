import { useState } from 'react'
import ChangePassword from './ChangePassword'
import ChangeName from './ChangeName'
import DeleteUser from './DeleteUser'
import './Profile.sass'

function Profile(props) {
    const [view, setView] = useState(null)

    const handleChangeName = event => {
        event.preventDefault()

        setView('changeName')
    }

    const handleChangePassword = event => {
        event.preventDefault()

        setView('changePassword')
    }

    const handleDeleteUser = event => {
        event.preventDefault()

        setView('deleteUser')
    }

    const handleOnProfileChange = () => {
        setView(null)
    }

    return <div className="Profile">
        <div className="Profile__Buttons"><a className="ChangeNameButton button__profile" onClick={handleChangeName} >Change Name</a>
            <a className="ChangePasswordButton button__profile" onClick={handleChangePassword} >Change Password</a>
        </div>
        <a className="DeleteUserButton button__profile" onClick={handleDeleteUser} >Delete User</a>
        {view === 'changeName' && <ChangeName username={props.username} onChangedName={handleOnProfileChange} onChangedNameHome={props.onChangedName} name={props.name} />}
        {view === 'changePassword' && <ChangePassword username={props.username} onChangedPassword={handleOnProfileChange} />}
        {view === 'deleteUser' && <DeleteUser username={props.username} onDeletedUser={props.onDeletedUser} />}
    </div>
}

export default Profile