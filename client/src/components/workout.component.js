import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import axios from 'axios'
import Navbar from "./navbar.component";
import SignIn from "./signin.component";
import SignUp from "./signup.component";

export default class Workout extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          user:this.props.user,
          workout:{},
        }
        console.log("Email : " + this.state.user.email);
    }

    componentDidMount() {
        axios.post('http://localhost:4000/User/workout', this.state.user)
      .then(res => {
        //console.log(res.data);
        if(res.status == 200){
            this.setState({
                workout : res.data,
            })
            console.log(res.data)
        }else{
          console.log("Failed to get workout");
        }
      }
        
    );
    }
    render() {
        return (
          <div><pre>{JSON.stringify(this.state.workout, null, 2) }</pre></div>
        )
    }
}