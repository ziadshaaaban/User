import "./styles/side.css"
import { Link } from 'react-router-dom'
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faUser, faChartBar, faSearch, faTag, faEdit } from '@fortawesome/free-solid-svg-icons'
function Side() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };
    return (
        <>




            <div className="split left bg-white">
                <div className="centered">
                    <div className="sidebar">
                        <nav>
                            <ul className="nav sidebar-nav">
                                <div className="sidebar-header">
                                    <div className="sidebar-brand">
                                        <h2>ADMIN</h2>
                                    </div>
                                </div>
                                <li>
                                    <Link
                                        className={selectedOption === 'users' ? 'lis selected' : 'lis'}
                                        to="/users"
                                        onClick={() => handleOptionClick('users')}
                                    >
                                        <FontAwesomeIcon icon={faUser} /> Users
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={selectedOption === 'database' ? 'lis selected' : 'lis'}
                                        to="/database"
                                        onClick={() => handleOptionClick('database')}
                                    >
                                        <FontAwesomeIcon icon={faChartBar} /> View Transactions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={selectedOption === 'confirm' ? 'lis selected' : 'lis'}
                                        to="/confirm"
                                        onClick={() => handleOptionClick('confirm')}
                                    >
                                        <FontAwesomeIcon icon={faSpinner} /> Waiting Transactions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={selectedOption === 'citzen' ? 'lis selected' : 'lis'}
                                        to="/citzen"
                                        onClick={() => handleOptionClick('citzen')}
                                    >
                                        <FontAwesomeIcon icon={faSearch} /> Citizen by National ID
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={selectedOption === 'logs' ? 'lis selected' : 'lis'}
                                        to="/logs"
                                        onClick={() => handleOptionClick('logs')}
                                    >
                                        <FontAwesomeIcon icon={faTag} /> View Logs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={selectedOption === 'resetpass' ? 'lis selected' : 'lis'}
                                        to="/resetpass"
                                        onClick={() => handleOptionClick('resetpass')}
                                    >
                                        <FontAwesomeIcon icon={faEdit} /> Reset Password
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </div>

        </>
    )
}
export default Side