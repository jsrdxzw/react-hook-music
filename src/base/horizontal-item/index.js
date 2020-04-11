import React, {useEffect, useRef} from "react"
import PropTypes from "prop-types"
import Scroll from "../scroll"
import {List, ListItem} from "./styles"

function Horizon(props) {
    const {list, oldVal, title, handleClick} = props
    
    const Category = useRef()
    
    useEffect(() => {
        const categoryDom = Category.current
        const tagElements = categoryDom.querySelectorAll('span')
        let totalWidth = 0
        Array.from(tagElements).forEach(ele => {
            // offsetWidth表示包含border的宽度
            totalWidth += ele.offsetWidth
        })
        categoryDom.style.width = `${totalWidth}px`
    }, [])
    
    return (
        <Scroll direction={'horizontal'}>
            <div ref={Category}>
                <List>
                    <span>{title}</span>
                    {
                        list.map((item) => {
                            return (
                                <ListItem
                                    key={item.key}
                                    className={`${oldVal === item.key ? 'selected' : ''}`}
                                    onClick={() => handleClick(item.key)}
                                >
                                    {item.name}
                                </ListItem>
                            )
                        })
                    }
                </List>
            </div>
        </Scroll>
    )
    
}

// 首先考虑接受的参数
// list 为接受的列表数据
// oldVal 为当前的 item 值
// title 为列表左边的标题
// handleClick 为点击不同的 item 执行的方法
Horizon.defaultProps = {
    list: [],
    oldVal: '',
    title: '',
    handleClick: null
}

Horizon.propTypes = {
    list: PropTypes.array,
    oldVal: PropTypes.string,
    title: PropTypes.string,
    handleClick: PropTypes.func
}

export default React.memo(Horizon)