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
		let label = '';
		switch (name) {
			case 'description':
				label = "Описание задачи";
				break;
			case 'comments':
				label = "Комментарий";
				break;
			case 'cost':
				label = "Ставка (р/час)";
				break;
			default:
				break;
		}
		return (
			<div className = "inputBox">
				<InputFieldLabel
					label = {label}
					isFocused = {this.state.isFocused}
				/>
				<input className = "inputBox__input" type = {type} name = {name}  placeholder = {label}
					   onInput = {onInput} onFocus = {this.handleInputActivity.bind(this)} onBlur = {this.handleInputActivity.bind(this)}/>
				<InputFieldUnderLine
					isFocused = {this.state.isFocused}
				/>
			</div>
		)
	}
}

export default InputField;
