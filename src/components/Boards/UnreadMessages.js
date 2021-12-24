import React from "react";
import DataTable from 'react-data-table-component';

const ExpandedComponent = ({data}) => <div style={{textAlign:"left",fontSize:"12px", marginLeft:"5%"}}>
   <h4> {data.title} </h4>
    <p> {data.content} </p>
</div>;
const columns = [
    {
        name: 'sender',
        selector: row => row.sender,
    },
    {
        name: 'department',
        selector: row => row.department,
    },
    {
        name: 'title',
        selector: row => row.title,
    },
    {
        name: 'date',
        selector: row => row.date,
    },
];

class UnreadMessages extends React.Component {

    state = {
        data: [
            {
                id: 1,
                sender: "Mitchel Klein",
                content: "This site looks bad buddy...",
                title: "Hello There",
                date: "20/2/21",
                department: "IT"
            },
            {
                id: 2,
                sender: "Allan Graham",
                content: "I agree with Mitchel, This site is looking way too bad...",
                title: "BRUH",
                date: "20/2/21",
                department: "Support"
            }
        ]
    }

    render() {
        return (

            <div class = {"board"} >
                <h3>
                    Unread Messages
                </h3>
                <DataTable
                    columns={columns}
                    data={this.state.data}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                />
            </div>
        )
    }
}

export default UnreadMessages;