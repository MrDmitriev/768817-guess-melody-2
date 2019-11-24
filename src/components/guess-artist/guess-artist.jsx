import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import MistakesCounter from '../mistakes-counter/mistakes-counter.jsx';
import {ActionCreator} from '../../reducers/index.js';
import Timer from '../timer/timer.jsx';

export class GuessArtist extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {currentQuestion, incrementMistake, stepsLimit, incrementStep, mistakes, mistakesLimit, renderPlayer} = this.props;
    const {song} = currentQuestion;
    const handleChange = (evt) => {
      incrementStep(stepsLimit);
      incrementMistake(currentQuestion, evt.target.value, mistakes, mistakesLimit);
    };

    return (
      <section className="game game--artist">
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370" style={{filter: `url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center`}} />
          </svg>

          <Timer />
          <MistakesCounter />
        </header>

        <section className="game__screen">
          <h2 className="game__title">Кто исполняет эту песню?</h2>
          <div className="game__track">
            <div className="track">
              {renderPlayer(song, 0)}
            </div>
          </div>

          <form className="game__artist">
            {
              currentQuestion.answers.map((item, i) => {
                const currentValue = item.artist;
                return (
                  <div className="artist" key={item + i}>
                    <input
                      className="artist__input visually-hidden"
                      type="radio"
                      name={`artist-${i + 1}`}
                      value={currentValue}
                      id={`artist-${i + 1}`}
                      onClick={handleChange}
                    />
                    <label className="artist__name" htmlFor={`artist-${i + 1}`}>
                      <img className="artist__picture" src={item.picture} alt={item.artist} />
                      {item.artist}
                    </label>
                  </div>
                );
              })
            }
          </form>
        </section>
      </section>
    );
  }
}

GuessArtist.propTypes = {
  currentQuestion: PropTypes.object,
  stepsLimit: PropTypes.number,
  mistakes: PropTypes.number,
  mistakesLimit: PropTypes.number,
  incrementMistake: PropTypes.func,
  incrementStep: PropTypes.func,
  renderPlayer: PropTypes.func.isRequired,
};

export default connect(
    (state) => ({
      step: state.game.step,
    }),
    (dispatch) => ({
      incrementStep: () => dispatch(ActionCreator.incrementStep()),
      incrementMistake: (currentQuestion, answers) => {
        dispatch(ActionCreator.incrementMistake(currentQuestion, answers));
      },
    })
)(GuessArtist);
