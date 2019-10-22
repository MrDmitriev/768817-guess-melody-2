import React from 'react';
import {WelcomeScreen} from './welcome-screen.jsx';
import renderer from 'react-test-renderer';

it(`should match snapshot`, () => {
  const welcomeScreen = renderer.create(<WelcomeScreen />).toJSON();

  expect(welcomeScreen).toMatchSnapshot();
});
