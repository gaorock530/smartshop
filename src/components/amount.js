import React, { useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

export default ({onValueChange}) => {

  const [amount, setAmount] = useState(1)

  const check = (value) => {
    if (value < 0) value = 0
    if (value > 100) return
    if (value > 0 && value < 1) value = 1
    if (!value) value = 0
    if (value.length > 1 && value[0] === "0") {
      // console.log(typeof value)
      value = parseInt(value.slice(1))
      // console.log(value)
    }

    value = parseInt(value)
    console.log(value)
    setAmount(String(value))
    if (onValueChange) onValueChange(value)
  }

  const onChange = e => {
    console.log(e.target.value)
    check(e.target.value)
  }

  const onIncrease = () => {
    check(parseInt(amount) + 1)
  }

  const onDecrease = () => {
    check(parseInt(amount) - 1)
  }


  return (
    <div>
      <div className="input-button" onClick={onDecrease}><FontAwesomeIcon icon={faMinus}></FontAwesomeIcon></div>
      <input className="input-field" type="number" onChange={onChange} value={amount}/>
      <div className="input-button" onClick={onIncrease}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon></div>
    </div>
  )
}