import React from 'react';
import styles from './footer.module.css';

const { footer, container } = styles;

const year = new Date().getFullYear();

const Footer = () => (
  <footer className={footer}>
    <div className={container}>
      copyright &copy;&nbsp;
      {year}
    </div>
  </footer>
);

export default Footer;
