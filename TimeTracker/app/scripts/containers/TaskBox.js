import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
//import actions
import Timer from '../components/Timer';
import SideBar from '../components/Sidebar';
import TaskList from '../components/TaskList';
import {startTask, stopTask, editTask, addTaskToStorage, deleteTask, editTaskStorage} from '../actions'

const mapStateToProps = (state) => {
	return {
		task: state.taskActions.task
	};
};

const mapDispatchToProps = dispatch => {
	return {
		startTask: (task) => {
			dispatch(startTask(task));
		},
		stopTask: (task) => {
			dispatch(stopTask(task));
		},
		editTask: (changedPropName, newPropValue ) => {
			dispatch(editTask(changedPropName, newPropValue));
		},
		deleteTask: (task) => {
			dispatch(deleteTask(task));
		}
	};
};


@connect(mapStateToProps, mapDispatchToProps)
class TaskBox extends Component {

	tick() {
		const {task, editTask} = this.props;
		editTask('timer', task.properties.timer + 1 );
	}


	toggleTimer() {
		const {task} = this.props;
		if (task.enabled) {
			clearInterval(this.interval);
		} else {
			this.interval = setInterval(this.tick.bind(this), 1000);
		}
	}

	toggleTask() {
		const { task, startTask, stopTask } = this.props;


		if (!task.enabled) {
			let timestamp = new Date().getTime();
			let newTask = {
				taskId: timestamp,
				enabled: true
			};
			startTask(newTask);
		} else {
			stopTask(task);
		}
		this.toggleTimer();

	}

	taskEdit(ev) {
		const { editTask} = this.props;
		let newPropValue, changedPropName;

		if (ev == 'timer'){
			changedPropName ='timer';
		} else {
			newPropValue = ev.target.value;
			changedPropName = ev.target.name;
		}

		editTask(changedPropName, newPropValue);
	}

	render() {
		const { task } = this.props;
		return (
			<div>
				<div className="task-area">
					<h1 onClick = {this.toggleTask.bind(this)} > START </h1>
					<input name="description" type="text" onInput={this.taskEdit.bind(this)} value={task.properties.description}/>
					<input name="project" type="text" onInput={this.taskEdit.bind(this)} value={task.properties.project}/>
					<input name="comments" type="text" onInput={this.taskEdit.bind(this)} value={task.properties.comments}/>
					<input name="cost" type="number" onInput={this.taskEdit.bind(this)} value={task.properties.cost}/>
					<br/>
					<h2>{task.properties.description}, {task.properties.project}, {task.properties.comments}, {task.properties.cost}, {task.properties.timer}</h2>
					<hr/>
				</div>
				<TaskList />
			</div>
		);
	}
}

export default TaskBox;
