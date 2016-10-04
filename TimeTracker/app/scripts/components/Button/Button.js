/**
 * Created by User on 04.10.2016.
 */
import React, { Component, PropTypes } from 'react';

class Button extends Component {
	render() {
		const { type, toggleTask, enabled} = this.props;
		let btnText,btnClassName;

		if (!enabled){
			btnText = "СТАРТ";
			btnClassName = "button__btn--start"
		} else {
			btnText = "СТОП";
			btnClassName = "button__btn--stop"
		}
		return (
			<div className="button">
				<div className = {btnClassName} onClick = {toggleTask}> {btnText} </div>
			</div>
		)
	}
}

export default Button;
