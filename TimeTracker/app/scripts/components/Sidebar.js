import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => {
	return {
		task: state.taskActions.task,
		taskList: state.taskList.list
	};
};
class SideBar extends Component {

	render() {

		const { task } = this.props;
		return (
			<h2>{task.properties.description}, {task.properties.project}, {task.properties.comment}, {task.properties.cost}</h2>
		)
	}
}

export default connect(mapStateToProps)(SideBar);
