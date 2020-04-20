import React, {Component} from 'react';
import TaskItem from './TaskItem'
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskList extends Component {
    constructor(props){
        super(props);

        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;

        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? value : this.state.filterStatus
        }

        this.props.onFilter(filter);

        this.setState({
            [name]: value
        });
    }

	render(){
        var { tasks, keyword, filter, sort } = this.props;
        var { filterName, filterStatus } = this.state;
        
        if(keyword){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            })
        }
        if(filter.name){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !== -1;
            })
        }
        tasks = tasks.filter((task) => {
            if(filter.status === -1){
                return task;
            } else {
                return task.status === (filter.status === 1 ? true : false);
            }
        })
        if(sort.by === 'name'){
            tasks.sort((a, b) => {
                var nameA = a.name.toLowerCase();
                var nameB = b.name.toLowerCase();
                if(nameA > nameB) return sort.value;
                else if (nameA < nameB) return -sort.value;
                else return 0;
            })
        } else {
            tasks.sort((a, b) => {
                if(a.status > b.status) return -sort.value;
                else if (a.status < b.status) return sort.value;
                else return 0;
            })
        }

        var elmTasks = tasks.map((task, index) => {
            return <TaskItem key={task.id} task={task} index={index} />
        })

		return (
			<table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" name="filterName" className="form-control" value={filterName} onChange={this.onChange} />
                        </td>
                        <td>
                            <select name="filterStatus" className="form-control" value={filterStatus} onChange={this.onChange}>
                                <option value={-1}>All</option>
                                <option value={0}>Hide</option>
                                <option value={1}>Active</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elmTasks}
                </tbody>
            </table>
		);
	}
}

const mapStateToProps = (state) => {
    return{
        tasks: state.tasks,
        keyword: state.keyword,
        filter: state.filter,
        sort: state.sort
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilter: filter => {
            dispatch(actions.filterTask(filter));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
