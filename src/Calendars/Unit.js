import * as React from "react";
import Box from "@mui/material/Box";
import {Divider} from "@mui/material";
import Typography from "@mui/material/Typography";


export default function Unit(props) {

    const array1 = props.arr;
    const array2 = [0,0,1];
    const array3 = [0,1,1];
    const array4 = [1,1,0];
    const array5 = [1,1,1];

    const is_same = (array1.length === array2.length) && array1.every(function(element, index) {
        return element === array2[index];
    });

    return (
            <>
            {
                is_same ?
                    <>
                        <Box sx={{backgroundColor:"#2596be", height:"50%"}}>
                        </Box>
                        <Box sx={{backgroundColor:"#2596be", height:"50%"}}>
                            <Typography color={"white"} textAlign={"right"} fontWeight={"bold"} p={1}>
                            </Typography>
                        </Box>
                    </>
                :
                    <>
                        <Box sx={{ height:"50%"}}>
                        </Box>
                        <Divider />
                        <Box sx={{backgroundColor:"", height:"50%"}}>
                            <Typography color={"white"} textAlign={"right"} fontWeight={"bold"} p={1}>
                            </Typography>
                        </Box>
                    </>

            }
            </>
    )
}
