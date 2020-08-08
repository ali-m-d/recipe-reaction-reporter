import React from 'react';
import axios from 'axios';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit(event) {
        
        const {
            username,
            password,
            password_confirmation
        } = this.state;
        
        axios.post(
            "api/v1/registrations", {
            user: {
                username: username,
                password: password,
                password_confirmation: password_confirmation
            }
        },
        {
            withCredentials: true
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
        event.preventDefault();
    }
    
    render() {
        return(
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <h1 className="font-weight-normal mb-5">
                            Register
                        </h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="username"
                                    name="username"
                                    placeholder="username"
                                    className="form-control mb-3"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password confirmation"
                                    className="form-control mb-1"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="password"
                                    className="form-control"
                                    value={this.state.password_confirmation}
                                    onChange={this.handleChange}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="btn btn-info mt-3"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;