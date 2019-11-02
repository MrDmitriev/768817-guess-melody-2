import React from 'react';
import PropTypes from 'prop-types';

import {AudioPlayer} from '../audio-player/audio-player.jsx';

export class GuessGenre extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      answer1: false,
      answer2: false,
      answer3: false,
      answer4: false,
      activePlayer: -1,
    };

  }

  render() {
    const {currentQuestion, onAnswer} = this.props;

    const handleSubmit = () => {
      onAnswer(this.state);
    };

    const handleAnswerCheck = (e) => {
      const currentAnswer = e.target.value;
      this.setState((state) => {
        return {
          [currentAnswer]: !state.currentAnswer,
        };
      });
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

          <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
            <span className="timer__mins">05</span>
            <span className="timer__dots">:</span>
            <span className="timer__secs">00</span>
          </div>

          <div className="game__mistakes">
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>

        <section className="game__screen">
          <h2 className="game__title">{`Выберите ${currentQuestion.genre} треки`}</h2>
          <form className="game__tracks" onSubmit={handleSubmit}>

            {
              currentQuestion.answers.map((item, i) => {
                return (
                  <div className="track" key={`answer-${i + 1}`}>
                    <AudioPlayer
                      src={item.src}
                      isPlaying={i === this.state.activePlayer}
                      onPlayButtonClick={() => this.setState({
                        activePlayer: this.state.activePlayer === i ? -1 : i
                      })}
                    />
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
              onClick={handleSubmit}
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
  onAnswer: PropTypes.func,
  currentQuestion: PropTypes.object,
};
