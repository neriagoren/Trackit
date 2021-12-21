import React from "react";
import Stats from "../components/Boards/Stats";
import Team from "../components/Boards/Team";
import UnresolvedBugsBoard from "../components/Boards/UnresolvedBugsBoard";
import MessagesBoard from "../components/Boards/MessagesBoard";


class Overview extends React.Component {


    render () {
        return (
            <div style={{marginLeft:"15%"}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start"}}>
                    <UnresolvedBugsBoard />
                    <Stats />

                </div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start"}}>

                    <Team />
                    <MessagesBoard />
                </div>
            </div>
        )
    }
}

export default Overview;