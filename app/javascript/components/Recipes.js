import React from 'react';
import { Link } from 'react-router-dom';

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        }
    }
    
    componentDidMount() {
        
        const url = "/api/v1/recipes/index";
        fetch(url)
        .then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error('Network response not ok');
            }
        })
        .then((resp) => {this.setState({recipes: resp})})
        .catch(() => {this.props.history.push('/')})
    }
    
    render() {
        console.log(this.state.recipes);
        const { recipes } = this.state;
        const allRecipes = recipes.map((recipe, index) => (
         
                <div key={index} className="col-md-6 col-lg-4">
                    <div className="card mb-4">
                        
                        <img
                            src={recipe.image}
                            className="card-img-top recipe-image"
                            alt={`${recipe.name} image`}
                        />
                        
                        <div className="card-body">
                            <h5 className="card-title">{recipe.name}</h5>
                            <Link 
                                to={{
                                    pathname: `/recipes/${recipe.id}`,
                                    state: {
                                        recipe: recipe
                                    }
                                }} 
                                className="btn btn-info">
                                View Recipe
                            </Link>
                        </div>
                    </div>
                </div>
          
        ));
        
        const noRecipe = (
            <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                <h4>
                    No recipes yet. Why not <Link to="/new_recipe">create one?</Link>
                </h4>
            </div>
        );
        
        return (
            <React.Fragment>
                <div className="py-5">
                    <main className="container">
                        <div className="text-right mb-3">
                            <Link to="/recipe" className="btn btn-dark">
                                Create New Recipe
                            </Link>
                        </div>
                        <div className="row">
                            {recipes.length > 0 ? allRecipes : noRecipe}
                        </div>
                    </main>
                </div>
            </React.Fragment>
        )
    }
}

export default Recipes;