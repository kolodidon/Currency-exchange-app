import React, { useContext } from 'react'

import RateContext from '../../context/RateContext'
import Button from '../button/button'

import './counter.scss'

const Counter = () => {
    const { state, inputValueHandler, currencyValueHandler, calculatorHandler } = useContext(RateContext)

    return (
        <div className='calcHead'>
            <div>
                <h4>Я хочу обменять:</h4>
            </div>
            <div className='operation'>
                <span>
                    <input
                        type='number'
                        value={state.inputValue}
                        onChange={inputValueHandler}
                    />
                RUB
                </span>
                <select onChange={currencyValueHandler}>
                    {
                        Object.keys(state.currency).map((item, i) => {
                            return (
                                <option key={item}>{item}</option>
                            )
                        })
                    }
                </select>
                <Button text='Calculate' click={calculatorHandler} arg={state.currencyValue} />
            </div>
        </div>
    )
}

export default Counter