import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="container pt-5 pb-5">
        <div className="row">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <h1>CLICK TO BUY</h1>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            <Link className="nav-link" to="/order">Order</Link>
                            <Link className="nav-link" to="/admin">Admin</Link>
                            <Link className="nav-link" to="/">Deal</Link>
                            {loggedInUser.displayName  ? <Link className="nav-link" to="">{loggedInUser.displayName}</Link> : <Link className="nav-link" to="/login">Login</Link>}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </div>
    );
};

export default Header;