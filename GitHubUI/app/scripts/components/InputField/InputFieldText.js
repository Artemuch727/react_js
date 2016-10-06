/**
 * Created by User on 05.10.2016.
 */
import React, { Component, PropTypes } from 'react';

class InputFieldText extends Component {
	handleRepoInput(value) {
		const { data, refreshOptionsList } = this.props;

		let filteredData = [];

		if (value) {
			let re = new RegExp("^" + value);
			filteredData = data.sort().filter((el) => {
				return re.test(el.name)
			});
		}
		refreshOptionsList(filteredData);
	};


	move(direction, DOMevent) {
		const { selectedId, filteredData, refreshSelectedItem } = this.props;
		let selIndex = selectedId;


		switch (direction) {
			case 'up':
				selIndex = (selIndex <= 0) ? filteredData.length-1 : --selIndex;
				break;
			case 'down':
				selIndex = (selIndex == filteredData.length-1) ? 0 : ++selIndex;
				break;
			default:
				break;
		}

		DOMevent.target.value = filteredData[selIndex].name;
		refreshSelectedItem(selIndex);
	}

	handleKeyUp(event) {
		const { refreshOptionsList, onItemSelect, autoComplete} = this.props;

		if (autoComplete == 'off'){
			if (event.keyCode == 13) {
				onItemSelect(event.target.value);
			}
		} else {
			switch (event.keyCode) {
				case 40: {
					event.preventDefault();
					this.move('down', event);
					break;
				}
				case 38: {
					event.preventDefault();
					this.move('up', event);
					break;
				}
				case 13: {
					onItemSelect(event.target.value);
					refreshOptionsList([]);
					break;
				}
				default:
					this.handleRepoInput(event.target.value);
					break;
			}
		}
	}


	render() {
		const { className, type, name, handleInputActivity} = this.props;
		let label = '';

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

		return (
			<input
				name = {name}
				type = {type}
				className = {className}
				placeholder = {label}
				onKeyUp = {this.handleKeyUp.bind(this)}
				onFocus = {handleInputActivity}
				onBlur = {handleInputActivity}
			/>
		)
	}
}

export default InputFieldText;


