import * as types from '../constants/ActionTypes'

export const listAll = () => {
    return {
        type: types.LIST_ALL
    }
};

export const saveTask = task => {
    return {
        type: types.SAVE_TASK,
        task
    }
};

export const toggleForm = () => {
    return {
        type: types.TOGGLE_FORM
    }
};

export const closeForm = () => {
    return {
        type: types.CLOSE_FORM
    }
};

export const openForm = () => {
    return {
        type: types.OPEN_FORM
    }
};

export const updateStatus = id => {
    return {
        type: types.UPDATE_STATUS_TASK,
        id
    }
};

export const deleteItem = id => {
    return {
        type: types.DELETE_ITEM,
        id
    }
};

export const editTask = task => {
    return {
        type: types.EDIT_TASK,
        task
    }
};

export const clearTaskEditting = () => {
    return {
        type: types.CLEAR_TASK_EDITTING
    }
};

export const receiveKeyword = keyword => {
    return {
        type: types.RECEIVE_KEYWORD,
        keyword
    }
};

export const filterTask = filter => {
    return {
        type: types.FILTER_TASK,
        filter
    }
};

export const sortTasks = (sortBy, sortValue) => {
    return {
        type: types.SORT_TASKS,
        sortBy,
        sortValue
    }
};