import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducers/index.js';

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
      renderPlayer,
    } = this.props;

    const handleSubmit = (e) => {
      e.preventDefault();
      incrementStep();
      incrementMistake(currentQuestion, formGuessGenre);
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
                const uniqueName = `answer${i + 1}`;
                return (
                  <div className="track" key={uniqueName}>
                    {renderPlayer(item, i)}
                    <div className="game__answer">
                      <input
                        className="game__input visually-hidden"
                        type="checkbox"
                        value={uniqueName}
                        id={uniqueName}
                        onChange={handleAnswerCheck}
                        checked={formGuessGenre[uniqueName]}
                      />
                      <label className="game__check" htmlFor={uniqueName}>Отметить</label>
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
  incrementMistake: PropTypes.func,
  toggleGenreOption: PropTypes.func,
  incrementStep: PropTypes.func,
  renderPlayer: PropTypes.func.isRequired
};

export default connect(
    (state) => ({
      step: state.game.step,
      mistakes: state.game.mistakes,
      mistakesLimit: state.game.mistakesLimit,
      formGuessGenre: state.player.formGuessGenre,
      stepsLimit: state.game.stepsLimit,
    }),
    (dispatch) => ({
      incrementMistake: (currentQuestion, answers) => {
        dispatch(ActionCreator.incrementMistake(currentQuestion, answers));
      },
      toggleGenreOption: (option) => dispatch(ActionCreator.toggleGenreOption(option)),
      incrementStep: () => dispatch(ActionCreator.incrementStep()),
    })
)(GuessGenre);
