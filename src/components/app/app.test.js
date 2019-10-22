import React from 'react';
import {App} from './app.jsx';
import renderer from 'react-test-renderer';

it(`should match snapshot`, () => {
  const app = renderer.create(<App />).toJSON();

  expect(app).toMatchSnapshot();
});
