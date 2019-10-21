import React from 'react';
import PropTypes from 'prop-types';

import {WelcomeScreen} from '../welcome-screen/welcome-screen.jsx';

export const App = (props) => {
  const {gameTime, errorCount} = props;

  const buttonClickHandler = () => {
    return null;
  };

  return <WelcomeScreen gameTime={gameTime} errorCount={errorCount} onButtonClickHandler={buttonClickHandler} />;
};

App.propTypes = {
  gameTime: PropTypes.number,
  errorCount: PropTypes.number,
};
