import {Component} from 'react'
import './styles/selectUser.css'

class SelectUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        this.setState(
            this.props.location.state
        )
    }

    render() {
        console.log(this.state)
        return (
            <div className="container mt-5 d-flex justify-content-center">
                <div className="card p-3">
                    <div className="d-flex align-items-center">
                        <div className="image"><img
                            alt={this.name}
                            src={this.state.img_url}
                            className="rounded" width="155"/></div>
                        <div className="ml-3 w-100">
                            <h4 className="mb-0 mt-0">{this.state.name}</h4>
                            <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
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
                                <button className="save-button">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectUser;
