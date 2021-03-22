import React from 'react'

import './button.scss'

const Button = (props) => {
    return (
        <button
            onClick={() => props.click ? props.click(props.arg || '') : undefined}
            className='btn'
            disabled={props.disabled}>
            {props.text}
        </button>
    )
}

export default Button