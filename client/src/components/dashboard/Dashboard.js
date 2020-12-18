import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "./Navbar";
import Workout from "./Workout";
import Choose from "./Choose";
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Container from '@material-ui/core/Container';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
    return (
      <Router>
        <Container maxWidth='sm' style={{display:'block', marginTop:'64px'}}>
          <Navbar />
          <Route exact path="/dashboard">
                  <Redirect to="/dashboard/workout" />
          </Route>
          <Route 
              path="/dashboard/workout" 
              render={(props) => <Workout {...props} user={user} />}
          />
          <Route 
              path="/dashboard/switch" 
              render={(props) => <Choose {...props} user={user}/>}
          />
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
              marginLeft:"auto",
              marginRight:"auto",
              display:"block"
            }}
            onClick={this.onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>
        </Container>
      </Router>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);