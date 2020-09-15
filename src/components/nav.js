import React, {useEffect, useState, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faStore, faUser } from '@fortawesome/free-solid-svg-icons'
import {
    Link,
    useLocation,
    useHistory
  } from "react-router-dom";
import Buy from './buy';
import Bar from './stateBar';
import {MainContext, FREESE, UNFREESE} from 'context/freeseContext'




export default () => {
    const [, dispatch] = useContext(MainContext)
    const [longNav, setLongNav] = useState(true)
    const [showBar, setShowBar] = useState(false)
    const [display, setDisplay] = useState(false)
    let location = useLocation();
    let history = useHistory();
    const length = history.length

    const onClick = () => {
        setDisplay(true)
        setShowBar(true)
        dispatch({type: FREESE})
    }
    const onClose = () => {
        setShowBar(false)
    }

    const onTransitionEnd = () => {
        setDisplay(false)
        dispatch({type: UNFREESE})
    }

    useEffect(() => {
        setLongNav(isLongNav(length))
    }, [location, length])


    return (
        <nav className={longNav?"m_init":null}>
            <Link to='/my' className="side"><FontAwesomeIcon icon={faUser}/></Link>
            <Link to='/shop/123' className="side"><FontAwesomeIcon icon={faStore}/></Link>
            <Link to='/shoppingchart' className="side"><FontAwesomeIcon icon={faShoppingCart}/></Link>
            <Buy onClick={onClick}/>
            {display && <Bar open={showBar} onClose={onClose}/>}
            {display && <div className={`mask${!showBar?' close':''}`} onClick={onClose} onTransitionEnd={onTransitionEnd}></div>}
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
