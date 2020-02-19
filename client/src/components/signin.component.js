import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: '',
      password: '',
      loggedin : false,
      user:{},
    }
  }

  onChangeUsername(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    //console.log(user);

    axios.post('http://localhost:4000/User/signin', user)
      .then(res => {
        //console.log(res.data);
        if(res.status == 200){
            this.setState({
                loggedin : true,
            })
        }
      }
        
    );
      // If signin, login and go to homepage

    this.setState({
      email: '',
      password: '',
      user : user,
      
    })
  }

  render() {
      if(this.state.loggedin){
          return(
            <Redirect to={{
                pathname:'/home',
                state: {user : this.state.user}
            }}
            />
          )
      }else{
        return (
        
            <div>
              <h3>Sign In</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                  <label>Username: </label>
                  <input  type="text"
                      required
                      className="form-control"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      />
                  <label>Password: </label>
                  <input  type="text"
                      required
                      className="form-control"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      />
                </div>
                <div className="row">
                    <div className="form-group">
                    <input type="submit" value="Sign In" className="btn btn-primary" />
                    </div>
                    <div className="form-group">
                    <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                    </div>
                </div>
              </form>
            </div>
          )
        }
      
    
  }
}