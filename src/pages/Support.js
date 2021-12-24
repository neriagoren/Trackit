import React from "react";


class Support extends React.Component {

    state = {

    }

    render () {
        return (
            <div className={"board"} style={{width: "40%", marginLeft: "17%", height: "auto", padding: "25px"}}>
                <form action="/">
                    <div>
                        <h2>Open a Ticket</h2>
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

export default Support;