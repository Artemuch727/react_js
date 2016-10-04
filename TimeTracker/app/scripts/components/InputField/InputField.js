/**
 * Created by User on 03.10.2016.
 */
import React, { Component, PropTypes } from 'react';
import InputFieldLabel from './InputFieldLabel'
import InputFieldUnderLine from './InputFieldUnderLine'

class InputField extends Component {
	constructor(props) {
		super(props);
		this.state  = {
			isFocused: false
		}
	}


	handleInputActivity() {
		this.setState({isFocused: !this.state.isFocused});
	}

	render() {
		const { name, type, item, onInput } = this.props;
		let label = ''; let value, style;
		switch (name) {
			case 'description':
				label = "Описание задачи";
				value = item.properties.description;
				break;
			case 'comments':
				label = "Комментарий";
				value = item.properties.comments;
				break;
			case 'cost':
				label = "Ставка (р/час)";
				value = item.properties.cost;
				style = {width: "120px"};
				break;
			default:
				break;
		}
		return (
			<div className = "inputBox" id = {item.taskId} style = {style}>
				<InputFieldLabel
					label = {label}
					isFocused = {this.state.isFocused}
				/>
				<input className = "inputBox__input" type = {type} name = {name}  placeholder = {label}
					   defaultValue = {value}
					   onInput = {onInput} onFocus = {this.handleInputActivity.bind(this)} onBlur = {this.handleInputActivity.bind(this)}/>
				<InputFieldUnderLine
					isFocused = {this.state.isFocused}
				/>
			</div>
		)
	}
}

export default InputField;
