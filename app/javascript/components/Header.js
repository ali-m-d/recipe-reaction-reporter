import React from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
         Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
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
       
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.loggedInStatus !== prevProps.loggedInStatus) {
            this.setState({
                loggedInStatus: this.props.loggedInStatus
            });
        }
    }
    
    handleSuccessfulAuth(data) {
        this.toggleModal();
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
    
    render() {
        return(
            <React.Fragment>
                <Navbar dark className="custom-nav py-0" expand="md">
                  <div className="container ml-auto">
                    <NavbarBrand className="mr-auto d-flex flex-row" href="/">
                        <img src={logo} width="70" height="70" alt="logo" />
                        <div className="ml-2 align-self-center font-weight-light title"><span>R</span>ecipe<span>R</span>esponse<span>R</span>eporter</div>
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>    
                        <Nav navbar className="d-flex flex-column flex-md-row justify-content-between align-items-center ml-auto" id="custom-nav">
                            <NavItem className="mb-1 mb-md-0">
                                <NavLink className="nav-link d-flex flex-column flex-lg-row align-items-center" id="home" exact to="/">
                                    <FontAwesomeIcon icon={faHome} /><div className="ml-lg-1">Home</div>
                                </NavLink>
                            </NavItem>
                            <NavItem className="mb-1 mb-md-0">
                                <NavLink className="nav-link d-flex flex-column flex-lg-row align-items-center" exact to="/recipes">
                                    <FontAwesomeIcon icon={faUtensils} /><div className="ml-lg-1">Recipes</div>
                                </NavLink>
                            </NavItem>
                            <NavItem className="mb-1 mb-md-0">
                                <NavLink className="nav-link d-flex flex-column flex-lg-row align-items-center" to="/recipe">
                                    <FontAwesomeIcon icon={faPencilAlt} /><div className="ml-lg-1">Add</div>
                                </NavLink>
                            </NavItem>
                            <NavItem className="mb-3 mb-md-0 ml-md-2">
                                {this.state.loggedInStatus === "NOT_LOGGED_IN" &&
                                    <Button color="info" className="styled-btn d-flex flex-column flex-lg-row align-items-center" onClick={this.toggleModal}>
                                            Login
                                    </Button>
                                }
                                {this.state.loggedInStatus === "LOGGED_IN" &&
                                    <Button color="info" className="styled-btn d-flex flex-column flex-lg-row align-items-center" onClick={this.handleLogoutClick}>
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
                        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;