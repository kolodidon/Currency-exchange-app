import React from 'react'

import Counter from '../../components/counter/counter'
import CountResult from '../../components/countResult/countResult'

import './calc.scss'

const Calc = () => {
    return(
        <div className = 'calculator'>
            <div className = 'calcContainer'>
                <Counter/>
                <CountResult/>
            </div>
        </div>
    )
}

export default Calc