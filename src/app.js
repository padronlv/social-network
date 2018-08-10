import React from 'react';
import axios from './axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Profile from './profile';
import Opp from './opp';
import Friends from './friends';
import Chat from './chat';
import Online from './online';
import NavLogin from './navLogin';

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
        // console.log("showUploader")
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
                        <NavLogin image={image}
                            first={first}
                            last={last} />
                        <Route exact path='/' render={() => (
                            <Profile
                                id={ id }
                                first={ first }
                                last={ last }
                                image={ image }
                                bio={this.state.bio}
                                showBio={this.state.showBio}
                                toggleShowBio={this.toggleShowBio}
                                setBio={this.setBio}
                                setImage={this.setImage}
                                showUploader={this.showUploader}
                                uploaderIsVisible={this.state.uploaderIsVisible}
                            />
                        )} />
                        <Route path="/user/:id" component={Opp} />
                        <Route path="/friends" component={Friends} />
                        <Route path='/online' component= {Online} />
                        <Route path="/chat" component={Chat} />


                    </div>
                </BrowserRouter>
            </div>
        );
    }
}


export default App;
