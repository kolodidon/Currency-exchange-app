import React, { useContext } from 'react'

import { NavLink } from 'react-router-dom'

import './navbar.scss'

import RateContext from "../../context/RateContext";

const Navbar = () => {
    const { state } = useContext(RateContext)

    return (
        <nav>
            <ul>
                <li><NavLink to='/'>Главная</NavLink></li>
                <li><NavLink to='/calc'>Калькулятор</NavLink><br /> {state.auth ? null : <span>Залогинься!</span>}</li>
                <li><NavLink to='/sample'>Выборки</NavLink><br /> {state.auth ? null : <span>Залогинься!</span>}</li>
                <li><NavLink to='/info'>Информация</NavLink><br /> {state.auth ? null : <span>Залогинься!</span>}</li>
            </ul>
        </nav>
    )
}

export default Navbar