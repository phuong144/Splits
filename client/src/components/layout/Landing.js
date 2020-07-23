import React, { Component } from "react";
import { Link } from "react-router-dom";
class Landing extends Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        
          <div className="col s12 center-align">
            <h4>
              <b>Welcome to Splits</b> 
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Have access to the most effective science-based workout in a click of a button
              <br></br>
              Customizable workout schedule to fit your preferences
            </p>
            <br />
            <div className="row" style={{justifyContent:"center"}}>

            
            <div className="">
              <Link
                to="/register"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            <div className="">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
            </div>
          </div>
        
      </div>
    );
  }
}
export default Landing;