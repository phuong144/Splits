import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import Navbar from "./navbar.component";
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
                <Route exact path="/home">
                        <Redirect to="/home/workout" />
                </Route>
                <Route 
                    path="/home/workout" 
                    render={(props) => <Workout {...props} user={this.state.user} />}
                />
                <Route 
                    path="/home/switch" 
                    render={(props) => <Switch {...props} user={this.state.user}/>}
                />
                </div>
            </Router>
        )
    }
}
    