import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import signinImg from "../../../images/signin.svg";
import TextField from "../../../components/uielements/textfield";
import Scrollbars from "../../../components/utility/customScrollBar";
import Button from "../../../components/uielements/button";
import authAction from "../../../redux/auth/actions";
import IntlMessages from "../../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signup.style";
import { Checkbox } from "./signup.style";

const { login } = authAction;

class SignUp extends Component {
  state = {
    redirectToReferrer: false,
      Mpass:"",
      Memail:"",
      Mvpass:"",
      Mphone:""
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleLogin = () => {
    const { login } = this.props;
    login();
    let sub=false;
    const {Mpass,Mvpass,Mphone,Memail,username,Password,email,Phone}=this.state
    if(!username&&!Password&&!email&&!Phone){
      this.setState({
        Memail:"enter a valid Email-Id",
        Mvpass:"Password does not match",
        Mpass:"Let Password be more than 6",
        Mphone:"enter a valid number"
      })
     sub=false;
    }
    else{
      sub=true;
    }
    if(!Mphone&&!Mvpass&&!Mpass&&!Memail&&sub){
      console.log("yes")
    }
    else{
      console.log("no")
    }
    //this.props.history.push("/dashboard");
  };
  onChangeUsername = event => this.setState({ username: event.target.value });
  onChangeEmail = event => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(event.target.value).toLowerCase())){
      this.setState({Memail:"enter a valid Email-Id"})
    }
    else{
      this.setState({Memail:""})
    }
    this.setState({ email: event.target.value });
  }
  onChangePassword1 = event =>{
    if(event.target.value.length<6){
      this.setState({Mpass:"Let the Password be more than 6"})
    }
    else{
      this.setState({Mpass:""})
    }
    this.setState({ Password1: event.target.value });
  }
  onChangePassword = event => {
    if(event.target.value!==this.state.Password1){
      this.setState({Mvpass:"Password does not match"})
    }
    else{
      this.setState({Mvpass:""})
    }
    this.setState({ Password: event.target.value });
  }
  
  onChangephone = event => {
  if(event.target.value.length===10){
        console.log(event.target.value.length)
        this.setState({Mphone:""})
      }
  else{
        this.setState({Mphone:"enter valid no."})
      }
    
    this.setState({ Phone: event.target.value });
  }
  render() {
    return (
      <SignUpStyleWrapper className="mateSignUpPage">
        <div className="mateSignInPageImgPart">
          <div className="mateSignInPageImg">
            <img src={signinImg} alt="Kiwi standing on oval" />
          </div>
        </div>

        <div className="mateSignInPageContent">
          <div className="mateSignInPageLink">
            <Link to="/Bsignup">
              <button className="mateSignInPageLinkBtn " type="button">
                Borrower
              </button>
            </Link>
            <Link to="/Lsignup">
              <button className="mateSignInPageLinkBtn active" type="button">
                lender
              </button>
            </Link>
          </div>

          <Scrollbars style={{ height: "100%" }}>
            <div className="mateSignInPageGreet">
              <h1>Welcome lender</h1>
              <p>
                Its Free, Join Us.
              </p>
            </div>
            <div className="mateSignInPageForm">
              <div className="mateInputWrapper">
                <TextField
                  label="Username"
                  placeholder="Username"
                  margin="normal"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="mateInputWrapper">
                <TextField
                  label="Email"
                  placeholder="Email"
                  margin="normal"
                  type="Email"
                  onChange={this.onChangeEmail}
                />
                <span>{this.state.Memail}</span>
              </div>
              <div className="mateInputWrapper">
                <TextField
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  type="Password"
                  onChange={this.onChangePassword1}        
                />
                  <span>{this.state.Mpass}</span>
              </div>
              <div className="mateInputWrapper">
                <TextField
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  margin="normal"
                  type="Password"
                  onChange={this.onChangePassword}
                />
                <span>{this.state.Mvpass}</span>
              </div>
              <div className="mateInputWrapper">
                <TextField
                  label="Phone number"
                  placeholder="Phone number"
                  margin="normal"
                  type="number"
                  onChange={this.onChangephone}      
                />
                <span>{this.state.Mphone}</span>
              </div>
            </div>
            <div className="mateAgreement">
              <div className="mateLoginSubmitCheck">
                <Checkbox color="primary" className="mateTermsCheck" />
                <span className="mateTermsText">
                  <IntlMessages id="page.signUpTermsConditions" />
                </span>
              </div>
              <div className="mateLoginSubmit">
                <Button type="primary" onClick={this.handleLogin}>
                  Sign Up
                </Button>
              </div>
            </div>
          </Scrollbars>
        </div>
      </SignUpStyleWrapper>
    );
  }
}

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false
  }),
  { login }
)(SignUp);
