import './styles/upload.css'
import Header from "./header";
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import image1 from './Images/1.jpg'
import image2 from './Images/2.jpg'
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from 'react-router-dom';

function Upload() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/")
        }


    }, [])
    let token = localStorage.getItem("token")

    const [fingerprint, setFingerprint] = useState("")
    const [finger, setFinger] = useState("")
    const [errorMessage1, setErrorMessage1] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');
    const [errorMessage3, setErrorMessage3] = useState('');
    const [errorMessage4, setErrorMessage4] = useState('');
    const usero = {
        "_id": "NaN",
        "user": "NaN",
        "userId": "NaN",
        "transactionType": "NaN",
        "transactionImagePath": "NaN",
        "result": "NaN",
        "transactionImage1Path": "NAN", "transactionImage2Path": "NAN"
    }
    const [userone, setUserone] = useState(usero)
    const mes = "no"

    const [trmess, setTrmess] = useState(mes)

    const [data, setData] = useState([]);
    const [test, setTest] = useState('NAN')
    const [notm, setNotm] = useState("no")
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
        "web": "NAN", "fingers": [
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

    const [trconfirm, settrconfirm] = useState([]);

    const [geender, setGeender] = useState({
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
    })


    async function one() {
        setSec({ isSec: false });


        setIsLoading(true)
        // let item = { "fingerprint": fingerprint };
        const formData = new FormData();
        formData.append('fingerprint', fingerprint);
        let result = await fetch("http://localhost:8080/website/transactionOne", {
            method: "POST",
            body: formData,

            headers: {
                "Accept": "application/json",
                // "Content-type": 'multipart/form-data',
                'Authorization': token,
            },
        });
        result = await result.json();
        setIsLoading(false)

        setSec({ isSec: true });


        if (result.transactionReport) {
            settrconfirm(result.transactionReport)
            setGeender(result.transactionReport.informationEstimated)
            setTest(result.transactionReport.transactionType)
            setNotm(result.transactionReport.result)
            setUserone(result.transactionReport)

            if (result.transactionReport.isMatched) {
                setMatchtwo(result.transactionReport.isMatched)

            }


            if (result.transactionReport.PersonMatched) {
                setMatchth(result.transactionReport.PersonMatched);
            }
        } if (result.message) {
            setTrmess(result.message)
        }

    } async function two() {
        setSec({ isSec: false });

        setIsLoading(true)
        const formData = new FormData();
        formData.append('fingerprint', fingerprint);
        formData.append('fingerprint', finger);

        // let item = { fingerprint: fingerprint };
        // let ietmm = { fingerprint: finger };
        let result = await fetch("http://localhost:8080/website/transactionTwo", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                // "Content-type": "application/json",
                'Authorization': token,
            },
            body: formData
        });
        result = await result.json();
        setIsLoading(false)
        setSec({ isSec: true });

        if (result.message) {
            setTrmess(result.message)
        }

        if (result.transactionReport) {
            settrconfirm(result.transactionReport)
            setGeender(result.transactionReport.informationEstimated)
            setTest(result.transactionReport.transactionType)
            setNotm(result.transactionReport.result)
            setUserone(result.transactionReport)

            if (result.transactionReport.isMatched) {
                setMatchtwo(result.transactionReport.isMatched)

            }


            if (result.transactionReport.PersonMatched) {
                setMatchth(result.transactionReport.PersonMatched);
            }

        }

    }
    async function three() {
        setSec({ isSec: false });

        setIsLoading(true)
        const formData = new FormData();
        formData.append('fingerprint', fingerprint);
        // let item = { fingerprint: fingerprint };
        let result = await fetch("http://localhost:8080/website/transactionThree", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                // "Content-type": "application/json",
                'Authorization': token,
            },
            body: formData
        });
        result = await result.json();
        setIsLoading(false)
        setSec({ isSec: true });

        if (result.message) {
            setTrmess(result.message)
        }

        if (result.transactionReport) {
            settrconfirm(result.transactionReport)
            setGeender(result.transactionReport.informationEstimated)
            setTest(result.transactionReport.transactionType)
            setNotm(result.transactionReport.result)
            setUserone(result.transactionReport)

            if (result.transactionReport.isMatched) {
                setMatchtwo(result.transactionReport.isMatched)

            }


            if (result.transactionReport.PersonMatched) {
                setMatchth(result.transactionReport.PersonMatched);
            } setIsLoading(false)

        }


    }
    async function four() {

        setIsLoading(true)
        const formData = new FormData();
        formData.append('fingerprint', fingerprint);
        // let item = { fingerprint: fingerprint };
        let result = await fetch("http://localhost:8080/website/transactionFour", {
            method: "POST",

            body: formData,
            headers: {
                "Accept": "application/json",
                // "Content-type": 'multipart/form-data',
                'Authorization': token,
            },
        });
        result = await result.json();

        if (result.message) {
            setTrmess(result.message)
        }

        if (result.transactionReport) {
            settrconfirm(result.transactionReport)
            setGeender(result.transactionReport.informationEstimated)
            setTest(result.transactionReport.transactionType)
            setNotm(result.transactionReport.result)
            setUserone(result.transactionReport)

            if (result.transactionReport.isMatched) {
                setMatchtwo(result.transactionReport.isMatched)

            }


            if (result.transactionReport.PersonMatched) {
                setMatchth(result.transactionReport.PersonMatched);
            }

        }

    }
    function showForg(forg) {
        toast.info(forg, {
            position: toast.POSITION.TOP_CENTER,
            className: 'toast-message'
        });
    };
    const [forg, setForg] = useState("");
    function onClear() {
        setFingerprint("")
        setFinger("")
        setForg("")
        setMatchth(pers)
        setMatchtwo(mat)
        setTrmess(mes)
        setUserone(usero)
        toggleShow(false)
        settrconfirm(usero)
        setNotm("no")
        setTest("NAN")
        setGeender({
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
        })

    }
    const [register, setRegister] = useState({
        isRegister: false
    });
    const [sec, setSec] = useState({
        isSec: false
    });
    const [show, toggleShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [imagePreview, setImagePreview] = useState(null);
    const [imagePreview2, setImagePreview2] = useState(null);

    if (fingerprint) {
        const reader = new FileReader();

        reader.onload = () => {
            setImagePreview(reader.result);
        };

        reader.readAsDataURL(fingerprint);
    }
    if (finger) {
        const reader = new FileReader();

        reader.onload = () => {
            setImagePreview2(reader.result);
        };

        reader.readAsDataURL(finger);
    }

    return (
        <>
            {!register.isRegister ?
                <div>

                    <section>

                        <div className="box">
                            <h1 className='heading'>Crimnals</h1>
                            <h5 className='heading'>(Compare with people have previous crimes)</h5>

                            <input type="file" className='up' onChange={(e) => setFingerprint(e.target.files[0])} />
                            <button className='new' onClick={() => { showForg(forg); one(); onClear(); setRegister({ isRegister: true }); }} disabled={!fingerprint}>Search</button>
                            {errorMessage1 && <div className="invalid">{errorMessage1}
                            </div>}
                        </div>
                        <div className="box">
                            <h1 className='heading'>Suspicious</h1>
                            <h5 className='heading'>(compare image from crime scene with image of suspect person)</h5>

                            <input type="file" className='up' onChange={(e) => setFingerprint(e.target.files[0])} />
                            <input type="file" className='up' onChange={(e) => setFinger(e.target.files[0])} />
                            <button className='new' onClick={() => { showForg(forg); two(); onClear(); setRegister({ isRegister: true }); }} disabled={!finger}>Check Matches</button>
                            {errorMessage2 && <div className="invalid">{errorMessage2}
                            </div>}
                        </div>
                        <div className="box">
                            <h1 className='heading'>Global</h1>
                            <h5 className='heading'>(Compare with global DB)</h5>
                            <input type="file" className='up' onChange={(e) => setFingerprint(e.target.files[0])} />
                            <button className='new' onClick={() => { showForg(forg); three(); onClear(); setRegister({ isRegister: true }); }} disabled={!fingerprint}>Search</button>
                            {errorMessage3 && <div className="invalid">{errorMessage3}
                            </div>}
                        </div>
                        <div className="box">
                            <h1 className='heading'>Info!</h1>
                            <h5 className='heading'>Get Estimated Information's (GENDER , HAND, FINGER)</h5>
                            <input type="file" className='up' onChange={(e) => setFingerprint(e.target.files[0])} />
                            <button className='new' onClick={() => { showForg(forg); four(); onClear(); setRegister({ isRegister: true }); }} disabled={!fingerprint}>Get Details</button>
                            {errorMessage4 && <div className="invalid">{errorMessage4}
                            </div>}
                        </div>
                    </section></div>
                :



                <div>


                    <div className="alert warning-alert alrt">
                        <h3>Please wait admin to confirm the transaction to see the report of transaction</h3>
                        <CloseButton aria-label="Hide" onClick={() => { setRegister({ isRegister: false }); onClear(); }} className="close" />
                    </div>


                </div>

            }
        </>

    );



}
export default Upload;