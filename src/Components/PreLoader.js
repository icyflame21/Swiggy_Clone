import React from "react";
import styles from "./PreLoader.module.css";
import food from './Assets/food.gif'

export const PreLoader = () => {
  return (
    <div className={styles.center}>
      <div className={styles.ring}></div>
      <span className="isLoading">
        <img src={ food} alt="" width={310} />
      </span>
    </div>
  );
};
