import Side from './side';
import './styles/database.css'
import React, { useEffect, useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import image1 from './Images/1.jpg'
import image2 from './Images/2.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom';

export default function Database() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/")
        }


    }, [])
    const [test, setTest] = useState('')
    const [notm, setNotm] = useState('')
    const pers = {
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

    const [data, setData] = useState([]);
    const [mees, setMEs] = useState('NOt Found');
    const [ii, setII] = useState('NAN');


    let token = localStorage.getItem("token")
    let uid = sessionStorage.getItem("userId")
    const fetchData = () => {
        setIsLoading(true)
        setThird({ isThird: false });


        fetch(`https://backendssh.vercel.app/website/declined/transactions`, {
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': token,

            }
        })
            .then((response) => response.json())
            .then((actualData) => {
                setThird({ isThird: true });

                if (actualData.result) {
                    setII(data.transactionID)


                    setData(actualData.result);
                }
                if (actualData.message) {
                    setMEs(actualData.message)
                }
                setIsLoading(false)
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
    const [geender, setGeender] = useState('')
    async function takekey(key) {
        setUserkey(key)
    }
    async function search(userkey) {
        setIsLoading2(true)

        fetch(`https://backendssh.vercel.app/website/transactions/` + userkey, {
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
                setSec({ isSec: true });

                setUserd(userData.transaction)
                setGeender(userData.transaction.informationEstimated)
                setTest(userData.transaction.transactionType)
                setNotm(userData.transaction.result)

                if (userData.transaction.isMatched) {
                    setMatchtwo(userData.transaction.isMatched)

                }


                if (userData.transaction.PersonMatched) {
                    setMatchth(userData.transaction.PersonMatched);
                }
                setIsLoading2(false)
            })
            .catch((err) => {
                alert("Transction Not Found")
                let duta = {
                    "_id": "NAN",
                    "user": "NAN",
                    "userId": "NAN",
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
                setGeender(gg)
                setUserd(duta)
            });
        fetchData()

    }; function onClear() {
        setUserkey("")
        toggleShow(false)
        setMatchth(pers)
        setMatchtwo(mat)
        setIsLoading(true)
    } const [id, setId] = useState("")

    function know(_id) {
        setId(_id)

        search(_id)

    }
    const [show, toggleShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [isLoading3, setIsLoading3] = useState(true);

    const [sec, setSec] = useState({
        isSec: false
    });
    const [third, setThird] = useState({
        isThird: false
    });

    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        // Perform some asynchronous operation
        // ...
        setLoading(false);
    }
    return (
        <>

            {!register.isRegister ?

                <div  >
                    {!third.isThird ?
                        <div >



                            <div ><div className="">
                                {isLoading ? (<>

                                    <div className="blncen">
                                        <div className="blending-spinnerr"></div>

                                    </div>
                                    <div className="blncen2">

                                        <h3 className='cenn paragraph'>Please wait It will take a while! </h3>
                                    </div>
                                </>
                                ) : null}</div></div>




                        </div> :
                        <div>

                            {mees === "there is no transaction found!" ?


                                <div className="alert warning-alert alrt">
                                    <h3>{mees}</h3>
                                </div> : null}

                            <div >


                                <div className="bl"> </div><div className="app">
                                    {isLoading ? (<>
                                        <div className="loading-screen"></div>

                                        <div className="blending">
                                            <div className="blending-spinner"></div>
                                            <h3 className='cenn'>Please wait It will take a while! </h3>

                                        </div>

                                    </>
                                    ) : null}</div>

                                {data.length === 0 ?

                                    <div className="alert warning-alert alrt">
                                        <h3 >No Transction Found</h3>
                                    </div>

                                    :

                                    <div className="split right">
                                        <div className='fieldse' >
                                            <div className="table-responsive">

                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Confirmion</th>
                                                            <th> Time</th>
                                                            <th> Transction ID</th>



                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            data.reverse().map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <div className="user-info">

                                                                            <div className="user-info__basic">
                                                                                <h5 className="mb-0">{item.confirmation}</h5>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <div className="user-info">

                                                                            <div className="user-info__basic">
                                                                                <h5 className="mb-0"> {item.declineTime}</h5>
                                                                            </div>
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <div className="user-info">

                                                                            <div className="user-info__basic">
                                                                                <h5 className="mb-0">{item.transactionID}</h5>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>))
                                                        }

                                                    </tbody>
                                                </table>
                                            </div></div></div>}
                            </div>

                        </div  >
                    }</div>
                :

                null






            }

        </>
    );
}
