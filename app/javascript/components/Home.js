import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { TweenMax, Power3 } from 'gsap';
import Registration from '../components/Registration';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    
    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        // this.props.history.push("/dashboard");
    }
    
    handleLogoutClick() {
        this.props.handleLogout();
        axios.delete(
            'api/v1/logout',
            {
                withCredentials: true
            }
        )
        .then(res => {
            this.props.handleLogout();
        })
        .catch(err => {
            console.log(err);
        });
    }
    render() {
        // let heroItem = useRef("test");
        // console.log(useRef)
        
        return(
            <React.Fragment>
                <div id="homepage" className="vw-100 vh-100 bg-primary-color d-flex flex-column">
                    <div className="bg-secondary-color mt-5 h-50">
                        <div className="container d-flex flex-column justify-items-center">
                            <div className="align-self-center">
                                <h1 className="home-title display-4"><span>R</span>ecipe<span>R</span>eaction<span>R</span>eporter</h1>
                            </div>
                            <p className="lead mb-0 align-self-center">
                                A place for sharing and reacting to recipes
                            </p>
                            <div>
                            <hr className="my-4" />
                            </div>
                            <p className="align-self-center">
                                Please feel free to browse the recipes uploaded by our users, or add one of your own.
                                Registration is only required if you wish to report your reaction to a recipe. Enjoy!
                            </p>
                            <div className="d-flex flex-row justify-content-center">
                                <Link
                                    to="/recipes"
                                    className="btn btn-lg btn-dark mx-2 w-25"
                                    role="button"
                                >
                                    Browse Recipes
                                </Link>
                                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                            </div>
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}

export default Home;