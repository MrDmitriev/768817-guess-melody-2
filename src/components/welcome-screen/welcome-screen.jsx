import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {ActionCreator} from '../../reducers/index.js';
import {loadQuestions} from '../../reducers/data.js';

export class WelcomeScreen extends React.PureComponent {
  render() {
    const {gameTime, mistakesLimit, incrementStep, stepsLimit} = this.props;

    const onButtonClickHandler = () => {
      incrementStep(stepsLimit);
    };

    return (
      <section className="welcome">
        <div className="welcome__logo"><img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" /></div>
        <button
          className="welcome__button"
          onClick={onButtonClickHandler}
        >
          <span className="visually-hidden">Начать игру</span>
        </button>
        <h2 className="welcome__rules-title">Правила игры</h2>
        <p className="welcome__text">Правила просты:</p>
        <ul className="welcome__rules-list">
          <li>За {gameTime} минут нужно ответить на все вопросы.</li>
          <li>Можно допустить {mistakesLimit} ошибки.</li>
        </ul>
        <p className="welcome__text">Удачи!</p>
      </section>
    );
  }

  componentDidMount() {
    this.props.startUpQuestion();
  }
}

WelcomeScreen.propTypes = {
  gameTime: PropTypes.number,
  stepsLimit: PropTypes.number,
  mistakesLimit: PropTypes.number,
  incrementStep: PropTypes.func,
  startUpQuestion: PropTypes.func,
};

export default connect(
    (state) => ({
      step: state.game.step,
      gameTime: state.game.gameTime,
    }),
    (dispatch) => ({
      incrementStep: () => dispatch(ActionCreator.incrementStep()),
      startUpQuestion: () => dispatch(loadQuestions()),
    })
)(WelcomeScreen);
