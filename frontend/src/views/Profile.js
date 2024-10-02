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
import ExperienceCard from "../components/ExperienceCard.jsx";

function Profile(props) {
    const [username, setUsername] = useState("");
    const [picture, setPicture] =  useState("");
    const [fullname, setFullname] = useState("");
    const [projects, setProjects] =  useState([]);
    const [biography, setBiography] = useState("");
    const [projectsSummary, setProjectsSummary] =  useState("");
    const [educations, setEducations] = useState("");
    const [educationsSummary, setEducationsSummary] =  useState("");
    const parameter = window.location.pathname.split("/").pop();

    useEffect(() => {
        // Function to fetch profile data
        const handleDataRetrieval = async (e) => {
            // const metadata = await getData(localStorage.getItem("username"))
            const metadata = await getData(parameter)
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
        console.log(projects);
      }, []); // Empty dependency array to run only once on mount
    
      return (
        <body className="container">
            <div className="row mt-3 mb-4 justify-content-center">
                
                <div className="col-auto">
                    <nav-bar className="nav-link">
                        <ul className="nav_links">
                            <li className="text-gradient"><a  href="#">ePortfolio</a></li>
                            <li className="text-gradient"><a href="#">My Profile</a></li>
                            <li className="text-gradient"><a href="#">Manual</a></li>
                            <li className="text-gradient"><a href="#">Contact us</a></li>
                        </ul>
                    </nav-bar>
                </div>
                <div className="col-2">
                    <a className="cta "><button>Sign Out</button></a>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 mt-4">
                <div className="side-content rounded-4">
                                <div className="profile-header rounded-4">
                                    <img src="" alt="" className="profile-picture" />
                                </div>
                                <section className="profile-info">
                                    <h3>{username}</h3>
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
                </div>
                <div className="col-lg-8 mt-4">
                    <h2 className="text-gradient fw-bolder text-center">Experience</h2>
                    {projects? (
                        projects.map((project, index) => (
                        <ExperienceCard
                            startMonth={project.startMonth}
                            startYear={project.startYear}
                            endMonth={project.endMonth}
                            endYear={project.endYear}
                            title={project.title}
                            name={project.name}
                            city={project.city}
                            country={project.country}
                            description={project.description}
                            />
                    ))): null}
                    <h2 className="text-gradient fw-bolder text-center">Education</h2>
                    <ExperienceCard
                        startMonth={"Sep"}
                        startYear={"2020"}
                        endMonth={"May"}
                        endYear={"2024"}
                        title={"BSc. Computer Engineering"}
                        name={"University of Sharjah"}
                        city={"Sharjah"}
                        country={"UAE"}
                        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                        />
                    <h2 className="text-gradient fw-bolder text-center">Skills</h2>
                </div>
            </div>
            
        </body>
        
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
                            // <div className="side-content">
                            //     <div className="profile-header">
                            //         <img src="" alt="" className="profile-picture" />
                            //     </div>
                            //     <section className="profile-info">
                            //         <h3>{username}</h3>
                            //         <p className="title">Fresh graduate</p>
                            //     </section>
                            //     <hr className="divider" />
                            //     <section className="profile-info">
                            //         <h3>Mustafa Alaraj</h3>
                            //         <p className="title">Fresh graduate</p>
                            //     </section>
                            //     <hr className="divider" />
                            //     <section className="profile-info">
                            //         <h3>Mustafa Alaraj</h3>
                            //         <p className="title">Fresh graduate</p>
                            //     </section>                            
                            // </div>
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
