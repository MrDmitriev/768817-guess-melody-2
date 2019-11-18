import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import withActivePlayer from './with-active-player.js';
import {AudioPlayer} from '../../components/audio-player/audio-player.jsx';

configure({adapter: new Adapter()});

const playButtonClickHandler = jest.fn();

const MockComponent = () => <div
  renderPlayer = {
    (item) => {
      return (
        <AudioPlayer
          src={item.src}
          isPlaying={false}
          onPlayButtonClick={playButtonClickHandler}
        />
      );
    }
  }
/>;
const MockComponentWrapped = withActivePlayer(MockComponent);

it(`Paused by default`, () => {
  const wrapper = mount(<MockComponentWrapped />);

  expect(wrapper.state().activePlayer).toEqual(-1);
});

it(`Simulates start the player`, () => {
  const wrapper = mount(<MockComponentWrapped />).setState({activePlayer: 1});

  expect(wrapper.state().activePlayer).toEqual(1);
});
