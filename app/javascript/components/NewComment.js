import React from 'react';
import axios from 'axios';

class NewComment extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            content: "",
            user_id: JSON.parse(localStorage.getItem("user")).id,
            user_username: JSON.parse(localStorage.getItem("user")).username
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
            if (res.data.comment) {
                this.props.handleCommentSubmission(res.data); 
            }
            this.props.handleCommentSubmission(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
        event.preventDefault();
    }
    
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <textarea
                        name="content"
                        placeholder="Your reaction to this recipe"
                        className="form-control mb-2"
                        rows="4"
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
        );
    }
}

export default NewComment;