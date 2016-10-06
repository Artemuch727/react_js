/**
 * Created by User on 06.10.2016.
 */

import React, { Component } from 'react';


class ErrorPopup extends Component {
	render() {
		const { errorLog } = this.props;

		return (
			<div className="errorDiv">
				<img alt="error" src="/error.png" height="50" width="50"/>
				<span> { errorLog } </span>
			</div>
		)
	}
}

export default ErrorPopup;
