import React from 'react';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: this.props.comments
        };
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.comments !== prevProps.comments) {
            this.setState({
                comments: this.props.comments
            });
        }
    }
    render() {
        const noComments = (
            <div>No reactions have been submitted reported for this recipe.</div> 
        );
        const { comments } = this.state;
        const allComments = comments.map((comment, index) => (
            <blockquote key={index} className="blockquote mb-1 comment">
                <p className="mb-0">{comment.content}</p>
                <footer className="blockquote-footer">{comment.user_username}</footer>
            </blockquote>
        ));

        return(
            <div className="container">
                {allComments > 0 ? allComments : noComments }
            </div>
        );
    }
}

export default Comments;