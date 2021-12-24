import React from "react";
import Send from "../components/Boards/Send";
import Inbox from "../components/Boards/Inbox";


class Messages extends React.Component {

    state = {

    }

    render () {
        return (
            <div style={{marginLeft:"17%"}}>
                <div style={{display:"flex"}}>
                    <Send />
                    <Inbox />
                </div>

            </div>
        )
    }
}

export default Messages;