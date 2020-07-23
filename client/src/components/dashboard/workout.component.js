import React, {Component} from 'react';
//import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Workout extends Component {
    constructor(props) {
        super(props);
        let _isMounted = false;
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

      
      axios.post('/api/users/workout', user)
      .then(res => {
        //console.log(res.data);
        if(res.status == 200 && this._isMounted == true){
          if(res.data.workoutId == ""){
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
        const { user } = this.props.auth;
        if(this.state.isLoading){
          return (
            <div style={{textAlign:"center"}}>
              <h1>Loading...</h1>
            </div>
          );
        }
        else if(this.state.workoutId == ''){
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
Workout.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps
)(Workout);