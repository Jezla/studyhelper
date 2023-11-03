import React from "react";



async function getResponse() {
    const response = await fetch("http://localhost:8080/logout");
    const msg = await response.json();
    console.log(msg.response);
};



const About = () => {

    getResponse();


    return (
        <div>
            <h1>
                Here is the about page.
            </h1>
        </div>
    );
};


export default About;
