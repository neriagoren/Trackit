import React from "react";
import {Button, Form} from "react-bootstrap";


class Send extends React.Component {

    state = {

    }

    render () {
        return (
                <div  class={"board"} style={{width:"40%", height:"auto", padding:"25px"}}>
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
                </div>



        )
    }
}

export default Send;