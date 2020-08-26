import React from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Pagination from '../components/Pagination';

class Recipes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            recipesLoading: true,
            currentPage: this.props.currentPage,
            searchTerm: this.props.searchTerm,
            recipesPerPage: 4
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }
    
    componentDidMount() {
        if(this.state.searchTerm === null) {
            this.fetchAllRecipes();
        } else {
            document.getElementById('searchField').value = this.state.searchTerm;
            this.fetchMatchingRecipes(this.state.searchTerm);
        }
    }
    
    componentDidUpdate(prevProps) {
        if(this.props.searchTerm !== prevProps.searchTerm) {
            this.setState({
                searchTerm: this.props.searchTerm
            });    
        }
    }
    
    fetchAllRecipes() {
        const url = "/api/v1/recipes/index";
        fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Network response not ok');
            }
        })
        .then((res) => {
            this.setState({
                recipes: res,
                recipesLoading: false
            });
        })
        .catch(() => {this.props.history.push('/')});
    }
    
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    fetchMatchingRecipes(term) {
        const url = "/api/v1/recipes/search";
        
        const formData = new FormData();
        formData.append('term', term);
        
        const token = document.querySelector('meta[name="csrf-token"]').content;
        this.setState({
            recipesLoading: true
        });
        
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
            this.setState({
                recipes: res,
                recipesLoading: false
            });
        })
        .catch((err) => {console.log(err.message)});
    }
    
    onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/recipes/search";
        
        const formData = new FormData();
        formData.append('term', this.state.term);
        
        const token = document.querySelector('meta[name="csrf-token"]').content;
        this.setState({
            recipesLoading: true
        });
        
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
            this.setState({
                recipes: res,
                recipesLoading: false
            });
            this.props.setSearchTerm(this.state.term);
            this.props.setCurrentPage(1);
        })
        .catch((err) => {console.log(err.message)});
    }
    
    handleClear() {
        this.props.setSearchTerm(null);
        document.getElementById('searchField').value = "";
        this.fetchAllRecipes();
        this.setState({
            currentPage: 1
        });
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
        
        const loadingSpinner = (
            <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                <Spinner animation="border" role="status" /> 
            </div>
        );
        
        const noRecipes = (
             <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
                <h2>No Results</h2> 
            </div>   
        );
        
        const clearBtn = (
            <button
                className="btn btn-dark ml-1"
                onClick={this.handleClear}
            >
                <svg height="1rem" width="1rem" fill="white" viewBox="0 0 20 20">
					<path d="M11.469,10l7.08-7.08c0.406-0.406,0.406-1.064,0-1.469c-0.406-0.406-1.063-0.406-1.469,0L10,8.53l-7.081-7.08
					c-0.406-0.406-1.064-0.406-1.469,0c-0.406,0.406-0.406,1.063,0,1.469L8.531,10L1.45,17.081c-0.406,0.406-0.406,1.064,0,1.469
					c0.203,0.203,0.469,0.304,0.735,0.304c0.266,0,0.531-0.101,0.735-0.304L10,11.469l7.08,7.081c0.203,0.203,0.469,0.304,0.735,0.304
					c0.267,0,0.532-0.101,0.735-0.304c0.406-0.406,0.406-1.064,0-1.469L11.469,10z"></path>
				</svg>
            </button>
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
                            <div className="d-flex flex-row justify-content-center">
                                <input
                                    type="text"
                                    name="term"
                                    id="searchField"
                                    style={{width: "auto"}}
                                    className="form-control flex-grow-1 flex-md-grow-0 md-w-50 lg-w-25"
                                    onChange={this.onChange}
                                    required
                                />
                                {this.state.searchTerm !== null ? clearBtn : null}
                                <button
                                    type="submit"
                                    className="btn btn-dark ml-1"
                                >
                                    Search
                                </button>
                            </div>
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
                        {this.state.recipesLoading ? loadingSpinner : allRecipes}
                        {!this.state.recipesLoading && recipes.length < 1 ? noRecipes : null}
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default Recipes;