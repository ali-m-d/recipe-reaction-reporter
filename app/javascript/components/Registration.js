import React from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
class Registration extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isModalOpen: false,
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen 
        });
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
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
            if (res.data.status === 'created') {
                this.props.handleSuccessfulAuth(res.data);
                this.toggleModal();
            } else {
                this.setState({
                    registrationErrors: "Registration cannot be completed"
                });
            }
        })
        .catch(() => {this.props.history.push('/recipes')});
        
        event.preventDefault();
    }
    
    render() {
        return(
            <React.Fragment>
            <button className="btn btn-dark mx-2" style={{width: "10rem"}} onClick={this.toggleModal}>
                Register
            </button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Register</ModalHeader>
                <ModalBody>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-2">
                            {this.state.registrationErrors}
                        </div>
                        <div className="form-group">
                            <div className="d-flex flex-column flex-md-row mb-2">
                                <label for="username" className="mb-0 d-flex flex-row align-items-center label">Username</label>
                                <input
                                    type="username"
                                    name="username"
                                    placeholder="username"
                                    className="form-control"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="d-flex flex-column flex-md-row mb-2">
                                <label for="username" className="mb-0 d-flex flex-row align-items-center label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password confirmation"
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="d-flex flex-column flex-md-row mb-2">
                                <label for="username" className="mb-0 d-flex flex-row align-items-center label">Confirm Password</label>
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    placeholder="password"
                                    className="form-control"
                                    value={this.state.password_confirmation}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-info"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
            </React.Fragment>
        );
    }
}

export default Registration;