import React, {Component} from 'react'
import './styles/selectUser.css'
import axios from "axios";

class SelectUser extends Component {
    constructor(props) {
        super(props)
        this.alertRef = React.createRef()
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        this.setState(
            this.props.location.state
        )
    }

    handleClick() {
        axios.post('http://localhost:4200/saveUser',
            {
                image_path: this.state.img_url,
                type: this.state.type,
                username: this.state.name,
                media_count: this.state.media_count
            },
            {
                headers: {
                    'authorization': document.cookie
                }
            }
        ).then((response) => {
            if (response.data) {
                this.alertRef.current.style.display = 'block'
                this.alertRef.current.innerHTML = 'saved'
                this.alertRef.current.className = 'alert-success'
                setTimeout(() => {
                    if (this.alertRef.current) {
                        this.alertRef.current.style.display = 'none'
                    }
                }, 2000)
            } else {
                this.alertRef.current.style.display = 'block'
                this.alertRef.current.className = 'alert-error'
                this.alertRef.current.innerHTML = 'Not Saved'
                setTimeout(() => {
                    if (this.alertRef.current) {
                        this.alertRef.current.style.display = 'none'
                    }
                }, 2000)
            }
        })
    }

    render() {
        return (
            <div className="container mt-5 d-flex justify-content-center">
                <div ref={this.alertRef}></div>
                <div className="card p-3">
                    <div className="d-flex align-items-center">
                        <div className="image"><img
                            alt={this.name}
                            src={this.state.img_url}
                            className="rounded" width="155"/></div>
                        <div className="ml-3 w-100">
                            <h4 className="mb-0 mt-0">{this.state.name}</h4>
                            <div
                                className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                <div className="d-flex flex-column">
                                    <span className="type">Media Count: </span>
                                    <span className="val">{this.state.media_count || "Not defined"}</span>
                                </div>
                                <div className="d-flex flex-column">
                                    <span className="type">Type: </span>
                                    <span className="val">{this.state.type}</span>
                                </div>
                            </div>
                            <div>
                                <button onClick={this.handleClick.bind(this)} className="save-button">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectUser;
