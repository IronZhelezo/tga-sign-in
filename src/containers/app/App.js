import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import Modal from '@material-ui/core/Modal';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styles from './app.module.css';
import './app.css';

import Header from './components/header/Header';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';

const { app, spinner } = styles;

const getAppClasses = (theme) => (`app--${theme} ${app}`);

const App = ({ theme, loading }) => (
  <div className={getAppClasses(theme)}>
    <Header />
    <Content />
    <Footer />
    <Modal open={loading}>
      <div className={spinner}>
        <Loader
          type="Puff"
          visible={loading}
        />
      </div>
    </Modal>
  </div>
);

App.propTypes = {
  theme: PropTypes.string,
  loading: PropTypes.bool
};

App.defaultProps = {
  theme: 'light',
  loading: false
};

const mapStateToProps = ({
  app: { theme },
  datafetched: { loading }
}) => ({ loading, theme });

export default connect(mapStateToProps, {})(App);
