import React from 'react';
import {GuessArtist} from './guess-artist.jsx';
import renderer from 'react-test-renderer';

jest.mock(`../mistakes-counter/mistakes-counter.jsx`, () => jest.fn().mockReturnValue(null));

it(`should match snapshot`, () => {
  const onUserAnswer = jest.fn();
  const props = {
    onAnswer: onUserAnswer,
    currentQuestion: {
      type: `artist`,
      song: {
        artist: `AAA`,
        src: `BBB`
      },
      answers: [1, 2, 3]
    }
  };
  const guessArtist = renderer.create(<GuessArtist {...props} />).toJSON();
  expect(guessArtist).toMatchSnapshot();
});
