import React, {useEffect} from "react"
import Slider from "../../components/slider"
import RecommendList from "../../components/list/RecommendList"
import {connect} from 'react-redux'
import {Content} from "./style"
import Scroll from "../../base/scroll"
import {actions} from './store'
import {forceCheck} from 'react-lazyload'
import Loading from "../../base/loading"

function Recommend(props) {
    const {bannerList, recommendList, getBannerList, getRecommendList, enterLoading} = props
    
    useEffect(() => {
        if (!bannerList.size) {
            getBannerList()
        }
        if (!recommendList.size) {
            getRecommendList()
        }
    }, [])
    
    const bannerListJs = bannerList ? bannerList.toJS() : []
    const recommendListJs = recommendList ? recommendList.toJS() : []
    
    return (
        <Content>
            <Scroll className={'list'} onScroll={forceCheck}>
                <div>
                    <Slider bannerList={bannerListJs}/>
                    <RecommendList recommendList={recommendListJs}/>
                </div>
            </Scroll>
            {enterLoading ? <Loading/> : null}
        </Content>
    )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
    // 不要在这里将数据 toJS
    // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
    enterLoading: state.getIn(['recommend', 'enterLoading'])
})

const mapDispatchToProps = (dispatch) => {
    return {
        getBannerList() {
            dispatch(actions.getBannerList())
        },
        getRecommendList() {
            dispatch(actions.getRecommendList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))