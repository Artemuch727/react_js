//var React = require('react');
import React from 'react';


class Timer extends React.Component{
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    
    this.state = {
        secondsElapsed: this.props.timer
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

  render()  {
      return  
          <div>{this.state.secondsElapsed}</div>
  }
}

/*var Timer = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: this.props.timer};
  },

  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },

  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  },

  render: function() {
    return (
      <p>{this.state.secondsElapsed}</p>
    );
  }
});*/

module.exports = Timer;