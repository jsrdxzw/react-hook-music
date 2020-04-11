import {combineReducers} from "redux-immutable"
import {reducer as recommendReducer} from '../pages/recommend/store'
import {reducer as singersReducer} from '../pages/singers/store'

export default combineReducers({
    recommend: recommendReducer,
    singers: singersReducer,
})