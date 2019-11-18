import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GuessGenre from '../guess-genre/guess-genre.jsx';
import GuessArtist from '../guess-artist/guess-artist.jsx';
import {FailTime} from '../fail-time/fail-time.jsx';
import withActivePlayer from '../../hocs/with-active-player/with-active-player.js';

const GuessGenreWrapped = withActivePlayer(GuessGenre);
const GuessArtistWrapped = withActivePlayer(GuessArtist);

export class App extends React.PureComponent {
  static getScreen(step, questions) {
    if (step === -1) {
      return <WelcomeScreen />;
    } else if (step === -2) {
      return <FailTime />;
    }

    const currentQuestion = questions[step];

    switch (currentQuestion.type) {
      case `genre`:
        return <GuessGenreWrapped currentQuestion={currentQuestion} />;
      case `artist`:
        return <GuessArtistWrapped currentQuestion={currentQuestion} />;
    }

    return null;
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {step, questions} = this.props;

    return App.getScreen(step, questions);
  }
}

App.propTypes = {
  step: PropTypes.number,
  questions: PropTypes.arrayOf(PropTypes.object),
};

export default connect(
    (state) => ({
      step: state.step,
    })
)(App);
