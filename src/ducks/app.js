import createRequest from 'utils/WebAPIUtils';
import Storage from 'utils/storage';

export const APP_INIT = 'APP_INIT';
export const SWITCH_THEMES = 'SWITCH_THEMES_LOCAL';

const initialState = {
  error: null,
  isInit: false,
  isFetching: false,
  theme: 'light',
  storage: Storage
};

export default function reducer(state = initialState, action) {
  const {
    type,
    payload,
    error,
    start
  } = action;

  if (start) return state;

  if (error) {
    return {
      ...state,
      error: payload
    };
  }

  switch (type) {
    case APP_INIT:
      return {
        ...state,
        isInit: !!payload
      };

    case SWITCH_THEMES:
      return {
        ...state,
        theme: payload
      };

    default:
      return {
        ...state,
        ...payload
      };
  }
}

export function loadData({
  type,
  data,
  url,
  method,
  handler
}) {
  return async function(dispatch) {
    dispatch({
      type,
      start: true
    });
    try {
      const payload = await createRequest(data, url, method);

      return dispatch({
        type,
        payload: handler ? handler(payload) : payload
      });
    } catch (err) {
      return dispatch({
        type,
        error: true
      });
    }
  };
}

export const init = () => loadData({ type: APP_INIT });

export function switchThemes(themeName) {
  return (dispatch) => dispatch({
    type: SWITCH_THEMES,
    payload: themeName
  });
}
