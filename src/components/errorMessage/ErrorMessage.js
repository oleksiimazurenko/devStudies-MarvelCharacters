import { Component } from "react";
import img from './error.gif'

class ErrorMessage extends Component{
  render(){
    return (
      <img src={img} alt="error" style={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}} />
    )
  }
}

export default ErrorMessage;