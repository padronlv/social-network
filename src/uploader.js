import React from 'react';
import axios from './axios';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageFile: ""
        };
        this.imageSelected = this.imageSelected.bind(this);
        this.uploadPicture = this.uploadPicture.bind(this);
    }
    imageSelected(e) {
        this.imageFile = e.target.files[0];
        // console.log(this.imageVal);
        console.log(this.imageFile.name);
    }
    uploadPicture() {
        var formData = new FormData;
        formData.append('file', this.imageFile);
        axios.post('/upload', formData). then((res) => {
            if (res.data.success) {
                console.log(res.data);
                this.props.setImage(res.data.image);
                // app.images.unshift(res.data.image);
            }
        });
    }
    render () {
        return (
            <div id="Uploader">
                <input type="file" id="file-field" onChange={ this.imageSelected } />
                <div className="imageInfo">
                    <div className="fieldEdit">
                        <label className="selectImage"  htmlFor="file-field"><h3 className="param">Image</h3></label>
                        <div className="inputImitation"></div>
                    </div>
                </div>
                <div className="divButton">
                    <button onClick={ this.uploadPicture } className="upload">upload!</button>
                </div>
            </div>
        );
    }
}


export default App;
