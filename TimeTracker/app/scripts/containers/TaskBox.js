import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
//import actions
import Timer from '../components/Timer';
import SideBar from '../components/Sidebar';
import TaskList from '../components/TaskList';

import {startTask, stopTask, editTask, addTask, deleteTask} from '../actions'

const mapStateToProps = (state) => {
	return {
		task: state.taskActions.task,
		taskList: state.taskList
	};
};

const mapDispatchToProps = dispatch => {
	return {
		startTask: (task) => {
			dispatch(startTask(task));
			dispatch(addTask(task));
		},
		stopTask: (task) => {
			dispatch(stopTask(task))
		},
		editTask: (task) => {
			dispatch(editTask(task))
		},
		deleteTask: (task) => {
			dispatch(deleteTask(task));
		},
	};
};

@connect(mapStateToProps, mapDispatchToProps)
class TaskBox extends Component {

	taskAdd() {
		const { task, startTask } = this.props;
		let timestamp = new Date().getTime();
		let newTask = {
			taskId: timestamp,
			enabled: true,
			properties: task.properties
		};

		startTask(newTask);

	}

	taskDel() {
		const { deleteTask} = this.props;
		let taskId = '1475278547974';
		deleteTask(taskId);
	}



	taskEdit(ev) {
		const { task, editTask} = this.props;
		let inpValue, inpName;
		let newTask = {
			taskId: task.taskId,
			enabled: task.enabled,
			properties: task.properties
		};

		if (ev == 'timer'){
			inpName ='timer';
		} else {
			inpValue = ev.target.value;
			inpName = ev.target.name;
		}
		switch (inpName) {
			case 'description':
				newTask.properties.description =  inpValue;
				break;
			case 'project':
				newTask.properties.project =  inpValue;
				break;
			case 'comments':
				newTask.properties.comments =  inpValue;
				break;
			case 'cost':
				newTask.properties.cost =  inpValue;
				break;
			case 'timer':
				newTask.properties.timer =  newTask.properties.timer + 1;
				break;
			default:
				break;
		}

		editTask(newTask);
	}

	render() {
		const { task } = this.props;
		return (
			<div>
				<h1 onClick = {this.taskAdd.bind(this)} > START </h1>
				<h1 onClick = {this.taskDel.bind(this)} > DelTask  TaskBox </h1>
				<input name="description" type="text" onInput={this.taskEdit.bind(this)}/>
				<input name="project" type="text" onInput={this.taskEdit.bind(this)}/>
				<input name="comments" type="text" onInput={this.taskEdit.bind(this)}/>
				<input name="cost" type="number" onInput={this.taskEdit.bind(this)}/>

				<h1> Timer: {task.properties.timer}</h1>
				<h2>{task.properties.description}, {task.properties.project}, {task.properties.comments}, {task.properties.cost}</h2>
				<hr/>
				<TaskList />
			</div>
		);
	}
}
export default TaskBox;
