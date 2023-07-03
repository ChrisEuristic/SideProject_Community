'use client';

import styles from './sliderbar.module.css';

export default function SlideBar () {
  return (
    <>
      <input type="range" className={styles.range} max={100} value={50} />
    </>
  );
}