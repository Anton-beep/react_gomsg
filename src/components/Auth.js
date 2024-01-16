import {useCookies} from "react-cookie";
import {useState} from "react";
import axios from "axios";
import config from "../config";

export const Auth = () => {
    const [method, setMethod] = useState("");
    const [inputValues, setInputValues] = useState({username: "", password: ""});
    const [, setCookies] = useCookies(["user"]);
    const [warningAuth, setWarningAuth] = useState(null);

    const handleInputChange = (event) => {
        setInputValues({...inputValues, [event.target.name]: event.target.value});
    };

    const processGoodRegister = (response) => {
        delete response.data.message
        setCookies("user", response.data)
    }

    const registerUser = () => {
        axios.post(config.goUrl + "/register", inputValues)
            .then(response => processGoodRegister(response))
            .catch(error => setWarningAuth("User with this username already exists"))
    }

    const loginUser = () => {
        axios.post(config.goUrl + "/login", inputValues)
            .then(response => processGoodRegister(response))
            .catch(error => setWarningAuth("Wrong username or password"))
    }

    let content;
    if (method === "") {
        content = (
            <>
                <h1>You need to authorize to use messenger</h1>
                <button onClick={() => setMethod("register")}>Register</button>
                <button onClick={() => setMethod("login")}>Login</button>
            </>
        )
    } else if (method === "register") {
        content = (
            <>
                <h1>Register</h1>
                <input type="text" name="username" placeholder="Username" value={inputValues.username}
                       onChange={handleInputChange}/>
                <input type="password" name="password" placeholder="Password" value={inputValues.password}
                       onChange={handleInputChange}/>
                <button onClick={registerUser}>Register</button>
            </>
        )
    } else if (method === "login") {
        content = (
            <>
                <h1>Login</h1>
                <input type="text" name="username" placeholder="Username" value={inputValues.username}
                       onChange={handleInputChange}/>
                <input type="password" name="password" placeholder="Password" value={inputValues.password}
                       onChange={handleInputChange}/>
                <button onClick={loginUser}>Login</button>
            </>
        )
    }

    return (
        <>
            {content}
            {warningAuth && <div>{warningAuth}</div>}
        </>
    )
}