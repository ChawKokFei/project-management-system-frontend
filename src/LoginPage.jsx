import React from "react";

const LoginPage = () => {
    return (
        <div>
            <div>
                <label>Email/Username</label>
                <input placeholder="Please enter your email/username"/>
            </div>

            <div>
                <label>Password</label>
                <input placeholder="Please enter your password"/>
            </div>
        </div>
    )
}

export default LoginPage;