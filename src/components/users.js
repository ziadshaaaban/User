import "./styles/users.css"
import image1 from './Images/1.jpg'
import image2 from './Images/2.jpg'

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import CloseButton from 'react-bootstrap/CloseButton';

import 'react-toastify/dist/ReactToastify.css';

import Header from "./header";

import Side from "./side";
export default function Users() {
    const [id, setId] = useState("")
    function know(_id, username, firstname, lastname, age, phone) {
        setId(_id)
        setAge(age)
        setFirstname(firstname)
        setLastname(lastname)
        setUsername(username)
        setPhone(phone)
        search(_id)
        setIsLoading(false);

    }
    let tr = "Active";

    let fal = "Locked";
    let act = "Activate";
    let lock = "lock";
    const [firstname, setFirstname] = useState("");
    const [username, setUsername] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");

    const [up, setUp] = useState("");


    const navigate = useNavigate();
    const inputRef = useRef(null);

    const [updated, setUpdated] = useState('');

    const handleClick = () => {
        setUpdated(inputRef.current.value);
    };
    const [data, setData] = useState([]);
    const [usersd, setUserd] = useState([]);
    const [userkey, setUserkey] = useState('');

    async function takekey(key) {
        setUserkey(key)
    }
    let token = localStorage.getItem("token")


    useEffect(() => {
        getData();
    }, []);


    async function getData() {
        fetch(`http://localhost:8080/admin/users`, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,

            }
        })
            .then((response) => response.json())
            .then((actualData) => {
                setIsLoading(false);

                setData(actualData.users);
            })
            .catch((err) => {
            });
    };

    async function search(userkey) {
        setFour({ isfour: false });
        fetch(`http://localhost:8080/admin/users/` + userkey, {
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
                setFour({ isfour: true });

                setUserd(userData.user)
                setIsLoading2(false)

            })
            .catch((err) => {
                alert("User Not Found")
                let duta = {
                    "_id": "NaN",
                    "username": "NaN",
                    "password": "NaN",
                    "firstname": "NaN",
                    "lastname": "NaN",
                    "age": "0",
                    "gender": "NaN",
                    "address": "NaN",
                    "phone": "NaN",
                    "isActive": false,
                    "isAdmin": false
                }
                setUserd(duta)
            });
        getData();

    };



    async function deleteOperation(_id) {

        if (window.confirm("Are you sure you want to delete this user?")) {
            setIsLoading6(true)
            let result = await fetch("http://localhost:8080/admin/users/" + _id, {
                method: "DELETE", headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    'Authorization': token,

                }
            });
            result = await result.json();
            getData();
            setIsLoading6(false)

        }
    }

    async function updateOperation(_id) {
        setIsLoading4(true)
        let result = await fetch("http://localhost:8080/admin/status/users/" + _id, {
            method: "PUT", headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,

            }
        });
        result = await result.json();
        setUp(result.message)
        getData();
        search(id)
        setIsLoading4(false)

    }

    async function updateuser(id) {
        let item = { firstname, username, lastname, phone, age };

        let result = await fetch("http://localhost:8080/admin/users/" + id, {
            method: "PUT", headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,

            },
            body: JSON.stringify(item)

        });
        result = await result.json();
        setNot(result.message)
        getData(); search(id)
        showtrans(id)



    } function showUpdateuser(not) {
        toast.info(not, {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message'
        });
    };
    function showUpdate() {
        toast.success("User Status Changed", {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message'
        });
    };
    const [not, setNot] = useState("");


    const showToastMessage = () => {
        toast.success('User Deleted', {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message'
        });
    };

    const dtr = [
        {
            "_id": "NAN",
            "user": "NAN",
            "userId": "NAN",
            "transactionType": "NAN",
            "result": " NAN",

        }]
    const [tran, setTran] = useState(dtr)
    function viewtransction(id) {
        setIsLoading3(true)

        fetch(`http://localhost:8080/admin/transactions/user/` + id, {
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
            .then((transaction) => {
                if (transaction.transaction) {
                    setTran(transaction.transaction)
                }
                setIsLoading3(false)
            })
            .catch((err) => {
                alert("Transction Not Found")
                let trann = {
                    "_id": "NAN",
                    "user": "NAN",
                    "userId": "NAN",
                    "transactionType": "NAN",
                    "transactionImagePath": "NAN",
                    "result": "NAN",
                    "informationEstimated": {
                        "gender": "NAN",
                        "male_percentage": 0.0,
                        "female_percentage": 0.0,
                        "hand_position": "Left",
                        "right_percentage": 0.0,
                        "left_percentage": 0.0
                    }

                }
                setTran(trann)
                setIsLoading3(false)


            });
    };

    const [show, toggleShow] = useState(false);
    const [showtrans, toggleShowtrans] = useState(false);
    const [info, toggleInfo] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [isLoading3, setIsLoading3] = useState(true);

    const [isLoading4, setIsLoading4] = useState(false);
    const [isLoading6, setIsLoading6] = useState(true);

    const [register, setRegister] = useState({
        isRegister: false

    });
    const [sec, setSec] = useState({
        isSec: true
    });

    const [third, setThird] = useState({
        isthird: false
    });

    const [four, setFour] = useState({
        isfour: false
    });














    const [test, setTest] = useState('')
    const [notm, setNotm] = useState('')
    const pers = {
        "_idtwo": "NAN",
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
        "web": "NAN",
        "fingers": [
            "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN", "NAN",]
        , "previousCrimes": [
            {
                "_id": "NAN",
                "Crimes": [
                    {
                        "crime1": "NAN",
                        "Date of the crime": "NAN",
                        "Country of the crime": "NAN",
                        "Address of the crime": "NAN",
                        "Years in prison": "NAN"
                    }]
            }
        ]

    }
    const mat = { "result": "NAN" }

    const [matchth, setMatchth] = useState(pers)
    const [matchtwo, setMatchtwo] = useState(mat)




    const [usersdtwo, setUserdtwo] = useState([]);

    const [userkeytwo, setuserkeytwo] = useState('');
    const [geender, setGeendertwo] = useState('')
    async function takekey(key) {
        setuserkeytwo(key)
    } const [isLoading5, setIsLoading5] = useState(true);


    function onClear() {
        setFirstname("")
        setAge("")
        setLastname("")
        setPhone("")
        setUsername("")
        setUserkey("")
        setUserd([])
        toggleShow(false)
        toggleShowtrans(false)
        setTran(dtr)
        setIsLoading3(false)
        setIsLoading(false)
        setIsLoading2(false)
        setIsLoading4(false)

        setMatchth(pers)
        setMatchtwo(mat)




    };
    async function searchtwo(userkeytwo) {
        setIsLoading5(true)
        fetch(`http://localhost:8080/admin/transactions/` + userkeytwo, {
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
            .then((userDatatwo) => {
                setUserdtwo(userDatatwo.transaction)
                setGeendertwo(userDatatwo.transaction.informationEstimated)
                setTest(userDatatwo.transaction.transactionType)
                setNotm(userDatatwo.transaction.result)
                setIsLoading5(false)

                if (userDatatwo.transaction.isMatched) {
                    setMatchtwo(userDatatwo.transaction.isMatched)

                }


                if (userDatatwo.transaction.PersonMatched) {
                    setMatchth(userDatatwo.transaction.PersonMatched);
                }

            })
            .catch((err) => {
                alert("Transction Not Found")
                let duta = {
                    "_idtwo": "NAN",
                    "user": "NAN",
                    "userIdtwo": "NAN",
                    "transactionType": "NAN",
                    "transactionImagePath": "NAN",
                    "result": "NAN",

                }
                let gg = {

                    "gender": "NaN",
                    "male_percentage": 0,
                    "female_percentage": 0,
                    "hand_position": "NAN",
                    "right_percentage": 0,
                    "left_percentage": 0,
                    "gender": "NaN",
                    "male_percentage": 0,
                    "female_percentage": 0,
                    "hand_position": "NAN",
                    "right_percentage": 0,
                    "left_percentage": 0,
                    "Finger_name": "NAN",
                    "Thump_percentage": 0,
                    "Little_percentage": 0,
                    "Ring_percentage": 0,
                    "Index_percentage": 0,
                    "Middle_percentage": 0

                }
                setGeendertwo(gg)
                setUserdtwo(duta)
            });

    }; const [idtwo, setIdtwo] = useState("")

    function knowtwo(_id) {
        setIdtwo(_id)

        searchtwo(_id)

    }
    const [showtwo, toggleShowtwo] = useState(false);

    return (
        <>

            {third.isthird ?

                <div>

                    {!sec.isSec ?
                        null
                        : <div className="split right">
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
                                    {isLoading5 ? (<>
                                        <div className="loading-screen"></div>

                                        <div className="blending">
                                            <div className="blending-spinner"></div>
                                        </div>

                                    </>
                                    ) : null}</div>
                                <CloseButton aria-label="Hide" onClick={() => {
                                    setThird({ isthird: false }); setRegister({ isRegister: true }); toggleShowtrans(showtrans); know(id);
                                }} className="clos" />
                                <div >


                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Transition Type</th>

                                                {/* <th>More</th> */}

                                            </tr>
                                        </thead>
                                        <tbody>



                                            <tr >
                                                <td>
                                                    <div className="user-info">

                                                        <div className="user-info__basic">
                                                            <h5 className="mb-0">{usersdtwo.user}</h5>
                                                            <p className="text-muted mb-0">{usersdtwo.userId}</p>
                                                        </div>
                                                    </div>
                                                </td>


                                                <td>
                                                    <div className="user-info">

                                                        <div className="user-info__basic">
                                                            <h5 className="mb-0"> {usersdtwo.transactionType}</h5>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>
                                                    {/* <button className="btn btn-secondary dropdown-toggle" onClick={() => { toggleShowtwo(!showtwo) }} ></button> */}


                                                </td>

                                            </tr>



                                            <>

                                                {((test === 'one{Compare with people have previous crimes}' || test === 'Three{Compare with global DB}') & notm === 'not matched') ? <div>
                                                    <div className='col'>     <img src={image1} alt=" image" className='photo' />

                                                    </div>
                                                    <span className='sp'> <h1>Result : Not Match</h1><br /></span>
                                                    <h1>Information </h1>
                                                    <span className='sp'> <p>{"Gender : "}{geender.gender}</p><br /></span>
                                                    <p>{"Male_percentage : "}{geender.male_percentage}</p><br />
                                                    <p>{"Female Percentage : "}{geender.female_percentage}</p><br />

                                                    <span className=''>  <p>{"Hand Position : "}{geender.hand_position}</p><br /></span>
                                                    <p>{"Right Percentage : "}{geender.right_percentage}</p><br />
                                                    <p>{"Left Percentage : "}{geender.left_percentage}</p><br />

                                                    <p>{"Finger Name : "}{geender.Finger_name}</p><br />
                                                    <p>{"Thumb Percentage : "}{geender.Thump_percentage}</p><br />
                                                    <p>{"Little Percentage : "}{geender.Little_percentage}</p><br />
                                                    <p>{"Ring Percentage : "}{geender.Ring_percentage}</p><br />
                                                    <p>{"Index Percentage : "}{geender.Index_percentage}</p><br />
                                                    <p>{"Middle Percentage : "}{geender.Middle_percentage}</p><br />


                                                </div> : null
                                                }
                                                <div>
                                                    {((test === 'one{Compare with people have previous crimes}' || test === 'Three{Compare with global DB}') & notm === 'matched') ? <div>
                                                        <div className=''>     <img src={image1} alt=" image" className='photo' />

                                                        </div>
                                                        <span className='sp'> <h1>Result :  Match</h1><br /></span>
                                                        <h1>Information </h1>

                                                        <span className='sp'> <p>{"Name : "}{matchth.first_name} {matchth.last_name}</p><br /></span>
                                                        <p>{"Gender  : "}{matchth.gender}</p><br />

                                                        <span className='sp'>  <p>{"Company Name : "}{matchth.company_name}</p><br /></span>
                                                        <p>{"Address : "}{matchth.address}</p><br />
                                                        <p>{"Phone : "}{matchth.phone1}</p><br />


                                                        <h1>Fingers</h1>
                                                        <div className="image-wrapper">

                                                            {matchth.fingers.map((item, index) => (
                                                                <div key={index}>

                                                                    <div className="media">
                                                                        <div className="overlay"></div>
                                                                        <img src={item} alt="" />
                                                                        <div className="image-details">

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div> : null
                                                    }</div>
                                                <div>
                                                    {(test === 'Two{compare image from crime scene with image of suspect person}' & matchtwo.result === 'Not match') ? <div>
                                                        <div className='col'>   <img src={image1} alt=" image" className='photo' />
                                                            <img src={image2} alt=" image" className='photo' />
                                                        </div>
                                                        <span className='sp'> <h1>Result : Not Match</h1><br /></span>
                                                    </div> : null
                                                    }</div>
                                                <div>
                                                    {(test === 'Two{compare image from crime scene with image of suspect person}' & matchtwo.result === 'Match') ? <div>
                                                        <div className='col'>   <img src={image1} alt=" image" className='photo' />
                                                            <img src={image2} alt=" image" className='photo' />
                                                        </div>
                                                        <span className='sp'> <h1>Result :  Match</h1><br /></span>
                                                    </div> : null
                                                    }</div>


                                                <div>

                                                    {(test === "Four{Get Estimated Information's From FingerPrint Like (GENDER , HAND, FINGER)}") ? <div>
                                                        <div className='col'>     <img src={image1} alt=" image" className='photo' />

                                                        </div>
                                                        <h1>Information </h1>

                                                        <span className='sp'> <p>{"Gender : "}{geender.gender}</p><br /></span>
                                                        <p>{"Male_percentage : "}{geender.male_percentage}</p><br />
                                                        <p>{"Female Percentage : "}{geender.female_percentage}</p><br />

                                                        <span className=''>  <p>{"Hand Position : "}{geender.hand_position}</p><br /></span>
                                                        <p>{"Right Percentage : "}{geender.right_percentage}</p><br />
                                                        <p>{"Left Percentage : "}{geender.left_percentage}</p><br />

                                                        <p>{"Finger Name : "}{geender.Finger_name}</p><br />
                                                        <p>{"Thumb Percentage : "}{geender.Thump_percentage}</p><br />
                                                        <p>{"Little Percentage : "}{geender.Little_percentage}</p><br />
                                                        <p>{"Ring Percentage : "}{geender.Ring_percentage}</p><br />
                                                        <p>{"Index Percentage : "}{geender.Index_percentage}</p><br />
                                                        <p>{"Middle Percentage : "}{geender.Middle_percentage}</p><br />


                                                    </div> : null
                                                    }</div></>



                                        </tbody>
                                    </table>
                                </div>



                            </div></div>}</div>

                :

                <div>
                    {!register.isRegister ?


                        <div className="split right">
                            <div className='fieldse' >
                                <div className="bl"> </div><div className="app">
                                    {isLoading ? (<>
                                        <div className="loading-screen"></div>

                                        <div className="blending">
                                            <div className="blending-spinner"></div>
                                        </div>

                                    </>
                                    ) : null}

                                </div>

                                <div className="bl"> </div><div className="app">
                                    {isLoading ? (<>
                                        <div className="loading-screen"></div>

                                        <div className="blending">
                                            <div className="blending-spinner"></div>
                                        </div>

                                    </>
                                    ) : null}</div>
                                <div className="bl"> </div>
                                <div></div><div className="app">
                                    {isLoading4 ? (<>
                                        <div className="loading-screen"></div>

                                        <div className="blending">
                                            <div className="blending-spinner"></div>
                                        </div>

                                    </>
                                    ) : null}</div>




                                <div >


                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Status</th>
                                                <th>View</th>
                                                <th>Delete</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                data.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="user-info">
                                                                <div className="user-info__basic">
                                                                    <h5 className="mb-0">{item.firstname + item.lastname}</h5>

                                                                    <p className="text-muted mb-0">{item.username}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {!item.isActive ?

                                                            <td>
                                                                <span className="active-circle bg-danger"></span>
                                                                {fal}
                                                            </td>
                                                            :
                                                            <td>
                                                                <span className="active-circle bg-success"></span>
                                                                {tr}
                                                            </td>
                                                        }

                                                        <td>
                                                            <button className="btn btn-primary btn-sm , bu" onClick={() => {
                                                                setRegister({ isRegister: true }); setIsLoading2(true)
                                                                    ; know(item._id, item.username,
                                                                        item.firstname, item.lastname, item.age, item.phone);
                                                            }}>View</button>
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-primary btn-danger , bu" onClick={() => { deleteOperation(item._id); showToastMessage(); }}>Delete</button>
                                                        </td>
                                                        {!item.isActive ?

                                                            <td>
                                                                <button className="btn btn-primary btn-dark , bu" onClick={() => { updateOperation(item._id); showUpdate(up); }}>{act}</button>
                                                            </td> :
                                                            <td>
                                                                <button className="btn btn-primary btn-dark , bu" onClick={() => { updateOperation(item._id); showUpdate(up); }}>{lock}</button>
                                                            </td>}

                                                    </tr>))}



                                        </tbody>

                                    </table>

                                </div>
                                {show && <form id="form">
                                    <div className='fieldse'>
                                        <div className="form-row">
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="First name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="Last name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="User name" value={username} onChange={(e) => setUsername(e.target.value)} />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                            </div>
                                            <button type="button" className="sum" onClick={() => { toggleShow(!show); updateuser(id); onClear(); showUpdateuser(not); }}>Update</button>

                                        </div>
                                    </div>
                                </form>
                                }


                            </div  >
                        </div>
                        :

                        <div className="split right">
                            <div className='fieldse' >

                                <div>
                                    {!four.isfour ?
                                        <div>

                                            <div className="bl"> </div>
                                            <div></div><div className="app">
                                                {isLoading2 ? (<>
                                                    <div className="loading-screen"></div>

                                                    <div className="blending">
                                                        <div className="blending-spinner"></div>
                                                    </div>

                                                </>
                                                ) : null}</div>
                                        </div>
                                        :
                                        <div>
                                            <div className="bl"> </div>
                                            <div></div><div className="app">
                                                {isLoading4 ? (<>
                                                    <div className="loading-screen"></div>

                                                    <div className="blending">
                                                        <div className="blending-spinner"></div>
                                                    </div>

                                                </>
                                                ) : null}</div>
                                            {/* <legend>Search By ID</legend> */}
                                            {/* <input className='inpuu' ref={inputRef} type="search" placeholder="Please Enter National ID" onChange={(e) => takekey(e.target.value)} /> */}
                                            {/* <input className='inpuu' type="button" value="View Users" onClick={() => { onClear(); toggleInfo(false); setRegister({ isRegister: false }); }} /> */}
                                            <CloseButton aria-label="Hide" onClick={() => { onClear(); toggleInfo(false); setRegister({ isRegister: false }); }} className="clos" />

                                            {/* <input className='inpuu' type="button" value="Search" onClick={() => { handleClick(updated); search(userkey); setRegister({ isRegister: true }); }} disabled={!userkey} /><ToastContainer /> */}

                                            <div >


                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>User</th>
                                                            <th>Status</th>
                                                            <th>Transitions</th>
                                                            <th>Update</th>
                                                            {/* <th>Delete</th>
                                                            <th>Actions</th> */}
                                                            {/* <th>More</th> */}

                                                        </tr>
                                                    </thead>
                                                    <tbody>


                                                        <tr >
                                                            <td>
                                                                <div className="user-info">
                                                                    <div className="user-info__basic">
                                                                        <h5 className="mb-0">{usersd.firstname + usersd.lastname}</h5>

                                                                        <p className="text-muted mb-0">{usersd.username}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {!usersd.isActive ?

                                                                <td>
                                                                    <span className="active-circle bg-danger"></span>
                                                                    {fal}
                                                                </td>
                                                                :
                                                                <td>
                                                                    <span className="active-circle bg-success"></span>
                                                                    {tr}
                                                                </td>
                                                            }
                                                            <td>
                                                                <button className="btn btn-info btn-sm bu" onClick={() => {
                                                                    toggleShowtrans(!showtrans); viewtransction(usersd._id); know(usersd._id, usersd.username,
                                                                        usersd.firstname, usersd.lastname, usersd.age, usersd.phone); setFour({ isfour: true })
                                                                }}> View Transition</button>

                                                            </td>
                                                            <td>
                                                                <button className="btn btn-info btn-sm bu" onClick={() => {
                                                                    toggleShow(!show); know(usersd._id, usersd.username,
                                                                        usersd.firstname, usersd.lastname, usersd.age, usersd.phone); setFour({ isfour: true })
                                                                }}>Update</button>
                                                            </td>
                                                            {/* <td>
                                                                <button className="btn btn-primary btn-danger bu" onClick={() => { setRegister({ isRegister: false }); deleteOperation(usersd._id); showToastMessage(); }}>Delete</button>
                                                            </td> */}


                                                            {/* <div>            {!usersd.isActive ?

                                                                <td>
                                                                    <button className="btn btn-primary btn-dark  bu" onClick={() => { updateOperation(usersd._id); showUpdate(up); }}>{act}</button>
                                                                </td> :
                                                                <td>
                                                                    <button className="btn btn-primary btn-dark bu" onClick={() => { updateOperation(usersd._id); showUpdate(up); }}>{lock}</button>
                                                                </td>}</div>
 */}


                                                            <td>
                                                                {/* <button className="btn btn-secondary dropdown-toggle" onClick={() => { toggleInfo(!info) }} ></button> */}


                                                            </td>
                                                        </tr>


                                                    </tbody>

                                                </table>

                                            </div>

                                            <div>
                                                <span className="sp">  <h1 >{" Name : "}{usersd.firstname} {usersd.lastname}</h1><br /></span>
                                                <p className=''>{"Username : "}{usersd.username}</p><br />

                                                <p className=''>{"Gender : "}{usersd.gender}</p><br />
                                                <p className=''>{"Age : "}{usersd.age}</p><br />

                                                <p className=''>{"Address : "}{usersd.address}</p><br />
                                                <p className=''>{"Phone Number : "}{usersd.phone}</p><br />
                                            </div>


                                            {show &&
                                                <div>

                                                    <form id="form">
                                                        <div className='fi'>
                                                            <div className="form-row">
                                                                <div className="col">
                                                                    <input type="text" className="form-control" placeholder="First name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                                                </div>
                                                                <div className="col">
                                                                    <input type="text" className="form-control" placeholder="Last name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                                                </div>
                                                                <div className="col">
                                                                    <input type="text" className="form-control" placeholder="User name" value={username} onChange={(e) => setUsername(e.target.value)} />
                                                                </div>
                                                                <div className="col">
                                                                    <input type="text" className="form-control" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                                                                </div>
                                                                <div className="col">
                                                                    <input type="text" className="form-control" placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <button type="button" className="btn btn-primary btn-danger fil" onClick={() => { toggleShow(!show); updateuser(id); onClear(); showUpdateuser(not); }}>Update</button>
                                                        <br></br>
                                                    </form>
                                                </div>
                                            }
                                            {showtrans &&
                                                <div>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">User Name</th>
                                                                <th scope="col">Type</th>
                                                                <th scope="col">more</th>


                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {
                                                                tran.map((item, index) => (
                                                                    <tr key={index}>
                                                                        <td>{item.user}</td>
                                                                        <td>{item.transactionType}</td>
                                                                        <td> <button className="btn btn-primary btn-sm bu" onClick={() => { toggleShowtwo(false); knowtwo(item._id); setThird({ isthird: true }); }} >View</button>
                                                                        </td>
                                                                    </tr>))}
                                                        </tbody>

                                                    </table>

                                                    <div className="bl"> </div><div className="app">
                                                        {isLoading3 ? (<>
                                                            <div className="loading-screen"></div>

                                                            <div className="blending">
                                                                <div className="blending-spinner"></div>
                                                            </div>

                                                        </>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            }
                                        </div>}
                                </div>
                            </div  >
                        </div>


                    }</div>}
        </>
    )
}





