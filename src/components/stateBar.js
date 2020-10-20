import React, {useEffect, useRef, useState, useCallback} from 'react'
import Amount from 'components/amount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
// import {
//     Link,
//   } from "react-router-dom";

// import CustomScroll from 'react-custom-scroll';
const sizeCate = ['S', 'M', 'L', 'XL', 'XXL'] 


const data = [
  {id: 1, cate: 'pro', price: 1200, size: [
    {no: 0, qt: 1},
    {no: 1, qt: 0},
    {no: 2, qt: 1},
    {no: 3, qt: 1},
    {no: 4, qt: 0},
  ]},
  {id: 2, cate: 'pro max',price: 1500, size: [
    {no: 0, qt: 0},
    {no: 1, qt: 0},
    {no: 2, qt: 1},
    {no: 3, qt: 1},
    {no: 4, qt: 0},
  ]},
  {id: 3, cate: '11 pro', price: 1888, size: [
    {no: 0, qt: 0},
    {no: 1, qt: 1},
    {no: 2, qt: 0},
    {no: 3, qt: 0},
    {no: 4, qt: 1},
  ]}
]


// shopping bar
export default ({open, onClose}) => {
  const details = useRef(null)


  const [nowCate, setNowCate] = useState([])  // store cate data
  // const [nowSize, setNowSize] = useState([])  // store responding cate's size

  const [cateState, setCateState] = useState(0) // indicate cate selected index
  const [sizeState, setSizeState] = useState(0) // indicate size selected index

  const calcCate = useCallback(() => {
    let cateIndex = -1;
    // find out if every category have every size available, if not SET mute to TRUE
    const newCate = data.map((item, index) => {
      // const total = item.size.reduce((p, c) => p + c.qt, 0)
      item.nextAvailable = -1;
      for (let size of item.size) {
        if (size.qt >= 1) {
          item.nextAvailable = size.no
          break
        }
      }

      if (item.nextAvailable === -1) {
        item.mute = true;
      } else {
        // set available cate index
        if (cateIndex === -1) cateIndex = index
        item.mute = false;
      }
      return item
    })

    console.log(cateIndex)
    console.log(newCate)
    
    const displaySize = newCate[cateIndex].nextAvailable
    
    
    const newCateData = calcSize(newCate, displaySize)
    // set cate selected index
    setCateState(cateIndex)
    // set newly create cate data
    setNowCate(newCateData)
    // set size selected index
    setSizeState(displaySize)
  }, [])

  useEffect(() => {
    const size = details.current.getBoundingClientRect();
    const width = size.width - 40;
    const eachOne = width / 4;
    const list = document.getElementsByTagName('li');
    for (let one of list) {
      one.style.width = eachOne - 5 + 'px'
      one.style.height = eachOne - 5 + 'px'
      // one.style.marginRight = '5px'
    }
    calcCate()

  }, [calcCate])


  const onCateChange = index => {
    if (!nowCate[index].mute) {
      setCateState(index)
      setSizeState(nowCate[index].nextAvailable)
    }
    console.log(nowCate[index])
  }
  

  const onSizeChange = index => {
    if (nowCate[cateState].size[index].qt > 0) setSizeState(index)
  }

  

  const calcSize = (input, index) => input.map(item => {
    if (item.size[index].qt > 0) item.sizeAvailable = true;
    else item.sizeAvailable = false;
    return item
  })

  const renderCate = () => {

    return nowCate.map((item, index) => <li key={item.id} onClick={onCateChange.bind(this, index)} className={`items${(index === cateState && !item.mute)?' select':''}${item.mute? ' nohave': ''}`}></li>)
  }

  const renderSize = () => {
    const current = data[cateState].size

    return sizeCate.map((item, index) => <li key={index} onClick={onSizeChange.bind(this, index)} className={`items-size${index === sizeState && current[index].qt > 0?' select':''}${current[index].qt < 1? ' nohave': ''}`}><div className="div">{item}</div></li>)
  }

    return (
        // <div className={`state-bar`} onClick={onClose}> 
        <div className={`state-bar${!open?' close':''}`}> 
          <div className="title">
            <div className="product-pic"></div>
            <section className="product-text">
              <div className="product-price">¥<b>{data[cateState].price}</b></div>
              <div className="product-desc">
              <p>已选：{data[cateState].cate} 规格：{sizeCate[sizeState]}</p>
              </div>
            </section>
            <button className="product-close" onClick={onClose}>
              <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
            </button>
          </div>
          
          <div className="details" ref={details}>
            <div className="scroll">
              <h3>类型：</h3>
              <ul className="variation">
                {renderCate()}
              </ul>
              <h3>规格：</h3>
              <ul className="specs">
                {renderSize()}
              </ul>
              <h3>数量：</h3>
              <Amount/>
            </div>
          </div>
          
          <div className="functions">
            <button>立即付款</button>
          </div>
        </div>
    )
}

