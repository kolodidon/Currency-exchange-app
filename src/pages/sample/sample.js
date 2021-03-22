import React, { useContext } from 'react'

import './sample.scss'

import RateContext from "../../context/RateContext";
import Button from "../../components/button/button";

const Sample = () => {
    const { state, baseHandler, base2Handler, sampleDateHandler, dataWrite, sampleRemove } = useContext(RateContext)
    return (
        <div className="sample">
            <div className="sampleContainer">
                <div>
                    <h3>Получить курс:
                      <select onChange={baseHandler} value={state.sample.base}>
                            {Object.keys(state.currency).map((item, i) => {
                                return (
                                    <option key={item}>
                                        {item}
                                    </option>
                                )
                            })}
                        </select>
                      &nbsp; &nbsp; к &nbsp; &nbsp;
                      <select onChange={base2Handler} value={state.sample.base2}>
                            {Object.keys(state.currency).map((item, i) => {
                                return (
                                    <option key={item}>
                                        {item}
                                    </option>
                                )
                            })}
                        </select>
                    </h3>
                </div>
                <div className='sampleHead'>
                    <span>
                        Дата: <input onChange={sampleDateHandler} type='date' min='1999-02-04' max={state.date} id='datefield' />
                    </span>
                    <Button text='Получить курс' click={dataWrite} />
                </div>

                <div className='sampleResult'>
                    <ul>
                        {Object.keys(state.sampleList).map((item, i) => {
                            return (
                                <li key={item}>
                                    <span><img src={state.currency[state.sampleList[item].base].flag} alt={item} />{state.sampleList[item].base}</span>
                                    <span>{state.sampleList[item].date}</span>
                                    <span>{`${state.sampleList[item].course === undefined ? 'Нет данных' : state.sampleList[item].course} ${state.sampleList[item].course === undefined ? '!' : state.sampleList[item].base2}`}</span>
                                    <button onClick={() => sampleRemove(item)}><i className='fa fa-times' /></button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sample