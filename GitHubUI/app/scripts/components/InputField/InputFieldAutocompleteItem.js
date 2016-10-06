/**
 * Created by User on 06.10.2016.
 */
import React, { Component, PropTypes } from 'react';

class InputFieldAutocompleteItem extends Component {
	handleClick() {
		const {onItemSelect, repoName, selectAutocompleteItem} = this.props;
		onItemSelect(repoName);
		selectAutocompleteItem();
	}

	render() {
		const { selectedId, idx, repoName } = this.props;
		return (
			<li
				className = {(selectedId == idx ? 'dropdownList__item--active' : 'dropdownList__item')}
				onClick = {this.handleClick.bind(this)}
			> {repoName} </li>
		)
	}
}

export default InputFieldAutocompleteItem;
