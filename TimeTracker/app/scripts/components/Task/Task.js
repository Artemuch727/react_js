import React, { Component, PropTypes } from 'react';
import InputField from '../InputField/InputField';

class Task extends Component {
	calcSum(task) {
		return (task.properties.cost * task.properties.timer / 3600).toFixed(2);
	}

	calcTotalTime(task){
		let totalTime = task.properties.timer;
		let totalString = '';

		if (totalTime < 60) {
			totalString = totalTime + ' сек.';
		} else if (totalTime >= 60 && totalTime < 3600) {
			totalString = (totalTime / 60).toFixed(2) + ' мин.';
		} else if (totalTime >= 3600) {
			totalString = (totalTime / 3600).toFixed(2) + ' час.';
		} else {
		}

		return totalString;
	}

	render() {
		const { deleteTask, taskEdit, item  } = this.props;
		return (
			<li key = {item.taskId}  className="taskArea">
				<InputField
					name = "description"
					type = "text"
					item = {item}
					onInput = {taskEdit}
				/>
				<InputField
					name = "comments"
					type = "text"
					item = {item}
					onInput = {taskEdit}
				/>
				<InputField
					name = "cost"
					type = "number"
					item = {item}
					onInput = {taskEdit}
				/>
				<div className="taskArea__totals">
					<h2>Затрачено: {this.calcTotalTime(item)}</h2>
					<h2>Сумма: {this.calcSum(item)} руб.</h2>
				</div>
				<img src = "delete.png" alt="delete_img" width = "25px" height = "30px" onClick = {deleteTask}/>
			</li>
		)
	}
}

export default Task;
