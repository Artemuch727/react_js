//var React = require('react');
import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';


var Sidebar = React.createClass({
	getInitialState: function(){
		return {							
			id: '',
			timer: 0,	
			person: '',
			project:'',
			cost:'',
			comment:'',
			isActive:false
		}						
	},

	componentWillReceiveProps : function(nextProps){
		var selectedTask = nextProps.selectedTask;

		if (selectedTask.person != undefined){
			this.setState({
					person: selectedTask.person,
					project: selectedTask.project,
					comment: selectedTask.comment,
					cost: selectedTask.cost,
					isActive: true
			});
		this.interval = setInterval(this.tick, 1000);	
		}		
	},

	tick: function() {
  	  	this.setState({timer: this.state.timer + 1});  	  	
  	},
  	
	handlePersonChange: function(e) {
	    this.setState({person: e.target.value});		   
	},

	handleProjectChange: function(e) {
	    this.setState({project: e.target.value});	   
	},

	handleCostChange: function(e) {
	    var reg = /\D/;
	    var result = e.target.value.match( reg );
	    result==null ? this.setState({cost: e.target.value}) : this.setState({cost: 'error'})	   
	},

	handleCommentChange: function(e) {
	    this.setState({comment: e.target.value});			     
	},

	handleInputClick : function(e){		
		var p = e.target;
		var commDiv = document.getElementById('commentsDiv');
		var costDiv = document.getElementById('costDiv');

		if (e.target.id.split('_')[0] == 'comment'){				
			commDiv.classList.toggle('hidden');
				if(!costDiv.classList.contains('hidden')) {
				    costDiv.classList.add('hidden');
					};
			var inputField = document.getElementById('comment_input_'+this.state.id);
				inputField.focus();
			var taskBox = document.getElementsByClassName('tasklist');
				for (var i=0; i<taskBox.length;i++){
						if(taskBox[i].classList.contains('smooth')) {
							if (costDiv.classList.contains('hidden') && commDiv.classList.contains('hidden')) {
								taskBox[i].classList.remove('smooth');
							}
						} else {
							taskBox[i].classList.add('smooth');
						}
			};
		};
							
		if (e.target.id.split('_')[0] == 'cost'){		 
			costDiv.classList.toggle('hidden');
			if(!commDiv.classList.contains('hidden')) {
				    commDiv.classList.add('hidden');
				};			 
			var inputField = document.getElementById('cost_input_'+this.state.id);
			inputField.focus();
			var taskBox = document.getElementsByClassName('tasklist');
				for (var i=0; i<taskBox.length;i++)				
						if(taskBox[i].classList.contains('smooth')) {
							if (costDiv.classList.contains('hidden') && commDiv.classList.contains('hidden')) {
								taskBox[i].classList.remove('smooth');
							}
						} else {
							taskBox[i].classList.add('smooth');
						}			
				};
	},

	handleTimerEvent : function(){
		 if (this.state.isActive){
		 	clearInterval(this.interval);
		 	this.createNewTask();	 
		 }
		 else{
		 	this.interval = setInterval(this.tick, 1000);	
		 }
	},

	handleActivityChange : function(){
		this.setState({isActive: !this.state.isActive})
		this.handleTimerEvent();		 
	},

	handleKeyPress: function(e){	

		if (e.keyCode == 13){
		 
			var inpType = e.target.id.split('_');

			if (inpType[0] == 'person'){
				this.setState({person: e.target.value});	
			}
			if (inpType[0] == 'project'){
				this.setState({project: e.target.value});	   				
			}
			if (inpType[0] == 'cost'){
				var costDiv = document.getElementById('costDiv');
				costDiv.classList.toggle('hidden');
				this.setState({cost: e.target.value});	   
				
				var taskBox = document.getElementsByClassName('tasklist');
				for (var i=0; i<taskBox.length;i++)
				taskBox[i].classList.remove('smooth');			
			}
			if (inpType[0] == 'comment'){
				var commDiv = document.getElementById('commentsDiv');
				commDiv.classList.toggle('hidden');
				this.setState({comment: e.target.value});	   
				
				var taskBox = document.getElementsByClassName('tasklist');
				for (var i=0; i<taskBox.length;i++)
				taskBox[i].classList.remove('smooth');			
			}
		}
	},

	createNewTask: function(params){
		var timestamp = new Date().getTime();
		var task = {
					id: timestamp,
					person: this.state.person,
					project: this.state.project,
					comment: this.state.comment,
					cost: this.state.cost,
					timer: this.state.timer,
					active: false
				};

		this.setState({
						id: '',
						timer: 0,	
						person:'',
						project:'',
						cost:'',
						comment:'',
						isActive: false
					});
		this.props.handleTaskSubmit(task);
	}, 

	handleTimerChange: function(){
		var result=this.state.timer;		 
		result = Math.round(result / 60) + ':' + ( result % 60 < 10 ? "0"+result % 60: result % 60);
		return result;
	},

		
	render: function(){
		var me = this;
			
		return (
			<div className="sidebar">		
				<div className="task-area" onClick={this.handleKeyPress}>	

					<div className="task-area__input-box--task">  		
							
						
						<TextField
						      hintText="Введите описание задачи"
						      floatingLabelText="Описание задачи"
						      fullWidth={true}
						      onChange={this.handlePersonChange}
						      value = {this.state.person}						      
						 />		 
					</div>

					<div className="task-area__input-box--project"> 
							
					<TextField
						      hintText="Проект"
						      floatingLabelText="Введите название проекта"
						      fullWidth={true}
						      onChange={this.handleProjectChange}
						      value = {this.state.project}						     
						   		 />
					</div>						
					
					<div className="task-area__input-box"> 
						<div id={"comment_input_"+this.state.id+"_label"} className="input-box__comment" onClick={this.handleInputClick} />				
					</div>
					
					<div className="task-area__input-box"> 
						<div id={"cost_input_"+this.state.id+"_label"} className="input-box__cost" onClick={this.handleInputClick}> 
					</div>		
						
				</div>	

					<div className="task-area__input-box"> 	
						<div className={"sidebar__timerBlock" + (this.state.isActive ? "" : " hidden")}>			
						 	<div className="sidebar__timerTick"> {this.handleTimerChange()} </div>	
						 		<div >
				    					<CircularProgress 				    					 
						    			/>
						    		</div>	
			    			</div>							
					</div>
					
					<div>
						 <RaisedButton 
						 		label="Default" 
						 		backgroundColor={ this.state.isActive ? "#FF4081" : "#A4C639"} 
						 		label={ this.state.isActive ? "СТОП" : "СТАРТ"} 
						 		onTouchTap={this.handleActivityChange}
						 	/>
					</div>



					<div id="commentsDiv" className="task-area__commentsDiv hidden">	
					 	<TextField
						      hintText="Комментарии"
						      floatingLabelText="Комментарии"
						      fullWidth={true}
						      onChange={this.handleCommentChange}
						      value = {this.state.comment}	
						      multiLine={true}		
						      rowsMax={4}
						      rows={2}
						      id={'comment_input_'+this.state.id}	     
						      onKeyDown ={this.handleKeyPress}
						   		 />
					 </div>

					<div id="costDiv" className="task-area__costDiv hidden">	
					 
						<TextField
						      hintText="Ставка (руб/час)"
						      floatingLabelText="Ставка (руб/час)"
						      fullWidth={true}
						      onChange={this.handleCostChange}
						      value = {this.state.cost =='error' ? '': this.state.cost }					
						      id={'cost_input_'+this.state.id}	    
						      errorText={ this.state.cost =='error' ? 'Введите число':''} 
						      onKeyDown ={this.handleKeyPress}
		
						   		 />
						      
						    
					
					</div>

				</div>							
			</div>
		)
	}
});

module.exports = Sidebar;