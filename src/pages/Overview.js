import React from "react";
import Stats from "../components/Boards/Stats";
import UnresolvedBugsBoard from "../components/Boards/UnresolvedBugsBoard";
import UnreadMessages from "../components/Boards/UnreadMessages";
import CalendarBoard from "../components/Boards/CalendarBoard";
import EnhancedTable from "../components/EnhancedTable";


class Overview extends React.Component {

    render () {
        return (
            <div>

                    <EnhancedTable />

            </div>
        )
    }
}

export default Overview;
