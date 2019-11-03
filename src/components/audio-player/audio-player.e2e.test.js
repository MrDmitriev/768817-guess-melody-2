import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AudioPlayer} from './audio-player.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`sholud toggle audioPlayer when click on button play/pause`, () => {
  const onPlayButtonClick = jest.fn();
  const props = {
    src: `aaa`,
    onPlayButtonClick,
    isPlaying: false,
  };

  const wrapper = shallow(<AudioPlayer {...props} />);
  const instance = wrapper.instance();
  wrapper.find(`button`).simulate(`click`);

  expect(onPlayButtonClick).toHaveBeenCalled();
  expect(instance.state.isPlaying).toEqual(true);

  wrapper.find(`button`).simulate(`click`);
  expect(onPlayButtonClick).toHaveBeenCalled();
  expect(instance.state.isPlaying).toEqual(false);
});
