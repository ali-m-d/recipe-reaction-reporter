import React from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
         Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import logo from '../../assets/images/chef.svg';
import Login from '../components/Login';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            loggedInStatus: this.props.loggedInStatus
        };
        if (JSON.parse(localStorage.getItem("user"))) {
            this.state = {
                loggedInStatus: "LOGGED_IN"
            };
        }
       
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    
    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.setState({
            loggedInStatus: "LOGGED_IN"
        });
    }
    
    handleLogoutClick() {
        this.props.handleLogout();
        const sessionsController = axios.create({
            baseURL: '/'
        });
        sessionsController.delete(
            'api/v1/logout',
            {
                withCredentials: true
            }
        )
        .then(res => {
            this.props.handleLogout();
            this.setState({
                loggedInStatus: "NOT_LOGGED_IN"
            });
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen     
        });
    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen 
        });
    }
    handleLogin() {
        this.toggleModal();
    }
    
    render() {
        return(
            <React.Fragment>
                <Navbar dark className="custom-nav" expand="md" sticky="top">
                  <div className="container">
                    <NavbarToggler className="ml-auto" onClick={this.toggleNav} />
                    <NavbarBrand className="mr-auto d-flex flex-row" href="/">
                    {this.state.loggedInStatus}
                        <img src={logo} width="70" height="70" alt="logo" />
                        <div className="ml-2 align-self-center font-weight-light title"><span>R</span>ecipe<span>R</span>esponse<span>R</span>eporter</div>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isNavOpen} navbar>    
                        <Nav navbar className="ml-auto" id="custom-nav">
                            <NavItem className="mt-2">
                                <NavLink className="nav-link d-flex flex-column flex-lg-row align-items-center" id="home" exact to="/">
                                    <FontAwesomeIcon icon={faHome} /><div className="ml-lg-1">Home</div>
                                </NavLink>
                            </NavItem>
                            <NavItem className="mt-2">
                                <NavLink className="nav-link d-flex flex-column flex-lg-row align-items-center" to="/recipes">
                                    <FontAwesomeIcon icon={faUtensils} /><div className="ml-lg-1">Recipes</div>
                                </NavLink>
                            </NavItem>
                            <NavItem className="mt-2">
                                <NavLink className="nav-link d-flex flex-column flex-lg-row align-items-center" to="/recipe">
                                    <FontAwesomeIcon icon={faPencilAlt} /><div className="ml-lg-1">Add</div>
                                </NavLink>
                            </NavItem>
                            <NavItem className="mt-2 ml-2">
                                {this.state.loggedInStatus === "NOT_LOGGED_IN" &&
                                    <Button color="info" className="custom-btn d-flex flex-column flex-lg-row align-items-center" onClick={this.toggleModal}>
                                            Login
                                    </Button>
                                }
                                {this.state.loggedInStatus === "LOGGED_IN" &&
                                    <Button color="info" className="custom-btn d-flex flex-column flex-lg-row align-items-center" onClick={this.handleLogoutClick}>
                                            Logout
                                    </Button>
                                }
                            </NavItem>
                        </Nav>
                    </Collapse> 
                  </div>
                </Navbar>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} handleLogin={this.handleLogin} />
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;