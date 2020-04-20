import React, {Component} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			sort: {
				by: 'name',
				value: 1
			}
		}
		this.onSort = this.onSort.bind(this);
		this.onToggleForm = this.onToggleForm.bind(this);
	}
	onToggleForm(){
		if(this.props.taskEditting.id && this.props.isDisplayForm){
			this.props.onClearTaskEditting();
		} else {
			this.props.onToggleForm();
			this.props.onClearTaskEditting();
		}
	}
	onSort(sortBy, sortValue){
		this.setState({
			sort: {
				by: sortBy,
				value: sortValue
			}
		})
	}

	render(){
		var { isDisplayForm } = this.props;

		return (
			<div className="container">
				<div className="text-center">
					<h1>Manager Work</h1>
				</div>
				<div className="row">
					<div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
						<TaskForm />
					</div>
					{/* Add work + Search Sort */}
					<div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
						<button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
							<span className="fa fa-plus mr-5"></span>Add work
						</button>
						{/* Search Sort */}
						<Control />
						{/* List */}
						<div className="row mt-15">
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<TaskList />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var mapStateToProps = state => {
	return {
		isDisplayForm: state.isDisplayForm,
		taskEditting: state.taskEditting
	}
}

var mapDispatchToProps = (dispatch, props) => {
	return {
		onToggleForm: () => {
			dispatch(actions.toggleForm());
		},
		onClearTaskEditting: () => {
			dispatch(actions.clearTaskEditting());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
