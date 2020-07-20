import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
export default class Navbar extends Component {

  render() {
    return (
      <div>

      
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      
        <div className="collpase navbar-collapse" > 
        <div className="navbar-nav mr-auto">
        <h1 style={{color:"white"}}>Splits</h1>
        <div className="row" style={{justifyContent:"center"}}>
        <p className="navbar-item">
          <Link to="/home/workout" className="nav-link">View Today's Workout</Link>
          </p>
          
          <p className="navbar-item">
          <Link to="/home/switch" className="nav-link">Choose Split</Link>
          </p>
        </div>
          
        </div>
        </div>
      </nav>
      </div>
    );
  }
}
//className="navbar navbar-dark bg-dark navbar-expand-lg"