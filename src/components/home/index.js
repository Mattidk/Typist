import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Line } from 'rc-progress';
import soundFile from '../../assets/audio/typewriter.wav';
import {
  increment,
  incrementTypo,
  setAccuracy,
  setProgress,
  incrementStreak,
  resetStreak,
  setMultiplier,
  resetMultiplier,
  incrementScore,
  resetScore,
  setContent,
  fetchArticle,
} from '../../actions';

import './index.css';

const NavItem = ({ data, label }) => (
  <div className="col">
    <div className="row hud">
      <div className="col hud-data">
        {data}
      </div>
      <div className="w-100" />
      <div className="col">
        {label}
      </div>
    </div>
  </div>
);

class Home extends Component {
  constructor(props) {
    super(props);
    this.sound = new Audio(soundFile);
  }

  componentWillMount() {
    document.addEventListener('keypress', this.handleKeyPress.bind(this));
  }

  componentDidMount() {
    this.props.fetchArticle();
  }

  getKeyPressed(e) {
    e.preventDefault();
    const key = e.which || e.keyCode;
    return String.fromCharCode(key);
  }

  showContent() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('myDiv').style.display = 'block';
  }

  handleKeyPress(e) {
    if (this.props.strokes < this.props.content.length) {
      const key = this.getKeyPressed(e);
      this.props.increment();
      this.handleCharCompare(key);
      this.playSoundEffect();
      this.highlightNextCharacter();
    }
  }

  playSoundEffect() {
    if (!this.sound.ended) {
      this.sound.pause();
      this.sound.currentTime = 0;
      this.sound.play();
    } else {
      this.sound.play();
    }
  }

  handleCharCompare(key) {
    const position = this.props.strokes - 1;
    if (key === this.props.content[position].letter) {
      const newContent = this.props.content.slice();
      newContent[position] = {
        ...newContent[position],
        status: 1,
        current: false,
      };
      this.props.incrementStreak();
      this.calculateMultiplier();
      this.props.setContent(newContent);
      this.calculatePoints();
    } else {
      const newContent = this.props.content.slice();
      newContent[position] = {
        ...newContent[position],
        status: -1,
        current: false,
      };
      this.props.resetStreak();
      this.props.resetMultiplier();
      this.props.incrementTypo();
      this.props.setContent(newContent);
    }
    this.calculateAccuracy();
    this.calculateProgress();
  }

  highlightNextCharacter() {
    const position = this.props.strokes;
    const newContent = this.props.content.slice();
    newContent[position] = { ...newContent[position], current: true };
    this.props.setContent(newContent);
  }

  isLevelCompleted() {
    return this.props.strokes === this.props.content.length;
  }

  calculateMultiplier() {
    const { streak } = this.props;
    if (streak > 10 && streak <= 25) {
      this.props.setMultiplier(2);
    } else if (streak > 25 && streak <= 50) {
      this.props.setMultiplier(3);
    } else if (streak > 50 && streak <= 75) {
      this.props.setMultiplier(4);
    } else if (streak > 75 && streak <= 100) {
      this.props.setMultiplier(5);
    } else {
      this.props.setMultiplier(1);
    }
  }

  calculatePoints() {
    if (this.props.streak > 0) {
      this.props.incrementScore(this.props.streak * this.props.multiplier);
    } else {
      this.props.incrementScore(this.props.multiplier);
    }
  }

  calculateAccuracy() {
    const percentage = Math.ceil(
      (this.props.strokes / (this.props.strokes + this.props.typos)) * 100,
    );
    this.props.setAccuracy(percentage);
  }

  calculateProgress() {
    const percentage = Math.ceil(
      (this.props.strokes / this.props.content.length) * 100,
    );
    this.props.setProgress(percentage);
  }

  render() {
    const {
      score, strokes, typos, accuracy, progress, streak, multiplier, loading, error,
    } = this.props;

    if (loading) {
      return (
        <div id="loader" />
      );
    }

    return (
      <div>
        <div className="row hud-container">
          <NavItem label="STROKES" data={strokes} />
          <NavItem label="TYPOS" data={typos} />
          <NavItem label="SCORE" data={score} />
          <NavItem label="ACCURACY" data={accuracy} />
          <NavItem label="STREAK" data={streak} />
          <NavItem label="MULTI" data={multiplier} />
        </div>

        {error ? (
          <div className="error_message">
            <h2>
              ERROR
            </h2>
            <h5>
              {error}
            </h5>
          </div>
        ) : (
          <div>
            <Line percent={progress} strokeColor="#336699" />
            <div className="animate-bottom">
              <div className="text-content">
                {this.props.content.map((item) => {
                  if (item.current) {
                    return (
                      <div key={item.id} className="character underlined">
                        {item.letter}
                      </div>
                    );
                  }
                  if (item.status === 0) {
                    return (
                      <div key={item.id} className="character">
                        {item.letter}
                      </div>
                    );
                  } if (item.status === 1) {
                    return (
                      <div key={item.id} className="character correct">
                        {item.letter}
                      </div>
                    );
                  }
                  return (
                    <div key={item.id} className="character incorrect">
                      {item.letter}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Home.propTypes = {
  score: PropTypes.number.isRequired,
  typos: PropTypes.number.isRequired,
  strokes: PropTypes.number.isRequired,
  accuracy: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  streak: PropTypes.number.isRequired,
  multiplier: PropTypes.number.isRequired,
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
  increment: PropTypes.func.isRequired,
  incrementTypo: PropTypes.func.isRequired,
  incrementStreak: PropTypes.func.isRequired,
  resetStreak: PropTypes.func.isRequired,
  setAccuracy: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
  setMultiplier: PropTypes.func.isRequired,
  resetMultiplier: PropTypes.func.isRequired,
  incrementScore: PropTypes.func.isRequired,
  setContent: PropTypes.func.isRequired,
  fetchArticle: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

NavItem.propTypes = {
  data: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default connect(
  state => ({
    score: state.home.score,
    typos: state.home.typos,
    strokes: state.home.strokes,
    accuracy: state.home.accuracy,
    progress: state.home.progress,
    streak: state.home.streak,
    multiplier: state.home.multiplier,
    content: state.home.content,
    loading: state.home.loading,
    error: state.home.error,
  }),
  {
    increment,
    incrementTypo,
    incrementStreak,
    resetStreak,
    setAccuracy,
    setProgress,
    setMultiplier,
    resetMultiplier,
    incrementScore,
    resetScore,
    setContent,
    fetchArticle,
  },
)(Home);
