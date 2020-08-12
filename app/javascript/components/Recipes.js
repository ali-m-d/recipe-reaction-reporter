import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        };
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
        .catch(() => {this.props.history.push('/')});
    }
    
    render() {
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
                            className="btn btn-dark">
                            View Recipe
                        </Link>
                    </div>
                </div>
            </div>
          
        ));
        
        const noRecipe = (
            <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                <Spinner animation="border" role="status" /> 
            </div>
        );
        
        return (
            <React.Fragment>
                <main className="container">
                    <div className="text-center my-2">
                        <Link to="/recipe" className="btn btn-dark">
                            Add New Recipe
                        </Link>
                    </div>
                    <div className="row">
                        {recipes.length > 0 ? allRecipes : noRecipe}
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default Recipes;