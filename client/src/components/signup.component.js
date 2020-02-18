import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: '',
      password: '',
      signup : false,
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

    //console.log(user) if this logs, it will expose pass

    axios.post('http://localhost:4000/users/signup', user)
      .then(res => {
          //console.log(res.data);
          if(res.status == 200){
              this.setState({
                  signup:true,
              })
          }
      });
      // If signup, login and go to homepage

    this.setState({
      email: '',
      password: '',
      
      
    })
  }

  render() {
      if(this.state.signup){
          return(
              <Redirect to="/" />
          )
      }else{
        return (
        <div>
            <h3>Create New User</h3>
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
            <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
            </form>
        </div>
        )
      }
  }
}