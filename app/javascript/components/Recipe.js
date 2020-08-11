import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faComment } from '@fortawesome/free-solid-svg-icons';
import NewComment  from '../components/NewComment';
import Comments from '../components/Comments';
import Login from '../components/Login';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            loaded: false,
            isCommentModalOpen: false,
            isLoginModalOpen: false,
            recipe: {ingredients: ""},
            loggedInStatus: this.props.loggedInStatus,
            showCommentForm: false,
            showComments: false,
            comments: []
        };
        
        const {
            match: {
                params: {id}
            }
        } = this.props;
        this.recipe_id = id;
        this.toggleNav = this.toggleNav.bind(this);
        this.addHtmlEntities = this.addHtmlEntities.bind(this);
        this.handleNewCommentClick = this.handleNewCommentClick.bind(this);
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleCommentSubmission = this.handleCommentSubmission.bind(this);
        // this.deleteRecipe = this.deleteRecipe.bind(this);
    }
    
    componentDidMount() {
        const recipeUrl = `/api/v1/recipes/${this.recipe_id}`;
    
        fetch(recipeUrl)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then((res) => {this.setState({recipe: res})})
        .catch(() => {this.props.history.push('/recipes')});
        
        const recipeCommentsUrl = `/api/v1/recipes/${this.recipe_id}/comments`;
        
        fetch(recipeCommentsUrl)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then((res) => {this.setState({comments: res})})
        .catch(() => {this.props.history.push('/recipes')});
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.loggedInStatus !== prevProps.loggedInStatus) {
            this.setState({
                loggedInStatus: this.props.loggedInStatus
            });
        }
    }
    
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen     
        });
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
    
    handleSuccessfulAuth(data) {
        this.toggleLoginModal();
        this.props.handleLogin(data);
        this.setState({
            loggedInStatus: "LOGGED_IN"
        });
    }
    
    toggleCommentModal() {
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen 
        });
    }
    
    toggleLoginModal() {
        this.setState({
            isLoginModalOpen: !this.state.isLoginModalOpen 
        });
    }
    
    handleNewCommentClick() {
        if (JSON.parse(localStorage.getItem("user"))) {
            this.toggleCommentModal();
        } else {
            this.toggleLoginModal();
        }
    }
    
    handleCommentSubmission(comment) {
        var updated_comments = this.state.comments.concat(comment);
        this.setState({
            comments: updated_comments
        });
        this.toggleCommentModal();
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
        console.log({__html: `${recipeInstruction}`});
        const recipeUrl = `/recipes/${this.recipe_id}`;
        
        
        return (
            <div>
                <div className="hero position-relative d-flex align-items-center justify-content-center">
                    <img
                        src={recipe.image}
                        alt={`${recipe.name} image`}
                        className="img-fluid position-absolute"
                        onLoad={() => this.setState({loaded: true})}
                        style={this.state.loaded ? {} : {display: "none"}}
                    />
                    {!this.state.loaded ? <Spinner animation="border" role="status" /> :
                    <React.Fragment>
                        <div className="overlay bg-dark position-absolute" />
                        <h1 className="display-4 position-relative text-white">
                            {recipe.name}
                        </h1>
                    </React.Fragment>
                    }
                </div>
                
                
                <Navbar light expand="md">
                  <div className="container">
                    <NavbarToggler className="ml-auto" onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isNavOpen} navbar>    
                        <Nav navbar className="mx-auto" id="custom-nav">
                            <NavItem>
                                {this.state.showComments ||
                            <button
                                type="button"
                                className="btn btn-info mx-2 option-btn"
                                onClick={
                                    this.showComments.bind(null, true)
                                }
                                role="button"
                            >
                                <FontAwesomeIcon icon={faComments} /> View Reactions
                            </button>
                        }
                        {this.state.showComments &&
                            <button
                                type="button"
                                className="btn btn-info option-btn mx-2"
                                onClick={
                                    this.showComments.bind(null, false)
                                }
                                role="button"
                            >
                                Hide Reactions
                            </button>
                        }
                            </NavItem>
                            <NavItem>
                                <button
                            type="button"
                            className="btn btn-info mx-2 option-btn"
                            onClick={this.handleNewCommentClick}
                            role="button"
                        >
                            <FontAwesomeIcon icon={faComment} /> Report Reaction
                        </button>
                        </NavItem>
                        </Nav>
                    </Collapse> 
                  </div>
                </Navbar>
                
                
                
                
                <div className="container">
                <div className="row">
                    
        
                    {this.state.showComments && <Comments comments={this.state.comments} />}
                    
                    <div className="col-sm-12 col-lg-3">
                        <ul className="list-group">
                            <h5 className="mb-2">Ingredients</h5>
                            {ingredientList}
                        </ul>
                    </div>
                    <div className="col-sm-12 col-lg-7">
                        <h5 className="mb-2">Preparation Instructions</h5>
                        <div
                            dangerouslySetInnerHTML={{__html: `${recipeInstruction}`.replace(/\n/g, '<br />')}}
                        />
                    </div>
                </div>
                </div>
                <Modal isOpen={this.state.isLoginModalOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader closeButton toggle={this.toggleLoginModal}>
                        Login
                    </ModalHeader>
                        <ModalBody>
                            You must be logged in to report a reaction to a recipe
                            <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                        </ModalBody>
                </Modal>
                <Modal closeButton isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                    <ModalHeader toggle={this.toggleCommentModal}>
                    Report Reaction
                    
                    </ModalHeader>
                        <ModalBody>
                            <NewComment recipe_id={this.recipe_id} handleCommentSubmission={this.handleCommentSubmission} />
                        </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Recipe;





























