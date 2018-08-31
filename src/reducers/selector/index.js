import * as constants from '../../constants';

const initialState = {
  test: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.INCREMENT_STROKE:
      return { ...state, test: state.test + 1 };
    default:
      return state;
  }
};
