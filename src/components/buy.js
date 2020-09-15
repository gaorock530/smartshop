import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faShoppingCart, faStore, faUser } from '@fortawesome/free-solid-svg-icons'
import {
    Link,
  } from "react-router-dom";




export default ({onClick}) => {

    return (
        <>
            <button className="border" onClick={onClick}>加入购物车</button>
            <button className="border orange">立即购买</button>
        </>
    )
}

