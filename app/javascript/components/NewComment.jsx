import React from 'react';
import axios from 'axios';

class NewComment extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            content: ""
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
        
        axios.post(
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
                console.log("calling handleSuccessfulAuth()");
            }
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
        event.preventDefault();
    }
    
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
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
                                <button
                                    type="submit"
                                    className="btn btn-info mt-3"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewComment;