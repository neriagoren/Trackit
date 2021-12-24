import React from "react";
import Graph from "../Graph";



function Stats(props) {

    return (

        <div class = {"board"} style={{width:"50%", height:"420px"}} >
            <h3>
              Statistics
            </h3>

            <Graph />
        </div>
    )
}

export default Stats;