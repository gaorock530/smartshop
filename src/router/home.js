import React from 'react'
import Bowser from "bowser"
import Wrapper from 'components/mainWrapper'


export default () => {
    const browser = Bowser.parse(window.navigator.userAgent)
    // Bowser.parse(window.navigator.userAgent)
    console.log(browser)


    return (
        <Wrapper>
            <div className="break-text">
                <div>
                    <p>设备可用高度：{window.screen.availHeight}px</p>
                    <p>设备可用宽度：{window.screen.availWidth}px</p>
                    <p>设备色彩深度：{window.screen.colorDepth || window.screen.pixelDepth} bits</p>
                    <p>设备品牌型号：{JSON.stringify(browser)}</p>
                </div>
            </div>
        </Wrapper>
        
    )
}
