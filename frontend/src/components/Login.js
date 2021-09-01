import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import { withRouter } from "react-router-dom";


class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
          username: "",
          password: "",
          showAlert: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
      axios.get(`http://localhost:8000/api/recruiters/${this.state.username}/`)
      .then(response => {
        if(response.status === 200 && response.data.password === this.state.password) {
          console.log('redirecting')
          this.setState({
            showAlert: false
          });
          this.props.history.push('/dashboard');
        } else {
          this.setState({
            showAlert: true
          });
          console.log('invalid username or password')
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({
          showAlert: true
        });
      });
    }

    render() {
      return(
        <div className="auth-wrapper">
        <div className="auth-inner">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username (default: admin)</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={this.state.username} onChange={e=>this.setState({username: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password (default: password)</Form.Label>
              <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={e=>this.setState({password: e.target.value})} />
            </Form.Group>
            <Button variant="primary" onClick={this.onSubmit}>Login</Button>
          </Form>
          <br/>
          <Alert key="1" show={this.state.showAlert} variant="danger">Invalid username or password!</Alert>
        </div>
        </div>
      );
    }
}

export default withRouter(Login);