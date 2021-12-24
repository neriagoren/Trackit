import React from "react";
import DataTable from 'react-data-table-component';

//const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
const ExpandedComponent = ({data}) => <div>
    <pre> {data.description} </pre>
</div>;
const columns = [
    {
        name: 'reporter',
        selector: row => row.reporter,
    },
    {
        name: 'id',
        selector: row => row.id,
    },
    {
        name: 'date',
        selector: row => row.date,
    },
    {
        name: 'type',
        selector: row => row.type,
    },
    {
        name: 'urgency',
        selector: row => row.urgency,
    },
];

class UnresolvedBugsBoard extends React.Component{

    state = {
        data: [
            {
                id: 1,
                reporter: "John Ham",
                description: "This site looks bad buddy...",
                type: "UI",
                urgency: "MILD",
                date: "20/2/21"
            },
            {
                id: 1,
                reporter: "John Ham",
                description: "This site looks bad buddy...",
                type: "UI",
                urgency: "MILD",
                date: "20/2/21"
            },
            {
                id: 1,
                reporter: "John Ham",
                description: "This site looks bad buddy...",
                type: "UI",
                urgency: "MILD",
                date: "20/2/21"
            },
            {
                id: 1,
                reporter: "John Ham",
                description: "This site looks bad buddy...",
                type: "UI",
                urgency: "MILD",
                date: "20/2/21"
            },
            {
                id: 1,
                reporter: "John Ham",
                description: "This site looks bad buddy...",
                type: "UI",
                urgency: "MILD",
                date: "20/2/21"
            },

        ]
    }

    componentDidMount() {
        // update data and columns
    }



    render() {
        return (

            <div class={"board"} style={{width: "auto", height: "420px"}}>
                <h3>
                    Unresolved Bugs
                </h3>

                <DataTable
                    columns={columns}
                    data={this.state.data}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                />

            </div>
        );
    }
}

export default UnresolvedBugsBoard;