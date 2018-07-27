import React from 'react';

function ProfilePic (props) {
    console.log("profile pic:", props);
    return (
        <div id="divProfilePic">
            <img id="profilePic"
                src={ props.image }
                alt={ `${props.first} ${props.last}` }
                onClick={ props.clickHandler }
            />
        </div>
    );
}

export default ProfilePic;
