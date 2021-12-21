import React from "react";
import ProfileCard from "../components/Boards/ProfileCard";
import UnresolvedBugsBoard from "../components/Boards/UnresolvedBugsBoard";
import Stats from "../components/Boards/Stats";
import Team from "../components/Boards/Team";

class Profile extends React.Component {

    render() {
        return (
            <div style={{marginLeft:"17%", display:"flex", justifyContent:"flex-start", height: "600px"}}>
                    <ProfileCard />
                    <Team />
            </div>


        )
    }
}

export default Profile;
