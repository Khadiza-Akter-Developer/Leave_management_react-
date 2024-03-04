import React from "react";
import './nav.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <div className="header">
                <div className="top-header">
                    <div className="navs">
                        <p>
                            Leave Application List
                        </p>
                    </div>
                </div>
                <div className="another-header">
                    <div className="nav-link">
                        <ul>
                            <li><Link to='/' className="link">Leave Application</Link></li>
                            <li><Link to='/admin' className="link">Admin Page</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Navbar;