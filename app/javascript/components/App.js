import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import axios from 'axios';
import Home from '../components/Home';
import Recipes from '../components/Recipes';
import Recipe from '../components/Recipe';
import NewRecipe from '../components/NewRecipe';
import Registration from '../components/Registration';
import Header from '../components/Header';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
            currentPage: 1
        };
        
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.setCurrentPage = this.setCurrentPage.bind(this);
    }
    
    checkLoginStatus() {
        const sessionsController = axios.create({
            baseURL: '/'
        });
        sessionsController.get(
            'api/v1/logged_in', 
            { 
                withCredentials: true 
            })
        .then(res => {
            if (res.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN") {
                this.setState({
                    loggedInStatus: "LOGGED_IN",
                    user: res.data.user
                });
            } else if (!res.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
                this.setState({
                    loggedInStatus: "NOT_LOGGED_IN",
                    user: {}
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    componentDidMount() {
        this.checkLoginStatus();
    }
    
    handleLogin(data) {
        console.log("inside handleLogin of app component")
        this.setState({
            loggedInStatus: "LOGGED_IN",
            user: data.user
        });
        localStorage.setItem('user', JSON.stringify(data.user))
    }
    
    handleLogout() {
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
        });
        localStorage.clear();
    }
    
    setCurrentPage(pageNumber) {
        this.setState({
            currentPage: pageNumber
        });
    }
    
    render() {
        return(
            <div className="app">
                
                <Router>
                    <Header 
                        loggedInStatus={this.state.loggedInStatus}
                        handleLogin={this.handleLogin} 
                        handleLogout={this.handleLogout} 
                    />
                    <Switch>
                        <Route exact 
                            path={"/"} 
                            render={props => (
                                <Home 
                                    {...props}
                                    handleLogin={this.handleLogin} 
                                    loggedInStatus={this.state.loggedInStatus} 
                                />
                            )} 
                        />
                        <Route exact 
                            path={"/recipes"} 
                            render={props => (
                                <Recipes 
                                    {...props}
                                    loggedInStatus={this.state.loggedInStatus}
                                    currentPage={this.state.currentPage}
                                    setCurrentPage={this.setCurrentPage}
                                />
                            )}
                        />
                        <Route exact 
                            path={"/recipes/:id"} 
                            render={props => (
                                <Recipe {...props} 
                                    handleLogin={this.handleLogin} 
                                    loggedInStatus={this.state.loggedInStatus}
                                />
                            )}
                        />
                        <Route path="/recipe" exact component={ NewRecipe } />
                        <Route path="/registration" exact component={ Registration } />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
