import React, { Fragment, useContext } from 'react';

import './login.scss';

import Button from "../button/button";
import RateContext from "../../context/RateContext";

const Login = () => {
    const { renderInputs, state, loginHandler } = useContext(RateContext)
    return (
        <Fragment>
            <div className="modalForm">
                {renderInputs()}
            </div>
            <div className="modalBtn">
                <Button text='Войти' disabled={!state.isFormValid} click={loginHandler} />
            </div>
        </Fragment>
    )
}

export default Login