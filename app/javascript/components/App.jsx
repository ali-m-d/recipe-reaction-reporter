import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
            logginInStatus: "NOT_LOGGED_IN",
            user: {}
        };
    }
    
    
    render() {
        return(
            <div className="app">
                <Router>
                    <Switch>
                        <Route path="/" exact component={ Home } />
                        <Route path="/recipes" exact component={ Recipes } />
                        <Route path="/recipe/:id" exact component={ Recipe } />
                        <Route path="/recipe" exact component={ NewRecipe } />
                        <Route path="/dashboard" exact component={ Dashboard } />
                        <Route path="/registration" exact component={ Registration } />
                    </Switch>
                </Router>
            </div>
        );
    }
    
}

export default App;
