import React from "react";
import DataTable from 'react-data-table-component';

const ExpandedComponent = ({data}) => <div style={{textAlign:"right",fontSize:"12px", marginRight:"5%"}}>
    <h4> {data.title} </h4>
    <p> {data.content} </p>
</div>;
const columns = [
    {
        name: 'תאריך',
        selector: row => row.date,
    },
    {
        name: 'מחלקה',
        selector: row => row.department,
    },
    {
        name: 'כותרת',
        selector: row => row.title,
    },
    {
        name: "שולח",
        selector: row => row.sender,
    },
];

class Inbox extends React.Component {

    state = {
        data: [
            {
                id: 1,
                sender: "מיטשל קליין",
                content: "היי מה נשמע",
                title: "הודעה חשובה",
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

            <div class = {"board"}  style={{width:"auto", height:"auto"}}>
                <h3  style={{textAlign:"center"}}>
                    דואר נכנס
                </h3>
                <DataTable
                    columns={columns}
                    data={this.state.data}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    style={{textAlign:"right"}}
                />
            </div>
        )
    }
}

export default Inbox;