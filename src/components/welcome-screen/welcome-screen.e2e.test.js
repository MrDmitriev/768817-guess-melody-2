import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {WelcomeScreen} from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`WelcomeScreen - (component)`, () => {
  it(`simulates click event for button component`, () => {
    const incrementStep = jest.fn();
    const startUpQuestion = jest.fn();

    const props = {
      gameTime: 1,
      stepsLimit: 2,
      mistakesLimit: 3,
      incrementStep,
      startUpQuestion,
    };

    const wrapper = shallow(
        <WelcomeScreen {...props} />
    );

    wrapper.find(`button`).simulate(`click`);

    expect(incrementStep).toHaveBeenCalledTimes(1);
  });
});
