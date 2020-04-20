import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import taskEditting from './taskEditting';
import keyword from './search';
import filter from './filter';
import sort from './sort';

const myReducer = combineReducers({
    tasks,
    isDisplayForm,
    taskEditting,
    keyword,
    filter,
    sort
});

export default myReducer;