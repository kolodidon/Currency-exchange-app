import React, { Fragment, useContext } from 'react';

import './register.scss';

import Button from "../button/button";
import RateContext from "../../context/RateContext";

const Register = () => {
    const { renderInputs, state, registerHandler } = useContext(RateContext)
    return (
        <Fragment>
            <div className="modalForm">
                {renderInputs()}
            </div>
            <div className="modalBtn">
                <Button text='Зарегистрироваться' disabled={!state.isFormValid} click={registerHandler} />
            </div>
        </Fragment>
    )
}

export default Register