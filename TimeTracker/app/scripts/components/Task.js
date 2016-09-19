import TextField from 'material-ui/TextField';
import React, {Component} from 'react';


var Task = React.createClass({
	getInitialState: function(){
		return {							
			id: this.props.id,
			timer: Number(this.props.timer),	
			person:this.props.person,
			project:this.props.project,
			cost:this.props.cost,
			comment:this.props.comment,
			isActive: this.props.active
		}
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
		var commDiv = document.getElementById('commentsDiv_'+this.state.id);
		var costDiv = document.getElementById('costDiv_'+this.state.id);		
		if (e.target.id.split('_')[0] == 'comment'){		
			var commDiv = document.getElementById('commentsDiv_'+this.state.id);
			commDiv.classList.toggle('hidden');
			if(!costDiv.classList.contains('hidden')) {
			    costDiv.classList.add('hidden');
			};
			var inputField = document.getElementById('comment_input_'+this.state.id);
			inputField.focus();
		};
		if (e.target.id.split('_')[0] == 'cost'){
			costDiv.classList.toggle('hidden');
				if(!commDiv.classList.contains('hidden')) {
					    commDiv.classList.add('hidden');
				};			 
			var inputField = document.getElementById('cost_input_'+this.state.id);
			inputField.focus();
		};					
	},

	handleTimerChange: function(){
		var result=this.state.timer;		 
		var h = ~~(result / 3600);
		var m = ~~((result % 3600)/60);
		var s = result % 3600 % 60;

		if (s < 10){s="0"+s};
		if (m < 10){m="0"+m};
		if (h < 10){h="0"+h};	 

		return 
			(h+":"+m+":"+s);
	},

	handleTimerEvent : function(){
		if (!this.state.isActive){		 		 	
		 	var selTask = {
		 		id: this.state.id,
		 		person: this.state.person,
		 		project: this.state.project,
		 		comment: this.state.comment,
		 		cost: this.state.cost,
		 		active: true};
		 	this.props.handleTaskResume(selTask);		 	
		}		
	},

	handleKeyPress: function(e){
		if (e.keyCode == 13){		 
			var inpType = e.target.id.split('_');
			switch (inpType[0]){
				case 'person':
					this.setState({person: e.target.value});
					break;
				case 'project':
					this.setState({project: e.target.value});
					break;
				case 'cost':
					var costDiv = document.getElementById('costDiv_'+this.state.id);
					costDiv.classList.toggle('hidden');
					this.setState({cost: e.target.value});	   
					break;
				case 'comment':
					var commDiv = document.getElementById('commentsDiv_'+this.state.id);
					commDiv.classList.toggle('hidden');
					this.setState({comment: e.target.value});	   
					break;
				default:
					break;
			}
		}
		var selTask = {
			id: this.state.id,
			person: this.state.person,
			project: this.state.project,
			comment: this.state.comment,
			cost: this.state.cost,
			timer: this.state.timer,
			active: this.state.isActive
		};
		this.props.handleTaskChange(selTask,'ACTION_TYPE_EDIT');
	},

	handleDelete : function(){
		var confirmation = confirm('Вы уверены что хотите удалить задачу?');		
		if (confirmation){
		var setSelected = {id:this.props.id}		 
		this.props.handleTaskChange(setSelected, 'ACTION_TYPE_DEL');
		 }
	},

	calculateSum: function(){
		var cost = this.state.cost;
		var time = this.state.timer;
		var result = (cost * time / 3600 );
		return "Сумма: "+result.toFixed(2)+" руб.";
	},

	render : function(){
		return (
			<div className = "task-area">
				<div className = "task-area__input-box--task">  		
					<div id = {"person_input_"+this.state.id+"_label"} onClick = {this.handleInputClick}>
						<TextField
						      hintText = "Введите описание задачи"
						      floatingLabelText = "Описание задачи"
						      fullWidth = {true}
						      onChange = {this.handlePersonChange}
						      value = {this.state.person != '' ? this.state.person : 'Описание задачи...'}									      
						 />										
					</div>		 						 
				</div>
				<div className="task-area__input-box--project">
					<TextField
					      hintText = "Проект"
					      floatingLabelText = "Введите название проекта"
					      fullWidth = {true}
					      onChange = {this.handleProjectChange}
					      value = 	{this.state.project != '' ? this.state.project : 'Проект'}					     
					/>							 	
				</div>			
				<div className = "task-area__input-box"> 
					<div id = {"comment_input_"+this.state.id+"_label"} className = "input-box__comment" onClick = {this.handleInputClick}></div>	
				</div>
				<div className = "task-area__input-box"> 
					<div id = {"cost_input_"+this.state.id+"_label"} className = "input-box__cost" onClick = {this.handleInputClick}></div>
				</div>	
				<div className = "task-area__input-box--timer"> 					 
					<div className = "timer__timerTick"> {this.handleTimerChange()} </div>
					<div onClick = {this.handleTimerEvent} className = "timer__btn--start"></div>
					<div className = "timer__sum"> {this.calculateSum()} </div>
				</div>
				<div className = "task-area__icon--del" onClick = {this.handleDelete}> </div>
				<div id = {"commentsDiv_"+this.state.id} className = "task-area__commentsDiv hidden">	
					<TextField
						hintText = "Комментарии"
						floatingLabelText="Комментарии"
						fullWidth = {true}
						onChange = {this.handleCommentChange}
						value = {this.state.comment}	
						multiLine = {true}		
						rowsMax = {4}
						rows = {2}
						id = {'comment_input_'+this.state.id}	     
						onKeyDown = {this.handleKeyPress}
					/>
				</div>
				<div id = {"costDiv_"+this.state.id} className = "task-area__costDiv hidden">	
					<TextField
						hintText = "Ставка (руб/час)"
						floatingLabelText = "Ставка (руб/час)"
						fullWidth = {true}
						onChange = {this.handleCostChange}
						value = {this.state.cost =='error' ? '': this.state.cost }					
						id = {'cost_input_'+this.state.id}	    
						errorText = { this.state.cost =='error' ? 'Введите число':''} 
						onKeyDown = {this.handleKeyPress}		
					/>
				</div>
			</div>
		)
	}
});

module.exports = Task;
