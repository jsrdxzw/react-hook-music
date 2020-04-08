import React, {forwardRef, useState, useEffect, useRef, useImperativeHandle} from "react"
import BScroll from "better-scroll"
import styled from "styled-components"

const ScrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Scroll = forwardRef((props, ref) => {
    const [bScroll, setBScroll] = useState()
    const scrollContainerRef = useRef()
    const {direction, click, refresh, bounceTop, bounceBottom, pullUp, pullDown, onScroll} = props
    useEffect(() => {
        const scroll = new BScroll(scrollContainerRef.current, {
            scrollX: direction === 'horizontal',
            scrollY: direction === 'vertical',
            probeType: 3,
            click: click,
            bounce: {
                top: bounceTop,
                bottom: bounceBottom
            }
        })
        setBScroll(scroll)
        return () => {
            setBScroll(null)
        }
    }, [])
    useEffect(() => {
        if (!bScroll || !onScroll) return
        bScroll.on ('scroll', (scroll) => {
            onScroll (scroll)
        })
        return () => {
            bScroll.off ('scroll')
        }

    })
})

export default React.memo(Scroll)