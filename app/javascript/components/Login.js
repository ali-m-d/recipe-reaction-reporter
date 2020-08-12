import React from 'react';
import axios from 'axios';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            password: "",
            loginErrors: ""
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleSubmit(event) {
        
        const {
            username,
            password
        } = this.state;
        
        const sessionsController = axios.create({
            baseURL: '/'
        });
        
        sessionsController.post(
            "api/v1/sessions", {
            user: {
                username: username,
                password: password
            }
        },
        {
            withCredentials: true
        })
        .then(res => {
            if (res.data.logged_in) {
                this.props.handleSuccessfulAuth(res.data); 
                this.props.handleLogin();
            } else if (!res.data.logged_in) {
                this.setState({
                    loginErrors: "Could not find a user matching those credentials"
                });
            }
        })
        .catch(() => {
            this.setState({
                loginErrors: "Could not find a user matching those credentials"
            });
        });
        
        event.preventDefault();
    }
    
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <div className="mb-2">
                        {this.state.loginErrors}
                    </div>
                    <div className="d-flex flex-column flex-md-row mb-2">
                        <label for="username" className="mb-0 d-flex flex-row align-items-center label">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            className="form-control mb-0"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="d-flex flex-column flex-md-row">
                        <label for="password" className="mb-0 d-flex flex-row align-items-center label">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="password confirmation"
                            className="form-control mb-1"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-info mt-3"
                    >
                        Login
                    </button>
                </div>
            </form>
        );
    }
}

export default Registration;