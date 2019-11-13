import React from 'react';
import renderer from 'react-test-renderer';
import {Timer} from './timer.jsx';

it(`should match snapshot`, () => {
  const tick = jest.fn();
  const callbackHandler = jest.fn();
  const props = {
    timer: {
      sec: 10,
      min: 1,
      secLeft: 70,
    },
    tick,
    callbackHandler,
  };

  const wrapper = renderer.create(<Timer {...props} />).toJSON();

  expect(wrapper).toMatchSnapshot();
});
