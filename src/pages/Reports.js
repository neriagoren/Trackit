import { Container, Grow } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

import ReportTable from "../Components/ReportTable";

export default function Reports() {

    return (
        <Container sx={{ paddingBottom: 20, paddingTop: 2 }}>
            <Grow
                in={true}
                style={{ transformOrigin: '0 0 0' }}
                timeout={500}>

                <Box>
                    <ReportTable />

                </Box>

            </Grow>
        </Container>
    )
}
