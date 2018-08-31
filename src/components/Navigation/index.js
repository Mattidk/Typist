import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Logo = props => (
  <li className="navigation-brand">
    {props.text}
  </li>
);

const NavigationItem = props => (
  <li className="navigation-item" style={{ float: props.placement }}>
    <a className="navigation-link" href={props.href}>
      {props.label}
    </a>
  </li>
);

const Navigation = () => (
  <div className="navigation-container">
    <ul className="container">
      <Logo text="Typist" />
      <NavigationItem href="/" label="HOME" />
      <NavigationItem href="/" label="STATS" />
      <NavigationItem href="/" label="TUTORIALS" />
      <NavigationItem href="/" label="TYPING TEST" />
      <NavigationItem href="/" label="HIGHSCORE" />
      <NavigationItem href="/" label="LOGIN" placement="right" />
    </ul>
  </div>
);

NavigationItem.defaultProps = {
  placement: 'left',
};

Logo.propTypes = {
  text: PropTypes.string.isRequired,
};

NavigationItem.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placement: PropTypes.string,
};

export default Navigation;
