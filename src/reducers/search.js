import * as types from '../constants/ActionTypes';

var initialState = '';

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.RECEIVE_KEYWORD:
            return action.keyword;
        default:
            return state;
    }
}

export default myReducer;