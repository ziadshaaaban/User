import './styles/verify.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "./header";
import { Link } from 'react-router-dom'

function Verify(props) {
    let username = localStorage.getItem("username")
    const [code, setcode] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const [def, setDef] = ("NAN")
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/upload")
        } else if (localStorage.getItem('tokenauth')) {
            navigate("/verify")

        } else { navigate("/") }
    }, [])
    let tokenauth = localStorage.getItem("tokenauth")
    async function verify() {
        setIsLoading(true)
        setErrorMessage("")
        try {
            let item = { code };
            let result = await fetch("https://backendssh.vercel.app/website/verify", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    'Authorization': tokenauth,

                },
                body: JSON.stringify(item)
            });
            result = await result.json();
            if (result.result === "fail verification, Code is invalid or has expired.") {
                setErrorMessage("Code is invalid or has expired");
                setIsLoading(false)
                setcode("")

            } else {
                let token = result.result.loginToken;
                let uid = result.result.userId
                localStorage.setItem("token", token)
                localStorage.setItem("userId", uid)
                navigate("/upload")
                setIsLoading(false)

            }

        }
        catch (error) {
            setErrorMessage("Invalid Code");
            setIsLoading(false)


        }
    } const [isLoading, setIsLoading] = useState(false);

    async function resend() {
        setIsLoading(true)
        setErrorMessage("")
        try {
            let user = { username };
            let result = await fetch("https://backendssh.vercel.app/website/resend", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",

                },
                body: JSON.stringify(user)
            });
            result = await result.json();
            setIsLoading(false)

            let tokenauth = result.result.tokenFor2AuthCode;

            localStorage.setItem("tokenauth", tokenauth)
        }
        catch (error) {



        }
    }

    function logout() {
        localStorage.clear();
        navigate("/")

    }
    return (<>


        <div className="registration-form">
            <form> <div className="form-group">
                <h5 className='bbnew'>Check Your E-mail</h5></div>
                <div className="form-group">
                    <input type="text" className="form-control item" id="code" placeholder="Enter Code" required value={code}
                        onChange={(e) => {
                            setErrorMessage("")
                                ; setcode(e.target.value)
                        }} />
                </div>


                <div className="form-group">
                    <button type="button" className="btn btn-block create-account" onClick={verify}>Confirm</button>
                </div>

                <div >


                    {errorMessage && <div className="invcode">{errorMessage}
                    </div>}
                    <div className="" ><div>
                        {isLoading ? (<>
                            <div className="blncen3">
                                <div className="blending-spinnerr"></div>

                            </div>
                        </>
                        ) : null}</div></div>
                </div>
            </form>





            <div className="social-media">
                <div className="resnd">
                    <a onClick={resend} > <h5>resend my verification code</h5></a></div>
                <div className="resnd">
                    <h5 onClick={logout}>Login</h5></div>

            </div>
        </div>

    </>)
}
export default Verify