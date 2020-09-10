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
    const length = history.length

    useEffect(() => {
        setLongNav(isLongNav(length))
    }, [location, length])


    return (
        <nav className={longNav?"m_init":null}>
            <Link to='/my' className="side"><FontAwesomeIcon icon={faUser}/></Link>
            <Link to='/shop/123' className="side"><FontAwesomeIcon icon={faStore}/></Link>
            <Link to='/shoppingchart' className="side"><FontAwesomeIcon icon={faShoppingCart}/></Link>
            <Link to='/' className="border">加入购物车</Link>
            <Link to='/' className="border">{length}</Link>
        </nav>
    )
}


function isLongNav(historyLength) {
    const agent = window.navigator.userAgent;
    const isiPhone = agent.match(/iphone/ig);
    // uses device screen size determine iPhone model
    const isWideEnough = window.screen.availHeight >= 812 && window.screen.availWidth >= 375;
    const isDepthEnough = window.screen.colorDepth >= 32 || window.screen.pixelDepth >= 32;
    const isSizeGood = isWideEnough && isDepthEnough;
    // detect PWA
    const isPWA = window.matchMedia('(display-mode: standalone)').matches
    const isXPlus = isiPhone && isSizeGood;
    // determine if inside WX
    const isWx = agent.match(/micromessenger/ig)
    
    if (isXPlus && (isPWA || (isWx && historyLength < 2))) return true
}
// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }
