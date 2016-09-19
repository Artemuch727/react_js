const Actions = require('../actions/actions');
const Sidebar = require('./Sidebar');
const TaskList = require('./TaskList');
const React = require('react');

const TaskBox = React.createClass({	
	getInitialState: function(){
		return {
			data : this.props.data,
			selected: {}
		}
	},

	handleTaskSubmit: function(task) {	  	
		localStorage.setItem(task.id ,  JSON.stringify(task));
		this.setState({
			data: Actions.getTasksFromLocal(),
			selected: {} 
		});
	},

	handleTaskResume : function(task){
		this.setState({selected: task});
	},

	handleTaskChange: function(task, type){
		var tasks = this.state.data;
		if (type == 'ACTION_TYPE_EDIT') editSelected(this);
		if (type == 'ACTION_TYPE_DEL') delSelected(this);

		function editSelected(me){
			localStorage.removeItem(task.id);
			localStorage.setItem(task.id , JSON.stringify(task));
			me.setState({data: Actions.getTasksFromLocal()});
		}

		function delSelected(me){
			localStorage.removeItem(task.id);
			me.setState({data: Actions.getTasksFromLocal()});
		}
	},

	render:   function(){		
		return  (
			<div className="tasklist-content">
				<Sidebar 
					selectedTask={this.state.selected}
					handleTaskSubmit={this.handleTaskSubmit}
				/>				 
				<TaskList 
					handleTaskResume={this.handleTaskResume}
					handleTaskSubmit={this.handleTaskSubmit} 
					handleTaskChange = {this.handleTaskChange}
					data={this.state.data} 
				/>
			</div> 
		)
	}
});

module.exports = TaskBox;
