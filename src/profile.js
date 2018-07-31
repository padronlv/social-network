import React, {Component} from 'react';
import axios from './axios';
import ProfilePic from './profilepic';
import Uploader from './uploader';

class Profile extends Component{
    constructor() {
        super();
        this.state = {
            error: null,
        };

        this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
        this.handleSubmitTextarea = this.handleSubmitTextarea.bind(this);
    }
    handleChangeTextarea(e) {
        this.setState({
            [e.target.name]: e.target.value

        }, () => {
            console.log(this.state);
        });
    }
    handleSubmitTextarea(e) {
        e.preventDefault();
        console.log("Running handleSubmit", this.state);
        axios.post('/uploadBio', this.state)
            .then((resp) => {
                if (resp.data.success) {
                    console.log(resp.data);
                    this.props.setBio(resp.data.info.bio);
                    this.props.toggleShowBio();
                    // app.images.unshift(res.data.image);
                }
            });
    }

    render() {
        const {
            first,
            last,
            id,
            image,
            showBio,
            toggleShowBio,
            bio,
            showUploader,
            uploaderIsVisible,
            setImage
        } = this.props;


        return (
            <div id="profile">
                <h1>Profile</h1>
                <p>{ first } { last }</p>
                <ProfilePic
                    image={image}
                    first={first}
                    last={last}
                    clickHandler={showUploader}
                />
                {uploaderIsVisible && <Uploader setImage={setImage} />}


                { showBio
                    ? <form onSubmit={ this.handleSubmitTextarea } className="">
                        <textarea name="bio" defaultValue={ bio } onChange={ this.handleChangeTextarea }></textarea>
                        <button type="submit">Submit</button>
                    </form>
                    : bio
                        ? <div>
                            <p> { bio } </p>
                            <p onClick={ toggleShowBio }> Click to edit your bio </p>
                        </div>
                        : <p onClick={ toggleShowBio }>Click to add a bio</p>
                }
            </div>
        );
    }
}

export default Profile;
