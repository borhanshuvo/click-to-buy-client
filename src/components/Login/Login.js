import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { UserContext } from '../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
else {
    firebase.app();
}

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: '/' } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const googleSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    displayName: displayName,
                    email: email
                }
                setLoggedInUser(signedInUser);
                storeAuthToken();
                history.replace(from);
            })
            .catch(err => {
                const errorMessage = err.message;
                console.log(errorMessage);
            })
    }

    const storeAuthToken = () =>{
        firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
            sessionStorage.setItem('token', idToken);
          }).catch(function(error) {
            // Handle error
          });
    }
    return (
        <div className="container">
            <div className="row mt-5">
                <div style={{ width: '40%', border: '1px solid black', padding: '20px', margin: 'auto' }}>
                    <h4 className="text-center">{newUser ? 'Registration' : 'Login'}</h4>
                    <br />
                    <form>
                        {newUser &&
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" name="displayName" className="form-control" />
                            </div>
                        }
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="text" name="email" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" />
                        </div>
                        {newUser &&
                            <div className="mb-3">
                                <label className="form-label">Confirm Password</label>
                                <input type="password" name="rePassword" className="form-control" />
                            </div>
                        }
                        <br />
                        <input type="submit" className="btn btn-primary form-control" value={newUser ? 'Sign up' : 'Sign in'} />
                    </form>
                    <br />
                    <p className="text-center">{newUser ? 'Already have an Account?' : "Don't have account?"}<button name="newUser" onClick={() => setNewUser(!newUser)} style={{ border: "none", backgroundColor: "white", color: "blue" }}>{newUser ? 'Login' : 'Create a new Account'}</button></p>
                </div>
                <div className="text-center mt-4 mb-5" style={{ margin: 'auto' }}>
                    <p>----------Or----------</p>
                    <button onClick={googleSignIn} style={{ borderRadius: '10px', width: '30%', border: '1px solid gray' }}>Continue with Google</button>
                </div>
            </div>
        </div>

    );
};

export default Login;