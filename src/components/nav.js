import React, {useEffect, useState, useContext, useRef, useCallback} from 'react'
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
import innerHeight from 'ios-inner-height'




export default () => {
    const [, dispatch] = useContext(MainContext)
    const [longNav, setLongNav] = useState(true)
    const [showBar, setShowBar] = useState(false)
    const [display, setDisplay] = useState(false)

    const windowSize = useRef(null)
    const timer = useRef(Date.now())

    let location = useLocation();
    let history = useHistory();
    const length = history.length

    const onClick = () => {
        setDisplay(true)
        setShowBar(true)
        dispatch({type: FREESE})
        console.log('freese')
        // document.body.classList.add('freese')
    }
    const onClose = () => {
        setShowBar(false)
    }

    const onTransitionEnd = () => {
        setDisplay(false)
        dispatch({type: UNFREESE})
        console.log('unfreese')
        // document.body.classList.remove('freese')
    }

    const detectSize = useCallback(() => {
        setLongNav(isLongNav(length, windowSize))
        windowSize.current = getBrowserInterfaceSize()
    }, [length])

    const debounce = useCallback(() => {
        if (Date.now() - timer.current > 30) {
            timer.current = Date.now()
            detectSize()
        }
    }, [detectSize])

    useEffect(() => {
        windowSize.current = getBrowserInterfaceSize()
        setLongNav(isLongNav(length, windowSize))
        windowSize.current = getBrowserInterfaceSize()
        window.addEventListener('resize', detectSize)
        window.addEventListener('scroll', debounce)
        window.addEventListener('orientationchange', detectSize)
        // setWindowSize(document.body.clientHeight)

        return () => {
            window.removeEventListener('resize', detectSize)
        }

    }, [location, length, detectSize, debounce])


    return (
        <nav className={longNav?"m_init":null}>
            <Link to='/my' className="side"><FontAwesomeIcon icon={faUser}/></Link>
            <Link to='/shop/123' className="side"><FontAwesomeIcon icon={faStore}/></Link>
            <Link to='/shoppingchart' className="side"><FontAwesomeIcon icon={faShoppingCart}/></Link>
            <Buy onClick={onClick}/>
            <div className="test">
                <li>windowSize.current: {windowSize.current}</li>
                <li>document.body.clientHeight: {document.body.clientHeight}</li>
                <li>document.body.offsetHeight : {document.body.offsetHeight }</li>
                <li>document.body.scrollHeight: {document.body.scrollHeight}</li>
                <li>window.screen.height: {window.screen.height}</li>
                <li>window.innerHeight: {window.innerHeight}</li>
                <li>{innerHeight()}</li>
            </div>
            {display && <Bar open={showBar} onClose={onClose}/>}
            {display && <div className={`mask${!showBar?' close':''}`} onClick={onClose} onTransitionEnd={onTransitionEnd}></div>}
        </nav>
    )
}


function isLongNav(historyLength, windowHeight) {
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

    const isEqual = windowHeight.current === getBrowserInterfaceSize() 
    const isIncrease = windowHeight.current < getBrowserInterfaceSize() 
    


    if (isXPlus && (isPWA || (isWx && historyLength < 2) || isIncrease || (!isWx && !isIncrease && !isEqual))) return true
}
// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

function getBrowserInterfaceSize() {
    // var pageWidth = window.innerWidth;
    let pageHeight = window.innerHeight;

    console.log(window.innerHeight, window.screen.availHeight)
 
    if (typeof pageWidth != "number") {
        //在标准模式下面
        if (document.compatMode === "CSS1Compat" ) {
            // pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        } else {
            // pageWidth = document.body.clientWidth;
            pageHeight = window.body.clientHeight;
        }
    }
 
    // return {
    //     pageWidth: pageWidth,
    //     pageHeight: pageHeight
    // }
    return pageHeight
}
