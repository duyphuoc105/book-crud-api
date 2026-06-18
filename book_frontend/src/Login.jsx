import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {
    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin = async () => {
        try {
            const response =
                await axios.post(
                    "http://127.0.0.1:8000/api/token/",
                    {
                        username,
                        password,
                    }
                );

            localStorage.setItem(
                "access",
                response.data.access
            );

            alert("Login successful");

            onLogin();

        } catch (error) {

            alert("Login failed");
        }
    };

    return (
        <div
            style={{
                padding: "50px",
                textAlign: "center",
            }}
        >
            <h1>Login</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                    setUsername(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <button
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    );
}

export default Login;