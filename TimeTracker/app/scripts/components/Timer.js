import React from 'react';

class Timer extends React.Component{
	constructor(props) {
		super(props);
		this.tick = this.tick.bind(this);
		this.state = {
			secondsElapsed: this.props.task.properties.timer
			//secondsElapsed: 0//this.props.timer
		}
	}

	tick() {
		this.setState({secondsElapsed: this.state.secondsElapsed + 1});
	}

	componentWillMount(){
		this.interval = setInterval(this.tick, 1000);
	}

	componentWillUnmount() {
		 clearInterval(this.interval);
	}

	render() {
		return (
			<div>
				Timer:	{this.state.secondsElapsed}
			</div>
		)
	}
}

module.exports = Timer;

