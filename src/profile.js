import React, {Component} from 'react';
import axios from './axios';
import ProfilePic from './profilepic';
import Uploader from './uploader';
import Wall from './wall';

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
            // console.log(this.state);
        });
    }
    handleSubmitTextarea(e) {
        e.preventDefault();
        // console.log("Running handleSubmit", this.state);
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
            id,
            first,
            last,
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
                <div className='profileLeft'>
                    <div className="bigName">
                        Your profile
                    </div>
                    <ProfilePic
                        image={image}
                        first={first}
                        last={last}
                        clickHandler={showUploader}
                    />
                    {uploaderIsVisible && <Uploader setImage={setImage} />}
                    <div className='bioOperator'>
                        { showBio
                            ? <form onSubmit={ this.handleSubmitTextarea } className="">
                                <textarea className="textAreaBio" name="bio" defaultValue={ bio } onChange={ this.handleChangeTextarea }></textarea>
                                <button className='submitButton' type="submit">Send Bio</button>
                            </form>
                            : bio
                                ? <div className='realBio'>
                                    <p> { bio } </p>
                                    <p onClick={ toggleShowBio }> Click to edit your bio </p>
                                </div>
                                : <p onClick={ toggleShowBio }>Click to add a bio</p>
                        }
                    </div>
                </div>
                <Wall otherUserId={ id }/>
            </div>
        );
    }
}

export default Profile;
