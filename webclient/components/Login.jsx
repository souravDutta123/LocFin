import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';

import {teal300,cyan300,pink500,pink50,pink300} from 'material-ui/styles/colors';

const styles = {
  paperStyle : {
    marginTop : '30px',
    width : 'fit-content',
    minWidth : '400px',
    marginLeft : 'auto',
    marginRight : 'auto',
    paddingBottom : '10px',
    backgroundColor : pink50,
    opacity : '1',
    borderRadius : '10px'
  },
  subheaderStyle : {
    height : '100px',
    textAlign : 'center',
    backgroundColor : teal300,
    backgroundImage : `url('../images/login_header_background.jpg')`,
    backgroundSize : 'cover',
    paddingTop : '30px'
  },
  textFieldStyle : {

  },
  floatingLabelStyle : {
    color : pink300
  },
  underlineStyle: {
    borderColor : pink300
  },
  textFieldDivStyle : {
    textAlign : 'center'
  },
  loginButtonStyle : {
    marginLeft : 'auto',
    marginRight : 'auto'
  },
  signInTextStyle : {
    fontSize : '30px',
    fontStyle : 'italic',
    fontWeight : 600,
    color : '#FFF'
  }
}

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginData : {
        email : '',
        password : ''
      },
      error : {
        email : '',
        password : ''
      },
      status : {
        email : false,
        password : false
      },
      errorMessage : '',
      submitDisabled : true
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleInputChange(event){
    const loginData = this.state.loginData;
    loginData[event.target.name] = event.target.value;
    this.setState({loginData});
    this.validateInputs(event.target.name,event.target.value);
  }
  validateInputs(name,value){
    const status = this.state.status;
    const error = this.state.error;
    switch (name) {
      case 'email':
        if(value === ''){
          error.email = 'Required';
          status.email = false;
        }else{
          error.email = '';
          status.email = true;
        }
        break;
      case 'password':
        if(value === ''){
          error.password = 'Required';
          status.password = false;
        }else{
          error.password = '';
          status.password = true;
        }
        break;
      default:

    }
    this.setState({submitDisabled : !Object.values(status).every((ele) => {return ele}),status,error});
  }
  handleLogin(){
    if(Object.values(this.state.status).every((ele) => {return ele})){
      const that = this;
      axios({
        method : 'post',
        url : '/auth/login',
        data : that.state.loginData
      })
      .then(function(response){
        if(response.status === 200 && response.data.success){
          localStorage.setItem('locfin',response.data.access_token);
          that.props.history.push('/dashboard');
        }
      })
      .catch(function(error){
        console.log(error);
      });
    }
  }
  render(){
    return (
      <Paper style = {styles.paperStyle}>
        <Subheader style = {styles.subheaderStyle}><span style = {styles.signInTextStyle}>LocFin</span></Subheader>
        <div style = {styles.textFieldDivStyle}>
          <TextField
            floatingLabelText = 'Email Id'
            errorText = {this.state.error.email}
            floatingLabelStyle = {styles.floatingLabelStyle}
            underlineStyle = {styles.underlineStyle}
            underlineFocusStyle = {styles.underlineStyle}
            name = 'email'
            value = {this.state.loginData.email}
            onChange = {this.handleInputChange}
          />
        </div>
        <div style = {styles.textFieldDivStyle}>
          <TextField
            floatingLabelText = 'Password'
            errorText = {this.state.error.password}
            type = 'password'
            floatingLabelStyle = {styles.floatingLabelStyle}
            underlineStyle = {styles.underlineStyle}
            underlineFocusStyle = {styles.underlineStyle}
            name = 'password'
            value = {this.state.loginData.password}
            onChange = {this.handleInputChange}
          />
        </div>
        <div style = {styles.textFieldDivStyle}>
          <RaisedButton
            label = 'Sign In'
            backgroundColor = {pink300}
            labelColor = '#FFF'
            disabled = {this.state.submitDisabled}
            onClick = {this.handleLogin}
          />
        </div>
        <br/>
        <div style = {styles.textFieldDivStyle}>
          <Link onClick = {this.props.goToRegister} to = '/'>Create an account?</Link>
        </div>
      </Paper>
    )
  }
}

export default withRouter(Login);
