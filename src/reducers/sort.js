import * as types from '../constants/ActionTypes';

var initialState = {
    by: 'name',
    value: 1
}

var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SORT_TASKS:
            console.log(action);
            return {
                by: action.sortBy,
                value: action.sortValue
            };
        default:
            return state;
    }
}

export default myReducer;