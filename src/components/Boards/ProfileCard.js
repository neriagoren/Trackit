import React from "react";
import {FaUser} from "react-icons/fa";


function ProfileCard(props) {

    return (

        <div class = {"board"} style={{width:"25%"}}>

            <div style={{marginTop: "20px"}}>
                <FaUser  />
                <h3>
                    your name
                </h3>
            </div>

            <p>
                Description
            </p>
        </div>
    )
}

export default ProfileCard;