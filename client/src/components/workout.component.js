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
          split:{},
          workout:{},
        }
        console.log("Email : " + this.state.user.email);
    }

    componentDidMount() {
        axios.post('http://localhost:4000/User/workout', this.state.user)
      .then(res => {
        //console.log(res.data);
        if(res.status == 200){
            let split = res.data._id;
            switch (new Date().getDay()) {
              case 0:
                //day = "Sunday";
                break;
              case 1:
                //day = "Monday";
                //if split == 'ppl', workout = push1
                //else if split =='upper/lower' = upper1
                this.setState({
                  workout : res.data[split]['push1'],
              })
                break;
              case 2:
                 //day = "Tuesday";
                 this.setState({
                  workout : res.data[split]['pull1'],
              })
                break;
              case 3:
                //day = "Wednesday";
                this.setState({
                  workout : res.data[split]['leg1'],
              })
                break;
              case 4:
                //day = "Thursday";
                this.setState({
                  workout : res.data[split]['push2'],
              })
                break;
              case 5:
                //day = "Friday";
                this.setState({
                  workout : res.data[split]['pull2'],
              })
                break;
              case 6:
                //day = "Saturday";
                this.setState({
                  workout : res.data[split]['leg'],
              })
            }

            //console.log(res)
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