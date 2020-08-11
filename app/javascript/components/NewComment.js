import React from 'react';
import axios from 'axios';

class NewComment extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            content: "",
            user_id: JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).id : "NOT_LOGGED_IN"
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    
    handleSubmit(event) {
        
        const {
            content,
            user_id
        } = this.state;
        
        const commentsController = axios.create({
            baseURL: '/'
        });
        
        commentsController.post(
            `api/v1/recipes/${this.props.recipe_id}/comments`, {
                comment: {
                    content: content,
                    user_id: user_id
                }
            },
            {
                withCredentials: true
            })
        .then(res => {
            if (res.data.logged_in) {
                this.props.handleSuccessfulAuth(res.data); 
                console.log("calling handleSuccessfulAuth()");
            }
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
        event.preventDefault();
    }
    
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input
                                    type="content"
                                    name="content"
                                    placeholder="Your reaction to this recipe"
                                    className="form-control mb-3"
                                    value={this.state.content}
                                    onChange={this.handleChange}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="btn btn-info mt-3"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewComment;