import React from 'react';
import styles from './status.module.css';

type StatusProps = {
  main: string,
  sub?: string,
}

function Status({ main, sub }: StatusProps) {
  return (
    <div className={styles.status}>
      <p className={styles.mainStatus}>{ main }</p>
      <p className={styles.subStatus}>{ sub }</p>
    </div>
  );
}

export default Status;
