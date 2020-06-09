import React from 'react';
import styles from './content.module.css';

const { content, container } = styles;

const Content = () => (
  <main className={content}>
    <div className={container}>
      Content
    </div>
  </main>
);

export default Content;
