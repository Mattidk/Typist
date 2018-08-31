import * as constants from '../../constants';

const initialState = {
  score: 0,
  typos: 0,
  strokes: 0,
  accuracy: 0,
  progress: 0,
  streak: 0,
  multiplier: 1,
  started: 0,
  finished: 0,
  content: [],
  loading: true,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.INCREMENT_STROKE:
      return { ...state, strokes: state.strokes + 1 };
    case constants.INCREMENT_TYPO:
      return { ...state, typos: state.typos + 1 };
    case constants.INCREMENT_STREAK:
      return { ...state, streak: state.streak + 1 };
    case constants.RESET_STREAK:
      return { ...state, streak: 0 };
    case constants.SET_ACCURACY:
      return { ...state, accuracy: action.payload };
    case constants.SET_PROGRESS:
      return { ...state, progress: action.payload };
    case constants.SET_MULTIPLIER:
      return { ...state, multiplier: action.payload };
    case constants.RESET_MULTIPLIER:
      return { ...state, multiplier: 1 };
    case constants.INCREMENT_SCORE:
      return { ...state, score: state.score + action.payload };
    case constants.RESET_SCORE:
      return { ...state, score: 0 };
    case constants.SET_CONTENT:
      return { ...state, content: action.payload };
    case constants.FETCH_ARTICLE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case constants.FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        content: action.payload.article,
      };
    case constants.FETCH_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        content: [],
      };
    default:
      return state;
  }
};
