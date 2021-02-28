import {Component} from 'react'
import './styles/selectUser.css'
import axios from "axios";

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:4200/getUser",
            {
                headers: {
                    'authorization': document.cookie
                }
            }).then((response) => {
            this.setState({users: response.data})
        })
    }

    deleteUser(image_path) {
        console.log(image_path)
        axios.post('http://localhost:4200/deleteUser',
            {image_path: image_path},
            {
                headers: {
                    'authorization': document.cookie
                }
            }).then((response) => {
            let idx = 0
            this.state.users.forEach((user, index) => {
                if (user.image_path === image_path) idx = index
            })
            this.state.users.splice(idx, 1)
            this.setState({
                users: this.state.users
            })
            console.log(response)
        })
    }

    render() {
        return (
            <div className="flex-items-list">
                {this.state.users.map(user => {
                    return (
                        <div className="flex-items" key={user.image_path}>
                            <div className="container mt-5 d-flex justify-content-center">
                                <div className="card p-3">
                                    <div className="d-flex align-items-center">
                                        <div className="image"><img
                                            alt={user.username}
                                            src={user.image_path}
                                            className="rounded" width="155"/></div>
                                        <div className="ml-3 w-100">
                                            <h4 className="mb-0 mt-0">{user.username}</h4>
                                            <div
                                                className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                                <div className="d-flex flex-column">
                                                    <span className="type">Media Count: </span>
                                                    <span className="val">{user.media_count || "Not defined"}</span>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <span className="type">Type: </span>
                                                    <span className="val">{user.type}</span>
                                                </div>
                                                <button onClick={this.deleteUser.bind(this, user.image_path)}>Delete
                                                    user
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Users;
