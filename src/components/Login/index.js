import React from 'react';
import './login.css';

const Login = ({onLoginWithFacebookClicked}) => (
    <div className="login">
        <button className="login-button login-button__fb" onClick={onLoginWithFacebookClicked}><span>Facebook</span></button>
    </div>
);

Login.PropTypes = {
    onLoginWithFacebookClicked: React.PropTypes.func.required
};

export default Login;
