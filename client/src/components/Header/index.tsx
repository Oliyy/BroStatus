import React from 'react';
import styles from './header.module.css';

type HeaderProps = {
  connected: boolean
}

function Header({ connected }: HeaderProps) {
  return (
    <div className={styles.header}>
      <h1>BroStatus</h1>
      <div>{ connected ? 'Connected' : 'Disconnected' }</div>
    </div>
  );
}

export default Header;
