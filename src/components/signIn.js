import React, {Component} from 'react'
import axios from "axios";
import './styles/selectUser.css'

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.refUser = React.createRef()
        this.refPass = React.createRef()
        this.refAlert = React.createRef()
    }

    clickHandler() {
        axios.post('http://localhost:4200/login',
            {
                username: this.refUser.current.value,
                password: this.refPass.current.value
            }).then((response) => {
            if (response.data) {
                document.cookie = 'authorization=' + response.data.accessToken
                this.refAlert.current.style.display = 'block'
                this.refAlert.current.innerHTML = 'Successfully logged in'
                this.refAlert.current.className = 'alert-success'
                setTimeout(() => {
                    if (this.refAlert.current) {
                        this.refAlert.current.style.display = 'none'
                    }
                }, 2000)
            }
        }).catch((error)=>{
            this.refAlert.current.style.display = 'block'
            this.refAlert.current.innerHTML = 'user or password is incorrect'
            this.refAlert.current.className = 'alert-error'
            setTimeout(() => {
                if (this.refAlert.current) {
                    this.refAlert.current.style.display = 'none'
                }
            }, 2000)
        })
    }

    render() {
        return (
            <div>
                <div ref={this.refAlert}></div>
                <div className="container">
                    <label htmlFor="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" ref={this.refUser} name="uname" required/>
                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" ref={this.refPass} name="psw" required/>
                    <button onClick={this.clickHandler.bind(this)} className="loginButton" type="submit">Login</button>
                </div>
            </div>
        )
    }
}

export default SignIn;
