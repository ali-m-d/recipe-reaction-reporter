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
        const { comments } = this.state;
        const allComments = comments.map((comment, index) => (
            <div key={index}>
                {comment.content}
            </div>
        ));

        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        {allComments}
                    </div>
                </div>
            </div>   
        );
    }
}

export default Comments;