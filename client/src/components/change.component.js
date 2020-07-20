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
        let _isMounted = false;
        this.state = {
          user:this.props.user,
          isMounted:false,
          split:'',
          isLoading:true,
        }
        this.handleClick = this.handleClick.bind(this);
        //console.log("Email : " + this.state.user.email);
    }


    componentDidMount(){
        this._isMounted = true;
        axios.post('https://splits-app.herokuapp.com/User/switch2', this.state.user)
        .then(res => {
            if(res.status = 200 && this._isMounted){
                this.setState({
                    split:res.data.split,
                    isLoading:false,
                })
            }else{
                console.log("Unable to qeury data");
            }
        })
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    
    handleClick(split,e) {
        e.preventDefault();
        axios.post('https://splits-app.herokuapp.com/User/switch', {user:this.state.user, split: split})
        .then(res => {
            if(res.status = 200 && this._isMounted){
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
            <h1 style={{textAlign:"center"}}>Current split : {this.state.split}</h1>
            
            <div className='row' style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
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