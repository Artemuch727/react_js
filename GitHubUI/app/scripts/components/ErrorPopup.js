/**
 * Created by User on 06.10.2016.
 */

import React, { Component } from 'react';


class ErrorPopup extends Component {
	autoHide() {
		const { onShowErrorDiv } = this.props;
		onShowErrorDiv();
	}

	render() {
		const { errorLog, showErrorDiv } = this.props;
		if (showErrorDiv) {
			setTimeout(this.autoHide.bind(this), 1500);
			return (
				<div className={(showErrorDiv ? "errorDiv errorDiv--show" : "errorDiv")}>
					<img alt="error" src="/error.png" height="50" width="50"/>
					<span> { errorLog } </span>
				</div>
			)
		} else {
			return <div></div>
		}
	}
}

export default ErrorPopup;
