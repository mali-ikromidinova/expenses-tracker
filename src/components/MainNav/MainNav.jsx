import styles from "./MainNav.module.css";
import { HiOutlineHome } from "react-icons/hi2";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { NavLink } from "react-router-dom";

export default function MainNav() {
  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <NavLink to="/dashboard" className={styles.navLink}>
            <HiOutlineHome />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/income" className={styles.navLink}>
            <GiReceiveMoney />
            <span>Income</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/expenses" className={styles.navLink}>
            <GiPayMoney />
            <span>Expenses</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
