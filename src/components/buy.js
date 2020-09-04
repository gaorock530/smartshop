import React, {useEffect, useState, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faStore, faUser } from '@fortawesome/free-solid-svg-icons'
import {
    Link,
    useLocation,
    useHistory
  } from "react-router-dom";




export default () => {

    const [longNav, setLongNav] = useState(true)
    let location = useLocation();
    let history = useHistory();
  
    // determine nav height
    useEffect(() => {
        const pwa = window.matchMedia('(display-mode: standalone)').matches
        const length = history.length
        const isWx = window.navigator.userAgent.toLowerCase().match(/micromessenger/i)

        setLongNav(pwa || (isWx && length < 2))
    }, [location])


    return (
        <nav className={longNav?"m_init":null}>
            <Link to='/my' className="side"><FontAwesomeIcon icon={faUser}/></Link>
            <Link to='/shop/123' className="side"><FontAwesomeIcon icon={faStore}/></Link>
            <Link to='/shoppingchart' className="side"><FontAwesomeIcon icon={faShoppingCart}/></Link>
            <Link to='/' className="border">加入购物车</Link>
    <Link to='/' className="border">{history.length}</Link>
        </nav>
    )
}

// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }
