import React, {Component} from 'react';
import axios from './axios';


class Wall extends Component {
    constructor() {
        super();
        this.state = {
            comments: []
        };

        this.setComments = this.setComments.bind(this);
        this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
        this.handleSubmitTextarea = this.handleSubmitTextarea.bind(this);
    }
    handleChangeTextarea(e) {
        this.setState({
            [e.target.name]: e.target.value

        }, () => {
            // console.log(this.state);
        });
    }

    handleSubmitTextarea(e) {
        e.preventDefault();

        console.log("Running handleSubmit", this.state);
        axios.post('/uploadComment/' + this.props.otherUserId, this.state)
            .then((resp) => {
                if (resp.data.success) {
                    console.log(resp.data);
                    this.setState({
                        comments: [...this.state.comments, resp.data.comment]
                    });
                }
            });
    }
    setComments (comments) {
        this.setState({
            comments: comments
        });
    }


    componentDidMount() {
        axios.get('/comments/' + this.props.otherUserId)
            .then((resp) => {
                this.setComments(resp.data.comments);
            });
    }

    render() {
        const { comments } = this.state;
        console.log("this.state", this.state);
        console.log("comments", comments);
        if (!comments) {
            return null;
        }
        const commentsDiv = (
            <div>
                <h1>Wall</h1>
                <div className="comments">
                    {comments.map(comment => (
                        <div className="commentBox">
                            <div className='infoAboutComment'>{comment.writter_id} wrote in your wall:</div>
                            <div className='commentUploaded'>{comment.comment}</div>
                        </div>
                    ))}
                </div>
            </div>
        );

        return (
            <div id="commentsOrNot">
                {!comments.length && <div>No comments there yet</div>}
                {!!comments.length && commentsDiv}

                <form onSubmit={ this.handleSubmitTextarea } className="">
                    <textarea className="textAreaComment" name="comment" onChange={ this.handleChangeTextarea }></textarea>
                    <button className='submitButton' type="submit">Send Message</button>
                </form>
            </div>
        );
    }
}
export default Wall;
