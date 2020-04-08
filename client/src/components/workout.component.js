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
          split:'',
          workoutId: '',
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
            this.setState({
              split : split,
            })
            let workout;
            switch (new Date().getDay()) {
              case 0:
                break;
              case 1:
                //day = "Monday";
                if (split == 'ppl'){
                  workout = 'push1';
                }
                else if (split =='upper/lower'){
                  workout = 'upper1';
                }
                else if(split == 'full'){
                  workout = 'full1';
                }
                this.setState({
                  workout : res.data[split][workout],
                  workoutId : workout,
                })
                break;
              case 2:
                //day = "Tuesday";
                if (split == 'ppl'){
                  workout = 'pull1';
                }
                else if (split =='upper/lower'){
                  workout = 'lower1';
                }
                else if(split == 'full'){
                  workout = '';
                }
                this.setState({
                  workout : res.data[split][workout],
                  workoutId : workout,
                })
                break;
              case 3:
                //day = "Wednesday";
                if (split == 'ppl'){
                  workout = 'leg1';
                }
                else if (split =='upper/lower'){
                  workout = '';
                }
                else if(split == 'full'){
                  workout = '';
                }
                this.setState({
                  workout : res.data[split][workout],
                  workoutId : workout,
                })
                break;
              case 4:
                //day = "Thursday";
                if (split == 'ppl'){
                  workout = 'push2';
                }
                else if (split =='upper/lower'){
                  workout = 'upper2';
                }
                else if(split == 'full'){
                  workout = 'full2';
                }
                this.setState({
                  workout : res.data[split][workout],
                  workoutId : workout,
              })
                break;
              case 5:
                //day = "Friday";
                if (split == 'ppl'){
                  workout = 'pull2';
                }
                else if (split =='upper/lower'){
                  workout = 'lower2';
                }
                else if(split == 'full'){
                  workout = '';
                }
                this.setState({
                  workout : res.data[split][workout],
                  workoutId : workout,
              })
                break;
              case 6:
                //day = "Saturday";
                if (split == 'ppl'){
                  workout = 'leg1';
                }
                else if (split =='upper/lower'){
                  workout = '';
                }
                else if(split == 'full'){
                  workout = '';
                }
                this.setState({
                  workout : res.data[split][workout],
                  workoutId : workout,
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
        if(this.state.workoutId == ''){
          return (
          <div style={{textAlign:"center"}}>
            <h1>REST DAY</h1>
          </div>
          )
        }else{
          return (

            <div style={{textAlign:"center"}}>
              <h1>{this.state.split} - {this.state.workoutId}</h1>
              <pre>{JSON.stringify(this.state.workout, null, 2) }</pre>
            </div>
          )
        }
    }
}