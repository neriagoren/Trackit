import React from "react";
import {Button, Form} from "react-bootstrap";
import Box from "@mui/material/Box";


class Send extends React.Component {

    state = {

    }

    render () {
        return (
                <Box sx = {{margin:3}}>
                    <form action="/">
                        <div>
                            <h3>Send a Message</h3>
                        </div>
                        <div className="item">
                            <p>Name</p>
                            <div className="name-item">
                                <input type="text" name="name" placeholder="First"/>
                                <input type="text" name="name" placeholder="Last"/>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="item">
                                <p>Email</p>
                                <input type="text" name="name"/>
                            </div>
                            <div className="item">
                                <p>Phone</p>
                                <input type="text" name="name"/>
                            </div>
                        </div>
                        <div className="item">
                            <p>Title</p>
                            <input type="text" name="name"/>
                        </div>
                        <div className="item">
                            <p>Content</p>
                            <textarea rows="3" required></textarea>
                        </div>

                        <div className="btn-block">
                            <button type="submit" href="/">APPLY</button>
                        </div>
                    </form>
                </Box>
        )
    }
}

export default Send;
