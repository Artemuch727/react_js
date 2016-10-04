//	Task list view
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { editTaskStorage, deleteTask } from '../actions'
import Task from '../components/Task/Task';
import apiDB from '../actions/apiDB';

const mapStateToProps = state => {
	return {
		taskList: state.taskList.list
	};
};

const mapDispatchToProps = dispatch => {
	return {
		editTask: (taskId, newPropValue, changedPropName) => {
			dispatch(editTaskStorage(taskId, newPropValue, changedPropName))

		},
		deleteTaskFromStore: (taskId) => {
			dispatch(deleteTask(taskId));
			apiDB.deleteTaskFromLStorage(taskId);
		},
	};
};

@connect(mapStateToProps, mapDispatchToProps)
class TaskList extends Component {
	taskEdit(item, ev ) {
		const { editTask } = this.props;
		let	newPropValue = ev.target.value;
		let	changedPropName = ev.target.name;

		editTask(ev.target.parentElement.id, changedPropName, newPropValue);
		apiDB.editTaskInLStorage(item);
	}

	deleteTask(taskId) {
		const { deleteTaskFromStore } = this.props;
		deleteTaskFromStore(taskId);
	}

	render() {
		const { taskList } = this.props;
		if (taskList){}
		return (
			<ul>
				{
					taskList.map((item) => {
						if (!item.enabled)
							return(
								<Task
									key = {item.taskId}
									item = {item}
									deleteTask = {this.deleteTask.bind(this, item)}
									taskEdit = {this.taskEdit.bind(this, item)}
								/>
							)
					})
				}
			</ul>
		)
	}
}

export default TaskList;
