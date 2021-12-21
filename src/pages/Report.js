import React from "react";

class Report extends React.Component {

    state = {

    }

    render() {
        return (
            <div  style={{width:"40%", margin:"auto", marginTop:"20px"}}>
                <form action="/">
                    <div>
                        <h1>Report a Bug</h1>
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
                        <p>Student Status</p>
                        <input type="text" name="name"/>
                    </div>
                    <div className="item">
                        <p>Roommate Preferences</p>
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

export default Report;