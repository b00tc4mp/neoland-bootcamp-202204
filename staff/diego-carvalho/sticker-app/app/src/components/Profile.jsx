import { Component } from 'react'
import ChangeName from './ChangeName'
import ChangePassword from './ChangePassword'
import DeleteUser from './DeleteUser'

class Profile extends Component {
    state = { view: null }

    handleChangeNameClick = () => this.setState({ view: 'change-name' })

    handleChangePasswordClick = () => this.setState({ view: 'change-password' })

    handleDeleteUserClick = () => this.setState({ view: 'delete-user' })//no esta bien


    render() {
        return <div className="Profile Container">
            <button className="Profile__changeName" onClick={this.handleChangeNameClick}>Change Name</button>
            <button className="Profile__changePassword" onClick={this.handleChangePasswordClick}>Change Password</button>
            <button className="Profile__deleteUser" onClick={this.handleDeleteUserClick}>Delete user</button>

            {this.state.view === 'change-name' && <ChangeName />}
            {this.state.view === 'change-password' && <ChangePassword />}
            {this.state.view === 'delete-user' && <DeleteUser />} 

        </div>
    }
}

export default Profile

