import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
//import actions
import TaskList from '../components/TaskList';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';

import {startTask, stopTask, editTask, addTaskToStorage} from '../actions'

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
			dispatch(addTaskToStorage(task));
			dispatch(stopTask(task));
		},
		editTask: (changedPropName, newPropValue ) => {
			dispatch(editTask(changedPropName, newPropValue));
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

	handleTimerChange(){
		const { task } = this.props;
		var result = task.properties.timer;
		var h = ~~(result / 3600);
		var m = ~~((result % 3600)/60);
		var s = result % 3600 % 60;

		if (s < 10){
			s="0"+s;
		}
		if (m < 10){
			m="0"+m;
		}
		if (h < 10){
			h="0"+h;
		}

		return (h+":"+m+":"+s)
	}

	render() {
		const { task } = this.props;
		return (
			<div>
				<div className="task-area">
					<InputField
						name = "description"
						type = "text"
						item = {task}
						onInput = {this.taskEdit.bind(this)}
					/>
					<InputField
						name = "comments"
						type = "text"
						item = {task}
						onInput = {this.taskEdit.bind(this)}
					/>
					<InputField
						name = "cost"
						type = "number"
						item = {task}
						onInput = {this.taskEdit.bind(this)}
					/>
					{this.handleTimerChange()}
					<Button
						enabled = {task.enabled}
						toggleTask = {this.toggleTask.bind(this)}
					/>
					<button onClick = {this.toggleTask.bind(this)} > !START! </button>
				</div>
				<TaskList />
			</div>
		);
	}
}

export default TaskBox;
