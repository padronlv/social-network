import React from 'react';
import Logo from './logo';
import ProfilePic from './profilepic';
import axios from './axios';
import Uploader from './uploader';
import { BrowserRouter, Route } from 'react-router-dom';
import Profile from './profile';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showBio: false
        };
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.toggleShowBio = this.toggleShowBio.bind(this);
        this.setBio = this.setBio.bind(this);
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }
    setImage(url) {
        this.setState({
            image: url,
            uploaderIsVisible: false
        });
    }
    setBio (bio) {
        this.setState({
            bio: bio
        });

    }
    toggleShowBio() {
        console.log("toggle");
        this.setState({
            showBio: !this.state.showBio
        });
    }

    componentDidMount() {
        axios.get('/user').then(
            ({data}) => {
                console.log(data);
                this.setState({
                    id: data.id,
                    first: data.first_name,
                    last: data.last_name,
                    image: data.profile_pic,
                    bio: data.bio
                });
            }
        );
    }
    render () {
        if(!this.state.id) {
            return (
                <div>Loading...</div>
            );
        }

        const { first, last, id, image } = this.state;

        return (
            <div id="app">
                <BrowserRouter>
                    <div>
                        <Route path='/profile' render={() => (
                            <Profile
                                id={ id }
                                first={ first }
                                last={ last }
                                profilePic={ image }
                                bio={this.state.bio}
                                showBio={this.state.showBio}
                                toggleShowBio={this.toggleShowBio}
                                setBio={this.setBio}
                            />
                        )} />
                    </div>
                </BrowserRouter>
                <Logo />
                <ProfilePic
                    image={this.state.image}
                    first={this.state.first}
                    last={this.state.last}
                    clickHandler={this.showUploader}
                />
                {this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}
            </div>
        );
    }
}


export default App;
