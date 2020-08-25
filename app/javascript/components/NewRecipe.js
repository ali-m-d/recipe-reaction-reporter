import React from 'react';
import { Link } from 'react-router-dom';


class NewRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            ingredients: [],
            instruction: "",
            image: null
        };
        
        this.onChange = this.onChange.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
    }
    
    stripHtmlEntities(str) {
        return String(str)
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
    
    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    onIngredientChange = (idx) => (event) => {
        const newIngredients = this.state.ingredients.map((ingredient, _idx) => {
            if (_idx !== idx) {
                return ingredient;
            }
            return event.target.value;
        });
        
        this.setState({ingredients: newIngredients})
    }
    
    onImageChange(event) {
        this.setState({image: event.target.files[0]});
    }
    
    handleAddIngredient = () => {
        this.setState({
            ingredients: this.state.ingredients.concat("")
        })
    }
    handleRemoveIngredient = (idx) => () => {
        this.setState({
            ingredients: this.state.ingredients.filter((i, _idx) => _idx !== idx)
        })
    }
    
    onSubmit(event) {
        event.preventDefault();
        const url = "/api/v1/recipes/create";
        
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('ingredients', JSON.stringify(this.state.ingredients));
        formData.append('instruction', this.state.instruction);
        formData.append('image', this.state.image);
        
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
        .then((res) => {this.props.history.push(`/recipes/${res.id}`)})
        .catch((err) => {console.log(err.message)});
    }
    
    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <h1 className="font-weight-normal mb-5">
                            Add a new recipe
                        </h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="recipeName">Recipe Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="recipeName"
                                    className="form-control"
                                    required
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="recipeIngredients" className="mr-2">Ingredients</label>
                                {this.state.ingredients.map((ingredient, idx) => (
                                    <div className="ingredient">
                                        <div className="d-flex flex-row mb-2">
                                            <input
                                                type="text"
                                                onChange={this.onIngredientChange(idx)}
                                                className="form-control mr-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={this.handleRemoveIngredient(idx)}
                                                className="btn btn-sm btn-secondary"
                                            >
                                                -
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={this.handleAddIngredient}
                                    className="btn btn-sm btn-secondary"
                                >
                                    Add Ingredient
                                </button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="recipeImage" className="pr-2">Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    id="recipeImage"
                                    accept="image/*"
                                    onChange={this.onImageChange}
                                    required
                                />
                            </div>
                            <label htmlFor="recipeInstruction">Preparation Instructions</label>
                            <textarea
                                name="instruction"
                                id="recipeInstruction"
                                className="form-control"
                                rows="5"
                                required
                                onChange={this.onChange}
                            />
                            <button type="submit" className="btn btn-info mt-3">
                                Add Recipe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewRecipe;











