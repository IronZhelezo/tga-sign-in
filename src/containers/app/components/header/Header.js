import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { switchThemes } from 'ducks/app';
import Switch from '@material-ui/core/Switch';
import styles from './header.module.css';

const { header, container, label } = styles;

const Header = ({ switchThemes: toggleThemes, theme }) => {
  const [themeName, setTheme] = useState(theme);

  const toggleChecked = (e) => {
    e.preventDefault();
    const name = themeName === 'dark' ? 'light' : 'dark';
    toggleThemes(name);
    setTheme(name);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      toggleChecked(e);
    }
  };

  const renderLabel = (labelName) => (
    <span
      onClick={toggleChecked}
      onKeyDown={handleKeyDown}
      className={label}
      key={`theme-switcher-${labelName}`}
    >
      {labelName}
    </span>
  );

  return (
    <header className={header}>
      <div className={container}>
        {renderLabel('Light')}
        <Switch checked={themeName === 'dark'} onChange={toggleChecked} color="default" />
        {renderLabel('Dark')}
      </div>
    </header>
  );
};

Header.propTypes = {
  theme: PropTypes.string,
  switchThemes: PropTypes.func.isRequired
};

Header.defaultProps = {
  theme: 'light'
};

const mapStateToProps = ({ app: { theme } }) => ({ theme });

const actionToProps = { switchThemes };

export default connect(mapStateToProps, actionToProps)(Header);
