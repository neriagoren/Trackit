import React from "react";
import Stats from "../components/Boards/Stats";
import Team from "../components/Boards/Team";
import UnresolvedBugsBoard from "../components/Boards/UnresolvedBugsBoard";
import MessagesBoard from "../components/Boards/MessagesBoard";
import CalendarBoard from "../components/Boards/CalendarBoard";


class Overview extends React.Component {


    render () {
        return (
            <div style={{marginLeft:"17%"}}>
                <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start"}}>
                    <UnresolvedBugsBoard />
                    <CalendarBoard />


                </div>
                <div style={{display:"flex", alignItems:"center", justifyContent:"flex-start"}}>
                    <Stats />
                    <MessagesBoard />
                </div>
            </div>
        )
    }
}

export default Overview;