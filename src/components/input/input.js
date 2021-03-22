import React from 'react';

import './input.scss';

function isInvalid({ valid, touched, shouldValidate }) {
    return !valid && touched && shouldValidate
}

const Input = (props) => {
    const cls = ['modalInput']
    const inputType = props.type || 'text'
    const htmlFor = `${props.type} - ${Math.random()}`
    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input id={htmlFor}
                type={inputType}
                value={props.value}
                onChange={props.onChange}
            />
            {isInvalid(props) ? <span style={{ color: 'red' }}>{props.errorMessage || "Некорректное значение"}</span> : null}
        </div>
    )
}

export default Input