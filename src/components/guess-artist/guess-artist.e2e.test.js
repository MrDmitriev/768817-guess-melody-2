import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {GuessArtist} from './guess-artist.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`simulates change on input`, () => {
  const incrementStep = jest.fn();
  const incrementMistake = jest.fn();
  const renderPlayer = jest.fn();
  const props = {
    currentQuestion: {
      type: `artist`,
      song: {
        artist: `AAA`,
        src: `BBB`,
      },
      answers: [1, 2, 3],
    },
    stepsLimit: 2,
    mistakes: null,
    mistakesLimit: 3,
    incrementMistake,
    incrementStep,
    renderPlayer,
  };

  const wrapper = shallow(<GuessArtist {...props} />);

  wrapper.find(`input`).first().simulate(`change`, {target: {value: `artist1`}});

  expect(incrementMistake).toHaveBeenCalledWith(props.currentQuestion, `artist1`, props.mistakes, props.mistakesLimit);
});
