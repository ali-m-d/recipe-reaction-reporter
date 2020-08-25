import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Pagination from '../components/Pagination';

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [], 
            setRecipes: [],
            currentPage: this.props.currentPage,
            recipesPerPage: 4
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount() {
        const url = "/api/v1/recipes/index";
        fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Network response not ok');
            }
        })
        .then((res) => {this.setState({recipes: res})})
        .catch(() => {this.props.history.push('/')});
    }
    
    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/recipes/search";
        
        const formData = new FormData();
        formData.append('term', this.state.term);
        
        const token = document.querySelector('meta[name="csrf-token"]').content;
        fetch(url, {
            method: 'POST',
            headers: {
                "X-CSRF-Token": token,
            },
            body: formData
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then((res) => {
            this.setState({recipes: res});
            this.props.setCurrentPage(1);
        })
        .catch((err) => {console.log(err.message)});
    }
    
    render() {
        const { recipes } = this.state;
        
        const indexOfLastRecipe = this.state.currentPage * this.state.recipesPerPage;
        const indexOfFirstRecipe = indexOfLastRecipe - this.state.recipesPerPage;
        const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
        
        const allRecipes = currentRecipes.map((recipe, index) => (
            <div key={index} className="col-md-6 col-lg-4 mx-auto">
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
                            className="btn btn-dark"
                        >
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
        
        const paginate = (event, pageNumber) => {
            
            this.setState({
                currentPage: pageNumber 
            });
            event.preventDefault();
            
            this.props.setCurrentPage(pageNumber);
        };
        
        return (
            <React.Fragment>
                <main className="container">
                    <div className="text-center my-2">
                        <form onSubmit={this.onSubmit}>
                        
                        </form>
                    </div>
                    <div className="text-center">
                        <Pagination 
                            recipesPerPage={this.state.recipesPerPage} 
                            totalRecipes={recipes.length}
                            paginate={paginate} 
                            currentPage={this.state.currentPage} />
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