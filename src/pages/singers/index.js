import React, {useState, useEffect} from "react"
import Horizon from "../../base/horizontal-item"
import {categoryTypes, alphaTypes} from "../../api/config"
import {List, ListContainer, ListItem, NavContainer} from "./style"
import Scroll from "../../base/scroll"
import {connect} from 'react-redux'
import LazyLoad, {forceCheck} from 'react-lazyload'
import {
    getSingerList,
    getHotSingerList,
    changeEnterLoading,
    changePageCount,
    refreshMoreSingerList,
    changePullUpLoading,
    changePullDownLoading,
    refreshMoreHotSingerList
} from './store/action'
import Loading from "../../base/loading"

const renderSingerList = (singerList) => {
    const list = singerList ? singerList.toJS() : []
    return (
        <List>
            {
                list.map((item, index) => {
                    return (
                        <ListItem key={item.accountId + "" + index}>
                            <div className="img_wrapper">
                                <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')}
                                                            alt="music"/>}>
                                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                                </LazyLoad>
                            </div>
                            <span className="name">{item.name}</span>
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

function Singers(props) {
    const [category, setCategory] = useState('')
    const [alpha, setAlpha] = useState('')
    const {singerList, enterLoading, pullUpLoading, pullDownLoading, pageCount} = props
    const {getHotSingerDispatch, updateDispatch, pullDownRefreshDispatch, pullUpRefreshDispatch} = props
    console.log(singerList)
    const handleSelectAlpha = (val) => {
        setAlpha(val)
        updateDispatch(category, val)
    }
    const handleSelectCategory = (val) => {
        setCategory(val)
        updateDispatch(val, alpha)
    }
    
    const handlePullUp = () => {
        pullUpRefreshDispatch(category, alpha, category === '', pageCount)
    }
    
    const handlePullDown = () => {
        pullDownRefreshDispatch(category, alpha)
    }
    
    useEffect(() => {
        getHotSingerDispatch();
    }, []);
    
    return (
        <div>
            <NavContainer>
                <Horizon list={categoryTypes} title={"分类 (默认热门):"} handleClick={handleSelectCategory}
                         oldVal={category}/>
                <Horizon list={alphaTypes} title={"首字母:"} handleClick={handleSelectAlpha} oldVal={alpha}/>
            </NavContainer>
            <ListContainer>
                <Scroll
                    pullUp={handlePullUp}
                    pullDown={handlePullDown}
                    pullUpLoading={pullUpLoading}
                    pullDownLoading={pullDownLoading}
                    onScroll={forceCheck}
                >
                    {renderSingerList(singerList)}
                </Scroll>
                {/*<Loading show={enterLoading}/>*/}
            </ListContainer>
        </div>
    )
}

const mapStateToProps = (state) => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        getHotSingerDispatch() {
            dispatch(getHotSingerList());
        },
        updateDispatch(category, alpha) {
            dispatch(changePageCount(0));//由于改变了分类，所以pageCount清零
            dispatch(changeEnterLoading(true));//loading
            dispatch(getSingerList(category, alpha));
        },
        // 滑到最底部刷新部分的处理
        pullUpRefreshDispatch(category, alpha, hot, count) {
            dispatch(changePullUpLoading(true));
            dispatch(changePageCount(count + 1));
            if (hot) {
                dispatch(refreshMoreHotSingerList());
            } else {
                dispatch(refreshMoreSingerList(category, alpha));
            }
        },
        //顶部下拉刷新
        pullDownRefreshDispatch(category, alpha) {
            dispatch(changePullDownLoading(true));
            dispatch(changePageCount(0));//属于重新获取数据
            if (category === '' && alpha === '') {
                dispatch(getHotSingerList());
            } else {
                dispatch(getSingerList(category, alpha));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))