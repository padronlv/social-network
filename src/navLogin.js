import React from 'react';
import { Link } from 'react-router-dom';

function NavLogout(props) {
    return (
        <nav className="nav">
            <ul>
                <li><img className="smallLogo" src="/images/logo.png" /></li>
            </ul>
            <ul>
                <li><Link to="/">
                    <img id="smallProfilePic"
                        src={ props.image }
                        alt={ `${props.first} ${props.last}` }
                    />
                </Link></li>
                <li><Link to="/chat">
                    <img className="icon"
                        src="/images/chat.png"
                        alt='chat'
                    />
                </Link></li>
                <li><Link to="/online">
                    <img className="icon"
                        src="/images/online.png"
                        alt='online'
                    />
                </Link></li>
                <li><Link to="/friends">
                    <img className="icon"
                        src="/images/friendship.png"
                        alt='friends'
                    />
                </Link></li>

                <li><a href="/logout">
                    <img className="icon"
                        src="/images/logout.png"
                        alt='logout'
                    />
                </a></li>

            </ul>
        </nav>
    );
}

export default NavLogout;
