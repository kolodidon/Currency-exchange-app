import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import RateContext from '../../context/RateContext'
import Navbar from '../navbar/navbar'

import './header.scss'

const Header = () => {
    const { modalShowHandler } = useContext(RateContext)
    return (
        <div className='header'>
            <div className='headerWrap'>
                <div className='logo'>
                    <NavLink to="/">
                        <h2>RateApp<span> $</span></h2>
                    </NavLink>
                </div>
                <Navbar />
                <div className='person'>
                    <i className='fa fa-user' aria-hidden='true' onClick={modalShowHandler} />
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Header