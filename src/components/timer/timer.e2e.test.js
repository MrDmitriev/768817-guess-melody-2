import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Timer} from './timer.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`should call callbackHandler when time is over`, () => {
  const tick = jest.fn();
  const showLoseTime = jest.fn();
  const props = {
    timer: {
      sec: 1,
      min: 0,
      secLeft: 1,
    },
    tick,
    showLoseTime,
  };

  const newProps = {
    timer: {
      sec: 0,
      min: 0,
      secLeft: 0,
    },
    tick,
    showLoseTime,
  };

  const wrapper = shallow(<Timer {...props} />);
  wrapper.setProps(newProps);

  expect(wrapper.instance().props.showLoseTime).toBeCalled();
});
