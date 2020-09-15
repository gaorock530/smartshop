import React, {useEffect, useRef, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {
    Link,
  } from "react-router-dom";

// import CustomScroll from 'react-custom-scroll';



// shopping bar
export default ({open, onClose}) => {
  const details = useRef(null)
  const cate = useRef(null)
  const size = useRef(null)

  const [cateState, setCateState] = useState([
    {id: 1, select: true},
    {id: 2, select: false},
    {id: 3, select: false}
  ])

  const [sizeState, setSizeState] = useState([
    {id: 1, select: true},
    {id: 2, select: false},
    {id: 3, select: false},
    {id: 4, select: false}
  ])

  useEffect(() => {
    const size = details.current.getBoundingClientRect();
    const width = size.width - 40;
    const eachOne = width / 4;
    const list = document.getElementsByClassName('items');
    for (let one of list) {
      one.style.width = eachOne - 5 + 'px'
      one.style.height = eachOne - 5 + 'px'
      // one.style.marginRight = '5px'
    }
  })

  const onCateChange = index => {
    console.log(index)
    const changed = cateState.map((item, idx) => {
      item.select = false;
      if (index === idx) item.select = true;
      return item
    })
    setCateState(changed)
  }

  const onSizeChange = index => {
    const changed = sizeState.map((item, idx) => {
      item.select = false;
      if (index === idx) item.select = true;
      return item
    })
    setSizeState(changed)
  }

  const renderCate = () => cateState.map((item, index) => <li key={item.id} onClick={onCateChange.bind(this, index)} className={`items${item.select?' select':''}`}></li>)

  const renderSize = () => sizeState.map((item, index) => <li key={item.id} onClick={onSizeChange.bind(this, index)} className={`items${item.select?' select':''}`}></li>)

    return (
        // <div className={`state-bar`} onClick={onClose}> 
        <div className={`state-bar${!open?' close':''}`}> 
          <div className="title">
            <div className="product-pic"></div>
            <section className="product-text">
              <div className="product-price">¥<b>1299</b></div>
              <div className="product-desc">
                <p>已选：黑色/卡其 XXL 小斯坦科维奇/与off-white联名款</p>
              </div>
            </section>
            <button className="product-close" onClick={onClose}>
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </button>
          </div>
          
          <div className="details" ref={details}>
            <div className="scroll">
              <h3>类型：</h3>
              <ul className="variation" ref={cate}>
                {renderCate()}
              </ul>
              <h3>规格：</h3>
              <ul className="specs" ref={size}>
                {renderSize()}
              </ul>
              <h3>数量：</h3>
              <ul className="quantity">
                <li className="items"></li>
                <li className="items"></li>
                <li className="items"></li>
                <li className="items"></li>
                <li className="items"></li>
              </ul>
            </div>
          </div>
          
          <div className="functions">
            <Link to="/">立即付款</Link>
          </div>
        </div>
    )
}

