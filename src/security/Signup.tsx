import React, {useState} from "react";
import {addUser} from "../services/apiFacade.ts";

type User = {
    username: string,
    password: string,
    email: string
}

const EMPTY_USER = {username: "", password: "", email: ""}

export default function Signup() {
    const [user, setUser] = useState<User>({...EMPTY_USER})

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await addUser(user);

        alert(JSON.stringify(user) + " signed up")

        setUser({...EMPTY_USER});
    }


    return (
        <div style={{display:"flex", justifyContent: "center"}}>
            <div className="login-wrapper">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Signup</h2>
                    <div className="login-form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={(e) => setUser((prev) => ({...prev, username: e.target.value}))}
                            required
                        />
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={(e) => setUser((prev) => ({...prev, password: e.target.value}))}
                            required
                        />
                    </div>
                    <div className="login-form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={(e) => setUser((prev) => ({...prev, email: e.target.value}))}
                            required
                        />
                    </div>
                    <button style={{marginTop: "1rem"}} type="submit" className="login-btn">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}