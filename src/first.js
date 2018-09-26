import React, { Component } from "react";
import { Link } from "react-router-dom";

class First extends Component{
	render(){
		return(
			<div>
			<div>
          <Link to="/Bsignup"> Sign up</Link></div>
          <div>
           <Link to="/signin"> Sign in</Link>
			</div>
			</div>
			)
	}
}

export default First;