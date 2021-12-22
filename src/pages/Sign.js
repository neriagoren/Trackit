import React from "react";


class Sign extends React.Component {

    state = {}

    render () {
        return (
            <div style={{width:"25%", margin:"auto", marginTop:"20px", height:"100vh"}}>
                <form action="/">
                    <div>
                        <h1>Sign</h1>
                    </div>
                    <div className="item">
                        <div>
                            <input type="text" name="name" placeholder="username"/>
                        </div>
                    </div>
                    <div className="item">
                        <div>
                            <input type="password" name="name" placeholder="password"/>
                        </div>
                    </div>



                    <div className="btn-block">
                        <button type="submit" href="/">Login </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Sign;