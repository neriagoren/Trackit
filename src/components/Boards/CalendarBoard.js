import React from "react";
import Calendar from "react-calendar";

class Reports extends React.Component {

    render () {
        return (
            <div class = {"board"}  style={{width:"auto", height:"420px"}}>

                <h4>  Events due </h4>

                <Calendar />

            </div>
        )
    }
}

export default Reports;