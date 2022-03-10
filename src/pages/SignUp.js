import React from "react";

class SignUp extends React.Component {

    state = {}

    render () {
        return (
            <div style={{width:"25%", margin:"auto", marginTop:"20px", height:"100vh"}}>
                <form action="/">
                    <div>
                        <h1>Sign up</h1>
                    </div>
                    <div className="contact-item">
                        <div className="item">
                        <input type="text" name="name" placeholder="First Name"/>
                        </div>
                        <div className="item">
                        <input type="text" name="name" placeholder="Last Name"/>
                        </div>
                    </div>
                    <div className="item">
                        <div>
                            <input type="text" name="name" placeholder="Username"/>
                        </div>
                    </div>
                    <div className="item">
                        <div>
                            <input type="password" name="name" placeholder="Password"/>
                        </div>
                    </div>
                    <div className="btn-block">
                        <button type="submit" href="/">Sign Up </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;