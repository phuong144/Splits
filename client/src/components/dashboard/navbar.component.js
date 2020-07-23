import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import './navbar.css';
export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto" style={{margin:"auto"}}>
          <li className="navbar-item">
          <Link to="/dashboard/workout" className="nav-link">View Today's Workout</Link>
          </li>
          <li className="navbar-item">
          <Link to="/dashboard/switch" className="nav-link">Choose Split</Link>
          </li>
        </ul>
        </div>
      </nav>

      /*
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      
        <div className="collpase navbar-collapse" > 
        <div className="navbar-nav mr-auto">
        
        <div className="row" style={{justifyContent:"center"}}>
        <p className="navbar-item">
          <Link to="/dashboard/workout" className="nav-link">View Today's Workout</Link>
          </p>
          
          <p className="navbar-item">
          <Link to="/dashboard/switch" className="nav-link">Choose Split</Link>
          </p>
        </div>
          
        </div>
        </div>
      </nav>
     */
    );
  }
}
//className="navbar navbar-dark bg-dark navbar-expand-lg"