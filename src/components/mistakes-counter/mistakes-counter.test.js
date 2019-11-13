import React from 'react';
import renderer from 'react-test-renderer';
import {MistakesCounter} from './mistakes-counter.jsx';

it(`should match snapshot`, () => {
  const props = {
    mistakes: 0,
  };

  const wrapper = renderer.create(<MistakesCounter {...props} />).toJSON();

  expect(wrapper).toMatchSnapshot();
});
