import React, { Component, PropTypes } from 'react';
import InputField from '../components/InputField/InputField';
import Button from '../components/Button/Button';

class Task extends Component {
	calcSum(task) {
		return (task.properties.cost * task.properties.timer / 3600).toFixed(2);
	}

	render() {
		const { deleteTask, taskEdit, item  } = this.props;
		return (
			<li key = {item.taskId}  id = {item.taskId} className="task-area">
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
				<h2>{item.properties.timer}</h2>
				<h2>Sum: {this.calcSum(item)}</h2>

				<button onClick={deleteTask}> DelTask </button>

				<Button
					type = "delete"
					toggleTask = {deleteTask}
				/>
			</li>
		)
	}
}

export default Task;
