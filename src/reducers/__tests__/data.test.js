import MockAdapter from 'axios-mock-adapter';
import data from '../data.js';
import createAPI from '../../api/api.js';
import {loadQuestions} from '../data.js';

const initialState = {
  questions: []
};

describe(`reducer works correctly`, () => {
  it(`should return initialState when there is no parametres`, () => {
    const action = {};
    const newState = data(initialState, action);

    expect(newState).toEqual(initialState);
  });

  it(`should set questions by given data`, () => {
    const action = {
      type: `SET_QUESTIONS`,
      payload: [1, 2, 3]
    };
    const newState = data(initialState, action);

    expect(newState).toEqual({questions: [1, 2, 3]});
  });

  it(`should make a correct API call to a /questions endPoint`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const questionLoader = loadQuestions();

    apiMock.onGet(`/questions`).reply(200, [{fake: true}]);

    return questionLoader(dispatch, null, api)
    .then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: `SET_QUESTIONS`,
        payload: [{fake: true}]
      });
    });

  });
});
