import * as types from '../constants/ActionTypes';
import _ from 'lodash';

var s4 = () => {
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
}
var generateID = () => {
    return s4() + '-' + s4() + '-' + s4() + '-' + s4(); 
}

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    var index = _.findIndex(state, (task) => {
        return task.id === action.id;
    })

    switch(action.type){
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status
            }
            if(!task.id){
                task.id = generateID();
                state.push(task);
            } else {
                var indexEdit = _.findIndex(state, (elm) => {
                    return elm.id === task.id;
                })
                state[indexEdit] = task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
            if(index !== -1){
                state[index] = {
                    ...state[index],
                    status: !state[index].status
                }
                localStorage.setItem('tasks', JSON.stringify(state));
            }
            return [...state];
        case types.DELETE_ITEM:
        	if(index !== -1){
        		state.splice(index, 1);
        		localStorage.setItem('tasks', JSON.stringify(state));
        	}
            return [...state];
        default:
            return state;
    }
}

export default myReducer;