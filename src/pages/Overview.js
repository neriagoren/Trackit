import React from "react";
import Stats from "../components/Boards/Stats";
import UnresolvedBugsBoard from "../components/Boards/UnresolvedBugsBoard";
import UnreadMessages from "../components/Boards/UnreadMessages";
import CalendarBoard from "../components/Boards/CalendarBoard";


class Overview extends React.Component {


    render () {
        return (
            <div style={{marginLeft:"17%"}}>
                <div style={{display:"flex"}}>
                    <UnresolvedBugsBoard />
                    <CalendarBoard />


                </div>
                <div style={{display:"flex"}}>
                    <Stats />
                    <UnreadMessages />
                </div>
            </div>
        )
    }
}

export default Overview;