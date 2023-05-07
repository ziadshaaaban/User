import './styles/admin.css'
import Side from './side';
import React, { useState } from 'react';
import Header from "./header";
import { ToastContainer, toast } from 'react-toastify';

function Admin() {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    let token = localStorage.getItem("token")

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewpassword] = useState("");

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [not, setNot] = useState("");
    const [forg, setForg] = useState("");
    const [userkey, setUserkey] = useState('');
    const [usersd, setUserd] = useState([]);

    const [show, toggleShow] = useState(false);
    async function takekey(key) {
        setUserkey(key)
    }
    const [addnew, setAddnew] = useState('')
    async function register() {
        setIsLoading(true)
        let item = { username, password, firstname, lastname, gender, address, phone, age }
        let token = localStorage.getItem("token")


        let result = await fetch("http://localhost:8080/admin/users", {
            method: "POST",
            body: JSON.stringify(item),

            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,

            },
        });
        result = await result.json();
        setNot(result)
        setAddnew(result.message)
        setIsLoading(false)
    }
    function showToastMessage(not) {
        toast.info(not.message, {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message'
        });
    };
    function showForg(forg) {
        toast.success(" Password reset successfully", {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message'
        });
    };
    function onClear() {
        setAge("")
        setAddress("")
        setUsername("")
        setFirstname("")
        setGender("")
        setLastname("")
        setPassword("")
        setPhone("")
        setNewpassword("")
        setForg("")
        setNot("")

    };
    const [pass, setPass] = useState('')
    const [find, setFind] = useState('')
    async function forget() {
        setIsLoading2(true)
        let item = { username, newPassword };
        let result = await fetch("http://localhost:8080/admin/forgetPassword", {
            method: "put",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,
            },
            body: JSON.stringify(item)
        });
        result = await result.json();

        setPass(result.message)
        setIsLoading2(false)
    }
    async function search(userkey) {
        fetch(`http://localhost:8080/admin/citizen/` + userkey, {
            method: "get", headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,

            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();

            })
            .then((userData) => {
                setUserd(userData.user)

            })
            .catch((err) => {
                alert("User Not Found")
                let cit = {
                    "_id": "NAN",
                    "first_name": "NAN",
                    "last_name": "NAN",
                    "gender": "NAN",
                    "company_name": "NAN",
                    "address": "NAN",
                    "city": "NAN",
                    "county": "NAN",
                    "phone1": "NAN",
                    "phone2": "NAN",
                    "email": "NAN",

                }
                setUserd(cit)
                setFind("Not Found")

            });

    };

    return (
        <>
            <div className="split right">
                <div className='fieldse' >
                    <div className="bl"> </div><div className="app">
                        {isLoading ? (<>
                            <div className="loading-screen"></div>

                            <div className="blending">
                                <div className="blending-spinner"></div>
                            </div>

                        </>
                        ) : null}</div>
                    <div className="bl"> </div><div className="app">
                        {isLoading2 ? (<>
                            <div className="loading-screen"></div>

                            <div className="blending">
                                <div className="blending-spinner"></div>
                            </div>

                        </>
                        ) : null}</div>
                    <legend>Add User</legend>
                    {addnew === "the username already exists use another one!" ? <div> <span className='sp'>{addnew}</span> </div> :
                        <div> <span className='sr'>{addnew}</span> </div>}

                    <div className='formmm' >
                        <div className="na">
                            <input className='inputtt' value={username} placeholder="User name" onChange={(e) => setUsername(e.target.value)} />


                        </div>
                        <div className="na">
                            <input className='inputtt' value={firstname} placeholder=" First name" onChange={(e) => setFirstname(e.target.value)} />

                        </div>
                        <div className="na">
                            <input className='inputtt' value={lastname} placeholder="Last name" onChange={(e) => setLastname(e.target.value)} />


                        </div>
                        <div className="na">
                            <input className='inputtt' value={password} placeholder=" Password" type="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className="na">
                            <input className='inputtt' value={gender} placeholder=" Gender" type="gender" onChange={(e) => setGender(e.target.value)} />
                        </div>
                        <div className="na">
                            <input className='inputtt' value={address} placeholder=" Address" type="address" onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="na">
                            <input className='inputtt' value={phone} placeholder=" Phone" type="phone" onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="na">
                            <input className='inputtt' value={age} placeholder=" Age" type="age" onChange={(e) => setAge(e.target.value)} />
                        </div>


                    </div><br />
                    <button className='sum' onClick={() => { register(); showToastMessage(not); onClear(); }} disabled={!username}>Add</button>


                </div >
                <div className='fieldse' >
                    <legend>Get Some One By ID</legend>
                    <input className='inpuu' type="search" placeholder="Please Enter National ID" onChange={(e) => takekey(e.target.value)} />
                    <input Name='inpuu' type="button" value="Search" onClick={() => { toggleShow(!show); search(userkey); }} disabled={!userkey} />
                    {show &&
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">county</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Gender</th>


                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th >{usersd.first_name}{""}{usersd.last_name}</th>
                                    <td>{usersd.county}</td>
                                    <td>{usersd.address}</td>
                                    <td>{usersd.email}</td>
                                    <td>{usersd.phone1}</td>

                                    <td>{usersd.gender}</td>
                                </tr>

                            </tbody>
                        </table>}
                    {find &&
                        <div><span className='mess'>{find}</span> </div>
                    }
                </div  >
                <div className='fieldse' >
                    <legend>Rest Password</legend>

                    {pass && <div><span className='mess'>{pass}</span></div>}
                    <br></br>

                    <input className='inpuu' value={username} type="search" placeholder="Enter User Name" onChange={(e) => setUsername(e.target.value)} />
                    <input className='inpuu' value={newPassword} type="search" placeholder="Enter New Password" onChange={(e) => setNewpassword(e.target.value)} />

                    <input className='inpuu' type="button" value="Update" onClick={() => { forget(); showForg(forg); onClear(); }} disabled={!newPassword} />

                </div  >


            </div>

        </>
    );
}


export default Admin;