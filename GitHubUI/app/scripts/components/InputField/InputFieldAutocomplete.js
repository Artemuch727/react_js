import React, { Component } from 'react';
import InputFieldAutocompleteItem from './InputFieldAutocompleteItem'

class InputFieldAutocomplete extends Component {
	render() {
		const { selectedId, filteredData, selectAutocompleteItem, onItemSelect } = this.props;
		return (
			<ul className = {filteredData.length > 0 ? "dropdownList--animate" : "dropdownList"} >
				{
					filteredData.map((item, idx) => {
						return <InputFieldAutocompleteItem
							key = {idx+'_'+item.name}
							repoName = {item.name}
							idx = {idx}
							selectedId = {selectedId}
							selectAutocompleteItem = {selectAutocompleteItem}
							onItemSelect = {onItemSelect}
						/>
					})
				}
			</ul>
		)
	}
}


export default InputFieldAutocomplete;
