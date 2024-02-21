import Logo from "../Logo/Logo";
import MainNav from "../MainNav/MainNav";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo type="white" />
      <MainNav />
    </aside>
  );
}
