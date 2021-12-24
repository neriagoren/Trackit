import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {Container} from "react-bootstrap";

const data = [
    {
        name: 'Page A',
        uv: 400,
        pv: 200,
        amt: 200,
    },
    {
        name: 'Page B',
        uv: 300,
        pv: 138,
        amt: 220,
    },
    {
        name: 'Page C',
        uv: 200,
        pv: 980,
        amt: 290,
    },
    {
        name: 'Page D',
        uv: 280,
        pv: 308,
        amt: 200,
    },
    {
        name: 'Page E',
        uv: 180,
        pv: 480,
        amt: 281,
    },
    {
        name: 'Page F',
        uv: 290,
        pv: 380,
        amt: 200,
    },
    {
        name: 'Page G',
        uv: 390,
        pv: 400,
        amt: 210,
    },
];

export default class Graph extends PureComponent {

    render() {
        return (
            <Container>
                <LineChart
                    width={450}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </Container>
        );
    }
}
