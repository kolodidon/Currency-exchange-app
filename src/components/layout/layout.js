import React, { Fragment, useContext } from 'react'
import { Route, Switch } from 'react-router-dom'

import './layout.scss'

import AddClass from '../../hoc/AddClass'
import Header from '../header/header'
import Home from '../../pages/home/home'
import Sidebar from '../sidebar/sidebar'
import Calc from '../../pages/calc/calc'
import Sample from '../../pages/sample/sample'
import Info from '../../pages/info/info'
import RateContext from "../../context/RateContext";


const Layout = () => {
    const { state } = useContext((RateContext))
    return (
        <Fragment>
            <Header />
            <div className='content'>
                <div className='routes'>
                    {state.auth ?
                        <Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/calc' render={() => <Calc />} />
                            <Route path='/sample'>
                                <Sample />
                            </Route>
                            <Route path='/info' component={Info} />
                        </Switch>
                        : <Route path='/' component={Home} />}
                </div>
                <Sidebar />
            </div>
        </Fragment>
    )
}

export default AddClass(Layout, 'layout')