import image from './Images/logo2.png'
import React, { useState, useEffect } from 'react';

import './styles/header.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUser, faChartBar, faSearch, faTag, faEdit, faBars } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import { Link } from 'react-router-dom'

function Header() {

    const navigate = useNavigate();


    function logout() {
        localStorage.clear();
        navigate("/")

    }

    const [showNavbar, setShowNavbar] = useState(false);

    function toggleNavbar() {
        setShowNavbar(!showNavbar);
    }

    return (


        <>




            <div >
                {localStorage.getItem("token") ?
                    <nav className="navbar navbar-expand-lg navbar-primary back">
                        <div className="container-fluid">
                            <a id="brand-name" className='paragraph brand-name'>Fingerprint Detection</a>
                            <div className='immgg '>
                                <div className="navbar-nav ms-auto">
                                    <img id="brand-name " className='immg  ms-auto ' src={image} alt="fffi" />
                                </div>
                            </div>

                            <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" onClick={toggleNavbar}>
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className={`collapse navbar-collapse ${showNavbar ? 'show' : ''}`} >
                                <div className="navbar-nav ms-auto">
                                    <div className="navbar-nav">
                                        <div>
                                            <NavLink to="/database" className="nav-item hea" >
                                                Transactions Confirmed
                                            </NavLink>
                                            <NavLink to="/confirm" className="nav-item hea" >
                                                Transactions Rejected
                                            </NavLink>
                                            <NavLink to="/upload" className="nav-item hea">
                                                Make Transactions
                                            </NavLink>
                                            <NavLink to="/" className="nav-item hea" onClick={logout}>
                                                LogOut
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    : <nav className="navbar navbar-expand-lg navbar-primary back">
                        <div className="container-fluid">
                            <a id="brand-name">Fingerprint Detection</a>
                            <div className='immg'>


                                <img id="brand-name" className='immg  ' src={image} alt="fffi" />
                            </div>

                        </div>

                    </nav>}
            </div>



        </>
    );


}
export default Header;