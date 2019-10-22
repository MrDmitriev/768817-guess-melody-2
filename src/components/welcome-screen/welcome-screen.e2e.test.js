import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {WelcomeScreen} from './welcome-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`WelcomeScreen - (component)`, () => {
  it(`simulates click event for button component`, () => {
    const clickHanler = jest.fn();
    const wrapper = shallow(
        <WelcomeScreen
          gameTime={0}
          errorCount={0}
          onButtonClickHandler={clickHanler}
        />
    );

    wrapper.find(`button`).simulate(`click`);

    expect(clickHanler).toHaveBeenCalledTimes(1);
  });
});
