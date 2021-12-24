import React from "react";

class Report extends React.Component {

    state = {

        urgent: ""

    }


    onChangeValue = (event) => {
        let urgent = event.target.value;
        this.setState({urgent: urgent});
    }

    render() {
        return (
            <div class={"board"} style={{width:"40%", marginLeft:"17%", height:"auto", padding:"25px"}}>
                <form action="/">
                    <div>
                        <h3 style={{textAlign:"center"}}>Report a Bug</h3>
                        <p>
                            Please fill the form
                        </p>
                    </div>

                    <div className="contact-item">
                        <div className="item">
                            <p>Where</p>
                            <input type="text" name="name"/>
                        </div>
                        <div className="item">
                            <p>Department</p>
                            <input type="text" name="name"/>
                        </div>
                    </div>
                    <div className="item">
                        <p>Redirect to (optional)</p>
                        <input type="text" name="name"/>
                    </div>
                    <div className="item">
                        <p>Type of Bug</p>
                        <input type="text" name="name"/>
                    </div>
                    <div className="item">
                        <p>Description</p>
                        <textarea rows="3" required></textarea>
                    </div>

                    <div>
                        <p>
                            How severe the bug is?
                        </p>
                        <div>
                            <input type="radio" value="none" id="radio_1" name="status" required style={{width:"4%"}}/>
                            <label htmlFor="radio_1" className="radio"><span>Not much</span></label>
                        </div>
                        <div>
                            <input type="radio" value="none" id="radio_1" name="status" required style={{width:"4%"}}/>
                            <label htmlFor="radio_1" className="radio"><span>Mild</span></label>
                        </div>
                        <div>
                            <input type="radio" value="none" id="radio_1" name="status" required style={{width:"4%"}}/>
                            <label htmlFor="radio_1" className="radio"><span>Critical</span></label>
                        </div>
                    </div>
                    <div>

                        <div className="btn-block">
                            <button type="submit" href="/">APPLY</button>
                        </div>
                    </div>

                </form>

                <div>
                    {this.state.urgent}

                </div>
            </div>
        )
    }
}
export default Report;