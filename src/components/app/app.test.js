import React from 'react';
import {App} from './app.jsx';
import renderer from 'react-test-renderer';

jest.mock(`../guess-genre/guess-genre.jsx`, () => jest.fn().mockReturnValue(null));
jest.mock(`../guess-artist/guess-artist.jsx`, () => jest.fn().mockReturnValue(null));

it(`should match snapshot`, () => {
  const props = {
    step: 1,
    questions: [
      {
        type: `genre`,
        genre: `rock`,
        answers: [1, 2, 3]
      },
      {
        type: `artist`,
        song: {
          artist: `AAA`,
          src: `BBB`
        },
        answers: [1, 2, 3]
      }
    ]
  };

  const app = renderer.create(<App {...props} />).toJSON();

  expect(app).toMatchSnapshot();
});
