import React from "react";
import {AiFillCloseCircle} from "react-icons/ai";


function UnresolvedBugsBoard(pros) {

    return (

        <div class={"board"} style={{width: "auto"}}>
            <h3>
                Unresolved Bugs
            </h3>
            <p>
                click on row to view more information
            </p>
            <table>
                <tr>
                    <th>Reported By</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>ID</th>
                    <th>Type</th>
                    <th>is Fixed?</th>
                </tr>
                <tr>
                    <td>Henry Cavil</td>
                    <td>21/12/21</td>
                    <td>Issue with user display</td>
                    <td>2</td>
                    <td>UI</td>
                    <td> <AiFillCloseCircle style={{color:"red"}}/> </td>
                </tr>
                <tr>
                    <td>Thomas Brown</td>
                    <td>19/12/21</td>
                    <td>Button send not working</td>
                    <td>1</td>
                    <td>JAVA SCRIPT</td>
                    <td> <AiFillCloseCircle style={{color:"red"}}/> </td>

                </tr>
            </table>
        </div>
    )
}

export default UnresolvedBugsBoard;