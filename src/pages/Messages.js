import React from "react";
import Send from "../components/Boards/Send";
import Inbox from "../components/Boards/Inbox";
import Box from "@mui/material/Box";
import {Grid} from "@mui/material";


class Messages extends React.Component {

    state = {

    }

    render () {
        return (

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Inbox />
                </Grid>
                <Grid item xs={6}>
                    <Send />
                </Grid>

            </Grid>
        )
    }
}

export default Messages;
