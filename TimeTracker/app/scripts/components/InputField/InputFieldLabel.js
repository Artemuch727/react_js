/**
 * Created by User on 04.10.2016.
 */
import React, { Component, PropTypes } from 'react';

class InputFieldLabel extends Component {
	render() {
		const { label, isFocused} = this.props;
		let className = (isFocused ? "inputBox__label--up" : "inputBox__label");
		return (
			<div>
				<label className = {className} > {label} </label>
			</div>
		)
	}
}

export default InputFieldLabel;
