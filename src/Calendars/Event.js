import Box from "@mui/material/Box";
import { Divider, TableCell } from "@mui/material";
import * as React from "react";

export default function Event(props) {

    return (
        <>
            <TableCell sx={{ p: 0, height: "55px", border: 0, borderLeft: 1 }}>
                <Box sx={{ height: "50%" }}>
                </Box>
                <Divider />
                <Box sx={{ height: "50%" }}>
                </Box>
            </TableCell>
            <TableCell component="th" scope="row" sx={{ width: "100px", height: "25px", p: 0, border: "" }}>
                <Box sx={{ height: "50%" }}>
                </Box>
                <Divider> {props.row}</Divider>
                <Box sx={{ height: "50%" }}>
                </Box>
            </TableCell>
        </>
    )
}
