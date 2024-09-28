import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  } from "reactstrap";

import "../assets/css/login.css";
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { signin, saveToken, signup } from '../services/authentication.js';
import { withRouter } from "../services/with-router.js";


function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [hidden, setHidden] = useState(true);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const toggleShow = () => {
        setHidden(!hidden);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(e.currentTarget.id == "form-signin") {
            const token = await signin({
                email,
                password
            });

            if(!token) {
                setErrorMessage(token.message);
                setShowErrorMessage(true);
            } else {
                if (saveToken(token)) {
                    // window.location.reload();
                    navigate("/profile/" + localStorage.getItem("username"));
                }
            }

        }

        else if(e.currentTarget.id == "form-signup") {
            const token = await signup({
                username,
                email,
                password
            });

        }
    }

    const handleToggle = (e) => {
        const container = document.getElementById('container-login');
        const id = e.currentTarget.id;
        if (id == "register")
            container.classList.add("active");
        else if (id == "login")
            container.classList.remove("active");
    }

        return (
            <div className="body-login">
                <div className="container-login" id="container-login">
                    <div className="form-container sign-up">
                        <form id="form-signup" onSubmit={handleSubmit}>
                            <h1 className="text-gradient fw-bolder">Create Account</h1>
                            <div className="social-icons">
                                <a href="#" className="icon text-gradient"><i className="fa-brands fa-google-plus-g"></i></a>
                                <a href="#" className="icon text-gradient"><i className="fa-brands fa-facebook-f"></i></a>
                                <a href="#" className="icon text-gradient"><i className="fa-brands fa-github"></i></a>
                                <a href="#" className="icon text-gradient"><i className="fa-brands fa-linkedin-in"></i></a>
                            </div>
                            <span className="text-gradient fw-bolder">Use email for registration</span>
                            <input value={username}
                                    onChange={handleUsernameChange}
                                    placeholder="username"
                                    type='text'/>
                            <input value={email}
                                    onChange={handleEmailChange}
                                    placeholder="email"
                                    type='text'/>
                            <input value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="password"
                                    type={hidden ? 'password' : 'text'}/>
                            <Button className="fw-bolder" type="submit">Signup</Button>
                        </form>
                    </div>

                    <div className="form-container sign-in">
                        <form id="form-signin" onSubmit={handleSubmit}>
                            <h1 className="text-gradient fw-bolder">Signin</h1>
                            <div className="social-icons">
                                <a href="#" className="icon text-gradient"><i className="fa-brands fa-google-plus-g"></i></a>
                                <a href="#" className="icon text-gradient"><i className="fa-brands fa-facebook-f"></i></a>
                                <a href="#" className="icon text-gradient"><i className="fa-brands fa-github"></i></a>
                                <a href="#" className="icon text-gradient"><i className="fa-brands fa-linkedin-in"></i></a>
                            </div>
                            <span className="text-gradient fw-bolder">Use your email and password</span>
                            <input value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Email"
                                    type='text'/>
                            <input value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Password"
                                    type={hidden ? 'password' : 'text'}/>
                            <Button className="fw-bolder" type="submit">Signin</Button>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-left">
                                <h1>Already registered?</h1>
                                <p>Signin here</p>
                                <button className="hidden" id="login" onClick={handleToggle}>Sign In</button>
                            </div>
                            <div className="toggle-panel toggle-right">
                                <h1>Don't have an account?</h1>
                                <p>Register below</p>
                                <button className="hidden" id="register" onClick={handleToggle}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    
}
export default withRouter(Login);
