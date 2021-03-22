import React, { useContext } from 'react'

import RateContext from '../../context/RateContext'

import './countResult.scss'

const CountResult = () => {

    const { state } = useContext(RateContext)
    return (
        <div className="calcResult">
            <ul>
                {state.result ?
                    <li>
                        <p>
                            <span>
                                {state.inputValue} RUB =
                            </span>
                            <span>
                                {state.result} {state.currencyValue}
                            </span>
                        </p>
                    </li>
                    : null}
            </ul>
        </div>
    )
}

export default CountResult