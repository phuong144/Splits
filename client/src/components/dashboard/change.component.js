import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Change extends Component {
    constructor(props) {
        
        super(props);
        let _isMounted = false;
        
        
        this.state = {
            user:this.props.user,
          isMounted:false,
          split:'',
          isLoading:true,
        }
        //console.log(this.state.user);
        this.handleClick = this.handleClick.bind(this);
        //console.log("Email : " + this.state.user.email);
    }


    componentDidMount(){
        this._isMounted = true;
        
        //console.log(this.state.user);
        axios.post('/api/users/getSplit', this.state.user)
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
        
        axios.post('/api/users/switch', {user:this.state.user, split: split})
        .then(res => {
            if(res.status = 200 && this._isMounted){
                this.setState({
                    split:res.data.split,
                })
                //alert("Successfully changed splits!");
                console.log(this.state.split);
                
            }else{
                console.log("Unable to change split");
            }
        })
        
    }
    
    render() {
        return(
            <div>
            <h1 style={{textAlign:"center"}}>Current split : {this.state.isLoading? "Loading..." : this.state.split}</h1>
            
            <div className='row' style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <button onClick={(e) => this.handleClick('ppl', e)} href='/'>Push-Pull-Legs</button>
                <button onClick={(e) => this.handleClick('upper/lower', e)} href='/'>Upper - Lower</button>
                <button onClick={(e) => this.handleClick('full', e)} href='/'>Full Body</button>
                
            </div>
            </div>
            

        );
    }
}
Change.propTypes = {
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps
  )(Change);
/*
<a onClick={this.handleClick('ppl')}>Push-Pull-Legs</a>
                <a onClick={this.handleClick('upper/lower')}>Upper - Lower</a>
                <a onClick={this.handleClick('full')}>Full Body</a>*/