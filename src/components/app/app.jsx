import React from 'react';
import PropTypes from 'prop-types';

import {WelcomeScreen} from '../welcome-screen/welcome-screen.jsx';
import {GuessGenre} from '../guess-genre/guess-genre.jsx';
import {GuessArtist} from '../guess-artist/guess-artist.jsx';

export class App extends React.PureComponent {
  static getScreen(question, props, onUserAnswer) {
    const {gameTime, errorCount, questions} = props;

    if (question === -1) {
      return <WelcomeScreen
        gameTime={gameTime}
        errorCount={errorCount}
        onButtonClickHandler={onUserAnswer}
        questions={questions}
      />;
    }

    const currentQuestion = questions[question];

    switch (currentQuestion.type) {
      case `genre`:
        return <GuessGenre currentQuestion={currentQuestion} onAnswer={onUserAnswer} />;
      case `artist`:
        return <GuessArtist currentQuestion={currentQuestion} onAnswer={onUserAnswer} />;
    }

    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      question: -1,
    };
  }

  render() {
    const {question} = this.state;
    const {questions} = this.props;

    return App.getScreen(question, this.props, (answer) => {

      return this.setState((prevState) => {
        const nextIndex = prevState.question + 1;
        const isEnd = nextIndex >= questions.length;
        return {
          question: !isEnd ? nextIndex : -1,
          answer,
        };
      });
    });
  }
}

App.propTypes = {
  gameTime: PropTypes.number,
  errorCount: PropTypes.number,
  questions: PropTypes.arrayOf(PropTypes.object),
};
