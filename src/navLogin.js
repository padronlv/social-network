import React from 'react';
import { Link } from 'react-router-dom';

function NavLogout(props) {
    return (
        <nav className="nav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">
                    <img id="smallProfilePic"
                        src={ props.image }
                        alt={ `${props.first} ${props.last}` }
                    />
                </Link></li>
            </ul>
        </nav>
    );
}

export default NavLogout;
