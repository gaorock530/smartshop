import React, {useContext, useEffect, useRef} from 'react'
import {MainContext} from 'context/freeseContext'


export default ({children}) => {
  const [{freese}] = useContext(MainContext)
  const wrapperRef = useRef(null)
  // const allow = useRef(true)

  // useEffect(() => {
  //   console.log(freese)
  //   if (freese) {
  //     wrapperRef.current.classList.add('freese')
  //   } else {
  //     wrapperRef.current.classList.remove('freese')
  //   }
  //   // if (freese) {
  //   //   document.body.style.position = 'fixed'
  //   // } else {
  //   //   document.body.style.position = 'relative'
  //   // }
  // })

  const controlFreese = (e) => {
    if (freese) {
      e.preventDefault()
      e.stopPropagation()
    }
  }


  return (
      <div className="main-wrapper" ref={wrapperRef} onTouchStart={controlFreese} onScroll={controlFreese} onTouchMove={controlFreese}>
        {children}
      </div>
  )
}