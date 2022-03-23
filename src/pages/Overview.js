import React from "react";
import Stats from "../components/Boards/Stats";
import UnresolvedBugsBoard from "../components/Boards/UnresolvedBugsBoard";
import UnreadMessages from "../components/Boards/UnreadMessages";
import CalendarBoard from "../components/Boards/CalendarBoard";


class Overview extends React.Component {

    render () {
        return (
            <div>
                <div style={{display:"inline-flex"}}>
                    <UnresolvedBugsBoard />
                    <CalendarBoard />

                </div>
                <div style={{display:"inline-flex"}}>
                    <Stats />
                    <UnreadMessages />
                </div>
            </div>
        )
    }
}

export default Overview;