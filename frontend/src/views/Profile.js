import React from "react";
import Searchbar from "../components/Searchbar.jsx";
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
        <div className="top-bar">
            <nav-bar>
                <ul class="nav_links">
                    <li><a href="#">Main Page</a></li>
                    <li><a href="#">Description</a></li>
                    <li><a href="#">Manual</a></li>
                    <li><a href="#">Contact us</a></li>
                </ul>
            </nav-bar>
            <div className="searchBar">
                <Searchbar />
            </div>
            <a class="cta"><button>Sign Out</button></a>
        </div>
    );
}

export default withRouter(Profile);
