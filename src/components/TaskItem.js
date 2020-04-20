import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskItem extends Component {
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }
    onDelete = () => {
        this.props.onDeleteItem(this.props.task.id);
        this.props.onCloseForm();
    }
    onUpdate = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    }

	render(){
        var { task, index } = this.props;
		return (
			<tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span 
                        className={task.status === false ? 'label label-danger' : 'label label-success'}
                        onClick={this.onUpdateStatus}
                    >
                        {task.status === true ? 'Active' : 'Hide'}
                    </span>
                </td>
                <td className="text-center">
                    
                    <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
                        <span className="fa fa-pencil mr-5"></span>Edit
                    </button>&nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                        <span className="fa fa-trash mr-5"></span>Delete
                    </button>
                </td>
            </tr>
		);
	}
}

var mapStateToProps = () => {
    return {

    }
}

var mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: id => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteItem: id => {
            dispatch(actions.deleteItem(id));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: task => {
            dispatch(actions.editTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);