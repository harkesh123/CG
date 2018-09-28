import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import signinImg from "../../../images/signup.svg";
import Button from "../../../components/uielements/button";
import authAction from "../../../redux/auth/actions";
import TextField from "../../../components/uielements/textfield";
import Scrollbars from "../../../components/utility/customScrollBar";
import SignInStyleWrapper from "./signin.style";
import { CognitoUserPool, CognitoUserAttribute, CognitoUser,AuthenticationDetails} from 'amazon-cognito-identity-js';
import {AWS,AmazonCognitoIdentity} from "aws-sdk";
const { login } = authAction;
class SignIn extends Component {
  state = {
    redirectToReferrer: false,
    username: "",
    password: ""
  };
  // componentWillReceiveProps(nextProps) {
  //   if (
  //     this.props.isLoggedIn !== nextProps.isLoggedIn &&
  //     nextProps.isLoggedIn === true
  //   ) {
  //     this.setState({ redirectToReferrer: true });
  //   }
  // }
  handleLogin = () => {
    const { login } = this.props;
    const { username, password } = this.state;
    login({ username, password });
    if(this.state.username && this.state.password){
     //this.props.history.push("/dashboard");
    }
    console.log(this.state.username,this.state.password)
    var authenticationData = {
        Username : this.state.username,
        Password : this.state.password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);
    const poolData={
    UserPoolId:"us-east-2_qkZPgwHk8",
    ClientId:"27mdf4pe13ciqu6a0qov4vai91"
    }
  var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username : this.state.username,
        Pool : userPool
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();
            if(result.accessToken.jwtToken){
              window.location.replace("/dashboard")
            }
            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = 'us-east-2';

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : 'us-east-2_NSZXuZPqY', // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.us-east-2.amazonaws.com/us-east-2_NSZXuZPqY' : result.getIdToken().getJwtToken()
                }
            });
            console.log(AWS.config.credentials)
            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            AWS.config.credentials.refresh((error) => {
                if (error) {
                     console.error(error);
                } else {
                     // Instantiate aws sdk service objects now that the credentials have been updated.
                     // example: var s3 = new AWS.S3();
                     console.log('Successfully logged!');
                }
            });
        },

        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
        },

    });  
};
  onChangeUsername = event => this.setState({ username: event.target.value });
  onChangePassword = event => this.setState({ password: event.target.value });
  render() {
    const from = { pathname: "/dashboard" };
    const { redirectToReferrer, username, password } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="mateSignInPage">
        <div className="mateSignInPageImgPart">
          <div className="mateSignInPageImg">
            <img src={signinImg} alt="Kiwi standing on oval" />
          </div>
        </div>

        <div className="mateSignInPageContent">
          <Scrollbars style={{ height: "100%" }}>
            <div className="mateSignInPageGreet">
              <h1>Hello </h1>
              <p>
                Welcome to Mate Admin
              </p>
            </div>
            <div className="mateSignInPageForm">
              <div className="mateInputWrapper">
                <TextField
                  label="Username"
                  placeholder="Username"
                  margin="normal"
                  value={username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="mateInputWrapper">
                <TextField
                  label="Password"
                  placeholder="Password"
                  margin="normal"
                  type="Password"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="mateLoginSubmit">
                <Button type="primary"  onClick={this.handleLogin}>
                  Login
                </Button>
              </div>
            </div>
          </Scrollbars>
        </div>
      </SignInStyleWrapper>
    );
  }
}
export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false
  }),
  { login }
)(SignIn);
