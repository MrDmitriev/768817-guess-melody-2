import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducer.js';

export class Timer extends Component {
  render() {
    const {timer} = this.props;
    return (
      <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
        <span className="timer__mins">{timer.min}</span>
        <span className="timer__dots">:</span>
        <span className="timer__secs">{timer.sec}</span>
      </div>
    );
  }

  componentDidMount() {
    const {tick, timer} = this.props;
    setTimeout(() => tick(timer), 1000);
  }

  componentDidUpdate() {
    const {tick, timer, showLoseTime} = this.props;
    if (timer.secLeft === 0) {
      showLoseTime();
    }
    return setTimeout(() => tick(timer), 1000);
  }
}

Timer.propTypes = {
  timer: PropTypes.shape({
    sec: PropTypes.number,
    min: PropTypes.number,
    secLeft: PropTypes.number,
  }),
  tick: PropTypes.func,
  showLoseTime: PropTypes.func,
};

export default connect(
    (state) => ({
      timer: state.timer,
    }),
    (dispatch) => ({
      tick: (timer) => dispatch(ActionCreator.tick(timer)),
      showLoseTime: () => dispatch(ActionCreator.showLoseTime()),
    })
)(Timer);
