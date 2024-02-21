/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "./Button.module.css";

export default function Button({ children, onClick, variation }) {
  return (
    <button className={`${styles.btn} ${styles[variation]}`} onClick={onClick}>
      {children}
    </button>
  );
}
