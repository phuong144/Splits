import React, {Component} from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Workout extends Component {
    constructor(props) {
        super(props);
        // let _isMounted = false;
        this.state = {
          user:this.props.user,
          split:'',
          workoutId: '',
          workout:{},
          isLoading:true,
        }
        //console.log(this.state.user);
    }

    componentDidMount() {
      this._isMounted = true;
      const { user } = this.props.auth;
      let today = new Date();
      let weekday = today.getDay();

      
      axios.post('/api/users/workout', {user:user, weekday:weekday})
      .then(res => {
        //console.log(res.data);
        if(res.status === 200 && this._isMounted){
          // console.log("weekday = "+res.data.weekday);
          if(res.data.workoutId === ""){
            this.setState({
              workoutId : "", 
              isLoading:false,
            })
          }else{
            this.setState({
              split : res.data.split,
              workoutId : res.data.workoutId,
              workout:res.data.workout,
              isLoading:false,
            })
          }
        }else{
          console.log("Unmounted");
        }
      })
    }

    componentWillUnmount() {
      this._isMounted=false
    }

    render() {
        if(this.state.isLoading){
          return (
            <div style={{textAlign:"center"}}>
              <h1>Loading...</h1>
            </div>
          );
        }
        else if(this.state.workoutId === ''){
          return (
          <div style={{textAlign:"center"}}>
            <h1>REST DAY</h1>
          </div>
          )
        }else{
          const workoutList = [];
          for (const name in this.state.workout) {
            if (this.state.workout.hasOwnProperty(name)) {
                // console.log(name + " -> " + this.state.workout[name]);
                workoutList.push(<li key={name}>{name} : {this.state.workout[name]}</li>)
            }
          }
          return (
            <div style={{textAlign:"center"}}>
              <h3>{this.state.split.toUpperCase()} - {this.state.workoutId.toUpperCase()}</h3>
              <ul>
                {workoutList}
              </ul>
            </div>
          )
        }
    }
    
}
Workout.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Workout);