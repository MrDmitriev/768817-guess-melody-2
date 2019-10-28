import React from 'react';
import {GuessGenre} from './guess-genre.jsx';
import renderer from 'react-test-renderer';

it(`should match snapshot`, () => {
  const onUserAnswer = jest.fn();
  const props = {
    onAnswer: onUserAnswer,
    currentQuestion: {
      type: `genre`,
      genre: `rock`,
      answers: [1, 2, 3]
    }
  };
  const guessArtist = renderer.create(<GuessGenre {...props} />).toJSON();
  expect(guessArtist).toMatchSnapshot();
});
