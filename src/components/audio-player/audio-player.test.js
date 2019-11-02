import React from 'react';
import renderer from 'react-test-renderer';
import {AudioPlayer} from './audio-player.jsx';

it(`should match snapshot`, () => {
  const props = {
    src: `aaa`,
    onPlayButtonClick: jest.fn(),
    isPlaying: true,
  };

  const wrapper = renderer.create(<AudioPlayer {...props} />).toJSON();

  expect(wrapper).toMatchSnapshot();
});
