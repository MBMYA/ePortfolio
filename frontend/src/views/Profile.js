import React, { useEffect, useState } from "react";
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
import { getData } from "../services/metadata.js";

function Profile(props) {
    const [username, setUsername] = useState("");
    const [picture, setPicture] =  useState("");
    const [fullname, setFullname] = useState("");
    const [projects, setProjects] =  useState("");
    const [biography, setBiography] = useState("");
    const [projectsSummary, setProjectsSummary] =  useState("");
    const [educations, setEducations] = useState("");
    const [educationsSummary, setEducationsSummary] =  useState("");


    useEffect(() => {
        // Function to fetch profile data
        const handleDataRetrieval = async (e) => {
            const metadata = await getData(localStorage.getItem("username"))
            setUsername(metadata["username"]);
            setBiography(metadata["biography"]);
            setEducations(metadata["educations"]);
            setEducationsSummary(metadata["educationsSummary"]);
            setFullname(metadata["fullname"]);
            setPicture(metadata["picture"]);
            setProjects(metadata["projects"]);
            setProjectsSummary(metadata["projectsSummary"]);
        }
    
        // Call the function
        handleDataRetrieval();
        console.log(username);
      }, []); // Empty dependency array to run only once on mount
    
      return (
        <div className="container">
            <div className="row mt-3 justify-content-center">
                
                <div className="col-auto">
                    <nav-bar className="nav-link">
                        <ul className="nav_links">
                            <li><a href="#">ePortfolio</a></li>
                            <li><a href="#">My Profile</a></li>
                            <li><a href="#">Manual</a></li>
                            <li><a href="#">Contact us</a></li>
                        </ul>
                    </nav-bar>
                </div>
                <div className="col-2">
                    <a className="cta"><button>Sign Out</button></a>
                </div>
            </div>
            
        </div>
        
      );

    
    // return (
    //         <div style={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw", backgroundColor: "#dbdbdb"}}>
    //             <div className="side-bar">
    //                 <Side_bar />
    //             </div>
    //             <div style={{ display: "flex", flexDirection: "column", height: "100vh", flex: "1"}}>
                    // <div className="top-bar">
                    //     <nav-bar className="nav-link">
                    //         <ul className="nav_links">
                    //             <li><a href="#">ePortfolio</a></li>
                    //             <li><a href="#">My Profile</a></li>
                    //             <li><a href="#">Manual</a></li>
                    //             <li><a href="#">Contact us</a></li>
                    //         </ul>
                    //     </nav-bar>
                    //     <div className="searchBar">
                    //         <Searchbar />
                    //     </div>
                    //     <a className="cta"><button>Sign Out</button></a>
                    // </div>
    //                 <div className="main-component">
    //                     <div className="left-feed">
    //                         <div className="side-content">
    //                             <div className="profile-header">
    //                                 <img src="" alt="" className="profile-picture" />
    //                             </div>
    //                             <section className="profile-info">
    //                                 <h3>{username}</h3>
    //                                 <p className="title">Fresh graduate</p>
    //                             </section>
    //                             <hr className="divider" />
    //                             <section className="profile-info">
    //                                 <h3>Mustafa Alaraj</h3>
    //                                 <p className="title">Fresh graduate</p>
    //                             </section>
    //                             <hr className="divider" />
    //                             <section className="profile-info">
    //                                 <h3>Mustafa Alaraj</h3>
    //                                 <p className="title">Fresh graduate</p>
    //                             </section>                            
    //                         </div>
    //                         <div className="side-content"></div>
    //                     </div>
    //                     <div className="main-feed">
    //                         <div className="side-content"></div>
    //                         <div className="side-content"></div>
    //                     </div>
    //                     <div className="right-feed">
    //                         <div className="side-content"></div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    // );
}

export default withRouter(Profile);
