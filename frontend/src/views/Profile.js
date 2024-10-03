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
    const [experiences, setExperiences] =  useState([]);
    const [biography, setBiography] = useState("");
    const [educations, setEducations] = useState([]);
    const parameter = window.location.pathname.split("/").pop();

    useEffect(() => {
        // Function to fetch profile data
        const handleDataRetrieval = async (e) => {
            // const metadata = await getData(localStorage.getItem("username"))
            const metadata = await getData(parameter)
            setUsername(metadata["username"]);
            setBiography(metadata["biography"]);
            setEducations(metadata["educations"]);
            setFullname(metadata["fullname"]);
            setPicture(metadata["picture"]);
            setExperiences(metadata["experiences"]);
        }
    
        // Call the function
        handleDataRetrieval();
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
                                    <p className="title">{biography}</p>
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
                    {experiences? (
                        experiences.map((experience, index) => (
                        <ExperienceCard key={index}
                            startMonth={experience.startMonth}
                            startYear={experience.startYear}
                            endMonth={experience.endMonth}
                            endYear={experience.endYear}
                            title={experience.title}
                            name={experience.name}
                            city={experience.city}
                            country={experience.country}
                            description={experience.description}
                            />
                    ))): null}
                    <h2 className="text-gradient fw-bolder text-center">Education</h2>
                    {educations? (
                        educations.map((education, index) => (
                        <ExperienceCard key={index}
                            startMonth={education.startMonth}
                            startYear={education.startYear}
                            endMonth={education.endMonth}
                            endYear={education.endYear}
                            title={education.title}
                            name={education.name}
                            city={education.city}
                            country={education.country}
                            description={education.description}
                            />
                    ))): null}
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

}

export default withRouter(Profile);
