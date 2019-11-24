import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class MistakesCounter extends PureComponent {
  render() {
    const {mistakes} = this.props;
    return (
      <div className="game__mistakes">
        <div className={mistakes > 0 ? `wrong` : `correct`}></div>
        <div className={mistakes > 1 ? `wrong` : `correct`}></div>
        <div className={mistakes > 2 ? `wrong` : `correct`}></div>
      </div>
    );
  }
}

MistakesCounter.propTypes = {
  mistakes: PropTypes.number,
};

export default connect(
    (state) => ({
      mistakes: state.game.mistakes,
    })
)(MistakesCounter);
