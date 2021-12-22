import React from "react";
import {AiFillCloseCircle} from "react-icons/ai";


class Databases extends React.Component {

    state = {

    }

    render() {
        return (
            <div class={"page"}>
                <h4> DATA BASES </h4>

                <table>
                    <tr>
                        <th>Reported By</th>
                        <th>Date Submitted</th>
                        <th>Description</th>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Is Fixed?</th>
                        <th>When Fixed</th>
                        <th>Fixed By</th>
                    </tr>
                    <tr>
                        <td>Henry Cavil</td>
                        <td>21/12/21</td>
                        <td>Issue with user display</td>
                        <td>2</td>
                        <td>UI</td>
                        <td> <AiFillCloseCircle style={{color:"red"}}/> </td>
                        <td> <AiFillCloseCircle style={{color:"red"}}/> </td>
                        <td> Unknown </td>
                    </tr>
                    <tr>
                        <td>Thomas Brown</td>
                        <td>19/12/21</td>
                        <td>Button send not working</td>
                        <td>1</td>
                        <td>JAVA SCRIPT</td>
                        <td> <AiFillCloseCircle style={{color:"red"}}/> </td>
                        <td> <AiFillCloseCircle style={{color:"red"}}/> </td>
                        <td> Unknown </td>

                    </tr>
                    <tr>
                        <td>Thomas Brown</td>
                        <td>19/12/21</td>
                        <td>Button send not working</td>
                        <td>1</td>
                        <td>JAVA SCRIPT</td>
                        <td> <AiFillCloseCircle style={{color:"red"}}/> </td>
                        <td> <AiFillCloseCircle style={{color:"red"}}/> </td>
                        <td> Unknown </td>

                    </tr>
                    <tr>
                        <td>Thomas Brown</td>
                        <td>19/12/21</td>
                        <td>Button send not working</td>
                        <td>1</td>
                        <td>JAVA SCRIPT</td>
                        <td> <AiFillCloseCircle style={{color:"red"}}/> </td>
                        <td> <AiFillCloseCircle style={{color:"red"}}/> </td>
                        <td> Unknown </td>

                    </tr>
                    <tr>
                        <td>Thomas Brown</td>
                        <td>19/12/21</td>
                        <td>Button send not working</td>
                        <td>1</td>
                        <td>JAVA SCRIPT</td>
                        <td> <AiFillCloseCircle style={{color:"red"}}/> </td>
                        <td> <AiFillCloseCircle style={{color:"red"}}/> </td>
                        <td> Unknown </td>

                    </tr>
                </table>
            </div>
        );
    }

}

export default Databases;