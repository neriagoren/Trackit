import React from "react";
import NavLink from "react-router-dom/es/NavLink";


class SignIn extends React.Component {

    state = {}

    render () {
        return (
            <div style={{width:"25%", margin:"auto", marginTop:"20px", height:"100vh"}}>
                <form action="/">
                    <div>
                        <h1>Sign in</h1>
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


                    <div  style={{ paddingBottom:"10px", marginTop:"10px"}}>

                        <div style={{ float:"left"}}>
                            <NavLink to={"/signup"}> Create an account </NavLink>


                        </div>
                        <div style={{ float: "right"}}>
                            <NavLink to={"/signup"}> Forgot password? </NavLink>

                        </div>

                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;