import axios from 'axios';
// import {ActionCreator} from '../reducer';

const createAPI = () => {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-2.appspot.com/guess-melody`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  // const onError = (error) => {
  //   return error.response.status === 403 ? dispatch(ActionCreator.requireAuth) : error;
  // };

  api.interceptors.response.use(onSuccess);
};

export default createAPI;
