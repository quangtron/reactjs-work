import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskForm extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.taskEditting){
            this.setState({
                id: nextProps.taskEditting.id,
                name: nextProps.taskEditting.name,
                status: nextProps.taskEditting.status
            });
        } else {
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    }
    onHandleChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status'){
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        })
    }
    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.props.onCloseForm();
    }

	render(){
        var { id } = this.state;
        if(!this.props.isDisplayForm) return '';
		return (
			<div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {id !== '' ? 'Update Work' : 'Add Work'}
                        <span className="fa fa-times-circle text-right" onClick={() => this.props.onCloseForm()}></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onHandleChange} />
                        </div>
                        <label>Status:</label>
                        <select name="status" className="form-control" value={this.state.status} onChange={this.onHandleChange}>
                            <option value={true}>Active</option>
                            <option value={false}>Hide</option>
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5">Save</span>
                            </button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>
                                <span className="fa fa-close mr-5">Cancel</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
		);
	}
}

var mapStateToProps = state => {
    return{
        isDisplayForm: state.isDisplayForm,
        taskEditting: state.taskEditting
    }
};

var mapDispatchToProps = (dispatch, props) => {
    return{
        onSaveTask: task => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
