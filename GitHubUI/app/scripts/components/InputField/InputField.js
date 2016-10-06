/**
 * Created by User on 03.10.2016.
 */
import React, { Component } from 'react';
import InputFieldLabel from './InputFieldLabel';
import InputFieldUnderLine from './InputFieldUnderLine';
import InputFieldAutocomplete from './InputFieldAutocomplete';
import InputFieldText from './InputFieldText';

class InputField extends Component {
	constructor(props) {
		super(props);
		this.state  = {
			isFocused: false,
			filteredData: [],
			selectedId: -1
		}
	}

	handleInputActivity() {
		this.setState({isFocused: !this.state.isFocused});
	}

	handleKeyUp() {
		const {onItemSelect} = this.props;

		switch (event.keyCode) {
			case 40: {
				event.preventDefault();
				move('down');
				break;
			}
			case 38: {
				event.preventDefault();
				move('up');
				break;
			}
			case 13: {
				onItemSelect;
				break;
			}
			default:
				handleRepoInput(event);
				break;
		}
	}

	refreshOptionsList(filteredData) {
		this.setState({filteredData: filteredData});
	}

	refreshSelectedItem(selectedId) {
		this.setState({selectedId: selectedId});
	}

	selectAutocompleteItem(event) {
		this.refreshOptionsList([]);
	}

	render() {
		const { defaultValue, name, type, className, data, onItemSelect, autoComplete } = this.props;
		let label = '';
		let InputField;

		switch (name) {
			case 'login':
				label = "Пользователь";
				break;
			case 'repository':
				label = "Репозиторий";
				break;
			default:
				break;
		}
		if (autoComplete == 'on'){
			InputField = (
				<InputFieldAutocomplete
					filteredData = {this.state.filteredData}
					selectAutocompleteItem = {this.selectAutocompleteItem.bind(this)}
					onItemSelect = {onItemSelect}
					selectedId = {this.state.selectedId}
				/>
			)
		}

		return (
			<div className = "inputBox" >
				<InputFieldLabel
					label = {label}
					isFocused = {this.state.isFocused}
				/>
				<InputFieldText
					name = {name}
					type = {type}
					data = {data}
					filteredData = {this.state.filteredData}
					className = {className}
					autoComplete = {autoComplete}
					selectedId = {this.state.selectedId}
					refreshOptionsList = {this.refreshOptionsList.bind(this)}
					refreshSelectedItem = {this.refreshSelectedItem.bind(this)}
					onItemSelect = {onItemSelect}
					onKeyUp = {this.handleKeyUp.bind(this)}
					handleInputActivity = {this.handleInputActivity.bind(this)}
				/>
				<InputFieldUnderLine
					isFocused = {this.state.isFocused}
				/>
				{ InputField }
			</div>
		)
	}
}

export default InputField;
