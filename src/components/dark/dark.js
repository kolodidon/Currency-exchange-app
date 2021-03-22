import React from 'react';

import './dark.scss';

export default function Dark (props) {
    const cls = ['dark']
    if(props.showModal) {
        cls.push('showDark')
    }
    return(
        <div className={cls.join(' ')} onClick={props.modalHideHandler}></div>
    )
}