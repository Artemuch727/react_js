import React from 'react';
import { connect } from 'react-redux';
import {startTimer, stopTimer, editTask} from '../actions'


const mapStateToProps = state => {
	return {
		task: state.taskActions.task
	};
};

const mapDispatchToProps = dispatch => {
	return {
		startTimer: (task) => {
			dispatch(startTimer(task));
		},
		stopTimer: (task) => {
			dispatch(stopTimer(task))
		},
		timerTick: (newPropValue) => {
			dispatch(editTask( 'timer', newPropValue))
		}
	};
};

@connect(mapStateToProps, mapDispatchToProps)
class Timer extends React.Component{
	tick() {
		const {task, timerTick} = this.props;
		timerTick(task.properties.timer + 1);
	}

	toggleTimer() {
		const {task} = this.props;
		if (task.enabled) {
			clearInterval(this.interval);
		} else {
			this.interval = setInterval(this.tick.bind(this), 1000);
		}
	}

	render() {
		const {task} = this.props;
		return (
			<div>
				<span onClick={this.toggleTimer.bind(this)}> Timerr: </span>	{task.properties.timer}
			</div>
		)
	}
}

export default Timer;

