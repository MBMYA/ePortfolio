import React from "react";
import Searchbar from "../components/layouts/Searchbar.jsx";
import Side_bar from "../components/layouts/Sidebar.jsx";
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

import "../assets/css/profile.css";

import { withRouter } from "../services/with-router.js";

function Profile(props) {
    return (
            <div style={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw", backgroundColor: "#dbdbdb"}}>
                <div className="side-bar">
                    <Side_bar />
                </div>
                <div style={{ display: "flex", flexDirection: "column", height: "100vh", flex: "1"}}>
                    <div className="top-bar">
                        <nav-bar className="nav-link">
                            <ul className="nav_links">
                                <li><a href="#">ePortfolio</a></li>
                                <li><a href="#">My Profile</a></li>
                                <li><a href="#">Manual</a></li>
                                <li><a href="#">Contact us</a></li>
                            </ul>
                        </nav-bar>
                        <div className="searchBar">
                            <Searchbar />
                        </div>
                        <a className="cta"><button>Sign Out</button></a>
                    </div>
                    <div className="main-component">
                        <div className="left-feed">
                            <div className="side-content">
                                <div className="profile-header">
                                    <img src="" alt="" className="profile-picture" />
                                </div>
                                <section className="profile-info">
                                    <h3>Mustafa Alaraj</h3>
                                    <p className="title">Fresh graduate</p>
                                </section>
                                <hr className="divider" />
                                <section className="profile-info">
                                    <h3>Mustafa Alaraj</h3>
                                    <p className="title">Fresh graduate</p>
                                </section>
                                <hr className="divider" />
                                <section className="profile-info">
                                    <h3>Mustafa Alaraj</h3>
                                    <p className="title">Fresh graduate</p>
                                </section>                            
                            </div>
                            <div className="side-content"></div>
                        </div>
                        <div className="main-feed">
                            <div className="side-content"></div>
                            <div className="side-content"></div>
                        </div>
                        <div className="right-feed">
                            <div className="side-content"></div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default withRouter(Profile);
