import React from "react";
import styles from "./PreLoader.module.css";
export const PreLoader = () => {
  return (
    <div className={styles.center}>
      <div className={styles.ring}></div>
      <span className="isLoading">loading...</span>
    </div>
  );
};
