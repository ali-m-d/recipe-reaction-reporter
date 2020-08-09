import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Home from '../components/Home';
import Recipes from '../components/Recipes';
import Recipe from '../components/Recipe';
import NewRecipe from '../components/NewRecipe';
import Dashboard from '../components/Dashboard';
import Registration from '../components/Registration';

class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loggedInStatus: "NOT_LOGGED_IN",
            user: {}
        };
        
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    checkLoginStatus() {
        axios.get(
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
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    componentDidMount() {
        this.checkLoginStatus();
    }
    
    handleLogin(data) {
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
    
    render() {
        return(
            <div className="app">
                <Router>
                    <Switch>
                        <Route exact 
                            path={"/"} 
                            render={props => (
                                <Home 
                                    {...props}
                                    handleLogin={this.handleLogin} 
                                    handleLogout={this.handleLogout}
                                    loggedInStatus={this.state.loggedInStatus} 
                                />
                            )} 
                        />
                        <Route exact 
                            path={"/recipes"} 
                            render={props => (
                                <Recipes {...props} loggedInStatus={this.state.loggedInStatus} />
                            )}
                        />
                        <Route exact 
                            path={"/recipe/:id"} 
                            render={props => (
                                <Recipe {...props} loggedInStatus={this.state.loggedInStatus} />
                            )}
                        />
                        <Route path="/recipe" exact component={ NewRecipe } />
                        <Route exact 
                            path={"/dashboard"} 
                            render={props => (
                                <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} />
                            )} 
                        />
                        <Route path="/registration" exact component={ Registration } />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
