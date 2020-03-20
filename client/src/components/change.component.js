import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import axios from 'axios'
import Navbar from "./navbar.component";
import SignIn from "./signin.component";
import SignUp from "./signup.component";

export default class Switch extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          user:this.props.user,
          isMounted:false,
          split:'',
        }
        this.handleClick = this.handleClick.bind(this);
        //console.log("Email : " + this.state.user.email);
    }


    componentDidMount(){
        this.setState({
            isMounted:true,
        })
        axios.post('http://localhost:4000/User/switch2', this.state.user)
        .then(res => {
            if(res.status = 200 && this.state.isMounted){
                this.setState({
                    split:res.data.split
                })
            }else{
                console.log("Unable to qeury data");
            }
        })
    }
    componentWillUnmount(){
        this.setState({
            isMounted:false,
        })
    }
    
    handleClick(split,e) {
        e.preventDefault();
        axios.post('http://localhost:4000/User/switch', {user:this.state.user, split: split})
        .then(res => {
            if(res.status = 200 && this.state.isMounted){
                this.setState({
                    split:res.data.split,
                })
                //alert("Successfully changed splits!");
                
                
            }else{
                console.log("Unable to change split");
            }
        })
        
    }
    
    render() {
        return(
            <div>
            <h1>Current split : {this.state.split}</h1>
            
            <div className='row'>
                <button onClick={(e) => this.handleClick('ppl', e)} href='/'>Push-Pull-Legs</button>
                <button onClick={(e) => this.handleClick('upper/lower', e)} href='/'>Upper - Lower</button>
                <button onClick={(e) => this.handleClick('full', e)} href='/'>Full Body</button>
                
            </div>
            </div>
            

        );
    }
}
/*
<a onClick={this.handleClick('ppl')}>Push-Pull-Legs</a>
                <a onClick={this.handleClick('upper/lower')}>Upper - Lower</a>
                <a onClick={this.handleClick('full')}>Full Body</a>*/