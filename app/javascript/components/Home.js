import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Registration from '../components/Registration';
import Login from '../components/Login';

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
        return(
            <div>
                <div id="jumbotron-container">
                    <div className="jumbotron jumbotron-fluid p-5">
                        <div className="container">
                            <h1 className="display-4">RecipeReactionReporter</h1>
                            <p className="lead">
                                A curated list of recipes for the best homemade meals and delicacies.
                            </p>
                            <hr className="my-4" />
                            <Link
                                to="/recipes"
                                className="btn btn-lg btn-dark"
                                role="button"
                            >
                                View Recipes
                            </Link>
                        </div>
                    </div>
                </div>
                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
            </div>
        );
    }
}

export default Home;