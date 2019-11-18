import React from 'react';
import {GuessGenre} from './guess-genre.jsx';
import renderer from 'react-test-renderer';

jest.mock(`../mistakes-counter/mistakes-counter.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../timer/timer.jsx`, () => jest.fn().mockReturnValue(null));

it(`should match snapshot`, () => {
  const onUserAnswer = jest.fn();
  const renderPlayer = jest.fn();
  const props = {
    onAnswer: onUserAnswer,
    currentQuestion: {
      type: `genre`,
      genre: `rock`,
      answers: [1, 2, 3]
    },
    renderPlayer
  };
  const guessGenre = renderer.create(<GuessGenre {...props} />).toJSON();
  expect(guessGenre).toMatchSnapshot();
});
