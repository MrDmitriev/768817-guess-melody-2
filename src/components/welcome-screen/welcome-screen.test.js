import React from 'react';
import {WelcomeScreen} from './welcome-screen.jsx';
import renderer from 'react-test-renderer';

it(`should match snapshot`, () => {
  const incrementStep = jest.fn();
  const startUpQuestion = jest.fn();

  const props = {
    gameTime: 1,
    stepsLimit: 2,
    mistakesLimit: 3,
    incrementStep,
    startUpQuestion,
  };

  const welcomeScreen = renderer.create(<WelcomeScreen {...props} />).toJSON();

  expect(welcomeScreen).toMatchSnapshot();
});
