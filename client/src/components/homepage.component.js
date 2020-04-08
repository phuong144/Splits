import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./navbar.component";
import SignIn from "./signin.component";
import SignUp from "./signup.component";
import Workout from "./workout.component";
import Switch from "./change.component";
export default class HomePage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          user:this.props.location.state.user,
          split:this.props.location.state.user.split,
          
        }
        console.log(this.state.user.email);
    }
    render() {
        return (
            <Router>
                <div className="container">
                <Navbar />
                <br/>
                <Route 
                    path="/workout" 
                    render={(props) => <Workout {...props} user={this.state.user} />}
                />
                <Route 
                    path="/switch" 
                    render={(props) => <Switch {...props} user={this.state.user}/>}
                />
                </div>
            </Router>
        )
    }
}
    