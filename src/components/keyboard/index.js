import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';

import Utilities from './utilities';

const lowerCaseDanishLayout = [
  '½ 1 2 3 4 5 6 7 8 9 0 + ´ {bksp}',
  '{tab} q w e r t y u i o p å ¨',
  '{lock} a s d f g h j k l æ ø {enter}',
  '{shift} z x c v b n m , . - {shift}',
  '{control} {option} {space} {option} {}',
];

const lowerCaseLayout = [
  '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
  '{tab} q w e r t y u i o p [ ] \\',
  '{lock} a s d f g h j k l ; \' {enter}',
  '{shift} z x c v b n m , . / {shift}',
  '{control} {option} {space} {option} {}',
];

const upperCaseLayout = [
  '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
  '{tab} Q W E R T Y U I O P { } |',
  '{lock} A S D F G H J K L : " {enter}',
  '{shift} Z X C V B N M < > ? {shift}',
  '.com @ {space}',
];

class Keyboard extends Component {
  render() {
    return (
      <div className="keyboard-container">
        <div className="simple-keyboard hg-theme-default">
          {lowerCaseDanishLayout.map(row => (
            <div className="hg-row">
              {row.split(' ').map((button) => {
                const fctBtnClass = Utilities.getButtonClass(button);
                return (
                  <div className={`hg-button ${fctBtnClass}`}>
                    <span>
                      {button}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({}),
  {},
)(Keyboard);
