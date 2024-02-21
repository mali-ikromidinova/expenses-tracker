/* eslint-disable react/prop-types */
import { TbPigMoney } from "react-icons/tb";
import styles from "./Logo.module.css";

export default function Logo({ type }) {
  return (
    <div className={styles.logoWrapper}>
      <TbPigMoney className={`${styles.logo} ${styles[type]}`} />
      <span className={` ${styles[type]}`}>Keep Track of your Money</span>
    </div>
  );
}
