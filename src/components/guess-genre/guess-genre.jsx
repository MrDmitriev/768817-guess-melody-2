import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';

import MistakesCounter from '../mistakes-counter/mistakes-counter.jsx';
import Timer from '../timer/timer.jsx';

export class GuessGenre extends React.PureComponent {
  render() {
    const {
      currentQuestion,
      incrementMistake,
      formGuessGenre,
      toggleGenreOption,
      incrementStep,
      stepsLimit,
      mistakes,
      mistakesLimit,
      renderPlayer,
    } = this.props;

    const handleSubmit = (e) => {
      e.preventDefault();
      incrementStep(stepsLimit);
      incrementMistake(currentQuestion, formGuessGenre, mistakes, mistakesLimit);
    };

    const handleAnswerCheck = (e) => {
      const currentAnswer = e.target.value;
      toggleGenreOption(currentAnswer);
    };

    return (
      <section className="game game--genre">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={{filter: `url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center`}}/>
          </svg>
          <Timer />
          <MistakesCounter />
        </header>

        <section className="game__screen">
          <h2 className="game__title">{`Выберите ${currentQuestion.genre} треки`}</h2>
          <form className="game__tracks" onSubmit={handleSubmit}>

            {
              currentQuestion.answers.map((item, i) => {
                return (
                  <div className="track" key={`answer-${i + 1}`}>
                    {renderPlayer(item, i)}
                    <div className="game__answer">
                      <input
                        className="game__input visually-hidden"
                        type="checkbox"
                        name={`answer-${i + 1}`}
                        value={`answer${i + 1}`}
                        id={`answer-${i + 1}`}
                        onChange={handleAnswerCheck}
                      />
                      <label className="game__check" htmlFor={`answer-${i + 1}`}>Отметить</label>
                    </div>
                  </div>
                );
              })
            }

            <button
              className="game__submit button"
              type="submit"
              onSubmit={handleSubmit}
            >
              Ответить
            </button>
          </form>
        </section>
      </section>
    );
  }
}

GuessGenre.propTypes = {
  currentQuestion: PropTypes.object,
  formGuessGenre: PropTypes.object,
  stepsLimit: PropTypes.number,
  mistakes: PropTypes.number,
  mistakesLimit: PropTypes.number,
  incrementMistake: PropTypes.func,
  toggleGenreOption: PropTypes.func,
  incrementStep: PropTypes.func,
  renderPlayer: PropTypes.func.isRequired
};

export default connect(
    (state) => ({
      step: state.step,
      mistakes: state.mistakes,
      mistakesLimit: state.mistakesLimit,
      formGuessGenre: state.formGuessGenre,
      stepsLimit: state.stepsLimit,
    }),
    (dispatch) => ({
      incrementMistake: (currentQuestion, answers, mistakes, mistakesLimit) => {
        dispatch(ActionCreator.incrementMistake(currentQuestion, answers, mistakes, mistakesLimit));
      },
      toggleGenreOption: (option) => dispatch(ActionCreator.toggleGenreOption(option)),
      incrementStep: (stepsLimit) => dispatch(ActionCreator.incrementStep(stepsLimit)),
    })
)(GuessGenre);
