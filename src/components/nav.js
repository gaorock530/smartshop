import React from 'react'
import {useParams} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faStore } from '@fortawesome/free-solid-svg-icons'


export default () => {
    let { id } = useParams();

    return (
        <header>
            <button className="my"><FontAwesomeIcon icon={faStore}/></button>
            <div></div>
            <button className="my"><FontAwesomeIcon icon={faShoppingCart}/></button>
        </header>
    )
}