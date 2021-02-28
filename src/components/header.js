import {Component} from 'react'
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import SignIn from "./signIn";
import SignUp from "./signUp";
import SelectUser from "./selectUser";
import Body from "./body";
import './styles/header.css'
import Users from "./users";

class Header extends Component {
    render() {
        return (
            <div>
                <Router>
                    <nav>
                        <ul>
                            <li>
                                <Link className="link" to="/">Home</Link>
                                <Link className="link" to="/users">Users/Tags</Link>
                                <Link className="link" to="/signUp">Sign Up</Link>
                                <Link className="link" to="/signIn">Sign In</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path='/' exact component={Body}/>
                        <Route path='/selectUser' component={SelectUser}/>
                        <Route path='/signIn' component={SignIn}/>
                        <Route path='/signUp' component={SignUp}/>
                        <Route path='/users' component={Users}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Header;
