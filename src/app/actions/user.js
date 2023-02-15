import {
  getJson,
  postJson,
} from 'requests';
import {
  clearToken,
  getToken,
  setToken,
} from 'token';
import config from 'config/configExample';

import {
  ERROR_RECEIVE_USER,
  ERROR_SIGN_IN,
  ERROR_SIGN_OUT,
  ERROR_SIGN_UP,
  RECEIVE_USER,
  REQUEST_SIGN_IN,
  REQUEST_SIGN_OUT,
  REQUEST_SIGN_UP,
  REQUEST_USER,
  SUCCESS_SIGN_IN,
  SUCCESS_SIGN_OUT,
  SUCCESS_SIGN_UP,
} from '../constants/actionTypes';

const errorReceiveUser = () => ({
  type: ERROR_RECEIVE_USER,
});

const getUser = () => {
  const {
    BASE_URL,
    USERS_SERVICE,
  } = config;

  return getJson({
    url: `${BASE_URL}${USERS_SERVICE}/user/get`,
  }).catch(() => {
    const storage = {
      '123123': {
        authorities: [
          'МОЖНО_ВОТ_ЭТУ_ШТУКУ',
          'МОЖНО_ДРУГУЮ_ШТУКУ',
        ],
        name: 'Мужик',
      },
      '456456': {
        authorities: [
          'МОЖНО_ДРУГУЮ_ШТУКУ',
        ],
        name: 'Другой мужик',
      }
    };
    const token = getToken();
    return storage[token];
  });
};

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  payload: user,
});

const requestUser = () => ({
  type: REQUEST_USER,
});

export const fetchUser = () => (dispatch) => {
  if (getToken()) {
    dispatch(requestUser());
    return getUser({
      dispatch,
    }).then(user => dispatch(receiveUser(user)))
      .catch(() => dispatch(errorReceiveUser()));
  }
};

const errorSignIn = () => ({
  type: ERROR_SIGN_IN,
});

const requestSignIn = () => ({
  type: REQUEST_SIGN_IN,
});

const successSignIn = payload => ({
  payload,
  type: SUCCESS_SIGN_IN,
});

const signIn = ({
  login,
  password,
}) => {
  const {
    BASE_URL,
    USERS_SERVICE,
  } = config;

  return postJson({
    body: {
      login,
      password,
    },
    url: `${BASE_URL}${USERS_SERVICE}/user/signIn`,
  }).catch(() => {
    const storage = {
      'admin_123': {
        authorities: [
          'МОЖНО_ВОТ_ЭТУ_ШТУКУ',
          'МОЖНО_ДРУГУЮ_ШТУКУ',
        ],
        name: 'Мужик',
        token: '123123',
      },
      'user_456': {
        authorities: [
          'МОЖНО_ДРУГУЮ_ШТУКУ',
        ],
        name: 'Другой мужик',
        token: '456456',
      }
    };
    return storage[`${login}_${password}`];
  });
};

export const fetchSignIn = ({
  login,
  password,
}) => (dispatch) => {
  dispatch(requestSignIn());
  return signIn({
    login,
    password,
  }).then((response) => {
    setToken(response.token);
    dispatch(successSignIn(response));
  }).catch(() => dispatch(errorSignIn()));
};

const errorSignUp = errors => ({
  payload: errors,
  type: ERROR_SIGN_UP,
});

const requestSignUp = () => ({
  type: REQUEST_SIGN_UP,
});

const successSignUp = () => ({
  type: SUCCESS_SIGN_UP,
});

const signUp = ({
  login,
  password,
}) => {
  const {
    BASE_URL,
    USERS_SERVICE,
  } = config;

  return postJson({
    body: {
      login,
      password,
    },
    url: `${BASE_URL}${USERS_SERVICE}/user/signUp`,
  });
};

export const fetchSignUp = ({
  login,
  password,
}) => (dispatch) => {
  dispatch(requestSignUp());
  return signUp({
    login,
    password,
  }).then(() => dispatch(successSignUp()))
    .catch(() => dispatch(errorSignUp()));
};

export const fetchSignUpAndSignIn = ({
  login,
  password,
}) => (dispatch) => {
  return dispatch(fetchSignUp({
    login,
    password,
  })).then(() => {
    return dispatch(fetchSignIn({
      login,
      password,
    }))
  });
};

const errorSignOut = errors => ({
  payload: errors,
  type: ERROR_SIGN_OUT,
});

const requestSignOut = () => ({
  type: REQUEST_SIGN_OUT,
});

const successSignOut = () => ({
  type: SUCCESS_SIGN_OUT,
});

const signOut = () => {
  const {
    BASE_URL,
    USERS_SERVICE,
  } = config;

  return postJson({
    url: `${BASE_URL}${USERS_SERVICE}/user/signOut`,
  }).catch(() => {
    // TODO: this catch() is just a stub, which should be removed
  });
};

export const fetchSignOut = () => (dispatch) => {
  dispatch(requestSignOut());
  return signOut()
    .then(() => {
      clearToken();
      dispatch(successSignOut());
  }).catch(() => dispatch(errorSignOut()))
};

