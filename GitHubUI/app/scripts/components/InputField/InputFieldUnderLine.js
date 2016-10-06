/**
 * Created by User on 04.10.2016.
 */
import React, { Component, PropTypes } from 'react';

class InputFieldUnderLine extends Component {
	render() {
		const { isFocused} = this.props;
		let className = (isFocused ? "inputBox__hr--input" : "inputBox__hr--def");
		return (
			<div>
				<hr className = "inputBox__hr" />
				<hr className = {className} />
			</div>
		)
	}
}

export default InputFieldUnderLine;
