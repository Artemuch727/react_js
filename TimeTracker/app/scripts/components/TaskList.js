//	Task list view
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => {
	return {
		taskList: state.taskList
	};
};
class TaskList extends Component {
	render() {
		const { taskList } = this.props;
		return (
			<ul>
				{
					taskList.map((item, idx) => {
						return(
							<li key = {idx}>
								<h2>{item.properties.description}, {item.properties.project}, {item.properties.comments}, {item.properties.cost}</h2>
							</li>
						)
					})
				}
			</ul>
		)
	}
}

export default connect(mapStateToProps)(TaskList);
