//	Task list view
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {startTask, stopTask, editTaskStorage, addTask, deleteTask} from '../actions'


const mapStateToProps = state => {
	return {
		taskList: state.taskList.list
	};
};

const mapDispatchToProps = dispatch => {
	return {
		startTask: (task) => {

		},
		editTask: (taskId, newPropValue, changedPropName) => {
			dispatch(editTaskStorage(taskId, newPropValue, changedPropName))
		},
		deleteTask: (task) => {
			dispatch(deleteTask(task));
		},
	};
};


class TaskList extends Component {


	taskEdit(ev) {
		const { editTask } = this.props;
		let	newPropValue = ev.target.value;
		let	changedPropName = ev.target.name;

		editTask(ev.target.parentElement.id, changedPropName, newPropValue);
	}

	render() {
		const { taskList } = this.props;
		return (
			<ul>
				{
					taskList.map((item, idx) => {
						if (!item.enabled)
							return(
								<li key = {idx}  id = {item.taskId} className="task-area">
										<input name="description" type="text" value={item.properties.description}  onInput={this.taskEdit.bind(this)} />
										<input name="project" type="text" value={item.properties.project}  onInput={this.taskEdit.bind(this)} />
										<input name="comments" type="text" value={item.properties.comments}   onInput={this.taskEdit.bind(this)}/>
										<input name="cost" type="number" value={item.properties.cost}  onInput={this.taskEdit.bind(this)}/>
										<h2>{item.properties.timer}</h2>
										<h1> DelTask  TaskBox </h1>
								</li>
							)
					})
				}
			</ul>
		)
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskList);
