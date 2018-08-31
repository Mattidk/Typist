import shortid from 'shortid';
import * as constants from '../constants';
import 'isomorphic-fetch';

export const increment = () => ({
  type: constants.INCREMENT_STROKE,
});

export const incrementTypo = () => ({
  type: constants.INCREMENT_TYPO,
});

export const incrementStreak = () => ({
  type: constants.INCREMENT_STREAK,
});

export const resetStreak = () => ({
  type: constants.RESET_STREAK,
});

export const setAccuracy = data => ({
  type: constants.SET_ACCURACY,
  payload: data,
});

export const setProgress = data => ({
  type: constants.SET_PROGRESS,
  payload: data,
});

export const setMultiplier = data => ({
  type: constants.SET_MULTIPLIER,
  payload: data,
});

export const resetMultiplier = () => ({
  type: constants.RESET_MULTIPLIER,
});

export const incrementScore = data => ({
  type: constants.INCREMENT_SCORE,
  payload: data,
});

export const resetScore = () => ({
  type: constants.RESET_SCORE,
});

export const setContent = content => ({
  type: constants.SET_CONTENT,
  payload: content,
});

const fetchArticleBegin = () => ({
  type: constants.FETCH_ARTICLE_BEGIN,
});

const fetchArticleSuccess = article => ({
  type: constants.FETCH_ARTICLE_SUCCESS,
  payload: { article },
});

const fetchArticleError = error => ({
  type: constants.FETCH_ARTICLE_FAILURE,
  payload: { error },
});

function processContent(json) {
  return json.content
    .split('')
    .map((item, index) => ({
      id: shortid.generate(),
      letter: item,
      status: 0,
      current: index === 0,
    }));
}

export function fetchArticle() {
  return (dispatch) => {
    dispatch(fetchArticleBegin);
    return fetch('http://localhost:4000/article')
      .then(response => response.json())
      .then(json => processContent(json))
      .then(content => dispatch(fetchArticleSuccess(content)))
      .catch(error => dispatch(fetchArticleError(error.message)));
  };
}
