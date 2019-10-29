import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {GuessArtist} from './guess-artist.jsx';

Enzyme.configure({adapter: new Adapter()});

it(`simulates change on input`, () => {
  const onAnswer = jest.fn();
  const props = {
    currentQuestion: {
      type: `artist`,
      song: {
        artist: `AAA`,
        src: `BBB`,
      },
      answers: [1, 2, 3],
    },
    onAnswer,
  };

  const wrapper = shallow(<GuessArtist {...props} />);

  wrapper.find(`input`).first().simulate(`change`, {target: {value: `artist1`}});

  expect(onAnswer).toHaveBeenCalledWith(`artist1`);
});
