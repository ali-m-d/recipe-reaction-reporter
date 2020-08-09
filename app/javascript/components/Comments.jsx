import React from 'react';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
    }
    
    componentDidMount() {
        const url = `/api/v1/recipes/${this.props.recipe_id}/comments`;
        
        fetch(url)
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
        )
    }
}

export default Comments;