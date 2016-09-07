var Task= require('./Task');
var React = require('react');

var TaskList = React.createClass({
  render: function() {
    var me = this;
    var taskNodes = this.props.data.map(function(task){	   
  	return (
        <Task 
        	handleTaskSubmit = {me.props.handleTaskSubmit}
        	handleTaskChange = {me.props.handleTaskChange}
        	handleTaskResume = {me.props.handleTaskResume}

        	id={task.id} 
        	person={task.person} 
        	key={task.id+'_key'} 
        	project={task.project} 
        	comment={task.comment} 
        	timer={task.timer} 
        	active={task.active}         	
        	cost={task.cost}          
        	/>
      	);
  	})

    return (
      <div className='tasklist'>
        {taskNodes}
      </div>
    );
  }
});

module.exports = TaskList;