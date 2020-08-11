import React from 'react';
import { Link } from 'react-router-dom';
import NewComment  from '../components/NewComment';
import Comments from '../components/Comments';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {ingredients: ""},
            loggedInStatus: JSON.parse(localStorage.getItem("user")) ? "LOGGED_IN" : "NOT_LOGGED_IN",
            showCommentForm: false,
            showComments: false
        };
        const {
            match: {
                params: {id}
            }
        } = this.props;
        this.id = id;
        this.addHtmlEntities = this.addHtmlEntities.bind(this);
        // this.deleteRecipe = this.deleteRecipe.bind(this);
    }
    
    showComments = (flag) => {
        this.setState({
            showComments: flag,
            showCommentForm: false,
        });
    }
    
    showCommentForm = (flag) => {
        this.setState({
            showCommentForm: flag,
            showComments: false
        });    
    }
    
    componentDidMount() {
        const url = `/api/v1/recipes/${this.id}`;
        console.log("props updated");
        console.log(this.props.loggedinStatus);
        fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then((res) => {this.setState({recipe: res})})
        .catch(() => {this.props.history.push('/recipes')});
    }
    
    addHtmlEntities(str) {
        return String(str)
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
    }
    
    // deleteRecipe() {
    //     const {
    //         match: {
    //             params: {id}
    //         }
    //     } = this.props;
        
    //     const url = `/api/v1/destroy/${id}`;
    //     const token = document.querySelector('meta[name="csrf-token"]').content;
        
    //     fetch(url, {
    //         method: "DELETE",
    //         headers: {
    //             "X-CSRF-Token": token,
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     .then((resp) => {
    //         if (resp.ok) {
    //             return resp.json();
    //         } else {
    //             throw new Error('Network response was not ok');
    //         }
    //     })
    //     .then(() => {this.props.history.push("/recipes")})
    //     .catch((err) => {console.log(err.message)});
    // }
    
    render() {
        const { recipe } = this.state;
        let ingredientList = [];
        
        if (recipe.ingredients.length > 0) {
            ingredientList = recipe.ingredients
            .map((ingredient, index) => (
                <li key={index} className="list-group-item">
                    {ingredient}
                </li>
            ));
        }
        
        const recipeInstruction = this.addHtmlEntities(recipe.instruction);
        let conditionallyShowForm;
        if (JSON.parse(localStorage.getItem("user"))) {
            conditionallyShowForm = <NewComment recipe_id={this.id} />;
        } else {
            conditionallyShowForm = <div>You must be logged in</div>;
        }
        return (
            <div>
                <div className="hero position-relative d-flex align-items-center justify-content-center">
                    <img
                        src={recipe.image}
                        alt={`${recipe.name} image`}
                        className="img-fluid position-absolute"
                    />
                    <div className="overlay bg-dark position-absolute" />
                    <h1 className="display-4 position-relative text-white">
                        {recipe.name}
                    </h1>
                </div>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-6">
                            {this.state.showComments ||
                                <button
                                    type="button"
                                    className="btn btn-info mb-2"
                                    onClick={
                                        this.showComments.bind(null, true)
                                    }
                                    role="button"
                                >
                                    View Reactions
                                </button>
                            }
                            {this.state.showComments &&
                                <button
                                    type="button"
                                    className="btn btn-info mb-2"
                                    onClick={
                                        this.showComments.bind(null, false)
                                    }
                                    role="button"
                                >
                                    Hide Reactions
                                </button>
                            }
                        </div>
                        <div className="col-6">
                            {this.state.showCommentForm ||
                                <button
                                    type="button"
                                    className="btn btn-info mb-2"
                                    onClick={
                                        this.showCommentForm.bind(null, true)
                                    }
                                    role="button"
                                >
                                    Report Reaction
                                </button>
                            }
                            {this.state.showCommentForm &&
                                <button
                                    type="button"
                                    className="btn btn-info mb-2"
                                    onClick={
                                        this.showCommentForm.bind(null, false)
                                    }
                                    role="button"
                                >
                                    Hide Form
                                </button>
                            }
                        </div>
                       
                        {this.state.showCommentForm && conditionallyShowForm}
                        {this.state.showComments && <Comments recipe_id={this.id} />}
                        <div className="col-sm-12 col-lg-3">
                            <ul className="list-group">
                                <h5 className="mb-2">Ingredients</h5>
                                {ingredientList}
                            </ul>
                        </div>
                        <div className="col-sm-12 col-lg-7">
                            <h5 className="mb-2">Preparation Instructions</h5>
                            <div
                                dangerouslySetInnerHTML={{__html: `${recipeInstruction}`}}
                            />
                        </div>
                    </div>
                    <Link to="/recipes" className="btn btn-link">
                        Back to recipes
                    </Link>
                </div>
            </div>
        );
    }
}

export default Recipe;





























