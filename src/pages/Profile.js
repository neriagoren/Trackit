import React from "react";
import ProfileCard from "../components/Boards/ProfileCard";

class Profile extends React.Component {

    render() {
        return (
            <div style={{marginLeft:"17%", display:"flex", justifyContent:"flex-start", height: "600px"}}>
                    <ProfileCard />
            </div>
        )
    }
}

export default Profile;
