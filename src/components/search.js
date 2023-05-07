import Side from './side';
import './styles/database.css'
import Header from "./header";
import React, { useEffect, useState } from 'react';

export default function Database() {
    const [data, setData] = useState([]);

    let token = localStorage.getItem("token")
    const fetchData = () => {
        fetch(`http://localhost:8080/admin/transactions`, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,

            }
        })
            .then((response) => response.json())
            .then((actualData) => {
                setData(actualData.transactions);
            })
            .catch((err) => {
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [register, setRegister] = useState({
        isRegister: false
    });
    const [usersd, setUserd] = useState([]);

    const [userkey, setUserkey] = useState('');
    async function takekey(key) {
        setUserkey(key)
    }
    async function search(userkey) {
        fetch(`http://localhost:8080/admin/transactions/` + userkey, {
            method: "get", headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,

            }
        })
            .then((response) => response.json())
            .then((userData) => {
                setUserd(userData.transaction)

            })
            .catch((err) => {
            });

    }
    return (
        <>
            {!register.isRegister ?
                <div className="split right">
                    <div className='fieldse' >
                        <legend>Search By Transition ID</legend>
                        <input className='inpuu' type="search" placeholder="Please Enter  ID" onChange={(e) => takekey(e.target.value)} />
                        <input className='inpuu' type="button" value="Search" onClick={() => { search(userkey); setRegister({ isRegister: true }) }} />



                        <div className="container">


                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Transition ID</th>
                                        <th>Transition Type</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        data.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="user-info">

                                                        <div className="user-info__basic">
                                                            <h5 className="mb-0">{item._id}</h5>
                                                            <p className="text-muted mb-0">{item.user}</p>
                                                        </div>
                                                    </div>
                                                </td>


                                                <td>
                                                    <div className="user-info">

                                                        <div className="user-info__basic">
                                                            <h5 className="mb-0"> {item.transactionType}</h5>
                                                        </div>
                                                    </div>
                                                </td><td>
                                                    <button className="btn btn-primary btn-sm" >View</button>
                                                </td><td>
                                                </td>

                                            </tr>))
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div  >
                </div>
                :

                <div className="split right">
                    <div className='fieldse' >
                        <legend>Search By Transition ID</legend>
                        <input className='inpuu' type="search" placeholder="Please Enter  ID" />

                        <input className='inpuu' type="button" value="View Transctions" onClick={() => { setRegister({ isRegister: false }) }} />
                        <input className='inpuu' type="button" value="Search" onClick={() => { search(userkey); }} />

                        <div className="container">


                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Transition Type</th>
                                        <th>Result</th>
                                        <th>Info</th>

                                    </tr>
                                </thead>
                                <tbody>



                                    <tr >
                                        <td>
                                            <div className="user-info">

                                                <div className="user-info__basic">
                                                    <h5 className="mb-0">{usersd.user}</h5>
                                                    <p className="text-muted mb-0">{usersd.userId}</p>
                                                </div>
                                            </div>
                                        </td>


                                        <td>
                                            <div className="user-info">

                                                <div className="user-info__basic">
                                                    <h5 className="mb-0"> {usersd.transactionType}</h5>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-info">

                                                <div className="user-info__basic">
                                                    <h5 className="mb-0"> {usersd.result}</h5>
                                                </div>
                                            </div>
                                        </td><td>
                                            <p>Gender:{usersd.informationEstimated.gender}</p><br />
                                            <p>Male Percentage  : {usersd.informationEstimated.male_percentage}</p><br />
                                            <p>Female Percentage  : {usersd.informationEstimated.female_percentage}</p><br />

                                        </td><td>
                                        </td>

                                    </tr>


                                </tbody>
                            </table>
                        </div>



                    </div></div>


            }

        </>
    );
}
